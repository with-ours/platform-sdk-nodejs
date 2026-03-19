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
                serviceCounterLabel: 'serviceCounterLabel',
              },
            },
          },
        ],
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
                    serviceCounterLabel: 'serviceCounterLabel',
                  },
                },
              },
            ],
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
      revision: 0,
      skipBlockingClassNames: ['string'],
      webSDKToken: 'webSDKToken',
      whitelistDomains: ['string'],
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
