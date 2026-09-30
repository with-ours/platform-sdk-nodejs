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
      defaultProperties: {
        _ef_transaction_id: '_ef_transaction_id',
        activeDuration: 0,
        ad_id: 'ad_id',
        admitad_uid: 'admitad_uid',
        adset_id: 'adset_id',
        alart: 'alart',
        aleid: 'aleid',
        axwrt: 'axwrt',
        basis_cid: 'basis_cid',
        beeswax_auction_id: 'beeswax_auction_id',
        browser_language: 'browser_language',
        browser_name: 'browser_name',
        browser_version: 'browser_version',
        campaign_id: 'campaign_id',
        clickid: 'clickid',
        clid: 'clid',
        cpu_architecture: 'cpu_architecture',
        current_url: 'https://example.com/checkout',
        dclid: 'dclid',
        device_model: 'device_model',
        device_type: 'device_type',
        device_vendor: 'device_vendor',
        duration: 0,
        encoding: 'encoding',
        engine_name: 'engine_name',
        engine_version: 'engine_version',
        epik: 'epik',
        fbc: 'fbc',
        fbclid: 'fbclid',
        fbp: 'fbp',
        fv: true,
        gad_source: 'gad_source',
        gbraid: 'gbraid',
        gclid: 'gclid',
        host: 'host',
        iframe: true,
        im_ref: 'im_ref',
        ip: 'ip',
        irclickid: 'irclickid',
        is_bot: true,
        li_fat_id: 'li_fat_id',
        msclkid: 'msclkid',
        ndclid: 'ndclid',
        new_s: true,
        ob_click_id: 'ob_click_id',
        oppref: 'oppref',
        os_name: 'os_name',
        os_version: 'os_version',
        page_hash: 0,
        pathname: 'pathname',
        qclid: 'qclid',
        rdt_cid: 'rdt_cid',
        received_at: 'received_at',
        referrer: 'https://example.com',
        referring_domain: 'referring_domain',
        sacid: 'sacid',
        sccid: 'sccid',
        screen_height: 0,
        screen_width: 0,
        sessionCount: 0,
        sid: 'sid',
        sr: 'sr',
        title: 'title',
        ttclid: 'ttclid',
        twclid: 'twclid',
        uafvl: 'uafvl',
        user_agent: 'user_agent',
        utm_campaign: 'utm_campaign',
        utm_content: 'utm_content',
        utm_medium: 'utm_medium',
        utm_name: 'utm_name',
        utm_source: 'utm_source',
        utm_term: 'utm_term',
        version: 'version',
        viant_click_id: 'viant_click_id',
        viant_impression_id: 'viant_impression_id',
        wbraid: 'wbraid',
        webview: true,
      },
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
