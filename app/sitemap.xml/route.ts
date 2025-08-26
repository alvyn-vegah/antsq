import { sitemapdata } from "@/customComponents/seo/sitemapdata";

export async function GET() {
  const urls = sitemapdata.map(({ url, lastModified }) => {
    return `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastModified.toISOString()}</lastmod>
      </url>
    `;
  }).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
