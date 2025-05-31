#!/bin/bash

# Image Optimization Script for Northern Script
# Converts PNG/JPG images to WebP format using cwebp
#
# Prerequisites:
# - Install WebP tools: 
#   Ubuntu/Debian: sudo apt-get install webp
#   macOS: brew install webp
#   Windows: Download from https://developers.google.com/speed/webp/download

set -e

PUBLIC_DIR="./public"
QUALITY=80

# Check if cwebp is available
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp is not installed. Please install WebP tools:"
    echo "  Ubuntu/Debian: sudo apt-get install webp"
    echo "  macOS: brew install webp"
    echo "  Windows: Download from https://developers.google.com/speed/webp/download"
    exit 1
fi

if [ ! -d "$PUBLIC_DIR" ]; then
    echo "❌ Public directory not found: $PUBLIC_DIR"
    exit 1
fi

echo "🚀 Starting image optimization for Northern Script..."
echo "Quality setting: $QUALITY"
echo ""

cd "$PUBLIC_DIR"

# High-priority images (based on Lighthouse report)
HIGH_PRIORITY=(
    "cloudfront-aws-cover.png"
    "git-team-cover.png"
    "ns_hero.png"
    "chatgpt-jamstack-tb14-cover.jpg"
    "sake-silver-new.jpg"
    "storyblok-tb15-cover.jpg"
    "sake-copper-new.jpg"
    "vitepress-cover.jpg"
)

total_original=0
total_webp=0

optimize_image() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"
    
    if [ ! -f "$input_file" ]; then
        echo "⚠️  File not found: $input_file"
        return 1
    fi
    
    if [ -f "$output_file" ]; then
        echo "⏭️  Already exists: $output_file"
        return 0
    fi
    
    local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
    
    if cwebp -q $QUALITY "$input_file" -o "$output_file" 2>/dev/null; then
        local webp_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
        local savings=$((original_size - webp_size))
        local savings_percent=$((savings * 100 / original_size))
        
        total_original=$((total_original + original_size))
        total_webp=$((total_webp + webp_size))
        
        printf "✅ %-30s %6d KB → %6d KB (%d%% saved)\n" \
            "$input_file" \
            $((original_size / 1024)) \
            $((webp_size / 1024)) \
            $savings_percent
    else
        echo "❌ Failed to convert: $input_file"
        return 1
    fi
}

echo "Processing high-priority images:"
echo "================================"

# Process high-priority images first
for image in "${HIGH_PRIORITY[@]}"; do
    if [ -f "$image" ]; then
        optimize_image "$image"
    fi
done

echo ""
echo "Processing remaining images:"
echo "============================"

# Process all other PNG/JPG files
for file in *.png *.jpg *.jpeg; do
    if [ -f "$file" ]; then
        # Check if this file is not in high priority list
        skip=false
        for priority_file in "${HIGH_PRIORITY[@]}"; do
            if [ "$file" = "$priority_file" ]; then
                skip=true
                break
            fi
        done
        
        if [ "$skip" = false ]; then
            optimize_image "$file"
        fi
    fi
done

echo ""
echo "📊 Optimization Summary:"
echo "========================"

if [ $total_original -gt 0 ]; then
    total_savings=$((total_original - total_webp))
    total_savings_percent=$((total_savings * 100 / total_original))
    
    echo "Total original size: $((total_original / 1024)) KB"
    echo "Total WebP size: $((total_webp / 1024)) KB" 
    echo "💾 Total savings: $((total_savings / 1024)) KB ($total_savings_percent%)"
else
    echo "No images were processed."
fi

echo ""
echo "✨ Next steps:"
echo "1. Update your markdown files to use .webp extensions"
echo "2. Test the site locally: npm run docs:dev"
echo "3. Build and deploy: npm run docs:build"
echo ""
echo "💡 Tip: You can keep both formats and let VitePress choose the best one automatically!"