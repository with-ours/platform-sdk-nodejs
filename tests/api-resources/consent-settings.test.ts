// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource consentSettings', () => {
  test('list', async () => {
    const responsePromise = client.consentSettings.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create', async () => {
    const responsePromise = client.consentSettings.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve', async () => {
    const responsePromise = client.consentSettings.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replace: only required params', async () => {
    const responsePromise = client.consentSettings.replace('id', {
      categories: [
        {
          label: 'label',
          priority: 0,
          value: 'value',
        },
      ],
      default: {
        categories: [
          {
            key: 'key',
            value: { enabled: true },
          },
        ],
        language: 'en',
        mode: 'opt_in',
        translations: [
          {
            language: 'en',
            value: {},
          },
        ],
      },
      name: 'name',
      regions: [
        {
          regionCode: 'US-CA',
          rule: {
            categories: [
              {
                key: 'key',
                value: { enabled: true },
              },
            ],
            language: 'en',
            mode: 'opt_in',
            translations: [
              {
                language: 'en',
                value: {},
              },
            ],
          },
        },
      ],
      services: [{ internalNotes: 'internalNotes', label: 'label' }],
      status: 'Disabled',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replace: required and optional params', async () => {
    const response = await client.consentSettings.replace('id', {
      categories: [
        {
          label: 'label',
          priority: 0,
          value: 'value',
        },
      ],
      default: {
        categories: [
          {
            key: 'key',
            value: {
              enabled: true,
              autoDisableOnGPC: true,
              readOnly: true,
              reloadPage: true,
            },
          },
        ],
        language: 'en',
        mode: 'opt_in',
        translations: [
          {
            language: 'en',
            value: {
              consentModal: {},
              preferencesModal: {},
            },
          },
        ],
        autoblockUnknown: true,
        autoShow: true,
        autoShowDismissConfig: {},
        autoShowDismissMode: 'autoShowDismissMode',
        disablePageInteraction: true,
        guiOptions: {},
        hideFromBots: true,
        showVendorsInPreferences: true,
      },
      name: 'name',
      regions: [
        {
          regionCode: 'US-CA',
          rule: {
            categories: [
              {
                key: 'key',
                value: {
                  enabled: true,
                  autoDisableOnGPC: true,
                  readOnly: true,
                  reloadPage: true,
                },
              },
            ],
            language: 'en',
            mode: 'opt_in',
            translations: [
              {
                language: 'en',
                value: {
                  consentModal: {},
                  preferencesModal: {},
                },
              },
            ],
            autoblockUnknown: true,
            autoShow: true,
            autoShowDismissConfig: {},
            autoShowDismissMode: 'autoShowDismissMode',
            disablePageInteraction: true,
            guiOptions: {},
            hideFromBots: true,
            showVendorsInPreferences: true,
          },
          additionalRegions: ['string'],
        },
      ],
      services: [
        {
          internalNotes: 'internalNotes',
          label: 'label',
          additionalCategories: ['string'],
          category: 'category',
          domainPatterns: ['string'],
        },
      ],
      status: 'Disabled',
      consentCookieName: 'consentCookieName',
      customDomain: 'customDomain',
      deviceIdCookieName: 'deviceIdCookieName',
      revision: 0,
      skipBlockingClassNames: ['string'],
      webSDKToken: 'webSDKToken',
      whitelistDomains: ['string'],
    });
  });

  test('update', async () => {
    const responsePromise = client.consentSettings.update('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete', async () => {
    const responsePromise = client.consentSettings.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('analytics: only required params', async () => {
    const responsePromise = client.consentSettings.analytics('id', { from: '2026-04-01', to: '2026-04-30' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('analytics: required and optional params', async () => {
    const response = await client.consentSettings.analytics('id', {
      from: '2026-04-01',
      to: '2026-04-30',
      compareWithPreviousPeriod: true,
      granularity: 'DAILY',
      pagePath: '/pricing',
      regions: 'California',
    });
  });

  test('pageAnalysis: only required params', async () => {
    const responsePromise = client.consentSettings.pageAnalysis('id', {
      from: '2026-04-01',
      to: '2026-04-30',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('pageAnalysis: required and optional params', async () => {
    const response = await client.consentSettings.pageAnalysis('id', {
      from: '2026-04-01',
      to: '2026-04-30',
      limit: 1,
      offset: 0,
      regions: 'California',
      search: '/checkout',
    });
  });

  test('analyticsByRegion: only required params', async () => {
    const responsePromise = client.consentSettings.analyticsByRegion('id', {
      from: '2026-04-01',
      to: '2026-04-30',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('analyticsByRegion: required and optional params', async () => {
    const response = await client.consentSettings.analyticsByRegion('id', {
      from: '2026-04-01',
      to: '2026-04-30',
    });
  });
});
