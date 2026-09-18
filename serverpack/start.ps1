# GregTech: New Frontier — server installer / launcher.
# Adapted from GregTech-Modern-Community-Pack/serverpack/start.ps1.
# Works on Windows PowerShell 5.1 and PowerShell 7+.

$ErrorActionPreference = "Stop"

$FORGE_VERSION = "1.20.1-47.4.10"
# Mods whose authors forbid third-party distribution: the CurseForge API refuses to
# hand them to packwiz, so fetch them straight from the CDN. Placing the jar with the
# pinned filename makes packwiz-installer skip it. Keep in step with mods/*.pw.toml.
$MANUAL_JARS = @{
  "findme-3.2.3-forge.jar"      = "https://mediafilez.forgecdn.net/files/7069/249/findme-3.2.3-forge.jar"
  "Structory_1.20.x_v1.3.5.jar" = "https://mediafilez.forgecdn.net/files/5351/581/Structory_1.20.x_v1.3.5.jar"
}

# Override PACK_TAG to install a different release, or PACK_URI to point at an
# arbitrary pack.toml (a commit sha, or `packwiz serve` on localhost).
if (-not $env:PACK_TAG) { $env:PACK_TAG = "v0.5.1" }
if ($env:PACK_URI) {
  $PACK_URI = $env:PACK_URI
} else {
  $PACK_URI = "https://raw.githubusercontent.com/gtnewfrontier/gt-new-frontier-modpack/refs/tags/$($env:PACK_TAG)/pack.toml"
}

if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
  Write-Host -ForegroundColor Red "Java 17 was not detected on this system."
  Write-Host -ForegroundColor Green "Install it with: winget install -e --id Microsoft.OpenJDK.17"
  exit 1
}

# Install Forge
if (-not (Test-Path "forge-$FORGE_VERSION-installer.jar")) {
  Write-Host -ForegroundColor Blue "Fetching Forge $FORGE_VERSION..."
  Get-ChildItem -Path "." -Filter "forge-*-installer.jar" | Remove-Item
  Invoke-WebRequest -Uri "https://maven.minecraftforge.net/net/minecraftforge/forge/$FORGE_VERSION/forge-$FORGE_VERSION-installer.jar" -OutFile "forge-$FORGE_VERSION-installer.jar"

  Write-Host -ForegroundColor Blue "Installing Forge as a server, this takes a few minutes."
  java -jar "forge-$FORGE_VERSION-installer.jar" --installServer
  if ($LASTEXITCODE -ne 0) {
    Write-Host -ForegroundColor Red "Forge installation failed with exit code $LASTEXITCODE."
    exit 1
  }
  Remove-Item "run.sh", "run.bat" -Force -ErrorAction SilentlyContinue
}

New-Item -ItemType Directory -Path mods -Force | Out-Null
foreach ($jar in $MANUAL_JARS.Keys) {
  if (-not (Test-Path "mods\$jar")) {
    Write-Host -ForegroundColor Blue "Fetching $jar..."
    Invoke-WebRequest -Uri $MANUAL_JARS[$jar] -OutFile "mods\$jar"
  }
}

if (-not (Test-Path "packwiz-installer-bootstrap.jar")) {
  Write-Host -ForegroundColor Blue "Fetching packwiz-installer-bootstrap..."
  Invoke-WebRequest -Uri "https://github.com/packwiz/packwiz-installer-bootstrap/releases/download/v0.0.3/packwiz-installer-bootstrap.jar" -OutFile "packwiz-installer-bootstrap.jar"
}

Write-Host -ForegroundColor Magenta "Updating the server pack from $PACK_URI"
java -jar "packwiz-installer-bootstrap.jar" -g -s server $PACK_URI
if ($LASTEXITCODE -ne 0) {
  Write-Host -ForegroundColor Red "Server installation/update failed with exit code $LASTEXITCODE."
  exit 1
}

if (-not (Test-Path "eula.txt") -or (Select-String -Path eula.txt -Pattern '^eula=false' -Quiet)) {
  Write-Host -ForegroundColor Yellow "You must agree to the Minecraft EULA (https://aka.ms/MinecraftEULA)."
  Write-Host -ForegroundColor Yellow "Write 'eula=true' into eula.txt to accept it, then run this script again."
  Set-Content -Path "eula.txt" -Value "eula=false"
  exit 1
}

# $IsWindows is undefined on Windows PowerShell 5.1, which is Windows-only anyway.
if ($IsWindows -ne $false) { $PLATFORM_ARGS = "win_args.txt" } else { $PLATFORM_ARGS = "unix_args.txt" }

Write-Host "Running the server..."
java "@user_jvm_args.txt" "@libraries/net/minecraftforge/forge/$FORGE_VERSION/$PLATFORM_ARGS" nogui @args
