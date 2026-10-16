// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource funnels', () => {
  test('list', async () => {
    const responsePromise = client.funnels.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: only required params', async () => {
    const responsePromise = client.funnels.create({
      name: 'x',
      queryDefinition: {
        counting: 'unique',
        identity: 'session',
        kind: 'funnel',
        order: 'ordered',
        reentry: 'first',
        steps: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            eventName: 'x',
            name: 'x',
          },
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            eventName: 'x',
            name: 'x',
          },
        ],
        version: 1,
        windowMs: 1,
      },
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
    const response = await client.funnels.create({
      name: 'x',
      queryDefinition: {
        counting: 'unique',
        identity: 'session',
        kind: 'funnel',
        order: 'ordered',
        reentry: 'first',
        steps: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            eventName: 'x',
            name: 'x',
            filter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
          },
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            eventName: 'x',
            name: 'x',
            filter: {
              filter: { children: [], kind: 'and' },
              version: 1,
            },
          },
        ],
        version: 1,
        windowMs: 1,
        entryFilter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
        filter: {
          filter: { children: [], kind: 'and' },
          version: 1,
        },
      },
      description: 'description',
      watched: true,
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.funnels.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.funnels.update('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete', async () => {
    const responsePromise = client.funnels.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('duplicate', async () => {
    const responsePromise = client.funnels.duplicate('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('results: only required params', async () => {
    const responsePromise = client.funnels.results('id', { from: '2026-06-01', to: '2026-06-30' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('results: required and optional params', async () => {
    const response = await client.funnels.results('id', {
      from: '2026-06-01',
      to: '2026-06-30',
      expectedDefinitionUpdatedAt: '2019-12-27T18:11:19.117Z',
    });
  });
});
