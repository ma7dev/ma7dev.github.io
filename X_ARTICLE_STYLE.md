# X-Like Article Redesign

This website has been redesigned to resemble X (formerly Twitter) articles. The new design includes clean typography, minimalist layout, and better readability. It also integrates with discussion platforms like X and Hacker News.

## Features

- Clean, minimalist design inspired by X article style
- Dark mode by default (though light mode is available)
- Integration with X and Hacker News for discussions
- Responsive design across desktop and mobile devices

### Using Thumbnail Images

To add a thumbnail image to your article, add the following to your article front matter:

```yaml
thumbnail: /path/to/your/image.jpg
```

The thumbnail will appear at the top of your article and in the articles listing.

### Left-aligned Table of Contents

To add a left-aligned table of contents to your article, add the following to your article front matter:

```yaml
toc:
  sidebar: left
```

On mobile devices, the table of contents will appear at the top of the article instead of the sidebar.

### Adding Discussion Links to Your Articles

To add discussion links to your articles, add the following front matter to your markdown files:

```yaml
x_thread_link: https://x.com/username/status/123456789
hackernews_link: https://news.ycombinator.com/item?id=123456
```

To create an X thread for your article:
1. Publish your article on your website
2. Share the article link on X
3. Copy the URL of your X post and add it to the `x_thread_link` front matter

To create a Hacker News discussion:
1. Go to https://news.ycombinator.com/submit
2. Submit your article URL
3. Copy the URL of the Hacker News submission page and add it to the `hackernews_link` front matter

This will automatically add discussion buttons at the bottom of your article and small discussion icons in the articles view.

## Table of Contents

To enable the left-aligned table of contents, add this to your front matter:

```yaml
---
toc: true
---
```

## Design Elements

The design uses:
- System font stack (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif)
- Dark background with light text for better reading experience
- X-blue (#1d9bf0) accent color for links and interactive elements
- Subtle metadata presentation
- Focused reading experience
- Clear visual hierarchy

## Design Reference

This design is based on X articles style as seen at: https://x.com/yacineMTB/article/1899647169155707288

## Mobile Responsiveness

The design is fully responsive and works well on all device sizes. On mobile devices, the table of contents will appear above the content. 