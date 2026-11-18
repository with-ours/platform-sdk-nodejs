// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource queryEvents', () => {
  test('list: only required params', async () => {
    const responsePromise = client.queryEvents.list({
      input: '{"version":1,"from":"2026-11-01","to":"2026-11-17","include":[{"eventNames":["Purchase"]}]}',
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
    const response = await client.queryEvents.list({
      input: '{"version":1,"from":"2026-11-01","to":"2026-11-17","include":[{"eventNames":["Purchase"]}]}',
      cursor: 'x',
      includeCount: true,
      limit: 0,
    });
  });

  test('capabilities', async () => {
    const responsePromise = client.queryEvents.capabilities();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('catalog', async () => {
    const responsePromise = client.queryEvents.catalog();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('propertySuggestions', async () => {
    const responsePromise = client.queryEvents.propertySuggestions();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('propertySuggestions: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.queryEvents.propertySuggestions(
        { eventName: 'purchase', sourceId: 'x' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OursPrivacyPlatform.NotFoundError);
  });

  test('eventNames', async () => {
    const responsePromise = client.queryEvents.eventNames();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('occurrence: only required params', async () => {
    const responsePromise = client.queryEvents.occurrence({
      cursor: 'x',
      input: '{"version":1,"from":"2026-11-01","to":"2026-11-17","include":[{"eventNames":["Purchase"]}]}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('occurrence: required and optional params', async () => {
    const response = await client.queryEvents.occurrence({
      cursor: 'x',
      input: '{"version":1,"from":"2026-11-01","to":"2026-11-17","include":[{"eventNames":["Purchase"]}]}',
    });
  });

  test('export: only required params', async () => {
    const responsePromise = client.queryEvents.export({
      format: 'CSV',
      input: '{"version":1,"from":"2026-11-01","to":"2026-11-17","include":[{"eventNames":["Purchase"]}]}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('export: required and optional params', async () => {
    const response = await client.queryEvents.export({
      format: 'CSV',
      input: '{"version":1,"from":"2026-11-01","to":"2026-11-17","include":[{"eventNames":["Purchase"]}]}',
      cursor: 'x',
      limit: 0,
    });
  });
});
