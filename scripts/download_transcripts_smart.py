#!/usr/bin/env python3
"""
Download YouTube transcripts with rate limiting and smart retry logic
"""

import json
import subprocess
import time
from pathlib import Path
import re

def extract_video_id(url):
    """Extract video ID from YouTube URL"""
    if "youtube.com/watch?v=" in url:
        return url.split("v=")[1].split("&")[0]
    elif "youtu.be/" in url:
        return url.split("youtu.be/")[1].split("?")[0]
    return None

def vtt_to_text(vtt_content):
    """Convert VTT format to plain text"""
    lines = vtt_content.split('\n')
    text_lines = []
    for line in lines:
        # Skip header, timing lines, and empty lines
        if line.startswith('WEBVTT') or line.startswith('NOTE') or '-->' in line or not line.strip():
            continue
        if line.strip():
            text_lines.append(line.strip())
    return '\n'.join(text_lines)

def get_transcript(video_id, video_url, output_dir, attempt=1, max_attempts=3):
    """Fetch transcript using yt-dlp with retries"""
    try:
        output_template = str(output_dir / f"temp_{video_id}")

        # Use yt-dlp with auto captions and rate limiting
        result = subprocess.run(
            [
                "yt-dlp",
                "--write-auto-subs",
                "--skip-download",
                "--socket-timeout", "30",
                "-o", output_template,
                video_url
            ],
            capture_output=True,
            text=True,
            timeout=60,
            cwd=str(output_dir)
        )

        if result.returncode == 0:
            # Find the downloaded VTT file
            vtt_files = list(output_dir.glob(f"temp_{video_id}*.vtt"))
            if vtt_files:
                vtt_file = vtt_files[0]
                with open(vtt_file, 'r', encoding='utf-8') as f:
                    vtt_content = f.read()

                # Convert to plain text
                plain_text = vtt_to_text(vtt_content)
                vtt_file.unlink()  # Delete temporary VTT file

                return True, plain_text, None
            else:
                return False, None, "No subtitle file created"
        else:
            error_msg = result.stderr
            # Check for rate limit error
            if "429" in error_msg or "Too Many Requests" in error_msg:
                if attempt < max_attempts:
                    wait_time = 10 * attempt  # Exponential backoff
                    return False, None, f"Rate limited (attempt {attempt}/{max_attempts}, waiting {wait_time}s)"
                else:
                    return False, None, "Rate limited - max retries exceeded"
            else:
                return False, None, error_msg[:100]

    except subprocess.TimeoutExpired:
        return False, None, "Timeout"
    except Exception as e:
        return False, None, str(e)[:100]

def main():
    # Load testimonials
    testimonials_file = Path("/home/ameya/repo/aywebtest/docs/testimonials/testimonials.json")
    transcripts_dir = Path("/home/ameya/repo/aywebtest/docs/testimonials/transcripts")

    with open(testimonials_file, "r") as f:
        testimonials = json.load(f)

    print(f"Found {len(testimonials)} testimonial videos")
    print(f"Downloading transcripts with rate limiting...\n")

    successful = 0
    failed = 0
    request_count = 0
    last_request_time = time.time()
    min_delay = 2  # Minimum 2 seconds between requests

    for i, video in enumerate(testimonials, 1):
        video_id = extract_video_id(video["url"])
        if not video_id:
            print(f"[{i}/{len(testimonials)}] SKIP: Invalid URL")
            continue

        transcript_file = transcripts_dir / f"{video['id']:03d}_{video_id}.txt"

        print(f"[{i}/{len(testimonials)}] ID {video['id']:3d}: {video['title'][:45]}...", end=" ", flush=True)

        # Rate limiting: ensure minimum delay between requests
        elapsed = time.time() - last_request_time
        if elapsed < min_delay:
            time.sleep(min_delay - elapsed)

        success, content, error = get_transcript(video_id, video["url"], transcripts_dir)
        last_request_time = time.time()

        if success:
            # Write transcript to file
            with open(transcript_file, 'w', encoding='utf-8') as f:
                f.write(f"Video ID: {video['id']}\n")
                f.write(f"Title: {video['title']}\n")
                f.write(f"URL: {video['url']}\n")
                f.write(f"Category: {video['category']}\n")
                f.write("=" * 80 + "\n\n")
                f.write(content)

            successful += 1
            print(f"✓ ({len(content)} chars)")
        else:
            failed += 1
            print(f"✗ {error}")

        request_count += 1

    print(f"\n{'=' * 80}")
    print(f"Summary:")
    print(f"  Successful: {successful}")
    print(f"  Failed: {failed}")
    print(f"  Total: {successful + failed}/{len(testimonials)}")
    print(f"Transcripts saved to: {transcripts_dir}")

if __name__ == "__main__":
    main()
