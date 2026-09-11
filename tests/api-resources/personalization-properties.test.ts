// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource personalizationProperties', () => {
  test('list: only required params', async () => {
    const responsePromise = client.personalizationProperties.list({
      experimentSettingsId: '08524dc8-5289-48e8-bf40-b3a7cfa6ca0a',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.personalizationProperties.list({
      experimentSettingsId: '08524dc8-5289-48e8-bf40-b3a7cfa6ca0a',
      cursor: 'cursor',
      limit: 25,
    });
  });

  test('create: only required params', async () => {
    const responsePromise = client.personalizationProperties.create({
      accumulator: 'set_true',
      experimentSettingsId: '08524dc8-5289-48e8-bf40-b3a7cfa6ca0a',
      propertyKey: 'visited_pricing',
      triggerEventName: 'page_view',
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
    const response = await client.personalizationProperties.create({
      accumulator: 'set_true',
      experimentSettingsId: '08524dc8-5289-48e8-bf40-b3a7cfa6ca0a',
      propertyKey: 'visited_pricing',
      triggerEventName: 'page_view',
      triggerConditions: [
        {
          field: 'event.context.current_url',
          operator: 'contains',
          value: '/pricing',
        },
      ],
      valueField: 'event.context.utm_campaign',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.personalizationProperties.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.personalizationProperties.update('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete', async () => {
    const responsePromise = client.personalizationProperties.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
