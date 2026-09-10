// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource attribution', () => {
  test('initial: only required params', async () => {
    const responsePromise = client.attribution.initial({
      eventName: 'purchase',
      from: '2026-05-01',
      to: '2026-06-30',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('initial: required and optional params', async () => {
    const response = await client.attribution.initial({
      eventName: 'purchase',
      from: '2026-05-01',
      to: '2026-06-30',
      attributionType: 'INITIAL',
      utmCampaign: 'x',
      utmContent: 'x',
      utmMedium: 'x',
      utmName: 'x',
      utmSource: 'x',
      utmTerm: 'x',
    });
  });

  test('lastTouch: only required params', async () => {
    const responsePromise = client.attribution.lastTouch({
      eventName: 'purchase',
      from: '2026-05-01',
      to: '2026-06-30',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('lastTouch: required and optional params', async () => {
    const response = await client.attribution.lastTouch({
      eventName: 'purchase',
      from: '2026-05-01',
      to: '2026-06-30',
      attributionType: 'INITIAL',
      utmCampaign: 'x',
      utmContent: 'x',
      utmMedium: 'x',
      utmName: 'x',
      utmSource: 'x',
      utmTerm: 'x',
    });
  });

  test('conversion: only required params', async () => {
    const responsePromise = client.attribution.conversion({
      attributionModel: 'FIRST_TOUCH',
      eventName: 'purchase',
      from: '2026-06-01',
      to: '2026-06-30',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('conversion: required and optional params', async () => {
    const response = await client.attribution.conversion({
      attributionModel: 'FIRST_TOUCH',
      eventName: 'purchase',
      from: '2026-06-01',
      to: '2026-06-30',
      limit: 1,
      lookbackWindow: 'SEVEN_DAYS',
      webSourceId: 'x',
    });
  });

  test('audienceConversion: only required params', async () => {
    const responsePromise = client.attribution.audienceConversion({
      eventName: 'purchase',
      from: '2026-05-01',
      to: '2026-06-30',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('audienceConversion: required and optional params', async () => {
    const response = await client.attribution.audienceConversion({
      eventName: 'purchase',
      from: '2026-05-01',
      to: '2026-06-30',
      attributionWindow: 'IN_RANGE',
      valueProperty: 'revenue',
    });
  });

  test('utmComparison: only required params', async () => {
    const responsePromise = client.attribution.utmComparison({
      combos: '[{"utmSource":"google","utmMedium":"cpc"},{"utmSource":"meta"}]',
      eventName: 'purchase',
      from: '2026-06-01',
      to: '2026-06-30',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('utmComparison: required and optional params', async () => {
    const response = await client.attribution.utmComparison({
      combos: '[{"utmSource":"google","utmMedium":"cpc"},{"utmSource":"meta"}]',
      eventName: 'purchase',
      from: '2026-06-01',
      to: '2026-06-30',
    });
  });
});
