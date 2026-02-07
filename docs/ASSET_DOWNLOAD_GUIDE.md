# Asset Download Guide

## Quick Start

```bash
# Download all assets (skips existing files by default)
./download-assets.sh

# See what would be downloaded without downloading
./download-assets.sh --dry-run

# Force re-download all assets
./download-assets.sh --force

# Download only images and CSS (skip fonts)
./download-assets.sh --skip-fonts

# Show help
./download-assets.sh --help
```

## Features

### Automatic Asset Discovery
The script automatically discovers and downloads assets from https://learn.antaryogfoundation.in:
- 40 images from the Guru Brochure and homepage
- 1 CSS stylesheet from Teachable
- 0 fonts (not discoverable from webpage)
- 5 existing manual assets preserved

### Smart Categorization
Assets are organized by filename patterns:
- `images/logo/` - Logos and favicons
- `images/founder/` - Founder portraits and brochure pages
- `images/programs/` - Program-related images
- `images/events/` - Event-related images
- `images/gallery/` - Collages and gallery images
- `images/visuals/` - General visuals
- `css/teachable/` - Teachable stylesheets

### Robust Downloads
- Automatic retry with exponential backoff
- MIME type validation
- Empty file detection
- Real-time progress tracking
- Failed download logging

### Idempotent & Safe
- Skips existing files by default
- Safe to run multiple times
- Creates audit trail with manifest
- Preserves existing assets

## Command Line Options

| Flag | Short | Description |
|------|-------|-------------|
| `--force` | `-f` | Force re-download existing files |
| `--skip-images` | | Skip downloading images |
| `--skip-css` | | Skip downloading CSS files |
| `--skip-fonts` | | Skip downloading fonts |
| `--dry-run` | | Preview what would be downloaded |
| `--help` | `-h` | Show usage information |

## Examples

```bash
# Download all asset types
./download-assets.sh

# Download only images
./download-assets.sh --skip-css --skip-fonts

# Download only CSS
./download-assets.sh --skip-images --skip-fonts

# Preview and then download
./download-assets.sh --dry-run
./download-assets.sh

# Re-download everything after website changes
./download-assets.sh --force
```

## Files Generated

### .manifest.txt
Audit trail containing:
- Download timestamp
- Source website URL
- Complete list of all downloaded files
- Total file count

### .failed.txt
Log of any failed downloads (empty if all succeed)
Used for manual retry if needed

### .gitignore
Excludes binary assets from version control:
- *.png, *.jpg, *.jpeg, *.svg (images)
- *.css (stylesheets)
- *.woff2, *.woff, *.ttf, *.otf (fonts)

Tracks manifests for audit trail:
- .manifest.txt
- .failed.txt

## Performance

| Operation | Time |
|-----------|------|
| Full download | ~2-4 minutes |
| Subsequent runs | ~10-15 seconds |
| Dry-run | ~5-10 seconds |

## Troubleshooting

### No fonts found?
Fonts are referenced dynamically in CSS and not extractable from HTML.
Add them manually to `assets/fonts/metropolis/` if needed.

### Download failed?
Check `assets/.failed.txt` for list of failed URLs.
Fix network issues and run again with `--force`.

### Assets not categorized correctly?
Categorization is pattern-based. Manual reorganization is possible:
- Move files between directories as needed
- Re-run script with `--force` to restore original categorization

### Want to check for new assets?
Run `./download-assets.sh --dry-run` to see current available assets.
Run normally to download any new ones discovered.

## Integration with HTML

Use relative paths in HTML:
```html
<!-- Images -->
<img src="assets/images/founder/acharya-portrait.jpg" />
<img src="assets/images/logo/antaryog-logo.png" />

<!-- CSS -->
<link rel="stylesheet" href="assets/css/teachable/pages.css" />
```

## Maintenance

### When to re-run:
- Website updates (new brochure pages, images)
- Setting up new development environment
- Need to verify all assets are up-to-date

### Checking manifest:
```bash
head -30 assets/.manifest.txt  # See what was downloaded
grep "Total files" assets/.manifest.txt  # See count
```

### Updating specific categories:
```bash
./download-assets.sh --skip-css --skip-fonts  # Images only
./download-assets.sh --skip-images --skip-fonts  # CSS only
```

## Understanding the Output

```
[1/40] Downloading: filename.jpg
✓ Downloaded (268K)          # Success

[2/40] Downloading: filename2.jpg
ℹ Skipped (already exists)    # Already downloaded
```

Summary shows:
- Successful: New downloads
- Skipped: Already existing
- Failed: Network or validation errors

## Advanced Usage

### Dry-run to verify URLs
```bash
./download-assets.sh --dry-run | grep "https://"
```

### Check disk usage
```bash
du -sh assets/
find assets -type f | wc -l  # Count of files
```

### List all downloaded assets
```bash
cat assets/.manifest.txt | grep "assets/"
```

### Manual cleanup
```bash
rm -rf assets/  # Remove all downloads
./download-assets.sh  # Re-download from scratch
```

---

For more information, see the script comments or run `./download-assets.sh --help`
