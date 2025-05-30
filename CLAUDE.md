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