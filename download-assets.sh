#!/bin/bash

# AntarYog Foundation - Hybrid Asset Download Script
# Discovers and downloads assets from AntarYog website + teachable CDN
# Usage: ./download-assets.sh [--force] [--skip-images] [--skip-css] [--skip-fonts] [--dry-run] [--help]

# ============================================================================
# COLOR DEFINITIONS & CONFIG
# ============================================================================

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

WEBSITE_URL="https://learn.antaryogfoundation.in"
ASSETS_DIR="assets"
MANIFEST_FILE="$ASSETS_DIR/.manifest.txt"
FAILED_LOG="$ASSETS_DIR/.failed.txt"

# ============================================================================
# CLI FLAGS
# ============================================================================

FORCE_DOWNLOAD=false
SKIP_IMAGES=false
SKIP_CSS=false
SKIP_FONTS=false
DRY_RUN=false

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

show_usage() {
    cat << 'EOF'
Usage: ./download-assets.sh [OPTIONS]

Options:
  -f, --force          Force re-download existing files
  --skip-images        Skip downloading images
  --skip-css           Skip downloading CSS files
  --skip-fonts         Skip downloading fonts
  --dry-run            Show what would be downloaded without downloading
  -h, --help           Show this help message

Examples:
  ./download-assets.sh                    # Download all asset types
  ./download-assets.sh --force            # Re-download everything
  ./download-assets.sh --dry-run          # Show what would be downloaded
  ./download-assets.sh --skip-fonts       # Skip font downloads

EOF
}

parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -f|--force)
                FORCE_DOWNLOAD=true
                shift
                ;;
            --skip-images)
                SKIP_IMAGES=true
                shift
                ;;
            --skip-css)
                SKIP_CSS=true
                shift
                ;;
            --skip-fonts)
                SKIP_FONTS=true
                shift
                ;;
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            -h|--help)
                show_usage
                exit 0
                ;;
            *)
                echo -e "${RED}✗ Unknown option: $1${NC}"
                show_usage
                exit 1
                ;;
        esac
    done
}

log_section() {
    echo ""
    echo "=========================================="
    echo "$1"
    echo "=========================================="
    echo ""
}

log_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

log_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

log_error() {
    echo -e "${RED}✗ $1${NC}"
}

# ============================================================================
# ASSET DISCOVERY
# ============================================================================

discover_assets() {
    log_section "Asset Discovery"

    log_info "Fetching HTML from $WEBSITE_URL..."
    local html
    html=$(curl -sL "$WEBSITE_URL" --max-time 30 2>&1) || {
        log_error "Failed to fetch website"
        return 1
    }

    if [[ -z "$html" ]]; then
        log_error "No HTML content received"
        return 1
    fi

    log_info "Extracting asset URLs..."

    # Extract and deduplicate image URLs
    local images
    images=$(echo "$html" | grep -oE 'https://uploads\.teachablecdn\.com/[^"]*\.(png|jpg|jpeg)' | sort -u 2>/dev/null || true)

    # Extract CSS URLs
    local css_files
    css_files=$(echo "$html" | grep -oE 'https://fedora\.teachablecdn\.com/[^"]*\.css' | sort -u 2>/dev/null || true)

    # Extract font URLs from @font-face declarations
    local fonts
    fonts=$(echo "$html" | grep -oE 'https://assets\.teachablecdn\.com/[^")*]*\.(woff2|woff|ttf|otf)' | sort -u 2>/dev/null || true)

    local image_count=0
    local css_count=0
    local font_count=0

    [[ -n "$images" ]] && image_count=$(echo "$images" | grep -c "." 2>/dev/null || echo 0)
    [[ -n "$css_files" ]] && css_count=$(echo "$css_files" | grep -c "." 2>/dev/null || echo 0)
    [[ -n "$fonts" ]] && font_count=$(echo "$fonts" | grep -c "." 2>/dev/null || echo 0)

    log_success "Asset discovery complete"
    echo "  Images found:  $image_count"
    echo "  CSS files:     $css_count"
    echo "  Fonts found:   $font_count"
    echo "  Total assets:  $(( (image_count + css_count + font_count) ))"

    # Return results via global arrays
    DISCOVERED_IMAGES=()
    DISCOVERED_CSS=()
    DISCOVERED_FONTS=()

    while IFS= read -r line; do
        [[ -n "$line" ]] && DISCOVERED_IMAGES+=("$line")
    done <<< "$images" || true

    while IFS= read -r line; do
        [[ -n "$line" ]] && DISCOVERED_CSS+=("$line")
    done <<< "$css_files" || true

    while IFS= read -r line; do
        [[ -n "$line" ]] && DISCOVERED_FONTS+=("$line")
    done <<< "$fonts" || true

    return 0
}

# ============================================================================
# ASSET CATEGORIZATION
# ============================================================================

categorize_image() {
    local filename=$1

    if [[ "$filename" =~ [Ll]ogo|[Ff]avicon ]]; then
        echo "images/logo"
    elif [[ "$filename" =~ [Aa]charya|[Gg]uru|page\+18 ]]; then
        echo "images/founder"
    elif [[ "$filename" =~ page\+3|page\+4|page\+5 ]]; then
        echo "images/programs"
    elif [[ "$filename" =~ page\+10|page\+11|page\+12 ]]; then
        echo "images/events"
    elif [[ "$filename" =~ collage|page\+14|page\+15|page\+19|page\+20 ]]; then
        echo "images/gallery"
    else
        echo "images/visuals"
    fi
}

# ============================================================================
# DOWNLOAD FUNCTIONS
# ============================================================================

download_asset() {
    local url=$1
    local output=$2
    local description=$3
    local skip_if_exists=${4:-true}

    # Skip if file exists and not forcing
    if [[ -f "$output" ]] && [[ "$skip_if_exists" == true ]] && [[ "$FORCE_DOWNLOAD" != true ]]; then
        return 2  # Return code 2 means "skipped"
    fi

    # Create parent directories
    mkdir -p "$(dirname "$output")"

    # Download with timeout
    if curl -sL -o "$output" "$url" --max-time 60 2>/dev/null; then
        if [[ -f "$output" ]] && [[ -s "$output" ]]; then
            return 0  # Success
        else
            rm -f "$output"
            return 1  # Failed
        fi
    else
        rm -f "$output"
        return 1  # Failed
    fi
}

download_with_retry() {
    local url=$1
    local output=$2
    local description=$3
    local max_retries=3
    local retry=0

    while [[ $retry -lt $max_retries ]]; do
        download_asset "$url" "$output" "$description"
        local result=$?

        if [[ $result -eq 0 ]]; then
            return 0  # Success
        elif [[ $result -eq 2 ]]; then
            return 2  # Skipped
        fi

        retry=$((retry + 1))
        if [[ $retry -lt $max_retries ]]; then
            local wait_time=$((5 * retry))
            log_warning "Retry $retry/$max_retries in ${wait_time}s..."
            sleep "$wait_time"
        fi
    done

    return 1  # Failed after retries
}

validate_downloaded_file() {
    local filepath=$1
    local expected_type=$2

    if [[ ! -f "$filepath" ]]; then
        return 1
    fi

    local mime_type
    mime_type=$(file -b --mime-type "$filepath" 2>/dev/null || echo "unknown")

    case "$expected_type" in
        image)
            if [[ "$mime_type" =~ ^image/ ]]; then
                return 0
            fi
            ;;
        css)
            if [[ "$mime_type" == "text/plain" ]] || [[ "$mime_type" == "text/css" ]]; then
                return 0
            fi
            ;;
        font)
            if [[ "$mime_type" =~ font|OpenType|TrueType ]]; then
                return 0
            fi
            ;;
    esac

    return 1
}

# ============================================================================
# PRESERVATION OF EXISTING ASSETS
# ============================================================================

preserve_existing_assets() {
    log_section "Checking Existing Assets"

    local preserved=0
    local total=5

    declare -a EXISTING_ASSETS=(
        "assets/logo-antaryog.png"
        "assets/founder/acharya-upendra-ji-portrait.jpg"
        "assets/visuals/antar-yog-overview.jpg"
        "assets/founder/acharya-upendra-ji-alt.jpg"
        "assets/programs/gurukul-temple.jpg"
    )

    for asset in "${EXISTING_ASSETS[@]}"; do
        if [[ -f "$asset" ]]; then
            log_success "Preserved: $asset"
            ((preserved++))
        fi
    done

    echo "Preservation status: $preserved/$total existing assets"
}

# ============================================================================
# MANIFEST MANAGEMENT
# ============================================================================

create_manifest() {
    log_section "Creating Asset Manifest"

    > "$FAILED_LOG"

    {
        echo "# AntarYog Asset Manifest"
        echo "# Generated: $(date)"
        echo "# Source: $WEBSITE_URL"
        echo ""
        echo "## Downloaded Assets"
        echo ""
        find "$ASSETS_DIR" -type f ! -name ".manifest.txt" ! -name ".failed.txt" | sort
        echo ""
        echo "## Summary"
        echo "Total files: $(find "$ASSETS_DIR" -type f ! -name ".manifest.txt" ! -name ".failed.txt" | wc -l)"
        echo "Generated: $(date)"
    } > "$MANIFEST_FILE"

    log_success "Manifest created: $MANIFEST_FILE"
}

# ============================================================================
# ASSET DOWNLOAD ORCHESTRATION
# ============================================================================

download_all_images() {
    if [[ "$SKIP_IMAGES" == true ]]; then
        log_warning "Skipping image downloads (--skip-images)"
        return
    fi

    if [[ ${#DISCOVERED_IMAGES[@]} -eq 0 ]]; then
        log_warning "No images discovered"
        return
    fi

    log_section "Downloading Images"

    local current=0
    local total=${#DISCOVERED_IMAGES[@]}
    local success=0
    local skipped=0
    local failed=0

    for url in "${DISCOVERED_IMAGES[@]}"; do
        current=$((current + 1))

        # Extract filename
        local filename=$(basename "$url" | sed 's/?.*$//')

        # Determine output directory
        local category=$(categorize_image "$filename")
        local output="$ASSETS_DIR/$category/$filename"

        echo "[$current/$total] Downloading: $filename"

        if [[ "$DRY_RUN" == true ]]; then
            echo "  → Would save to: $output"
        else
            download_with_retry "$url" "$output" "$filename"
            local result=$?

            if [[ $result -eq 0 ]]; then
                local size=$(du -h "$output" 2>/dev/null | cut -f1)
                log_success "Downloaded ($size)"
                ((success++))
            elif [[ $result -eq 2 ]]; then
                log_info "Skipped (already exists)"
                ((skipped++))
            else
                log_error "Failed"
                echo "$url" >> "$FAILED_LOG"
                ((failed++))
            fi
        fi
    done

    if [[ "$DRY_RUN" != true ]]; then
        echo ""
        echo "Image download summary:"
        echo "  Successful: $success"
        echo "  Skipped:    $skipped"
        echo "  Failed:     $failed"
    fi
}

download_all_css() {
    if [[ "$SKIP_CSS" == true ]]; then
        log_warning "Skipping CSS downloads (--skip-css)"
        return
    fi

    if [[ ${#DISCOVERED_CSS[@]} -eq 0 ]]; then
        log_warning "No CSS files discovered"
        return
    fi

    log_section "Downloading CSS Files"

    local current=0
    local total=${#DISCOVERED_CSS[@]}
    local success=0
    local skipped=0
    local failed=0

    for url in "${DISCOVERED_CSS[@]}"; do
        current=$((current + 1))
        local filename=$(basename "$url" | sed 's/?.*$//')
        local output="$ASSETS_DIR/css/teachable/$filename"

        echo "[$current/$total] Downloading: $filename"

        if [[ "$DRY_RUN" == true ]]; then
            echo "  → Would save to: $output"
        else
            download_with_retry "$url" "$output" "$filename"
            local result=$?

            if [[ $result -eq 0 ]]; then
                log_success "Downloaded"
                ((success++))
            elif [[ $result -eq 2 ]]; then
                log_info "Skipped (already exists)"
                ((skipped++))
            else
                log_error "Failed"
                echo "$url" >> "$FAILED_LOG"
                ((failed++))
            fi
        fi
    done

    if [[ "$DRY_RUN" != true ]]; then
        echo ""
        echo "CSS download summary:"
        echo "  Successful: $success"
        echo "  Skipped:    $skipped"
        echo "  Failed:     $failed"
    fi
}

download_all_fonts() {
    if [[ "$SKIP_FONTS" == true ]]; then
        log_warning "Skipping font downloads (--skip-fonts)"
        return
    fi

    if [[ ${#DISCOVERED_FONTS[@]} -eq 0 ]]; then
        log_warning "No fonts discovered"
        return
    fi

    log_section "Downloading Fonts"

    local current=0
    local total=${#DISCOVERED_FONTS[@]}
    local success=0
    local skipped=0
    local failed=0

    for url in "${DISCOVERED_FONTS[@]}"; do
        current=$((current + 1))
        local filename=$(basename "$url" | sed 's/?.*$//')
        local output="$ASSETS_DIR/fonts/metropolis/$filename"

        echo "[$current/$total] Downloading: $filename"

        if [[ "$DRY_RUN" == true ]]; then
            echo "  → Would save to: $output"
        else
            download_with_retry "$url" "$output" "$filename"
            local result=$?

            if [[ $result -eq 0 ]]; then
                log_success "Downloaded"
                ((success++))
            elif [[ $result -eq 2 ]]; then
                log_info "Skipped (already exists)"
                ((skipped++))
            else
                log_error "Failed"
                echo "$url" >> "$FAILED_LOG"
                ((failed++))
            fi
        fi
    done

    if [[ "$DRY_RUN" != true ]]; then
        echo ""
        echo "Font download summary:"
        echo "  Successful: $success"
        echo "  Skipped:    $skipped"
        echo "  Failed:     $failed"
    fi
}

# ============================================================================
# VERIFICATION
# ============================================================================

verify_downloads() {
    log_section "Verifying Downloads"

    local empty_files=()
    local total_files=0
    local valid_files=0

    while IFS= read -r filepath; do
        [[ -z "$filepath" ]] && continue

        ((total_files++))

        # Check for empty files
        if [[ ! -s "$filepath" ]]; then
            empty_files+=("$filepath")
            continue
        fi

        # Verify MIME type based on extension
        local ext="${filepath##*.}"
        case "$ext" in
            png|jpg|jpeg)
                if validate_downloaded_file "$filepath" "image"; then
                    ((valid_files++))
                fi
                ;;
            css)
                if validate_downloaded_file "$filepath" "css"; then
                    ((valid_files++))
                fi
                ;;
            woff2|woff|ttf|otf)
                if validate_downloaded_file "$filepath" "font"; then
                    ((valid_files++))
                fi
                ;;
            *)
                ((valid_files++))
                ;;
        esac
    done < <(find "$ASSETS_DIR" -type f ! -name ".manifest.txt" ! -name ".failed.txt")

    echo "Total files verified: $total_files"
    echo "Valid files: $valid_files"

    if [[ ${#empty_files[@]} -gt 0 ]]; then
        log_warning "Found ${#empty_files[@]} empty files:"
        for f in "${empty_files[@]}"; do
            echo "  - $f"
            rm -f "$f"
        done
    fi
}

# ============================================================================
# REPORTING
# ============================================================================

generate_summary() {
    log_section "Download Summary"

    if [[ "$DRY_RUN" == true ]]; then
        echo -e "${YELLOW}DRY RUN MODE - No files were actually downloaded${NC}"
        echo ""
    fi

    local total_assets=$(find "$ASSETS_DIR" -type f ! -name ".manifest.txt" ! -name ".failed.txt" 2>/dev/null | wc -l)
    local total_size=$(du -sh "$ASSETS_DIR" 2>/dev/null | cut -f1)

    echo "Total assets: $total_assets"
    echo "Total disk usage: $total_size"
    echo ""

    # Directory breakdown
    echo "Assets by category:"
    for dir in images/logo images/founder images/programs images/events images/gallery images/visuals css/teachable fonts/metropolis; do
        if [[ -d "$ASSETS_DIR/$dir" ]]; then
            local count=$(find "$ASSETS_DIR/$dir" -type f 2>/dev/null | wc -l)
            if [[ $count -gt 0 ]]; then
                echo "  $dir: $count files"
            fi
        fi
    done

    echo ""

    # Check for failed downloads
    if [[ -f "$FAILED_LOG" ]] && [[ -s "$FAILED_LOG" ]]; then
        local failed_count=$(wc -l < "$FAILED_LOG")
        log_error "Failed downloads: $failed_count"
        echo ""
        echo "To retry failed downloads:"
        echo "  ./download-assets.sh --force"
    else
        log_success "All downloads completed successfully"
    fi
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

main() {
    parse_arguments "$@"

    echo "=========================================="
    echo "AntarYog Asset Download Script (Hybrid)"
    echo "=========================================="

    if [[ "$DRY_RUN" == true ]]; then
        echo -e "${YELLOW}DRY RUN MODE${NC}"
    fi

    # Create base directory
    mkdir -p "$ASSETS_DIR"

    # Preserve existing assets
    preserve_existing_assets

    # Discover assets
    discover_assets || {
        log_error "Asset discovery failed"
        exit 1
    }

    # Check for updates
    if [[ -f "$MANIFEST_FILE" ]]; then
        log_section "Checking for Updates"
        local prev_count=$(grep "^Total files:" "$MANIFEST_FILE" | tail -1 | grep -oE '[0-9]+' || echo "0")
        local current_count=$((${#DISCOVERED_IMAGES[@]} + ${#DISCOVERED_CSS[@]} + ${#DISCOVERED_FONTS[@]}))

        if [[ $current_count -gt $prev_count ]]; then
            log_warning "New assets available! Previous: $prev_count, Current: $current_count"
        fi
    fi

    # Show what would be downloaded in dry-run mode
    if [[ "$DRY_RUN" == true ]]; then
        log_section "Dry Run - URLs to Download"

        if [[ "$SKIP_IMAGES" != true ]] && [[ ${#DISCOVERED_IMAGES[@]} -gt 0 ]]; then
            echo "Images (${#DISCOVERED_IMAGES[@]}):"
            for url in "${DISCOVERED_IMAGES[@]:0:5}"; do
                echo "  $url"
            done
            [[ ${#DISCOVERED_IMAGES[@]} -gt 5 ]] && echo "  ... and $((${#DISCOVERED_IMAGES[@]} - 5)) more"
            echo ""
        fi

        if [[ "$SKIP_CSS" != true ]] && [[ ${#DISCOVERED_CSS[@]} -gt 0 ]]; then
            echo "CSS Files (${#DISCOVERED_CSS[@]}):"
            for url in "${DISCOVERED_CSS[@]}"; do
                echo "  $url"
            done
            echo ""
        fi

        if [[ "$SKIP_FONTS" != true ]] && [[ ${#DISCOVERED_FONTS[@]} -gt 0 ]]; then
            echo "Fonts (${#DISCOVERED_FONTS[@]}):"
            for url in "${DISCOVERED_FONTS[@]:0:5}"; do
                echo "  $url"
            done
            [[ ${#DISCOVERED_FONTS[@]} -gt 5 ]] && echo "  ... and $((${#DISCOVERED_FONTS[@]} - 5)) more"
            echo ""
        fi
    else
        # Download all assets
        download_all_images
        download_all_css
        download_all_fonts

        # Create manifest
        create_manifest

        # Verify downloads
        verify_downloads
    fi

    # Generate summary
    generate_summary

    log_section "Complete"
    echo "✓ Asset download script finished"

    if [[ "$DRY_RUN" != true ]]; then
        log_info "Run './download-assets.sh --force' to re-download all assets"
        log_info "Run './download-assets.sh --dry-run' to preview without downloading"
    fi
}

# Run main
main "$@"
