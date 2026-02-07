#!/bin/bash

# AntarYog Foundation - Asset Download Script
# Downloads official assets from AntarYog website
# Run from project root: ./download-assets.sh

echo "=========================================="
echo "AntarYog Asset Download Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create asset directories
echo "Creating asset directories..."
mkdir -p assets/founder
mkdir -p assets/programs
mkdir -p assets/events
mkdir -p assets/visuals

echo -e "${GREEN}✓ Directories created${NC}"
echo ""

# Function to download with retry
download_asset() {
    local url=$1
    local output=$2
    local description=$3

    echo "Downloading: $description"
    echo "URL: $url"

    if curl -L -o "$output" "$url" 2>/dev/null; then
        if [ -f "$output" ]; then
            local size=$(du -h "$output" | cut -f1)
            echo -e "${GREEN}✓ Downloaded successfully ($size)${NC}"
            return 0
        else
            echo -e "${RED}✗ Download failed - file not created${NC}"
            return 1
        fi
    else
        echo -e "${RED}✗ Download failed${NC}"
        return 1
    fi
}

echo "=========================================="
echo "Downloading Official Assets"
echo "=========================================="
echo ""

# Download Logo
echo "[1/5] Logo (Primary)"
download_asset \
    "https://uploads.teachablecdn.com/attachments/QovrjdT3uJxrATBXapTA_AY_Teachable_Logo_v2.png" \
    "assets/logo-antaryog.png" \
    "AntarYog Foundation Logo"
echo ""

# Download Founder Portrait (Primary)
echo "[2/5] Acharya Upendra Ji Portrait (Primary)"
download_asset \
    "https://uploads.teachablecdn.com/attachments/cPKFQBF2RcuipMSVP1ox_Acharya+Ji-s+Photo.jpg" \
    "assets/founder/acharya-upendra-ji-portrait.jpg" \
    "Acharya Upendra Ji - Primary Portrait"
echo ""

# Download Antar Yog Overview
echo "[3/5] Antar Yog Overview Visual"
download_asset \
    "https://uploads.teachablecdn.com/attachments/WjBNf5CwRAWAwiJrWwaB_Guru+Brochure++page+3+Img+1.jpg" \
    "assets/visuals/antar-yog-overview.jpg" \
    "Antar Yog Overview Image"
echo ""

# Optional: Alternative Portrait
echo "[4/5] Acharya Portrait (Alternative) - Optional"
download_asset \
    "https://uploads.teachablecdn.com/attachments/jehlZ3xR1istadBAdX9I_Guru+Brochure++page+18+Img+2.jpg" \
    "assets/founder/acharya-upendra-ji-alt.jpg" \
    "Acharya Upendra Ji - Alternative Portrait"
echo ""

# Optional: Gurukul Temple Image
echo "[5/5] Gurukul Temple Image - Optional"
download_asset \
    "https://uploads.teachablecdn.com/attachments/GTZbpPkiTNCvYgdmBs40_Guru+Brochure++page+4+Img+1.jpg" \
    "assets/programs/gurukul-temple.jpg" \
    "Gurukul/Temple Visual"
echo ""

echo "=========================================="
echo "Download Summary"
echo "=========================================="
echo ""

# Check what was downloaded
downloaded=0
total=5

[ -f "assets/logo-antaryog.png" ] && ((downloaded++))
[ -f "assets/founder/acharya-upendra-ji-portrait.jpg" ] && ((downloaded++))
[ -f "assets/visuals/antar-yog-overview.jpg" ] && ((downloaded++))
[ -f "assets/founder/acharya-upendra-ji-alt.jpg" ] && ((downloaded++))
[ -f "assets/programs/gurukul-temple.jpg" ] && ((downloaded++))

echo -e "Successfully downloaded: ${GREEN}$downloaded/$total${NC} assets"
echo ""

# List downloaded files
if [ $downloaded -gt 0 ]; then
    echo "Downloaded files:"
    find assets -type f | sort
    echo ""
fi

echo "=========================================="
echo "Next Steps"
echo "=========================================="
echo ""
echo "✓ Official assets downloaded"
echo ""
echo "⏳ Still needed:"
echo "   1. Create white logo variant (from logo-antaryog.png)"
echo "   2. Source 6 program card images (800x500px)"
echo "   3. Source 3 event card images (800x500px)"
echo ""
echo "📚 See ASSET_MANIFEST.md for details"
echo ""
echo "To create white logo variant:"
echo "   - Open assets/logo-antaryog.png in image editor"
echo "   - Change all colors to white (#FFFFFF)"
echo "   - Maintain transparency"
echo "   - Save as assets/logo-antaryog-white.png"
echo ""

exit 0
