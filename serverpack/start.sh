#!/bin/bash
# GregTech: New Frontier — server installer / launcher.
# Adapted from GregTech-Modern-Community-Pack/serverpack/start.sh.

FORGE_VERSION="1.20.1-47.4.10"
# Mods whose authors forbid third-party distribution: the CurseForge API refuses to
# hand them to packwiz, so fetch them straight from the CDN. Placing the jar with the
# pinned filename makes packwiz-installer skip it. Keep in step with mods/*.pw.toml.
MANUAL_JARS="findme-3.2.3-forge.jar|https://mediafilez.forgecdn.net/files/7069/249/findme-3.2.3-forge.jar
Structory_1.20.x_v1.3.5.jar|https://mediafilez.forgecdn.net/files/5351/581/Structory_1.20.x_v1.3.5.jar"

# Override PACK_TAG to install a different release, or PACK_URI to point at an
# arbitrary pack.toml (a commit sha, or `packwiz serve` on localhost).
PACK_TAG="${PACK_TAG:-v0.5.0}"
PACK_URI="${PACK_URI:-https://raw.githubusercontent.com/gtnewfrontier/gt-new-frontier-modpack/refs/tags/$PACK_TAG/pack.toml}"

set -e

if ! command -v java >/dev/null 2>&1; then
    echo "Java 17 must be installed"
    exit 1
fi

# Download $1 to $2.
download() {
    if command -v curl >/dev/null 2>&1; then
        curl -fL "$1" -o "$2"
    elif command -v wget >/dev/null 2>&1; then
        wget -O "$2" "$1"
    else
        echo "Neither curl nor wget found. Please install either curl or wget."
        exit 1
    fi
}

# Install Forge
if [ ! -f "forge-$FORGE_VERSION-installer.jar" ]; then
    download "https://maven.minecraftforge.net/net/minecraftforge/forge/$FORGE_VERSION/forge-$FORGE_VERSION-installer.jar" "forge-$FORGE_VERSION-installer.jar"
    java -jar "forge-$FORGE_VERSION-installer.jar" --installServer
    rm -f run.sh run.bat
fi

mkdir -p mods
echo "$MANUAL_JARS" | while IFS='|' read -r jar url; do
    [ -f "mods/$jar" ] || download "$url" "mods/$jar"
done

if [ ! -f packwiz-installer-bootstrap.jar ]; then
    download "https://github.com/packwiz/packwiz-installer-bootstrap/releases/download/v0.0.3/packwiz-installer-bootstrap.jar" "packwiz-installer-bootstrap.jar"
fi

java -jar packwiz-installer-bootstrap.jar -g -s server "$PACK_URI"

if [ ! -f eula.txt ] || grep -q '^eula=false' eula.txt; then
    echo "You must agree to the Minecraft EULA (https://aka.ms/MinecraftEULA)."
    echo "Write 'eula=true' into eula.txt to accept it, then run this script again."
    echo "eula=false" > eula.txt
    exit 1
fi

java @user_jvm_args.txt "@libraries/net/minecraftforge/forge/$FORGE_VERSION/unix_args.txt" nogui "$@"
