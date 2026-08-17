# Verify compressed hero videos against git originals (commit BEFORE the compression push)
# Compares resolution, framerate, duration, and audio track for every video in public/videos.
# Usage: powershell -ExecutionPolicy Bypass -File scripts\verify-video-integrity.ps1 [-Ref 748bd0a]
param([string]$Ref = "748bd0a")

$ErrorActionPreference = "Continue"
$ffprobe = "C:\Users\sharma.mohit\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffprobe.exe"
if (-not (Test-Path $ffprobe)) { Write-Error "ffprobe not found"; exit 1 }

$tmp = Join-Path $env:TEMP "vedhara-originals"
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

# Extract originals from git as raw bytes (git archive avoids PowerShell text-redirect corruption)
$zip = Join-Path $tmp "originals.zip"
Remove-Item -Force $zip -ErrorAction SilentlyContinue
git archive --format=zip -o $zip "$Ref" public/videos
if (-not (Test-Path $zip)) { Write-Error "git archive failed for ref $Ref"; exit 1 }
Expand-Archive -Force -Path $zip -DestinationPath $tmp | Out-Null

function Probe($path) {
  if (-not (Test-Path $path)) { return $null }
  $j = & $ffprobe -v error -show_entries format=duration,size,bit_rate -show_entries stream=codec_type,codec_name,width,height,r_frame_rate -of json $path 2>$null | ConvertFrom-Json
  $v = @($j.streams) | Where-Object codec_type -eq "video" | Select-Object -First 1
  $a = @($j.streams) | Where-Object codec_type -eq "audio" | Select-Object -First 1
  $fps = 0
  if ($v.r_frame_rate -and $v.r_frame_rate -match "/") {
    $p = $v.r_frame_rate -split "/"
    if ([double]$p[1] -gt 0) { $fps = [math]::Round([double]$p[0] / [double]$p[1], 2) }
  }
  [pscustomobject]@{
    Res    = "$($v.width)x$($v.height)"
    FPS    = $fps
    Dur    = [math]::Round([double]$j.format.duration, 2)
    Audio  = if ($a) { $a.codec_name } else { "none" }
    BitK   = [math]::Round([double]$j.format.bit_rate / 1000, 0)
    SizeMB = [math]::Round([double]$j.format.size / 1MB, 2)
  }
}

$rows = foreach ($f in Get-ChildItem "public\videos\*.mp4") {
  $origPath = Join-Path $tmp "public\videos\$($f.Name)"
  $o = Probe $origPath
  $c = Probe $f.FullName
  if (-not $o) { Write-Warning "No original found for $($f.Name)"; continue }

  $flags = @()
  if ($o.Res -ne $c.Res)   { $flags += "RES!" }
  if ($o.FPS -ne $c.FPS)   { $flags += "FPS!" }
  if ([math]::Abs($o.Dur - $c.Dur) -gt 0.5) { $flags += "DUR!" }
  if ($o.Audio -ne $c.Audio) { $flags += "AUDIO!" }
  if ($c.SizeMB -gt $o.SizeMB) { $flags += "BIGGER!" }

  $saved = if ($o.SizeMB -gt 0) { [math]::Round(($o.SizeMB - $c.SizeMB) / $o.SizeMB * 100, 0) } else { 0 }
  [pscustomobject]@{
    File   = ($f.Name -replace "\.mp4$", "")
    OrigMB = $o.SizeMB
    NewMB  = $c.SizeMB
    Save   = "$saved%"
    Res    = $c.Res
    FPS    = $c.FPS
    Dur    = $c.Dur
    Audio  = $c.Audio
    OAu    = $o.Audio
    Flags  = ($flags -join ",")
  }
}

$rows | Sort-Object NewMB -Descending | Format-Table -AutoSize | Out-String -Width 200 | Write-Host

$bad = @($rows | Where-Object { $_.Flags })
Write-Host ""
Write-Host ("TOTAL COMPARED: {0}   ISSUES: {1}" -f $rows.Count, $bad.Count)
if ($bad.Count) {
  Write-Host "--- ISSUES ---"
  $bad | Format-Table File, Flags, Res, FPS, Dur, Audio -AutoSize | Out-String -Width 200 | Write-Host
}
