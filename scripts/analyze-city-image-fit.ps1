# Analyze city listing images to compute an objectPosition (pos) that makes the
# building subject fit within the card's visible window, matching the homepage
# pattern (memory: vedhara-ui-patterns.md "Listing card image framing").
#
# For each unique image in scripts/city-images-input.json:
#   - download w=900 from Pexels
#   - downscale to width 120, sample horizontal bands
#   - sky = low edge + high luminance (top), building = high edge + lower lum
#   - building center = activity-weighted center (sky bands skipped)
#   - visible window height in source px = srcW / bannerAspect
#   - posY% = (buildCenter - win/2) / (H - win) * 100, clamped 0-100
#
# Output: scripts/city-image-fit-results.json
# Usage: powershell -ExecutionPolicy Bypass -File scripts/analyze-city-image-fit.ps1
Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$inputJson = Join-Path $PSScriptRoot "city-images-input.json"
$outJson = Join-Path $PSScriptRoot "city-image-fit-results.json"
$tmpDir = Join-Path $env:TEMP "vedhara-fit"
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null

$bannerAspect = 2.13   # card ~384 wide / 180 tall
$imgWidth = 900        # Pexels w=900 as used by img()
$bands = 40

$items = Get-Content $inputJson -Raw | ConvertFrom-Json
$results = @()

foreach ($it in $items) {
  $id = $it.id
  $url = "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=$imgWidth"
  $file = Join-Path $tmpDir "$id.jpg"
  try {
    if (-not (Test-Path $file)) {
      Invoke-WebRequest -Uri $url -OutFile $file -UseBasicParsing -TimeoutSec 30
    }
  } catch {
    Write-Host "DL FAIL $id : $($_.Exception.Message)"
    $results += [PSCustomObject]@{ id=$id; error="download" }
    continue
  }

  $bmp = $null
  try { $bmp = [System.Drawing.Bitmap]::FromFile($file) } catch {
    Write-Host "LOAD FAIL $id"
    $results += [PSCustomObject]@{ id=$id; error="load" }
    continue
  }
  $W = $bmp.Width; $H = $bmp.Height
  if ($W -le 0 -or $H -le 0) { $bmp.Dispose(); continue }

  # downscale to width 120
  $sW = 120
  $sH = [Math]::Max(1, [int][Math]::Round($H * $sW / $W))
  $small = New-Object System.Drawing.Bitmap $sW, $sH
  $g = [System.Drawing.Graphics]::FromImage($small)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBilinear
  $g.DrawImage($bmp, 0, 0, $sW, $sH)
  $g.Dispose()

  # per-band average luminance + edge energy (horizontal delta)
  $bandH = [Math]::Max(1, [int][Math]::Floor($sH / $bands))
  $lum = New-Object 'double[]' $bands
  $edge = New-Object 'double[]' $bands
  for ($b = 0; $b -lt $bands; $b++) {
    $y0 = $b * $bandH
    $y1 = [Math]::Min($sH - 1, $y0 + $bandH - 1)
    $sumL = 0.0; $sumE = 0.0; $cnt = 0
    for ($y = $y0; $y -le $y1; $y++) {
      $prev = -1
      for ($x = 0; $x -lt $sW; $x++) {
        $p = $small.GetPixel($x, $y)
        $L = 0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B
        $sumL += $L
        if ($prev -ge 0) { $sumE += [Math]::Abs($L - $prev) }
        $prev = $L
        $cnt++
      }
    }
    $lum[$b] = $sumL / $cnt
    $edge[$b] = $sumE / [Math]::Max(1, $cnt - $sW)  # normalize
  }
  $small.Dispose(); $bmp.Dispose()

  # normalize lum/edge to 0..1 for scoring
  $lmin = ($lum | Measure-Object -Minimum).Minimum
  $lmax = ($lum | Measure-Object -Maximum).Maximum
  $emax = ($edge | Measure-Object -Maximum).Maximum
  $lrange = [Math]::Max(1e-6, $lmax - $lmin)
  $erange = [Math]::Max(1e-6, $emax)

  # activity score: high edge AND lower luminance => building (sky is smooth+bright)
  # score = normalizedEdge * (1 - normalizedLum * 0.5)
  $score = New-Object 'double[]' $bands
  for ($b = 0; $b -lt $bands; $b++) {
    $nL = ($lum[$b] - $lmin) / $lrange
    $nE = $edge[$b] / $erange
    $score[$b] = $nE * (1 - 0.5 * $nL)
  }

  # find strongest contiguous region center (activity-weighted, skip leading sky)
  $total = 0.0; $wsum = 0.0
  for ($b = 0; $b -lt $bands; $b++) {
    $total += $score[$b]
    $wsum += $score[$b] * ($b + 0.5)
  }
  $buildCenterBand = if ($total -gt 1e-6) { $wsum / $total } else { $bands / 2.0 }
  $buildCenterPx = $buildCenterBand / $bands * $H  # in source px (band index / bands * H)

  # visible window height in source px
  $win = $W / $bannerAspect

  $posY = "50%"
  if ($win -lt $H) {
    $raw = ($buildCenterPx - $win / 2) / ($H - $win) * 100
    $clamped = [Math]::Max(0, [Math]::Min(100, $raw))
    $posY = ("{0:N0}" -f $clamped) + "%"
  }

  $results += [PSCustomObject]@{
    id = $id
    w = $W; h = $H
    aspect = ("{0:N2}" -f ($W / $H))
    windowFits = ($win -ge $H)   # true => no vertical crop, pos irrelevant
    centerPx = [int]$buildCenterPx
    recommended = $posY
    current = $(if ($it.pos) { $it.pos } else { "50%" })
  }
  Write-Host ("{0}: {1}x{2} aspect={3} fits={4} pos={5} (cur {6})" -f $id, $W, $H, ("{0:N2}" -f ($W/$H)), ($win -ge $H), $posY, $it.pos)
}

$results | ConvertTo-Json -Depth 4 | Set-Content -Path $outJson -Encoding UTF8
Write-Host "`nWrote $outJson"
