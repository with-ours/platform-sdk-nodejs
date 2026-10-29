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
              consentModal: {
                acceptAllBtn: 'acceptAllBtn',
                description: 'description',
                rejectAllBtn: 'rejectAllBtn',
                showPreferencesBtn: 'showPreferencesBtn',
                title: 'title',
                closeIconLabel: 'closeIconLabel',
                footer: 'footer',
                gpcNotification: 'gpcNotification',
                privacyPolicyLabel: 'privacyPolicyLabel',
                privacyPolicyUrl: 'privacyPolicyUrl',
                revisionMessage: 'revisionMessage',
                termsOfServiceLabel: 'termsOfServiceLabel',
                termsOfServiceUrl: 'termsOfServiceUrl',
              },
              preferencesModal: {
                acceptAllBtn: 'acceptAllBtn',
                closeIconLabel: 'closeIconLabel',
                rejectAllBtn: 'rejectAllBtn',
                savePreferencesBtn: 'savePreferencesBtn',
                sections: [
                  {
                    description: 'description',
                    title: 'title',
                    cookieTable: {
                      body: [{ key: 'key', value: 'value' }],
                      headers: [{ key: 'key', value: 'value' }],
                      caption: 'caption',
                    },
                    linkedCategory: 'linkedCategory',
                  },
                ],
                title: 'title',
                additionalInfo: { body: 'body', title: 'title' },
                serviceCounterLabel: 'serviceCounterLabel',
              },
            },
          },
        ],
        autoblockUnknown: true,
        autoShow: true,
        autoShowDismissConfig: { pageCount: 0, seconds: 0 },
        autoShowDismissMode: 'after_pages',
        disablePageInteraction: true,
        guiOptions: {
          consentModal: {
            buttonLayout: 'AcceptAllNecessaryPreferences',
            equalWeightButtons: true,
            flipButtons: true,
            layout: 'bar',
            position: 'bottom',
            showCloseIcon: true,
          },
          cssVariables: {
            buttonBorderRadius: 'buttonBorderRadius',
            cookieCategoryBlockBg: 'cookieCategoryBlockBg',
            cookieCategoryBlockHoverBg: 'cookieCategoryBlockHoverBg',
            footerBg: 'footerBg',
            footerColor: 'footerColor',
            footerLinkColor: 'footerLinkColor',
            footerLinkHoverColor: 'footerLinkHoverColor',
            modalBg: 'modalBg',
            modalBorderRadius: 'modalBorderRadius',
            primaryButtonBg: 'primaryButtonBg',
            primaryButtonColor: 'primaryButtonColor',
            primaryButtonHoverBg: 'primaryButtonHoverBg',
            primaryButtonHoverColor: 'primaryButtonHoverColor',
            primaryTextColor: 'primaryTextColor',
            secondaryButtonBg: 'secondaryButtonBg',
            secondaryButtonColor: 'secondaryButtonColor',
            secondaryButtonHoverBg: 'secondaryButtonHoverBg',
            secondaryButtonHoverColor: 'secondaryButtonHoverColor',
            secondaryTextColor: 'secondaryTextColor',
            toggleOnBg: 'toggleOnBg',
          },
          preferencesModal: {
            buttonLayout: 'AcceptAllRejectAllSave',
            equalWeightButtons: true,
            flipButtons: true,
            layout: 'bar',
            position: 'left',
          },
        },
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
                  consentModal: {
                    acceptAllBtn: 'acceptAllBtn',
                    description: 'description',
                    rejectAllBtn: 'rejectAllBtn',
                    showPreferencesBtn: 'showPreferencesBtn',
                    title: 'title',
                    closeIconLabel: 'closeIconLabel',
                    footer: 'footer',
                    gpcNotification: 'gpcNotification',
                    privacyPolicyLabel: 'privacyPolicyLabel',
                    privacyPolicyUrl: 'privacyPolicyUrl',
                    revisionMessage: 'revisionMessage',
                    termsOfServiceLabel: 'termsOfServiceLabel',
                    termsOfServiceUrl: 'termsOfServiceUrl',
                  },
                  preferencesModal: {
                    acceptAllBtn: 'acceptAllBtn',
                    closeIconLabel: 'closeIconLabel',
                    rejectAllBtn: 'rejectAllBtn',
                    savePreferencesBtn: 'savePreferencesBtn',
                    sections: [
                      {
                        description: 'description',
                        title: 'title',
                        cookieTable: {
                          body: [{ key: 'key', value: 'value' }],
                          headers: [{ key: 'key', value: 'value' }],
                          caption: 'caption',
                        },
                        linkedCategory: 'linkedCategory',
                      },
                    ],
                    title: 'title',
                    additionalInfo: { body: 'body', title: 'title' },
                    serviceCounterLabel: 'serviceCounterLabel',
                  },
                },
              },
            ],
            autoblockUnknown: true,
            autoShow: true,
            autoShowDismissConfig: { pageCount: 0, seconds: 0 },
            autoShowDismissMode: 'after_pages',
            disablePageInteraction: true,
            guiOptions: {
              consentModal: {
                buttonLayout: 'AcceptAllNecessaryPreferences',
                equalWeightButtons: true,
                flipButtons: true,
                layout: 'bar',
                position: 'bottom',
                showCloseIcon: true,
              },
              cssVariables: {
                buttonBorderRadius: 'buttonBorderRadius',
                cookieCategoryBlockBg: 'cookieCategoryBlockBg',
                cookieCategoryBlockHoverBg: 'cookieCategoryBlockHoverBg',
                footerBg: 'footerBg',
                footerColor: 'footerColor',
                footerLinkColor: 'footerLinkColor',
                footerLinkHoverColor: 'footerLinkHoverColor',
                modalBg: 'modalBg',
                modalBorderRadius: 'modalBorderRadius',
                primaryButtonBg: 'primaryButtonBg',
                primaryButtonColor: 'primaryButtonColor',
                primaryButtonHoverBg: 'primaryButtonHoverBg',
                primaryButtonHoverColor: 'primaryButtonHoverColor',
                primaryTextColor: 'primaryTextColor',
                secondaryButtonBg: 'secondaryButtonBg',
                secondaryButtonColor: 'secondaryButtonColor',
                secondaryButtonHoverBg: 'secondaryButtonHoverBg',
                secondaryButtonHoverColor: 'secondaryButtonHoverColor',
                secondaryTextColor: 'secondaryTextColor',
                toggleOnBg: 'toggleOnBg',
              },
              preferencesModal: {
                buttonLayout: 'AcceptAllRejectAllSave',
                equalWeightButtons: true,
                flipButtons: true,
                layout: 'bar',
                position: 'left',
              },
            },
            hideFromBots: true,
            showVendorsInPreferences: true,
          },
          additionalRegions: ['string'],
          name: 'name',
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
      comparisonFrom: '2026-03-01',
      comparisonTo: '2026-03-14',
      filter:
        '{"version":1,"filter":{"kind":"predicate","property":"event.source_id","operator":"eq","value":"source-1"}}',
      granularity: 'DAILY',
    });
  });

  test('overview: only required params', async () => {
    const responsePromise = client.consentSettings.overview({ from: '2019-12-27', to: '2019-12-27' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('overview: required and optional params', async () => {
    const response = await client.consentSettings.overview({ from: '2019-12-27', to: '2019-12-27' });
  });

  test('analyticsMonthly: only required params', async () => {
    const responsePromise = client.consentSettings.analyticsMonthly('id', {
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

  test('analyticsMonthly: required and optional params', async () => {
    const response = await client.consentSettings.analyticsMonthly('id', {
      from: '2026-04-01',
      to: '2026-04-30',
      filter:
        '{"version":1,"filter":{"kind":"predicate","property":"event.source_id","operator":"eq","value":"source-1"}}',
    });
  });

  test('analyticsCapabilities', async () => {
    const responsePromise = client.consentSettings.analyticsCapabilities();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('analyticsCapabilities: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.consentSettings.analyticsCapabilities({ kind: 'PAGES' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(OursPrivacyPlatform.NotFoundError);
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
      cursor: 'cursor',
      filter:
        '{"version":1,"filter":{"kind":"predicate","property":"event.source_id","operator":"eq","value":"source-1"}}',
      granularity: 'DAILY',
      limit: 0,
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
      filter:
        '{"version":1,"filter":{"kind":"predicate","property":"event.source_id","operator":"eq","value":"source-1"}}',
      granularity: 'DAILY',
    });
  });
});
