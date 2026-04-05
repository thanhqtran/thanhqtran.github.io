# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Quang-Thanh Tran, built with **Jekyll Now** (v1.2.0) and hosted on **GitHub Pages**. The site serves as a blog with research notes, teaching materials, and a CV. It is deployed automatically by GitHub Pages on push to `master`.

## Development

There is no local build system or Gemfile checked in. The site is built entirely by GitHub Pages. To preview locally, install Jekyll and run:

```
gem install jekyll bundler
jekyll serve
```

The site uses GitHub-flavored Kramdown for Markdown and MathJax for LaTeX rendering.

## Architecture

- **`_config.yml`** — Site metadata, footer social links, Disqus/GA config, Jekyll plugins (jekyll-sitemap, jekyll-feed, jekyll-seo-tag)
- **`_layouts/`** — Three layouts: `default.html` (shell with nav, search bar, footer, analytics, MathJax, dark mode), `page.html`, `post.html`
- **`_includes/`** — Partials for analytics, Disqus comments, Google Tag Manager, SVG social icons, image gallery, reading time, blog series
- **`_sass/`** — `_variables.scss` (colors, fonts, mobile breakpoint), `_reset.scss`, `_highlights.scss`, `_svg-icons.scss`
- **`style.scss`** — Main stylesheet importing all Sass partials; includes light/dark mode via `[data-theme="dark"]`
- **`js/`** — `theme-toggle.js` (dark mode), `lightbox.js`, `stats.js`
- **`_posts/`** — Blog posts in `YYYY-M-D-slug.md` format with YAML front matter (`layout: post`, `title`, `published`, `date`, `categories`, `tags`)
- **Top-level `.md` pages** — `research.md`, `teaching.md`, `vitae.md`, `notes.md`, `data.md`, etc. (use `layout: page`)

## Blog Post Conventions

Posts use this front matter pattern:
```yaml
---
layout: post
title: Post Title
published: true
date: YYYY-M-D
categories: [CategoryName]
tags: [tag1, tag2]
---
```

- Use `<!--more-->` to mark the excerpt break point
- Use `{% include series.html %}` for multi-part blog series
- MathJax is available globally: inline math with `$...$`, display math with `$$...$$`
- Images go in `images/` or `uploads/`; use relative paths

## Key Customizations Over Base Jekyll Now

- Search bar in the header (routes to `/search/`)
- Browse by category (`/categoryview`) and date (`/monthview`)
- Blog series support via `_includes/series.html`
- Light/dark mode toggle with localStorage persistence
- Noto Sans as primary font (loaded from Google Fonts)
- Related posts display
- Disqus comment integration
- Google Analytics (GA4) + Google Tag Manager
