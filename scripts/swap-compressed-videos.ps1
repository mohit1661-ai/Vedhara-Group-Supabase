# Swap the staged compressed hero videos into public/videos AND public/watch
# (byte-identical copies), and regenerate each watch thumbnail (1920x1080).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/swap-compressed-videos.ps1
$ErrorActionPreference = "Continue"
$bin = "C:\Users\sharma.mohit\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin"
$root = "D:\OneDrive - Tantranzm Technologies Pvt Ltd\Downloads\vedhara"
$videos = Join-Path $root "public\videos"
$watch  = Join-Path $root "public\watch"
$stage  = Join-Path $env:TEMP "vedhara-compress"
$errlog = Join-Path $env:TEMP "vedhara-ffmpeg-err.log"

$files = Get-ChildItem $stage -Filter *.mp4
Write-Host "Swapping $($files.Count) compressed videos..."
foreach ($f in $files) {
  $name = $f.Name
  # 1) overwrite public/videos
  Copy-Item $f.FullName (Join-Path $videos $name) -Force
  # 2) overwrite public/watch (byte-identical)
  Copy-Item $f.FullName (Join-Path $watch $name) -Force
  # 3) regenerate thumbnail from the NEW file (frame at ~1s, 1920x1080)
  $thumbBase = [System.IO.Path]::GetFileNameWithoutExtension($name)
  $thumb = Join-Path $watch ("thumb-" + $thumbBase + ".jpg")
  & $bin\ffmpeg.exe -y -ss 1 -i $f.FullName -vframes 1 -vf scale=1920:1080 -q:v 4 $thumb 2> $errlog
  $newMB = [math]::Round($f.Length/1MB,1)
  Write-Host "  $name -> $newMB MB (videos + watch + thumb)"
}
Write-Host "=================================================="
Write-Host "DONE. Total in public/videos:"
$total = (Get-ChildItem $videos -Filter *.mp4 | Measure-Object Length -Sum).Sum/1MB
Write-Host ("  {0:N1} MB" -f $total)
