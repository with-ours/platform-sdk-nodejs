// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OursPrivacyPlatform from '@oursprivacy/platform-sdk';

const client = new OursPrivacyPlatform({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource consentSettings', () => {
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

  test('update: only required params', async () => {
    const responsePromise = client.consentSettings.update('id', {
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
        language: 'language',
        mode: 'opt_in',
        translations: [
          {
            language: 'language',
            value: {},
          },
        ],
      },
      name: 'name',
      regions: [
        {
          regionCode: 'regionCode',
          rule: {
            categories: [
              {
                key: 'key',
                value: { enabled: true },
              },
            ],
            language: 'language',
            mode: 'opt_in',
            translations: [
              {
                language: 'language',
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

  test('update: required and optional params', async () => {
    const response = await client.consentSettings.update('id', {
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
        language: 'language',
        mode: 'opt_in',
        translations: [
          {
            language: 'language',
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
          regionCode: 'regionCode',
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
            language: 'language',
            mode: 'opt_in',
            translations: [
              {
                language: 'language',
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
          additionalRegions: [{}],
        },
      ],
      services: [
        {
          internalNotes: 'internalNotes',
          label: 'label',
          additionalCategories: [{}],
          category: 'category',
          domainPatterns: [{}],
        },
      ],
      status: 'Disabled',
      consentCookieName: 'consentCookieName',
      customDomain: 'customDomain',
      revision: 0,
      skipBlockingClassNames: [{}],
      webSDKToken: 'webSDKToken',
      whitelistDomains: [{}],
    });
  });

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
});
