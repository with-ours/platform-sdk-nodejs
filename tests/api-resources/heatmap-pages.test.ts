// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource heatmapPages', () => {
  test('list: only required params', async () => {
    const responsePromise = client.heatmapPages.list({ from: '2026-04-01', to: '2026-04-30' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.heatmapPages.list({
      from: '2026-04-01',
      to: '2026-04-30',
      browserName: 'Chrome',
      country: 'x',
      cursor: 'cursor',
      limit: 25,
      region: 'x',
      search: '/pricing',
      sortBy: 'CLICKS',
      sortDir: 'ASC',
    });
  });

  test('summary: only required params', async () => {
    const responsePromise = client.heatmapPages.summary({
      breakpoint: 'desktop',
      from: '2026-04-01',
      pageKey: 'https://example.com/pricing',
      to: '2026-04-30',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('summary: required and optional params', async () => {
    const response = await client.heatmapPages.summary({
      breakpoint: 'desktop',
      from: '2026-04-01',
      pageKey: 'https://example.com/pricing',
      to: '2026-04-30',
      browserName: 'Chrome',
      country: 'x',
      region: 'x',
    });
  });
});
