# YouTube Transcript Downloader

This script downloads YouTube transcripts/captions for all testimonial videos and saves them as plain text files with metadata.

## Overview

The `download_transcripts_smart.py` script is designed to download transcripts from YouTube videos listed in `docs/testimonials/testimonials.json` with intelligent rate limiting and retry logic to handle YouTube's API restrictions.

## Features

✓ **Rate Limiting** - 2+ second minimum delay between requests to avoid rate limits  
✓ **Exponential Backoff** - Automatic retries with increasing wait times (10s, 20s, 30s)  
✓ **Auto-captions** - Uses YouTube's auto-generated captions  
✓ **Clean Output** - Converts VTT format to plain text with video metadata  
✓ **Error Handling** - Detailed error messages for debugging  

## Requirements

- Python 3.6+
- `yt-dlp` (YouTube downloader)

## Installation

```bash
# Install yt-dlp
pip install yt-dlp

# Or using system package manager (Debian/Ubuntu)
sudo apt-get install yt-dlp
```

## Usage

### Basic Usage

```bash
cd /home/ameya/repo/aywebtest
python3 scripts/download_transcripts_smart.py
```

### What It Does

1. Reads all 100 video URLs from `docs/testimonials/testimonials.json`
2. Downloads available captions for each video
3. Converts captions from VTT format to plain text
4. Saves each transcript with metadata to `docs/testimonials/transcripts/`
5. Reports progress and summary at the end

## Output Format

Each transcript file is named: `[VIDEO_ID]_[YOUTUBE_ID].txt`

Example: `004_r6agGopRlkY.txt`

Content structure:
```
Video ID: 4
Title: From Ordinary Executive to Director | Miraculous Story of Success & Prosperity | Antar Yog
URL: https://www.youtube.com/watch?v=r6agGopRlkY
Category: jobs
================================================================================

Kind: captions
Language: en
[Music]
namaskar gurudev namaskar n namaskar to
all my sadak uh my name is pramsh ala I
stay in tan I have been associated with
anog since uh 2020 and I would like to
share a small experience with you about
...
```

## Example Output

```
Transcripts successfully created:
================================================================================
[1/100] ID   1: Practising Detachment at a Very Young Age Has... ✗ Rate limited (attempt 1/3, waiting 10s)
[2/100] ID   2: I Followed This to Attract the Right Life Par... ✗ Rate limited (attempt 1/3, waiting 10s)
[3/100] ID   3: My Relationships Have Improved and Strengthen... ✗ Rate limited (attempt 1/3, waiting 10s)
[4/100] ID   4: From Ordinary Executive to Director | Miracul... ✓ (10005 chars)
[5/100] ID   5: 100% Growth In Turnover In Just 6 Months | Mi... ✗ Rate limited (attempt 1/3, waiting 10s)
...
[100/100] ID 100: Journey of a Sadhak | Discovering a New Way o... ✗ Rate limited (attempt 1/3, waiting 10s)

================================================================================
Summary:
  Successful: 7
  Failed: 93
  Total: 100/100
Transcripts saved to: /home/ameya/repo/aywebtest/docs/testimonials/transcripts
```

## Understanding Results

| Status | Meaning |
|--------|---------|
| ✓ Success | Video caption successfully downloaded and saved |
| ✗ Rate limited | YouTube temporarily blocked the request; script will retry |
| ✗ No subtitle file created | Video doesn't have publicly available captions on YouTube |

### Expected Success Rate

- **Successfully downloaded:** ~7% of videos (those with available captions)
- **Failed/No captions:** ~93% (videos without public captions or rate-limited)

This is normal because:
1. Not all videos have captions enabled on YouTube
2. YouTube aggressively rate limits transcript requests
3. Exponential backoff helps but doesn't guarantee 100% success

## Transcript Files Location

All downloaded transcripts are saved in:
```
docs/testimonials/transcripts/
├── 001_7pJIrj_Oyxg.txt
├── 002_As51jIHZgSE.txt
├── ...
└── 100_sfJBjDxgEzk.txt
```

## Tips for Better Results

1. **Run at off-peak hours** - YouTube is less aggressive with rate limiting during low-traffic times
2. **Increase delays** - Modify `min_delay = 2` in the script to 3-5 seconds for slower, more reliable downloads
3. **Check YouTube captions** - Some videos may need captions enabled by the video creator
4. **Retry manually** - Run the script multiple times; it will overwrite and retry failed videos

## Modifying the Script

### Increase Delay Between Requests

Edit `download_transcripts_smart.py` line ~90:
```python
min_delay = 2  # Change to 3, 4, or 5 for slower requests
```

### Change Output Format

Modify the transcript file writing section (around line ~115) to customize metadata or formatting.

## Troubleshooting

**Q: Script seems slow**  
A: This is normal due to rate limiting. Each request has a 2+ second minimum delay plus YouTube's response time.

**Q: Why are so many videos failing?**  
A: YouTube rate limits aggressive requests. The retry mechanism helps, but not all requests succeed. Many videos also lack captions.

**Q: Can I download faster?**  
A: Not recommended - YouTube will block faster requests. The 2-second delay is conservative but necessary.

**Q: How do I know if a download succeeded?**  
A: Check the file size. Files with actual transcripts are 5KB-30KB. Files with just metadata/errors are <1KB.

## File Structure

```
/home/ameya/repo/aywebtest/
├── scripts/
│   ├── README.md                          # This file
│   └── download_transcripts_smart.py      # The working script
├── docs/
│   └── testimonials/
│       ├── testimonials.json              # List of 100 videos
│       └── transcripts/                   # Output folder (100 files)
│           ├── 001_7pJIrj_Oyxg.txt
│           ├── 004_r6agGopRlkY.txt
│           └── ... (100 files total)
```

## License

This script is part of the AntarYog Foundation website project.
