// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource dashboards', () => {
  test('list', async () => {
    const responsePromise = client.dashboards.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.dashboards.list(
        {
          cursor: 'cursor',
          limit: 0,
          search: 'search',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OursPrivacyPlatform.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.dashboards.create({
      name: 'x',
      reportContext: { dateRange: { from: '7321-69-10', to: '7321-69-10' } },
      tiles: [
        {
          id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          layout: { height: 240, width: 3 },
          report: { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', kind: 'insight' },
        },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.dashboards.create({
      name: 'x',
      reportContext: {
        dateRange: {
          from: '7321-69-10',
          to: '7321-69-10',
          timeZone: 'UTC',
        },
      },
      tiles: [
        {
          id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          layout: { height: 240, width: 3 },
          report: { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', kind: 'insight' },
        },
      ],
      description: 'description',
      filter: {
        filter: { children: [{ children: [], kind: 'and' }], kind: 'and' },
        version: 1,
      },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.dashboards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: only required params', async () => {
    const responsePromise = client.dashboards.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.dashboards.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      description: 'description',
      filter: {
        filter: { children: [{ children: [], kind: 'and' }], kind: 'and' },
        version: 1,
      },
      name: 'x',
      reportContext: {
        dateRange: {
          from: '7321-69-10',
          to: '7321-69-10',
          timeZone: 'UTC',
        },
      },
      tiles: [
        {
          id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          layout: { height: 240, width: 3 },
          report: { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', kind: 'insight' },
        },
      ],
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.dashboards.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.dashboards.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('duplicate: only required params', async () => {
    const responsePromise = client.dashboards.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('duplicate: required and optional params', async () => {
    const response = await client.dashboards.duplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('preview: only required params', async () => {
    const responsePromise = client.dashboards.preview({
      input:
        '{"tileId":"11111111-1111-4111-8111-111111111111","report":{"kind":"insight","id":"22222222-2222-4222-8222-222222222222"},"context":{"from":"2026-09-01","to":"2026-09-07"},"comparison":{"kind":"previous_period"}}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('preview: required and optional params', async () => {
    const response = await client.dashboards.preview({
      input:
        '{"tileId":"11111111-1111-4111-8111-111111111111","report":{"kind":"insight","id":"22222222-2222-4222-8222-222222222222"},"context":{"from":"2026-09-01","to":"2026-09-07"},"comparison":{"kind":"previous_period"}}',
    });
  });

  test('results: only required params', async () => {
    const responsePromise = client.dashboards.results('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      context: 'context',
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      tileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('results: required and optional params', async () => {
    const response = await client.dashboards.results('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      context: 'context',
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      tileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      comparison: 'comparison',
    });
  });

  test('replayTileResult: only required params', async () => {
    const responsePromise = client.dashboards.replayTileResult('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      context: 'context',
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      tileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replayTileResult: required and optional params', async () => {
    const response = await client.dashboards.replayTileResult('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      context: 'context',
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      tileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('replayPreview: only required params', async () => {
    const responsePromise = client.dashboards.replayPreview({
      input:
        '{"tileId":"11111111-1111-4111-8111-111111111111","replays":{"title":"Recent checkouts","pathname":"/checkout","limit":10},"context":{"from":"2026-09-01","to":"2026-09-07"}}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replayPreview: required and optional params', async () => {
    const response = await client.dashboards.replayPreview({
      input:
        '{"tileId":"11111111-1111-4111-8111-111111111111","replays":{"title":"Recent checkouts","pathname":"/checkout","limit":10},"context":{"from":"2026-09-01","to":"2026-09-07"}}',
    });
  });
});
