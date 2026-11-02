import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://jobgyaan.in/', lastModified: new Date() },
    { url: 'https://jobgyaan.in/exams', lastModified: new Date() },
    { url: 'https://jobgyaan.in/leaderboard', lastModified: new Date() },
  ];
}
