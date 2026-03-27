#!/bin/bash
# This script processes the remaining blog posts that need browser-based image extraction.
# It reads the image info from a pre-generated file and downloads them.

BASE_DIR="/Users/mattphillips/projects/payerset-site/public/images/blog"
RESULTS_FILE="/tmp/browser-scrape-results.json"

echo "[]" > "$RESULTS_FILE"

while IFS='|' read -r slug mediaId ext alt; do
  if [ -z "$mediaId" ] || [ "$mediaId" = "null" ]; then
    echo "SKIP: $slug (no hero image)"
    continue
  fi

  DIR="$BASE_DIR/$slug"
  mkdir -p "$DIR"

  URL="https://static.wixstatic.com/media/${mediaId}/v1/fill/w_1200,h_1200,al_c,q_90,enc_auto/${mediaId}"
  OUTPUT="$DIR/hero.${ext}"

  curl -sL -o "$OUTPUT" "$URL"
  SIZE=$(wc -c < "$OUTPUT" | tr -d ' ')

  if [ "$SIZE" -lt 100 ]; then
    # Try without the resize params
    URL2="https://static.wixstatic.com/media/${mediaId}"
    curl -sL -o "$OUTPUT" "$URL2"
    SIZE=$(wc -c < "$OUTPUT" | tr -d ' ')
  fi

  echo "OK: $slug -> hero.${ext} (${SIZE} bytes)"
done < /tmp/browser-extracted-images.txt

echo "Done!"
