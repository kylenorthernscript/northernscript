# Image Optimization Guide

This guide provides comprehensive image optimization solutions to improve your Lighthouse Performance score from 85 to 90+.

## Current State Analysis

Your site has significant optimization potential with **8,931 KiB** of possible savings:

### High-Impact Images (Priority Order)
1. `cloudfront-aws-cover.png` - 2.8 MB → ~323 KiB (2,523 KiB savings)
2. `git-team-cover.png` - 2.8 MB → ~322 KiB (2,519 KiB savings)
3. `jamstack-backend-tb13-cover.png` - 2.0 MB → ~231 KiB (1,812 KiB savings)
4. `jamstack-basics-tb13-cover.png` - 2.0 MB → ~229 KiB (1,793 KiB savings)
5. `ns_hero.png` - 1.6 MB → ~182 KiB (1,425 KiB savings)

### Medium-Impact Images
6. `sake-silver-new.jpg` - 995 KB → ~113 KiB (882 KiB savings)
7. `chatgpt-jamstack-tb14-cover.jpg` - 961 KB → ~109 KiB (852 KiB savings)
8. `storyblok-tb15-cover.jpg` - 699 KB → ~79 KiB (620 KiB savings)
9. `sake-copper-new.jpg` - 655 KB → ~74 KiB (581 KiB savings)

## Optimization Strategy

Convert PNG/JPG images to WebP format using modern compression:
- **WebP format**: 25-35% smaller than PNG, 25-50% smaller than JPEG
- **Quality setting**: 85% (maintains excellent visual quality)
- **Backwards compatibility**: Modern browsers support WebP extensively

## Quick Start (Recommended)

### Option 1: Node.js Script (Automated)
```bash
# Install Sharp library
npm install sharp

# Run optimization
npm run optimize:images

# Follow prompts to update markdown files
```

### Option 2: Shell Script (Command Line)
```bash
# Make executable
chmod +x optimize-images.sh

# Install cwebp if needed (macOS)
brew install webp

# Run optimization
./optimize-images.sh
```

## Expected Results

- **Performance Score**: 85 → 90+
- **File Size Reduction**: ~8,931 KiB saved
- **Faster Page Loads**: Especially hero image and book covers
- **Better Core Web Vitals**: Improved Largest Contentful Paint (LCP)

## Post-Optimization Steps

1. **Update Markdown References**: Change `.png`/`.jpg` to `.webp` in:
   - `index.md` (hero image)
   - Book cover references
   - Any other image links

2. **Test Locally**:
   ```bash
   npm run docs:dev
   ```

3. **Verify Optimization**:
   - Check converted images display correctly
   - Run Lighthouse audit again
   - Monitor loading performance

## Technical Details

### Optimization Settings
- **Format**: WebP
- **Quality**: 85%
- **Compression**: Lossless for PNG sources, high-quality for JPEG
- **Metadata**: Stripped for smaller file sizes

### Browser Support
WebP is supported by:
- Chrome/Chromium: ✅ (95%+ market share)
- Firefox: ✅
- Safari: ✅ (iOS 14+, macOS Big Sur+)
- Edge: ✅

## Troubleshooting

### If Images Don't Display
1. Check file paths in markdown
2. Ensure `.webp` extension is correct
3. Verify files were generated in `/public/`

### If Optimization Fails
1. Check Sharp installation: `npm list sharp`
2. Verify write permissions in `/public/`
3. Try shell script alternative

### Performance Not Improved
1. Clear browser cache
2. Run fresh Lighthouse audit
3. Check for other performance bottlenecks

## Manual Optimization (Advanced)

If you prefer manual control:

```bash
# Convert specific images
npx sharp -i public/ns_hero.png -o public/ns_hero.webp -f webp -q 85
npx sharp -i public/cloudfront-aws-cover.png -o public/cloudfront-aws-cover.webp -f webp -q 85
```

## Maintenance

- **New Images**: Always optimize before adding to `/public/`
- **Batch Processing**: Use scripts for multiple new images
- **Quality Check**: Periodically audit with Lighthouse
- **File Cleanup**: Remove original files after confirming WebP versions work

---

**Next**: Run the optimization script and update your image references for immediate performance gains!