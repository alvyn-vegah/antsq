import { blogPosts } from '@/customComponents/blogs-data';
import { NextResponse } from 'next/server';
    
export async function GET() {
  const siteUrl = 'https://yourdomain.com';

  const items = blogPosts.map((post, i) => `
    <item>
      <title><![CDATA[${post.heading}]]></title>
      <link>${siteUrl}/blog/${i}</link>
      <description><![CDATA[${post.description}]]></description>
      <category>${post.category}</category>
      <guid>${siteUrl}/blog/${i}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  `).join('');

  const rss = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Your Blog Name</title>
        <link>${siteUrl}/blog</link>
        <description>Your blog's RSS feed description.</description>
        ${items}
      </channel>
    </rss>
  `;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
