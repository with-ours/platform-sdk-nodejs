// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource testEvents', () => {
  test('list', async () => {
    const responsePromise = client.testEvents.list();
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
      client.testEvents.list({ cursor: 'cursor', limit: 25 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OursPrivacyPlatform.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.testEvents.create({ eventName: 'Purchase' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.testEvents.create({
      eventName: 'Purchase',
      defaultProperties: {},
      distinctId: 'distinctId',
      eventProperties: { revenue: 42.5, currency: 'USD' },
      sourceId: 'sourceId',
      userProperties: { email: 'test@example.com' },
      visitorId: 'visitorId',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.testEvents.retrieve('a1b2c3d4:ck9x8y7z6w5v4u3t');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('dispatches', async () => {
    const responsePromise = client.testEvents.dispatches('a1b2c3d4:ck9x8y7z6w5v4u3t');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
