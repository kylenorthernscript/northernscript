#!/bin/bash

# Northern Script Image Optimization Script
# Converts PNG/JPG images to WebP format for better performance

set -e

# Configuration
PUBLIC_DIR="./public"
QUALITY=85
SUPPORTED_EXTS=("png" "jpg" "jpeg")

# Priority images (largest impact first)
PRIORITY_IMAGES=(
  "cloudfront-aws-cover.png"
  "git-team-cover.png"
  "jamstack-backend-tb13-cover.png"
  "jamstack-basics-tb13-cover.png"
  "ns_hero.png"
  "sake-silver-new.jpg"
  "chatgpt-jamstack-tb14-cover.jpg"
  "storyblok-tb15-cover.jpg"
  "sake-copper-new.jpg"
)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Statistics
TOTAL_ORIGINAL_SIZE=0
TOTAL_OPTIMIZED_SIZE=0
OPTIMIZED_COUNT=0
ERROR_COUNT=0

# Function to format file size
format_size() {
  local size=$1
  if [ $size -lt 1024 ]; then
    echo "${size} B"
  elif [ $size -lt 1048576 ]; then
    echo "$(( size / 1024 )) KiB"
  else
    echo "$(( size / 1048576 )) MiB"
  fi
}

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to get WebP filename
get_webp_filename() {
  local original="$1"
  local name="${original%.*}"
  echo "${name}.webp"
}

# Function to optimize single image
optimize_image() {
  local image_path="$1"
  local input_file="${PUBLIC_DIR}/${image_path}"
  local output_file="${PUBLIC_DIR}/$(get_webp_filename "$image_path")"

  if [[ ! -f "$input_file" ]]; then
    echo -e "${RED}❌ File not found: $image_path${NC}"
    ((ERROR_COUNT++))
    return 1
  fi

  # Get original size
  local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
  
  echo -e "${BLUE}🔄 Optimizing: $image_path ($(format_size $original_size))${NC}"

  # Convert to WebP
  if cwebp -q $QUALITY "$input_file" -o "$output_file" >/dev/null 2>&1; then
    # Get optimized size
    local optimized_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
    local savings=$((original_size - optimized_size))
    local savings_percent=$((savings * 100 / original_size))

    # Update statistics
    TOTAL_ORIGINAL_SIZE=$((TOTAL_ORIGINAL_SIZE + original_size))
    TOTAL_OPTIMIZED_SIZE=$((TOTAL_OPTIMIZED_SIZE + optimized_size))
    ((OPTIMIZED_COUNT++))

    echo -e "${GREEN}✅ $image_path → $(get_webp_filename "$image_path")${NC}"
    echo -e "   📉 $(format_size $original_size) → $(format_size $optimized_size) (${savings_percent}% smaller)"
    echo
  else
    echo -e "${RED}❌ Failed to optimize $image_path${NC}"
    ((ERROR_COUNT++))
  fi
}

# Function to find optimizable images
find_images() {
  local images=()
  
  # Find all supported image files
  for ext in "${SUPPORTED_EXTS[@]}"; do
    while IFS= read -r -d '' file; do
      local basename=$(basename "$file")
      local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
      
      # Skip tiny files (likely placeholders)
      if [ $size -gt 1000 ]; then
        images+=("$basename")
      fi
    done < <(find "$PUBLIC_DIR" -maxdepth 1 -name "*.$ext" -type f -print0 2>/dev/null)
  done

  # Sort by priority
  local sorted_images=()
  
  # Add priority images first
  for priority_img in "${PRIORITY_IMAGES[@]}"; do
    for img in "${images[@]}"; do
      if [[ "$img" == "$priority_img" ]]; then
        sorted_images+=("$img")
        break
      fi
    done
  done
  
  # Add remaining images
  for img in "${images[@]}"; do
    local is_priority=false
    for priority_img in "${PRIORITY_IMAGES[@]}"; do
      if [[ "$img" == "$priority_img" ]]; then
        is_priority=true
        break
      fi
    done
    
    if [[ "$is_priority" == false ]]; then
      sorted_images+=("$img")
    fi
  done

  printf '%s\n' "${sorted_images[@]}"
}

# Function to show results
show_results() {
  echo -e "${BLUE}📊 Optimization Complete!${NC}"
  echo

  if [ $OPTIMIZED_COUNT -gt 0 ]; then
    local total_savings=$((TOTAL_ORIGINAL_SIZE - TOTAL_OPTIMIZED_SIZE))
    local total_savings_percent=$((total_savings * 100 / TOTAL_ORIGINAL_SIZE))
    
    echo -e "${GREEN}✅ Successfully optimized $OPTIMIZED_COUNT images${NC}"
    echo -e "${BLUE}📈 Total Results:${NC}"
    echo -e "   💾 Total savings: $(format_size $total_savings) (${total_savings_percent}%)"
    echo -e "   📦 Before: $(format_size $TOTAL_ORIGINAL_SIZE)"
    echo -e "   📦 After: $(format_size $TOTAL_OPTIMIZED_SIZE)"
    echo
  fi

  if [ $ERROR_COUNT -gt 0 ]; then
    echo -e "${RED}❌ $ERROR_COUNT errors occurred${NC}"
    echo
  fi

  echo -e "${YELLOW}🎯 Next Steps:${NC}"
  echo "   1. Update image references in markdown files to use .webp extensions"
  echo "   2. Test locally: npm run docs:dev"
  echo "   3. Run Lighthouse audit to verify performance improvement"
}

# Main execution
main() {
  echo -e "${BLUE}🚀 Northern Script Image Optimization${NC}"
  echo

  # Check if cwebp is installed
  if ! command_exists cwebp; then
    echo -e "${RED}❌ cwebp not found. Please install WebP tools:${NC}"
    echo
    echo "   macOS: brew install webp"
    echo "   Ubuntu/Debian: sudo apt-get install webp"
    echo "   CentOS/RHEL: sudo yum install libwebp-tools"
    echo
    exit 1
  fi

  # Check if public directory exists
  if [[ ! -d "$PUBLIC_DIR" ]]; then
    echo -e "${RED}❌ Public directory not found. Are you in the project root?${NC}"
    exit 1
  fi

  echo -e "${BLUE}📁 Scanning $PUBLIC_DIR directory for images...${NC}"
  echo

  # Find images to optimize
  mapfile -t images < <(find_images)
  
  if [ ${#images[@]} -eq 0 ]; then
    echo -e "${YELLOW}ℹ️  No optimizable images found.${NC}"
    exit 0
  fi

  echo -e "${BLUE}📸 Found ${#images[@]} images to optimize:${NC}"
  echo

  # Show what will be optimized
  local index=1
  for img in "${images[@]}"; do
    local size=$(stat -f%z "${PUBLIC_DIR}/${img}" 2>/dev/null || stat -c%s "${PUBLIC_DIR}/${img}" 2>/dev/null)
    local is_priority=""
    
    for priority_img in "${PRIORITY_IMAGES[@]}"; do
      if [[ "$img" == "$priority_img" ]]; then
        is_priority=" 🎯"
        break
      fi
    done
    
    echo "   $index. $img ($(format_size $size))$is_priority"
    ((index++))
  done

  echo
  echo -e "${BLUE}⚙️  Starting optimization...${NC}"
  echo

  # Process images
  for image in "${images[@]}"; do
    optimize_image "$image"
  done

  # Show final results
  show_results
}

# Run main function
main "$@"