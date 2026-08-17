# Compress hero videos with quality-preserving settings.
# - Keeps EXACT resolution + framerate (no blur, no stutter)
# - Intel QSV hardware H.264, global_quality 22 (high quality, fast)
# - Encodes to a staging temp dir first; SWAP step copies to public/videos AND
#   public/watch (byte-identical) + regenerates thumbnails.
# Usage: powershell -File scripts/compress-hero-videos.ps1
$ErrorActionPreference = "Continue"
$bin = "C:\Users\sharma.mohit\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin"
$root = "D:\OneDrive - Tantranzm Technologies Pvt Ltd\Downloads\vedhara"
$videos = Join-Path $root "public\videos"
$watch  = Join-Path $root "public\watch"
$stage  = Join-Path $env:TEMP "vedhara-compress"
$errlog = Join-Path $env:TEMP "vedhara-ffmpeg-err.log"
New-Item -ItemType Directory -Force -Path $stage | Out-Null

# Only the over-encoded files (video bitrate > ~2.8 Mbps).
$targets = @(
  "greater-noida-city.mp4",
  "FAQ Hub Hero Video.mp4",
  "ghaziabad-city.mp4",
  "mohali-city.mp4",
  "panchkula-city.mp4",
  "south-delhi-city.mp4",
  "Chandigarh Tricity Hero Desktop.mp4",
  "Case Studies Hero Video.mp4",
  "Blog Page Hero Video.mp4",
  "Property Management Hero Video.mp4",
  "Market Insights Hero Video.mp4",
  "faridabad-city.mp4",
  "Homepage Hero Video Desktop.mp4",
  "Vedhara Group Delhi NCR Rent Page Video.mp4",
  "noida-city.mp4",
  "Success Stories Hero Video.mp4",
  "Vedhara Group Delhi NCR NRI Desk Page Video.mp4",
  "Vedhara Group Gurgaon Real Estate About Page Video.mp4",
  "Our Team Hero Video.mp4"
)

$failed = @()
$totalBefore = 0; $totalAfter = 0
foreach ($t in $targets) {
  $src = Join-Path $videos $t
  if (-not (Test-Path $src)) { Write-Host "SKIP (missing): $t"; continue }
  $out = Join-Path $stage $t
  $srcBitrate = & $bin\ffprobe.exe -v error -select_streams v:0 -show_entries stream=bit_rate -of csv=p=0 $src 2>$null
  $srcBitrate = "$srcBitrate".Trim()
  if ($srcBitrate -notmatch '^\d+$') { $srcBitrate = 3000000 }
  $targetK = [math]::Round([int]$srcBitrate * 0.7 / 1000)
  if ($targetK -lt 2200) { $targetK = 2200 }
  if ($targetK -gt 5200) { $targetK = 5200 }
  $maxrateK = [math]::Round($targetK * 1.25)
  $bufsizeK = $targetK * 2
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  & $bin\ffmpeg.exe -y -i $src -map 0:v:0 -map 0:a? -c:v h264_qsv -preset medium -rc_mode VBR -b:v ${targetK}k -maxrate ${maxrateK}k -bufsize ${bufsizeK}k -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k $out 2> $errlog
  $sw.Stop()
  if ($LASTEXITCODE -eq 0 -and (Test-Path $out) -and (Get-Item $out).Length -gt 1024) {
    $oldMB = [math]::Round((Get-Item $src).Length/1MB,1)
    $newMB = [math]::Round((Get-Item $out).Length/1MB,1)
    $totalBefore += $oldMB; $totalAfter += $newMB
    Write-Host "$t : $oldMB MB -> $newMB MB (saved $([math]::Round(($oldMB-$newMB)/$oldMB*100,0))%) in $([math]::Round($sw.Elapsed.TotalSeconds,0))s"
  } else {
    $failed += $t
    $err = if (Test-Path $errlog) { (Get-Content $errlog -Raw).Trim() } else { "" }
    Write-Host "ENCODE FAILED: $t (exit $LASTEXITCODE) $err"
  }
}
Write-Host "=================================================="
Write-Host "TOTAL targets: $($targets.Count) | Failed: $($failed.Count)"
Write-Host "Combined: $([math]::Round($totalBefore,1)) MB -> $([math]::Round($totalAfter,1)) MB (saved $([math]::Round(($totalBefore-$totalAfter)/$totalBefore*100,0))%)"
if ($failed.Count -gt 0) { Write-Host "FAILED LIST: $($failed -join ', ')" }
Write-Host "Staged files ready in: $stage"
