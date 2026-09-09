// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sessionReplays', () => {
  test('list: only required params', async () => {
    const responsePromise = client.sessionReplays.list({ from: '2019-12-27', to: '2019-12-27' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.sessionReplays.list({
      from: '2019-12-27',
      to: '2019-12-27',
      cursor: 'x',
      eventName: 'x',
      limit: 1,
      pathname: 'x',
      sessionIds: 'sessionIds',
      utmCampaign: 'x',
      utmContent: 'x',
      utmMedium: 'x',
      utmName: 'x',
      utmSource: 'x',
      utmTerm: 'x',
      visitorId: 'x',
    });
  });

  test('overview: only required params', async () => {
    const responsePromise = client.sessionReplays.overview({ from: '2019-12-27', to: '2019-12-27' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('overview: required and optional params', async () => {
    const response = await client.sessionReplays.overview({ from: '2019-12-27', to: '2019-12-27' });
  });
});
