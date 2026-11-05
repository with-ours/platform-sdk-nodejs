#!/usr/bin/env -S pnpm tsn -T
// Read-only: export web analytics for a warehouse or BI tool.
// webAnalytics.* reports have no cursor and return everything in one response, so the part that
// pages is heatmapPages.list, a per-page click report under the same web-analytics:view scope.
//
// Run from the repo root (OURS_PRIVACY_PLATFORM_BASE_URL optionally overrides the host):
//   OURS_PRIVACY_API_KEY=<api key> pnpm tsn -T examples/export-web-analytics.ts
import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_PAGES = 5; // keep the example bounded; raise it for a real export

const utcDay = (daysAgo: number) => new Date(Date.now() - daysAgo * DAY_MS).toISOString().slice(0, 10);

async function main() {
  if (!process.env['OURS_PRIVACY_API_KEY']) {
    throw new Error('Missing OURS_PRIVACY_API_KEY: set it to your platform API key.');
  }
  const client = new OursPrivacyPlatform();
  const range = { from: utcDay(30), to: utcDay(1) }; // heatmap windows are limited to 60 days

  const topPages = await client.webAnalytics.pages({ ...range, view: 'top' });
  console.log(`top pages: ${topPages.rows.length} of ${topPages.totalCount}`);
  for (const row of topPages.rows) console.log(row.pagePath, row.pageviews);

  const firstPage = await client.heatmapPages.list({ ...range, limit: 100 });
  let pageNumber = 0;
  for await (const page of firstPage.iterPages()) {
    pageNumber++;
    console.log(`heatmap page ${pageNumber}: ${page.entities.length} rows`);
    for (const entity of page.entities) console.log(entity.pageKey, entity.totalClicks);
    if (pageNumber === MAX_PAGES && page.hasNextPage()) {
      console.log(`stopped at MAX_PAGES=${MAX_PAGES}; more rows are available`);
      break;
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
