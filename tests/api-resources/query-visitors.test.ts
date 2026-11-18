// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource queryVisitors', () => {
  test('list: only required params', async () => {
    const responsePromise = client.queryVisitors.list({
      input:
        '{"version":1,"from":"2026-11-01","to":"2026-11-17","include":[{"eventNames":["Purchase"]}],"match":"ANY"}',
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
    const response = await client.queryVisitors.list({
      input:
        '{"version":1,"from":"2026-11-01","to":"2026-11-17","include":[{"eventNames":["Purchase"]}],"match":"ANY"}',
    });
  });

  test('capabilities', async () => {
    const responsePromise = client.queryVisitors.capabilities();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('profileSearch: only required params', async () => {
    const responsePromise = client.queryVisitors.profileSearch({
      input: '{"search":"example-visitor","from":"2026-11-01","to":"2026-11-17","limit":8}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('profileSearch: required and optional params', async () => {
    const response = await client.queryVisitors.profileSearch({
      input: '{"search":"example-visitor","from":"2026-11-01","to":"2026-11-17","limit":8}',
    });
  });
});
