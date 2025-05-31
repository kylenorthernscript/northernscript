#!/usr/bin/env node

/**
 * Image Optimization Script for Northern Script
 * 
 * This script converts PNG/JPG images to WebP format for better performance.
 * Run with: node optimize-images.js
 * 
 * Prerequisites:
 * npm install sharp
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('Sharp is not installed. Please run: npm install sharp');
  process.exit(1);
}

const publicDir = './public';
const optimizationReport = [];

// High-priority images based on Lighthouse report
const highPriorityImages = [
  'cloudfront-aws-cover.png',    // 2,523.7 KiB savings
  'git-team-cover.png',          // 2,519.0 KiB savings  
  'ns_hero.png',                 // 1,471.8 KiB savings
  'chatgpt-jamstack-tb14-cover.jpg', // 820.8 KiB savings
  'sake-silver-new.jpg',         // 613.6 KiB savings
  'storyblok-tb15-cover.jpg',    // 450.4 KiB savings
  'sake-copper-new.jpg',         // 425.8 KiB savings
  'vitepress-cover.jpg'          // 106.2 KiB savings
];

async function optimizeImage(inputPath, outputPath, quality = 80) {
  try {
    const inputStats = fs.statSync(inputPath);
    const inputSize = inputStats.size;

    await sharp(inputPath)
      .webp({ quality, effort: 6 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSize = outputStats.size;
    const savings = inputSize - outputSize;
    const savingsPercent = Math.round((savings / inputSize) * 100);

    optimizationReport.push({
      original: path.basename(inputPath),
      webp: path.basename(outputPath),
      originalSize: Math.round(inputSize / 1024),
      webpSize: Math.round(outputSize / 1024),
      savings: Math.round(savings / 1024),
      savingsPercent
    });

    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${Math.round(inputSize/1024)} KB → ${Math.round(outputSize/1024)} KB (${savingsPercent}% smaller)`);

  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🚀 Starting image optimization for Northern Script...\n');

  if (!fs.existsSync(publicDir)) {
    console.error(`❌ Public directory not found: ${publicDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file)
  );

  console.log(`Found ${imageFiles.length} images to optimize:\n`);

  // Process high-priority images first
  for (const imageName of highPriorityImages) {
    if (imageFiles.includes(imageName)) {
      const inputPath = path.join(publicDir, imageName);
      const baseName = path.parse(imageName).name;
      const outputPath = path.join(publicDir, `${baseName}.webp`);
      
      await optimizeImage(inputPath, outputPath);
    }
  }

  // Process remaining images
  for (const imageFile of imageFiles) {
    if (!highPriorityImages.includes(imageFile)) {
      const inputPath = path.join(publicDir, imageFile);
      const baseName = path.parse(imageFile).name;
      const outputPath = path.join(publicDir, `${baseName}.webp`);
      
      if (!fs.existsSync(outputPath)) {
        await optimizeImage(inputPath, outputPath);
      }
    }
  }

  // Generate report
  console.log('\n📊 Optimization Report:');
  console.log('=' .repeat(80));
  
  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  
  optimizationReport.forEach(item => {
    totalOriginalSize += item.originalSize;
    totalWebpSize += item.webpSize;
    console.log(`${item.original.padEnd(30)} ${item.originalSize.toString().padStart(6)} KB → ${item.webpSize.toString().padStart(6)} KB (${item.savingsPercent}% saved)`);
  });

  const totalSavings = totalOriginalSize - totalWebpSize;
  const totalSavingsPercent = Math.round((totalSavings / totalOriginalSize) * 100);

  console.log('=' .repeat(80));
  console.log(`Total: ${totalOriginalSize} KB → ${totalWebpSize} KB`);
  console.log(`💾 Total savings: ${totalSavings} KB (${totalSavingsPercent}%)`);
  
  console.log('\n✨ Next steps:');
  console.log('1. Update your markdown files to use .webp extensions');
  console.log('2. Test the site locally: npm run docs:dev');
  console.log('3. Build and deploy: npm run docs:build');
}

if (require.main === module) {
  optimizeAllImages().catch(console.error);
}

module.exports = { optimizeImage, optimizeAllImages };