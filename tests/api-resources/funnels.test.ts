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
      name: 'name',
      steps: [
        { eventName: 'eventName', name: 'name', order: 0 },
        { eventName: 'eventName', name: 'name', order: 0 },
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
    const response = await client.funnels.create({
      name: 'name',
      steps: [
        {
          eventName: 'eventName',
          name: 'name',
          order: 0,
          filters: {},
          logic: {
            AND: [{}],
            condition: { operator: 'Is', property: 'property', value: 'value' },
            NOT: {},
            OR: [{}],
          },
        },
        {
          eventName: 'eventName',
          name: 'name',
          order: 0,
          filters: {},
          logic: {
            AND: [{}],
            condition: { operator: 'Is', property: 'property', value: 'value' },
            NOT: {},
            OR: [{}],
          },
        },
      ],
      conversionWindow: {},
      countingMethod: 'countingMethod',
      description: 'description',
      funnelType: 'SESSION_BASED',
      globalLogic: {
        AND: [{}],
        condition: { operator: 'Is', property: 'property', value: 'value' },
        NOT: {},
        OR: [{}],
      },
      stepOrder: 'stepOrder',
      utmFilters: {},
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
      attributionType: 'INITIAL',
      deviceType: 'DESKTOP',
      utmCampaign: 'x',
      utmContent: 'x',
      utmMedium: 'x',
      utmName: 'x',
      utmSource: 'x',
      utmTerm: 'x',
    });
  });
});
