# Image Optimization Guide for Northern Script

This guide helps you optimize images to improve your Lighthouse Performance score from 85 to 90+.

## Current Issues

Based on your Lighthouse report, you can save **8,931 KiB** by serving images in next-gen formats:

| Image | Current Size | Potential Savings |
|-------|-------------|------------------|
| `cloudfront-aws-cover.png` | 2,779.7 KiB | 2,523.7 KiB |
| `git-team-cover.png` | 2,775.0 KiB | 2,519.0 KiB |
| `ns_hero.png` | 1,569.3 KiB | 1,471.8 KiB |
| `chatgpt-jamstack-tb14-cover.jpg` | 938.6 KiB | 820.8 KiB |
| `sake-silver-new.jpg` | 972.2 KiB | 613.6 KiB |
| `storyblok-tb15-cover.jpg` | 682.2 KiB | 450.4 KiB |
| `sake-copper-new.jpg` | 640.0 KiB | 425.8 KiB |
| `vitepress-cover.jpg` | 200.5 KiB | 106.2 KiB |

## Quick Start

### Option 1: Node.js Script (Recommended)

```bash
# Install sharp for image processing
npm install sharp

# Run the optimization script
node optimize-images.js
```

### Option 2: Shell Script

```bash
# Install WebP tools
# Ubuntu/Debian:
sudo apt-get install webp

# macOS:
brew install webp

# Make script executable and run
chmod +x optimize-images.sh
./optimize-images.sh
```

## Manual Optimization

If you prefer manual control, use these commands for the highest-impact images:

```bash
# Convert hero image
cwebp -q 80 public/ns_hero.png -o public/ns_hero.webp

# Convert book covers  
cwebp -q 80 public/cloudfront-aws-cover.png -o public/cloudfront-aws-cover.webp
cwebp -q 80 public/git-team-cover.png -o public/git-team-cover.webp

# Convert JPG images
cwebp -q 80 public/chatgpt-jamstack-tb14-cover.jpg -o public/chatgpt-jamstack-tb14-cover.webp
cwebp -q 80 public/sake-silver-new.jpg -o public/sake-silver-new.webp
```

## Update Your Markdown Files

After creating WebP versions, update your markdown files:

### Hero Image (index.md)
```yaml
hero:
  image:
    src: /ns_hero.webp  # Changed from .png
    alt: Northern Script logo
```

### Book Cover Images (index.md)
```html
<!-- Before -->
<img src="/git-team-cover.png" alt="..." class="book-cover" />

<!-- After -->
<img src="/git-team-cover.webp" alt="..." class="book-cover" />
```

## VitePress Automatic Format Selection

For the best user experience, you can implement automatic format selection. VitePress can serve WebP to supporting browsers and fallback to PNG/JPG for others.

### Method 1: Picture Element
```html
<picture>
  <source srcset="/ns_hero.webp" type="image/webp">
  <img src="/ns_hero.png" alt="Northern Script logo" />
</picture>
```

### Method 2: Custom Component

Create `.vitepress/components/OptimizedImage.vue`:

```vue
<template>
  <picture>
    <source :srcset="webpSrc" type="image/webp" v-if="webpSrc">
    <img 
      :src="src" 
      :alt="alt" 
      :class="className"
      :loading="loading"
      :width="width"
      :height="height"
    />
  </picture>
</template>

<script setup>
const props = defineProps({
  src: String,
  alt: String,
  className: String,
  loading: { type: String, default: 'lazy' },
  width: Number,
  height: Number
})

const webpSrc = computed(() => {
  if (props.src?.includes('.')) {
    return props.src.replace(/\.(png|jpg|jpeg)$/, '.webp')
  }
  return null
})
</script>
```

Usage:
```html
<OptimizedImage 
  src="/ns_hero.png" 
  alt="Northern Script logo" 
  class="hero-image" 
/>
```

## Expected Results

After optimization, you should see:

- **Performance Score**: 85 → 90+
- **Total Size Reduction**: ~8,931 KiB saved
- **Largest Contentful Paint**: Improved
- **Better Core Web Vitals**: Faster loading

## Verification

1. **Test locally**: `npm run docs:dev`
2. **Build**: `npm run docs:build`
3. **Run Lighthouse again** on the deployed site
4. **Check file sizes**: Your WebP files should be 20-50% smaller

## Additional Optimizations

### Image Sizing
Some images might be larger than needed. Consider:

```bash
# Resize large images before WebP conversion
sharp resize 800 600 --fit cover input.png output.png
```

### Quality Settings
- **80**: Good balance (recommended)
- **70**: Smaller files, slight quality loss
- **90**: Higher quality, larger files

### Lazy Loading
All images in your markdown already use `loading="lazy"` - great for performance!

## Troubleshooting

### WebP Not Displaying
- Check browser support (98%+ modern browsers support WebP)
- Verify file paths are correct
- Ensure WebP files were created successfully

### Large Bundle Size
- Use picture elements for critical images
- Keep original formats as fallbacks
- Consider using a CDN for image optimization

---

**Questions?** Check the VitePress docs on [asset handling](https://vitepress.dev/guide/asset-handling) or create an issue!