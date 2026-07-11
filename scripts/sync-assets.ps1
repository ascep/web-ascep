param(
  [Parameter(Mandatory=$false)]
  [string]$R2Endpoint,
  [Parameter(Mandatory=$false)]
  [string]$AccessKeyId,
  [Parameter(Mandatory=$false)]
  [string]$SecretAccessKey,
  [Parameter(Mandatory=$false)]
  [string]$Bucket = "ascep-assets",
  [Parameter(Mandatory=$false)]
  [string]$SourceDir = (Join-Path (Split-Path $PSScriptRoot -Parent) "web\public"),
  [switch]$DryRun
)

if (-not $R2Endpoint) {
  $R2Endpoint = $env:R2_ENDPOINT
}
if (-not $AccessKeyId) { $AccessKeyId = $env:R2_ACCESS_KEY_ID }
if (-not $SecretAccessKey) { $SecretAccessKey = $env:R2_SECRET_ACCESS_KEY }

if (-not $R2Endpoint -or -not $AccessKeyId -or -not $SecretAccessKey) {
  Write-Host "ERROR: Missing R2 credentials. Provide via:" -ForegroundColor Red
  Write-Host "  Parameters: -R2Endpoint ... -AccessKeyId ... -SecretAccessKey ..." -ForegroundColor Yellow
  Write-Host "  Env vars:    R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY" -ForegroundColor Yellow
  exit 1
}

$ErrorActionPreference = "Stop"

Write-Host "=== Sync Assets to Cloudflare R2 ===" -ForegroundColor Cyan
Write-Host "Bucket:   $Bucket"
Write-Host "Source:   $SourceDir"
Write-Host "Endpoint: $R2Endpoint"
Write-Host "Dry-run:  $DryRun"
Write-Host ""

# Check if rclone is available
$rclonePath = (Get-Command "rclone" -ErrorAction SilentlyContinue).Source
if (-not $rclonePath) {
  Write-Host "rclone not found. Attempting to install..." -ForegroundColor Yellow

  $installers = @(
    { winget install rclone },
    { choco install rclone },
    { scoop install rclone }
  )
  $installed = $false
  foreach ($cmd in $installers) {
    $exe = $cmd.ToString().Split()[0].TrimStart('{').TrimStart('.')
    if (Get-Command $exe -ErrorAction SilentlyContinue) {
      & $cmd
      $installed = $true
      break
    }
  }

  if (-not $installed) {
    $rclonePath = (Get-Command "rclone" -ErrorAction SilentlyContinue).Source
  }

  if (-not $rclonePath) {
    Write-Host "ERROR: Install rclone from https://rclone.org/downloads/" -ForegroundColor Red
    exit 1
  }
}

# Configure rclone remote via env vars (no persistent config needed)
$env:RCLONE_CONFIG_R2_TYPE = "s3"
$env:RCLONE_CONFIG_R2_PROVIDER = "Cloudflare"
$env:RCLONE_CONFIG_R2_ACCESS_KEY_ID = $AccessKeyId
$env:RCLONE_CONFIG_R2_SECRET_ACCESS_KEY = $SecretAccessKey
$env:RCLONE_CONFIG_R2_ENDPOINT = $R2Endpoint
$env:RCLONE_CONFIG_R2_ACL = "public-read"

$rcloneArgs = @("copy", $SourceDir, "r2:$Bucket", "--progress", "--create-empty-dirs")

if ($DryRun) {
  $rcloneArgs += "--dry-run"
}

Write-Host "rclone $($rcloneArgs -join ' ')`n"
& $rclonePath @rcloneArgs

Write-Host ""
Write-Host "=== Sync complete ===" -ForegroundColor Green
Write-Host "Public URL: https://$Bucket.$($R2Endpoint -replace 'https://','').r2.dev (or your custom domain)"
Write-Host "Set ASSETS_URL to that URL in Vercel dashboard." -ForegroundColor Cyan
