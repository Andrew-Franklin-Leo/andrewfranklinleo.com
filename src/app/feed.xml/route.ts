import { getAllEssays } from '@/lib/essays';

export async function GET() {
  const essays = getAllEssays();
  const baseUrl = 'https://andrewfranklinleo.com';

  const items = essays.map((e) => `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${baseUrl}/essays/${e.slug}</link>
      <description>${escapeXml(e.subtitle)}</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/essays/${e.slug}</guid>
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>andrewfranklinleo.com — AI Governance Intelligence</title>
    <link>${baseUrl}</link>
    <description>The narrative platform for AI governance. Regulatory intelligence, enforcement tracking, and accountability architecture.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
