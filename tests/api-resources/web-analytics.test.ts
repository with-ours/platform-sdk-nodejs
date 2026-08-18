// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource webAnalytics', () => {
  test('currentVisitors', async () => {
    const responsePromise = client.webAnalytics.currentVisitors();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('currentVisitors: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.webAnalytics.currentVisitors(
        { webSourceId: 'webSourceId' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OursPrivacyPlatform.NotFoundError);
  });

  test('devices: only required params', async () => {
    const responsePromise = client.webAnalytics.devices({
      dimension: 'device',
      from: '2026-07-01',
      to: '2026-07-31',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('devices: required and optional params', async () => {
    const response = await client.webAnalytics.devices({
      dimension: 'device',
      from: '2026-07-01',
      to: '2026-07-31',
      excludeBots: true,
      filters: '[{"dimension":"country","values":["United States"]}]',
      webSourceId: 'webSourceId',
    });
  });

  test('journey: only required params', async () => {
    const responsePromise = client.webAnalytics.journey({
      from: '2026-07-01',
      path: '[]',
      to: '2026-07-31',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('journey: required and optional params', async () => {
    const response = await client.webAnalytics.journey({
      from: '2026-07-01',
      path: '[]',
      to: '2026-07-31',
      direction: 'forward',
      excludeBots: true,
      filters: '[{"dimension":"country","values":["United States"]}]',
      limit: 1,
      search: 'search',
      stepKind: 'PAGE',
      webSourceId: 'webSourceId',
    });
  });

  test('locations: only required params', async () => {
    const responsePromise = client.webAnalytics.locations({
      dimension: 'country',
      from: '2026-07-01',
      to: '2026-07-31',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('locations: required and optional params', async () => {
    const response = await client.webAnalytics.locations({
      dimension: 'country',
      from: '2026-07-01',
      to: '2026-07-31',
      excludeBots: true,
      filters: '[{"dimension":"country","values":["United States"]}]',
      webSourceId: 'webSourceId',
    });
  });

  test('overview: only required params', async () => {
    const responsePromise = client.webAnalytics.overview({
      from: '2026-07-01',
      interval: 'minute',
      metric: 'unique_visitors',
      to: '2026-07-31',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('overview: required and optional params', async () => {
    const response = await client.webAnalytics.overview({
      from: '2026-07-01',
      interval: 'minute',
      metric: 'unique_visitors',
      to: '2026-07-31',
      excludeBots: true,
      filters: '[{"dimension":"country","values":["United States"]}]',
      realtimeFrom: '2026-07-31T00:00:00Z',
      webSourceId: 'webSourceId',
    });
  });

  test('pages: only required params', async () => {
    const responsePromise = client.webAnalytics.pages({
      from: '2026-07-01',
      to: '2026-07-31',
      view: 'top',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('pages: required and optional params', async () => {
    const response = await client.webAnalytics.pages({
      from: '2026-07-01',
      to: '2026-07-31',
      view: 'top',
      excludeBots: true,
      filters: '[{"dimension":"country","values":["United States"]}]',
      webSourceId: 'webSourceId',
    });
  });

  test('sources: only required params', async () => {
    const responsePromise = client.webAnalytics.sources({
      dimension: 'referrer',
      from: '2026-07-01',
      to: '2026-07-31',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sources: required and optional params', async () => {
    const response = await client.webAnalytics.sources({
      dimension: 'referrer',
      from: '2026-07-01',
      to: '2026-07-31',
      excludeBots: true,
      filters: '[{"dimension":"country","values":["United States"]}]',
      webSourceId: 'webSourceId',
    });
  });
});
