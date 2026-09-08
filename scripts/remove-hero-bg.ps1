param(
  [string]$Src = "public/images/hero-man-phone.png",
  [string]$Dst = "public/images/hero-man-cutout.png"
)

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root $Src
$dstPath = Join-Path $root $Dst

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $bmp.Width
$h = $bmp.Height
$new = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

function Test-BackgroundPixel([int]$r, [int]$g, [int]$b) {
  return ($r -le 20 -and $g -le 20 -and $b -le 20)
}

$remove = New-Object 'bool[,]' $w, $h
$queue = [System.Collections.Generic.Queue[object]]::new()

function Enqueue-IfBackground([int]$x, [int]$y) {
  if ($x -lt 0 -or $y -lt 0 -or $x -ge $w -or $y -ge $h) { return }
  if ($remove[$x, $y]) { return }
  $c = $bmp.GetPixel($x, $y)
  if (Test-BackgroundPixel $c.R $c.G $c.B) {
    $remove[$x, $y] = $true
    $queue.Enqueue([int[]]@($x, $y))
  }
}

for ($x = 0; $x -lt $w; $x++) {
  Enqueue-IfBackground $x 0
  Enqueue-IfBackground $x ($h - 1)
}
for ($y = 0; $y -lt $h; $y++) {
  Enqueue-IfBackground 0 $y
  Enqueue-IfBackground ($w - 1) $y
}

while ($queue.Count -gt 0) {
  $p = $queue.Dequeue()
  $x = $p[0]
  $y = $p[1]
  Enqueue-IfBackground ($x - 1) $y
  Enqueue-IfBackground ($x + 1) $y
  Enqueue-IfBackground $x ($y - 1)
  Enqueue-IfBackground $x ($y + 1)
}

for ($y = 0; $y -lt $h; $y++) {
  for ($x = 0; $x -lt $w; $x++) {
    if ($remove[$x, $y]) {
      $new.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
    } else {
      $c = $bmp.GetPixel($x, $y)
      $new.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
    }
  }
}

$new.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$new.Dispose()

Write-Host "Saved $dstPath ($w x $h)"
