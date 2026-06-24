param(
  [string]$Dir = "public/images/six-rides"
)

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$dirPath = Join-Path $root $Dir

function Test-RemovablePixel([int]$r, [int]$g, [int]$b) {
  $maxDiff = [Math]::Max(
    [Math]::Abs($r - $g),
    [Math]::Max([Math]::Abs($g - $b), [Math]::Abs($r - $b))
  )
  $lum = 0.299 * $r + 0.587 * $g + 0.114 * $b
  return ($lum -ge 168 -and $maxDiff -le 24)
}

Get-ChildItem -Path $dirPath -Filter "*.png" | ForEach-Object {
  $srcPath = $_.FullName
  $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
  $w = $bmp.Width
  $h = $bmp.Height
  $new = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

  for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
      $c = $bmp.GetPixel($x, $y)
      if (Test-RemovablePixel $c.R $c.G $c.B) {
        $new.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      } else {
        $new.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
      }
    }
  }

  $tmpPath = "$srcPath.tmp.png"
  $new.Save($tmpPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  $new.Dispose()
  Move-Item -Path $tmpPath -Destination $srcPath -Force
  Write-Host "Processed $($_.Name)"
}
