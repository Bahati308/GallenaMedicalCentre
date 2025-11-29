# SEO Guide for Gallena Medical Centre

This guide covers SEO best practices and what's been implemented for the Gallena Medical Centre website.

## Current SEO Implementation

### ✅ What's Already Done

1. **Meta Tags**
   - Basic meta description in `index.html`
   - Dynamic titles and descriptions per page using `react-helmet-async`
   - Open Graph tags for social sharing
   - Viewport and theme-color meta tags

2. **Technical SEO**
   - Semantic HTML structure
   - Responsive design
   - Fast loading with image preloading
   - Clean URLs with slugs

3. **Content SEO**
   - Descriptive headings (H1, H2, etc.)
   - Alt text on images
   - Internal linking structure

## SEO Improvements Implemented

### 1. Enhanced Meta Tags

- ✅ Comprehensive Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- ✅ Twitter Card tags
- ✅ Canonical URLs for each page
- ✅ Robots meta tags

### 2. Structured Data (JSON-LD)

- ✅ Medical Organization schema
- ✅ LocalBusiness schema (for Google Business Profile)
- ✅ Service schema for service pages
- ✅ BreadcrumbList schema for navigation

### 3. Additional Improvements

- ✅ Enhanced meta descriptions
- ✅ Better title tags with keywords
- ✅ Image optimization recommendations

## How to Use

### For Each Page

The SEO is automatically handled, but you can customize:

1. **Update page titles** in each page component's `<Helmet>` section
2. **Update descriptions** to be unique and keyword-rich (150-160 characters)
3. **Add images** for Open Graph (og:image) - recommended size: 1200x630px

### Example Customization

```tsx
<Helmet>
  <title>Your Custom Title | Gallena Medical Centre</title>
  <meta name="description" content="Your unique, keyword-rich description here (150-160 chars)" />
  <meta property="og:image" content="/path-to-your-image.jpg" />
</Helmet>
```

## SEO Checklist

### On-Page SEO

- [x] Unique title tags (50-60 characters)
- [x] Meta descriptions (150-160 characters)
- [x] H1 tags on each page
- [x] Alt text on images
- [x] Internal linking
- [x] Mobile-friendly design
- [x] Fast page load times

### Technical SEO

- [x] Structured data (JSON-LD)
- [x] Canonical URLs
- [x] Robots meta tags
- [x] Sitemap (see below)
- [ ] XML Sitemap generation
- [ ] robots.txt file

### Off-Page SEO

- [ ] Google Business Profile setup
- [ ] Local directory listings
- [ ] Social media presence
- [ ] Backlink building

## Next Steps

### 1. Create XML Sitemap

Create a `public/sitemap.xml` file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/services</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add all your pages -->
</urlset>
```

### 2. Create robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

### 3. Google Search Console

1. Sign up at [Google Search Console](https://search.google.com/search-console)
2. Verify your website ownership
3. Submit your sitemap
4. Monitor search performance

### 4. Google Business Profile

1. Create/claim your Google Business Profile
2. Add business information (address, phone, hours)
3. Add photos
4. Encourage patient reviews

### 5. Local SEO

- List on local directories (Yelp, Healthgrades, etc.)
- Ensure NAP (Name, Address, Phone) consistency
- Get local backlinks from community organizations

## Keyword Research Tips

### Primary Keywords

- "medical centre [location]"
- "hospital [location]"
- "doctor [location]"
- "healthcare services [location]"

### Service-Specific Keywords

- "general consultation [location]"
- "dental services [location]"
- "maternity care [location]"
- "surgery [location]"

### Long-Tail Keywords

- "best medical centre near me"
- "affordable healthcare [location]"
- "24/7 medical services [location]"

## Content SEO Best Practices

1. **Write for humans first** - Natural, helpful content
2. **Use keywords naturally** - Don't stuff keywords
3. **Create valuable content** - Blog posts, health tips, FAQs
4. **Update regularly** - Fresh content signals active business
5. **Use internal links** - Link between related pages
6. **Optimize images** - Compress, use descriptive filenames

## Monitoring & Analytics

### Tools to Use

- Google Search Console - Search performance
- Google Analytics - User behavior
- PageSpeed Insights - Performance monitoring
- Lighthouse - Overall SEO score

### Key Metrics to Track

- Organic search traffic
- Keyword rankings
- Click-through rate (CTR)
- Bounce rate
- Page load speed
- Mobile usability

## Common SEO Mistakes to Avoid

1. ❌ Duplicate content across pages
2. ❌ Missing or duplicate title tags
3. ❌ Images without alt text
4. ❌ Slow page load times
5. ❌ Not mobile-friendly
6. ❌ Thin or low-quality content
7. ❌ Broken links
8. ❌ Missing structured data

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Medical Organization](https://schema.org/MedicalOrganization)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

---

**Last Updated:** 2024
**Maintained by:** Development Team
