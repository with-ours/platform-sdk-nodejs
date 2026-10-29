// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource insights', () => {
  test('list', async () => {
    const responsePromise = client.insights.list();
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
      client.insights.list(
        {
          cursor: 'cursor',
          limit: 25,
          search: 'search',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OursPrivacyPlatform.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.insights.create({
      definition: {
        interval: 'day',
        kind: 'insight',
        metrics: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            aggregation: 'event_count',
            eventNames: ['x'],
            name: 'x',
          },
        ],
        version: 1,
      },
      name: 'x',
      reportContext: { dateRange: { from: '7321-69-10', to: '7321-69-10' } },
      view: {},
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
    const response = await client.insights.create({
      definition: {
        interval: 'day',
        kind: 'insight',
        metrics: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            aggregation: 'event_count',
            eventNames: ['x'],
            name: 'x',
            filter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
            property: {
              path: ['x'],
              property: 'event.properties',
              type: 'number',
            },
          },
        ],
        version: 1,
        filter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
      },
      name: 'x',
      reportContext: {
        dateRange: {
          from: '7321-69-10',
          to: '7321-69-10',
          timeZone: 'UTC',
        },
      },
      view: {
        cumulative: true,
        series: [
          {
            metricId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            color: '#E1CB97',
            hidden: true,
          },
        ],
        smoothing: 'none',
        smoothingWindow: 2,
        stacked: true,
        tableSort: { column: 'label', direction: 'asc' },
        visualization: 'line',
        yAxisScale: 'linear',
      },
      description: 'description',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.insights.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: only required params', async () => {
    const responsePromise = client.insights.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
    const response = await client.insights.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      definition: {
        interval: 'day',
        kind: 'insight',
        metrics: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            aggregation: 'event_count',
            eventNames: ['x'],
            name: 'x',
            filter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
            property: {
              path: ['x'],
              property: 'event.properties',
              type: 'number',
            },
          },
        ],
        version: 1,
        filter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
      },
      description: 'description',
      name: 'x',
      reportContext: {
        dateRange: {
          from: '7321-69-10',
          to: '7321-69-10',
          timeZone: 'UTC',
        },
      },
      view: {
        cumulative: true,
        series: [
          {
            metricId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            color: '#E1CB97',
            hidden: true,
          },
        ],
        smoothing: 'none',
        smoothingWindow: 2,
        stacked: true,
        tableSort: { column: 'label', direction: 'asc' },
        visualization: 'line',
        yAxisScale: 'linear',
      },
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.insights.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
    const response = await client.insights.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('capabilities', async () => {
    const responsePromise = client.insights.capabilities();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('results: only required params', async () => {
    const responsePromise = client.insights.results('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  test('results: required and optional params', async () => {
    const response = await client.insights.results('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      comparison: 'comparison',
      cumulativeOverride: true,
      reportContextOverride: 'reportContextOverride',
      smoothingWindowOverride: 2,
    });
  });

  test('preview: only required params', async () => {
    const responsePromise = client.insights.preview({ input: 'input' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('preview: required and optional params', async () => {
    const response = await client.insights.preview({ input: 'input' });
  });
});
