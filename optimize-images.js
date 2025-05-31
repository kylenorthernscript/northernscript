#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const PUBLIC_DIR = './public';
const QUALITY = 85;
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg'];

// Priority images (largest impact first)
const PRIORITY_IMAGES = [
  'cloudfront-aws-cover.png',
  'git-team-cover.png', 
  'jamstack-backend-tb13-cover.png',
  'jamstack-basics-tb13-cover.png',
  'ns_hero.png',
  'sake-silver-new.jpg',
  'chatgpt-jamstack-tb14-cover.jpg',
  'storyblok-tb15-cover.jpg',
  'sake-copper-new.jpg'
];

class ImageOptimizer {
  constructor() {
    this.results = {
      optimized: [],
      errors: [],
      totalSavings: 0,
      totalOriginalSize: 0,
      totalOptimizedSize: 0
    };
  }

  async optimizeImage(imagePath) {
    const inputPath = path.join(PUBLIC_DIR, imagePath);
    const outputPath = path.join(PUBLIC_DIR, this.getWebpFilename(imagePath));

    try {
      // Get original file stats
      const originalStats = fs.statSync(inputPath);
      const originalSize = originalStats.size;

      console.log(`🔄 Optimizing: ${imagePath} (${this.formatFileSize(originalSize)})`);

      // Optimize with Sharp
      await sharp(inputPath)
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      // Get optimized file stats
      const optimizedStats = fs.statSync(outputPath);
      const optimizedSize = optimizedStats.size;
      const savings = originalSize - optimizedSize;
      const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

      // Track results
      this.results.optimized.push({
        original: imagePath,
        optimized: this.getWebpFilename(imagePath),
        originalSize,
        optimizedSize,
        savings,
        savingsPercent
      });

      this.results.totalOriginalSize += originalSize;
      this.results.totalOptimizedSize += optimizedSize;
      this.results.totalSavings += savings;

      console.log(`✅ ${imagePath} → ${this.getWebpFilename(imagePath)}`);
      console.log(`   📉 ${this.formatFileSize(originalSize)} → ${this.formatFileSize(optimizedSize)} (${savingsPercent}% smaller)\n`);

    } catch (error) {
      console.error(`❌ Failed to optimize ${imagePath}:`, error.message);
      this.results.errors.push({ file: imagePath, error: error.message });
    }
  }

  getWebpFilename(originalPath) {
    const parsed = path.parse(originalPath);
    return `${parsed.name}.webp`;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KiB', 'MiB', 'GiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  }

  findOptimizableImages() {
    const images = [];
    
    try {
      const files = fs.readdirSync(PUBLIC_DIR);
      
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (SUPPORTED_FORMATS.includes(ext)) {
          // Skip tiny files (likely placeholders)
          const stats = fs.statSync(path.join(PUBLIC_DIR, file));
          if (stats.size > 1000) { // Skip files smaller than 1KB
            images.push(file);
          }
        }
      }
    } catch (error) {
      console.error('Error reading public directory:', error.message);
      process.exit(1);
    }

    // Sort by priority, then by size (largest first)
    return images.sort((a, b) => {
      const aPriority = PRIORITY_IMAGES.indexOf(a);
      const bPriority = PRIORITY_IMAGES.indexOf(b);
      
      if (aPriority !== -1 && bPriority !== -1) {
        return aPriority - bPriority; // Both in priority list
      } else if (aPriority !== -1) {
        return -1; // a is priority, b is not
      } else if (bPriority !== -1) {
        return 1; // b is priority, a is not
      } else {
        // Neither in priority, sort by size
        const aSize = fs.statSync(path.join(PUBLIC_DIR, a)).size;
        const bSize = fs.statSync(path.join(PUBLIC_DIR, b)).size;
        return bSize - aSize;
      }
    });
  }

  async run() {
    console.log('🚀 Northern Script Image Optimization\n');
    console.log('📁 Scanning public/ directory for images...\n');

    const images = this.findOptimizableImages();
    
    if (images.length === 0) {
      console.log('ℹ️  No optimizable images found.');
      return;
    }

    console.log(`📸 Found ${images.length} images to optimize:\n`);
    
    // Show what will be optimized
    images.forEach((img, index) => {
      const size = fs.statSync(path.join(PUBLIC_DIR, img)).size;
      const isPriority = PRIORITY_IMAGES.includes(img);
      console.log(`   ${index + 1}. ${img} (${this.formatFileSize(size)})${isPriority ? ' 🎯' : ''}`);
    });

    console.log('\n⚙️  Starting optimization...\n');

    // Process images
    for (const image of images) {
      await this.optimizeImage(image);
    }

    // Show final results
    this.showResults();
  }

  showResults() {
    console.log('📊 Optimization Complete!\n');
    
    if (this.results.optimized.length > 0) {
      console.log('✅ Successfully optimized:');
      this.results.optimized.forEach(result => {
        console.log(`   • ${result.original} → ${result.optimized} (${result.savingsPercent}% smaller)`);
      });
      
      const totalSavingsPercent = ((this.results.totalSavings / this.results.totalOriginalSize) * 100).toFixed(1);
      
      console.log(`\n📈 Total Results:`);
      console.log(`   💾 Total savings: ${this.formatFileSize(this.results.totalSavings)} (${totalSavingsPercent}%)`);
      console.log(`   📦 Before: ${this.formatFileSize(this.results.totalOriginalSize)}`);
      console.log(`   📦 After: ${this.formatFileSize(this.results.totalOptimizedSize)}`);
    }
    
    if (this.results.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.results.errors.forEach(error => {
        console.log(`   • ${error.file}: ${error.error}`);
      });
    }

    console.log('\n🎯 Next Steps:');
    console.log('   1. Update image references in markdown files to use .webp extensions');
    console.log('   2. Test locally: npm run docs:dev');
    console.log('   3. Run Lighthouse audit to verify performance improvement');
  }
}

// Main execution
async function main() {
  // Check if Sharp is installed
  try {
    require('sharp');
  } catch (error) {
    console.error('❌ Sharp library not found. Please install it first:');
    console.error('   npm install sharp\n');
    process.exit(1);
  }

  // Check if public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('❌ Public directory not found. Are you in the project root?');
    process.exit(1);
  }

  const optimizer = new ImageOptimizer();
  await optimizer.run();
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  });
}

module.exports = ImageOptimizer;