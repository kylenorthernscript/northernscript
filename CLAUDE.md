# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Northern Script" (のーざんすくりぷと), a Japanese VitePress documentation site focused on programming, AI, and writing tools. The site primarily documents PRH (proofreader) installation and configuration for Japanese technical writing.

## Architecture

- **Static Site Generator**: VitePress (Vue-powered documentation framework)
- **Theme**: Catppuccin theme (@catppuccin/vitepress)
- **Content**: Japanese markdown documentation with focus on PRH setup guides
- **Dependencies**: Minimal - only VitePress, Catppuccin theme, and gray-matter for frontmatter parsing

## Development Commands

```bash
# Start development server
npm run docs:dev

# Build for production  
npm run docs:build

# Preview production build
npm run docs:preview
```

## Content Structure

- `index.md` - Homepage with hero section and feature links
- `prh-install.md` - Main PRH installation guide for VS Code
- `prh-install2.md` - Technical writing rules installation guide
- `assets/prh-install/` - Screenshots and images for installation guides
- `public/` - Static assets

## Key Content Focus

The site documents Japanese technical writing tools:
- PRH (proofreader) VS Code extension setup
- prh.yml configuration files for Japanese text correction
- TechBooster writing rules integration
- Markdown-specific exclusion patterns for PRH

## File Structure Notes

- VitePress uses file-based routing (`.md` files become pages)
- Assets are referenced relatively from markdown files
- Japanese content with technical English terms mixed in
- Frontmatter configuration controls navigation and page metadata

## Current Project: Amazon Associates Book Recommendations

### Project Status (As of 2025-07-29)

The site now includes an English-language Amazon Associates affiliate section for Japanese mystery novels translated into English. This section is targeted at English-speaking readers interested in Japanese literature.

### Completed Components

#### 1. Navigation Structure
- Added `/en/books/` sidebar navigation in `.vitepress/config.mts`
- Left-side navigation includes:
  - Overview page (`/en/books/mystery-novels`)
  - Individual book review pages organized under "Book Reviews"

#### 2. Existing Book Pages (Completed)
All pages include mid-page and final purchase CTAs with Amazon affiliate links:

**The Devotion of Suspect X** (`/en/books/mystery-novels/devotion-of-suspect-x.md`)
- Amazon link: `https://amzn.to/4mkR1XL`
- Book cover: `https://m.media-amazon.com/images/I/716kh-UcI-L._SL1500_.jpg`
- Status: ✅ Complete with About This Book layout

**Malice** (`/en/books/mystery-novels/malice.md`)
- Amazon link: `https://amzn.to/4lQ48jM`
- Book cover: `https://m.media-amazon.com/images/I/81Q1n36TGxL._SL1500_.jpg`
- Status: ✅ Complete with About This Book layout

**Journey Under the Midnight Sun** (`/en/books/mystery-novels/journey-under-midnight-sun.md`)
- Amazon link: `https://amzn.to/4fd2FSh`
- Book cover: `https://m.media-amazon.com/images/I/81Xan3GQbDL._SL1500_.jpg`
- Status: ✅ Complete with About This Book layout

#### 3. Technical Implementation

**Amazon Configuration** (`.vitepress/amazon-config.js`)
- Amazon Associates ID: `northernscrip-20`
- Book database with metadata for all 7 planned books
- Helper functions for URL generation

**Styling** (`.vitepress/styles/amazon-cta.css`)
- Comprehensive CSS for Amazon CTAs
- Responsive design for mobile/desktop
- Amazon orange color scheme (#FF9900)
- Two CTA types: mid-page and final purchase

**CTA Layout Standards**
- Mid-page CTA: Simple gradient box with button
- Final purchase CTA: Uses `amazon-book-card` layout (same as "About This Book")
  - Horizontal layout: book cover (left) + details (right)
  - Includes: title, author, translator, metadata, price, formats
  - Amazon buy button with cart icon

#### 4. Compliance
- Affiliate disclosure on all pages: "As an Amazon Associate I earn from qualifying purchases."
- Styled subtly with small gray text
- All affiliate links use proper `target="_blank" rel="noopener noreferrer"`

### Remaining Tasks (Pending)

#### Books to Create (4 remaining)
All need individual review pages with same structure as completed pages:

1. **宮部みゆき『模倣犯』(Puppet Master)**
   - Need Amazon product page and affiliate link
   - Need correct book cover image URL
   - Content: Personal review from Japanese reader perspective

2. **島田荘司『占星術殺人事件』(The Tokyo Zodiac Murders)**
   - Need Amazon product page and affiliate link  
   - Need correct book cover image URL
   - Content: Personal review from Japanese reader perspective

3. **綾辻行人『十角館の殺人』(The Decagon House Murders)**
   - Need Amazon product page and affiliate link
   - Need correct book cover image URL
   - Content: Personal review from Japanese reader perspective

4. **横山秀夫『64』(Six Four)**
   - Need Amazon product page and affiliate link
   - Need correct book cover image URL
   - Content: Personal review from Japanese reader perspective

#### Page Template Structure
Each new book page should include:
```markdown
---
layout: doc
title: [Book Title] - Personal Review
description: A Japanese reader's perspective on [description]
head:
  - - meta
    - name: keywords
      content: [book title, author, Japanese mystery, book review]
---

# [Book Title]

<div class="affiliate-disclosure">
  <small>As an Amazon Associate I earn from qualifying purchases.</small>
</div>

## About This Book
[Use AmazonBookCard component or amazon-book-card HTML structure]

## My Personal Take
[Personal review content from Japanese reader perspective]

<div class="mid-page-cta">
  <div class="cta-content">
    <h4>[Compelling headline]</h4>
    <p>[Enticing description]</p>
    <a href="[AMAZON_AFFILIATE_LINK]" target="_blank" rel="noopener noreferrer" class="amazon-cta-button">
      📚 Get Your Copy on Amazon
    </a>
  </div>
</div>

[Continue with review content...]

<div class="final-purchase-cta">
  <div class="amazon-book-card">
    [Same structure as About This Book section]
  </div>
</div>

---

<div class="recommendation-box">
  <h3>If You Enjoyed This...</h3>
  <p>[Cross-references to other books]</p>
</div>
```

### Key Files to Update When Adding New Books

1. **Navigation** (`.vitepress/config.mts`): Add new book to sidebar
2. **Amazon Config** (`.vitepress/amazon-config.js`): Add book metadata
3. **Overview Page** (`/en/books/mystery-novels.md`): Add book to main list
4. **Individual Page**: Create new markdown file in `/en/books/mystery-novels/`

### Amazon Image Collection Process

When adding new books, collect proper Amazon product images:
1. Visit Amazon product page via affiliate link
2. Right-click on book cover → "Copy Image Address" 
3. Verify URL pattern: `https://m.media-amazon.com/images/I/[ID]._SL1500_.jpg`
4. Test URL in browser before adding to code
5. Update both individual page and amazon-config.js

### Important Notes for Continuation

- All content should be English-only (not Japanese)
- Maintain personal perspective as Japanese reader
- Include cultural context and insights
- Keep Amazon Associates compliance
- Use consistent CTA placement and styling
- Test all affiliate links before publishing

### Cross-Reference Update Strategy

When adding new books, update the "If You Enjoyed This..." sections to prioritize same-author recommendations:

**Current Author Groupings:**
- **Keigo Higashino**: The Devotion of Suspect X, Malice, Journey Under the Midnight Sun
- **Other authors**: Individual books (will be grouped as more are added)

**Update Rules:**
1. **Same Author Priority**: Always recommend other books by the same author first
2. **Similar Themes**: Second priority for books with similar psychological/mystery themes
3. **Existing Pages Only**: Never link to non-existent pages
4. **Bidirectional Links**: When adding a new book, update existing books to reference it

**Example Update Process:**
- When adding another Keigo Higashino book, update all 3 existing Higashino pages
- When adding first book by a new author, update 1-2 most similar existing books
- When adding second book by that author, create author-based groupings

**Future Author Groups to Watch For:**
- **Miyuki Miyabe**: Puppet Master (planned) + future additions
- **Soji Shimada**: Tokyo Zodiac Murders (planned) + future additions  
- **Yukito Ayatsuji**: Decagon House Murders (planned) + future additions
- **Hideo Yokoyama**: Six Four (planned) + future additions