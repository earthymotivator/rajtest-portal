import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://rajtest.in/', lastModified: new Date() },
    { url: 'https://rajtest.in/exams', lastModified: new Date() },
    { url: 'https://rajtest.in/dashboard', lastModified: new Date() },
    { url: 'https://rajtest.in/admin', lastModified: new Date() },
  ];
}
