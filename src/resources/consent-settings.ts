// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ConsentSettings extends APIResource {
  /**
   * Create a new consent setting. Requires scope: consentSettings:create
   */
  create(options?: RequestOptions): APIPromise<ConsentSettingCreateResponse> {
    return this._client.post('/rest/v1/consent-settings', options);
  }

  /**
   * Find a single consent setting by ID. Requires scope: consentSettings:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ConsentSettingRetrieveResponse | null> {
    return this._client.get(path`/rest/v1/consent-settings/${id}`, options);
  }

  /**
   * Update a consent setting. Requires scope: consentSettings:update
   */
  update(
    id: string,
    body: ConsentSettingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ConsentSettingUpdateResponse> {
    return this._client.patch(path`/rest/v1/consent-settings/${id}`, { body, ...options });
  }

  /**
   * List all consent settings. Requires scope: consentSettings:list
   */
  list(options?: RequestOptions): APIPromise<ConsentSettingListResponse> {
    return this._client.get('/rest/v1/consent-settings', options);
  }

  /**
   * Delete a consent setting. Requires scope: consentSettings:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<ConsentSettingDeleteResponse> {
    return this._client.delete(path`/rest/v1/consent-settings/${id}`, options);
  }
}

export interface ConsentSettingCreateResponse {
  isSuccess: boolean;

  cause?: string | null;

  consentSettings?: ConsentSettingCreateResponse.ConsentSettings | null;
}

export namespace ConsentSettingCreateResponse {
  export interface ConsentSettings {
    id: string;

    createdAt: string;

    kind: string;

    name: string;

    status: 'Disabled' | 'Enabled';

    updatedAt?: string | null;
  }
}

export interface ConsentSettingRetrieveResponse {
  id: string;

  createdAt: string;

  kind: string;

  name: string;

  status: 'Disabled' | 'Enabled';

  updatedAt?: string | null;
}

export interface ConsentSettingUpdateResponse {
  isSuccess: boolean;

  cause?: string | null;

  consentSettings?: ConsentSettingUpdateResponse.ConsentSettings | null;
}

export namespace ConsentSettingUpdateResponse {
  export interface ConsentSettings {
    id: string;

    createdAt: string;

    kind: string;

    name: string;

    status: 'Disabled' | 'Enabled';

    updatedAt?: string | null;
  }
}

export interface ConsentSettingListResponse {
  entities: Array<ConsentSettingListResponse.Entity>;
}

export namespace ConsentSettingListResponse {
  export interface Entity {
    id: string;

    createdAt: string;

    kind: string;

    name: string;

    status: 'Disabled' | 'Enabled';

    updatedAt?: string | null;
  }
}

export interface ConsentSettingDeleteResponse {
  id: string;

  createdAt: string;

  kind: string;

  name: string;

  status: 'Disabled' | 'Enabled';

  updatedAt?: string | null;
}

export interface ConsentSettingUpdateParams {
  categories: Array<ConsentSettingUpdateParams.Category>;

  default: ConsentSettingUpdateParams.Default;

  name: string;

  regions: Array<ConsentSettingUpdateParams.Region>;

  services: Array<ConsentSettingUpdateParams.Service>;

  status: 'Disabled' | 'Enabled';

  consentCookieName?: string | null;

  customDomain?: string | null;

  revision?: number | null;

  skipBlockingClassNames?: Array<string> | null;

  webSDKToken?: string | null;

  whitelistDomains?: Array<string> | null;
}

export namespace ConsentSettingUpdateParams {
  export interface Category {
    label: string;

    priority: number;

    value: string;
  }

  export interface Default {
    categories: Array<Default.Category>;

    language: string;

    mode: 'opt_in' | 'opt_out';

    translations: Array<Default.Translation>;

    autoShow?: boolean | null;

    autoShowDismissConfig?: Default.AutoShowDismissConfig | null;

    autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

    disablePageInteraction?: boolean | null;

    guiOptions?: Default.GuiOptions | null;

    hideFromBots?: boolean | null;

    showVendorsInPreferences?: boolean | null;
  }

  export namespace Default {
    export interface Category {
      key: string;

      value: Category.Value;
    }

    export namespace Category {
      export interface Value {
        enabled: boolean;

        autoDisableOnGPC?: boolean | null;

        readOnly?: boolean | null;

        reloadPage?: boolean | null;
      }
    }

    export interface Translation {
      language: string;

      value: Translation.Value;
    }

    export namespace Translation {
      export interface Value {
        consentModal?: Value.ConsentModal | null;

        preferencesModal?: Value.PreferencesModal | null;
      }

      export namespace Value {
        export interface ConsentModal {
          acceptAllBtn: string;

          description: string;

          rejectAllBtn: string;

          showPreferencesBtn: string;

          title: string;

          closeIconLabel?: string | null;

          footer?: string | null;

          gpcNotification?: string | null;

          privacyPolicyLabel?: string | null;

          privacyPolicyUrl?: string | null;

          revisionMessage?: string | null;

          termsOfServiceLabel?: string | null;

          termsOfServiceUrl?: string | null;
        }

        export interface PreferencesModal {
          acceptAllBtn: string;

          closeIconLabel: string;

          rejectAllBtn: string;

          savePreferencesBtn: string;

          sections: Array<PreferencesModal.Section>;

          title: string;

          serviceCounterLabel?: string | null;
        }

        export namespace PreferencesModal {
          export interface Section {
            description: string;

            title: string;

            cookieTable?: Section.CookieTable | null;

            linkedCategory?: string | null;
          }

          export namespace Section {
            export interface CookieTable {
              body: Array<CookieTable.Body>;

              headers: Array<CookieTable.Header>;

              caption?: string | null;
            }

            export namespace CookieTable {
              export interface Body {
                key: string;

                value: string;
              }

              export interface Header {
                key: string;

                value: string;
              }
            }
          }
        }
      }
    }

    export interface AutoShowDismissConfig {
      pageCount?: number | null;

      seconds?: number | null;
    }

    export interface GuiOptions {
      consentModal?: GuiOptions.ConsentModal | null;

      cssVariables?: GuiOptions.CssVariables | null;

      preferencesModal?: GuiOptions.PreferencesModal | null;
    }

    export namespace GuiOptions {
      export interface ConsentModal {
        buttonLayout?:
          | 'AcceptAllNecessaryPreferences'
          | 'AcceptAllPreferences'
          | 'AcceptOnly'
          | 'InformationOnly'
          | 'PreferencesOnly'
          | null;

        equalWeightButtons?: boolean | null;

        flipButtons?: boolean | null;

        layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

        position?:
          | 'bottom'
          | 'bottom_center'
          | 'bottom_left'
          | 'bottom_right'
          | 'middle'
          | 'middle_center'
          | 'middle_left'
          | 'middle_right'
          | 'top'
          | 'top_center'
          | 'top_left'
          | 'top_right'
          | null;

        showCloseIcon?: boolean | null;
      }

      export interface CssVariables {
        buttonBorderRadius?: string | null;

        cookieCategoryBlockBg?: string | null;

        cookieCategoryBlockHoverBg?: string | null;

        footerBg?: string | null;

        footerColor?: string | null;

        footerLinkColor?: string | null;

        footerLinkHoverColor?: string | null;

        modalBg?: string | null;

        modalBorderRadius?: string | null;

        primaryButtonBg?: string | null;

        primaryButtonColor?: string | null;

        primaryButtonHoverBg?: string | null;

        primaryButtonHoverColor?: string | null;

        primaryTextColor?: string | null;

        secondaryButtonBg?: string | null;

        secondaryButtonColor?: string | null;

        secondaryButtonHoverBg?: string | null;

        secondaryButtonHoverColor?: string | null;

        secondaryTextColor?: string | null;

        toggleOnBg?: string | null;
      }

      export interface PreferencesModal {
        buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

        equalWeightButtons?: boolean | null;

        flipButtons?: boolean | null;

        layout?: 'bar' | 'bar_wide' | 'box' | null;

        position?: 'left' | 'right' | null;
      }
    }
  }

  export interface Region {
    regionCode: string;

    rule: Region.Rule;

    additionalRegions?: Array<string> | null;
  }

  export namespace Region {
    export interface Rule {
      categories: Array<Rule.Category>;

      language: string;

      mode: 'opt_in' | 'opt_out';

      translations: Array<Rule.Translation>;

      autoShow?: boolean | null;

      autoShowDismissConfig?: Rule.AutoShowDismissConfig | null;

      autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

      disablePageInteraction?: boolean | null;

      guiOptions?: Rule.GuiOptions | null;

      hideFromBots?: boolean | null;

      showVendorsInPreferences?: boolean | null;
    }

    export namespace Rule {
      export interface Category {
        key: string;

        value: Category.Value;
      }

      export namespace Category {
        export interface Value {
          enabled: boolean;

          autoDisableOnGPC?: boolean | null;

          readOnly?: boolean | null;

          reloadPage?: boolean | null;
        }
      }

      export interface Translation {
        language: string;

        value: Translation.Value;
      }

      export namespace Translation {
        export interface Value {
          consentModal?: Value.ConsentModal | null;

          preferencesModal?: Value.PreferencesModal | null;
        }

        export namespace Value {
          export interface ConsentModal {
            acceptAllBtn: string;

            description: string;

            rejectAllBtn: string;

            showPreferencesBtn: string;

            title: string;

            closeIconLabel?: string | null;

            footer?: string | null;

            gpcNotification?: string | null;

            privacyPolicyLabel?: string | null;

            privacyPolicyUrl?: string | null;

            revisionMessage?: string | null;

            termsOfServiceLabel?: string | null;

            termsOfServiceUrl?: string | null;
          }

          export interface PreferencesModal {
            acceptAllBtn: string;

            closeIconLabel: string;

            rejectAllBtn: string;

            savePreferencesBtn: string;

            sections: Array<PreferencesModal.Section>;

            title: string;

            serviceCounterLabel?: string | null;
          }

          export namespace PreferencesModal {
            export interface Section {
              description: string;

              title: string;

              cookieTable?: Section.CookieTable | null;

              linkedCategory?: string | null;
            }

            export namespace Section {
              export interface CookieTable {
                body: Array<CookieTable.Body>;

                headers: Array<CookieTable.Header>;

                caption?: string | null;
              }

              export namespace CookieTable {
                export interface Body {
                  key: string;

                  value: string;
                }

                export interface Header {
                  key: string;

                  value: string;
                }
              }
            }
          }
        }
      }

      export interface AutoShowDismissConfig {
        pageCount?: number | null;

        seconds?: number | null;
      }

      export interface GuiOptions {
        consentModal?: GuiOptions.ConsentModal | null;

        cssVariables?: GuiOptions.CssVariables | null;

        preferencesModal?: GuiOptions.PreferencesModal | null;
      }

      export namespace GuiOptions {
        export interface ConsentModal {
          buttonLayout?:
            | 'AcceptAllNecessaryPreferences'
            | 'AcceptAllPreferences'
            | 'AcceptOnly'
            | 'InformationOnly'
            | 'PreferencesOnly'
            | null;

          equalWeightButtons?: boolean | null;

          flipButtons?: boolean | null;

          layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

          position?:
            | 'bottom'
            | 'bottom_center'
            | 'bottom_left'
            | 'bottom_right'
            | 'middle'
            | 'middle_center'
            | 'middle_left'
            | 'middle_right'
            | 'top'
            | 'top_center'
            | 'top_left'
            | 'top_right'
            | null;

          showCloseIcon?: boolean | null;
        }

        export interface CssVariables {
          buttonBorderRadius?: string | null;

          cookieCategoryBlockBg?: string | null;

          cookieCategoryBlockHoverBg?: string | null;

          footerBg?: string | null;

          footerColor?: string | null;

          footerLinkColor?: string | null;

          footerLinkHoverColor?: string | null;

          modalBg?: string | null;

          modalBorderRadius?: string | null;

          primaryButtonBg?: string | null;

          primaryButtonColor?: string | null;

          primaryButtonHoverBg?: string | null;

          primaryButtonHoverColor?: string | null;

          primaryTextColor?: string | null;

          secondaryButtonBg?: string | null;

          secondaryButtonColor?: string | null;

          secondaryButtonHoverBg?: string | null;

          secondaryButtonHoverColor?: string | null;

          secondaryTextColor?: string | null;

          toggleOnBg?: string | null;
        }

        export interface PreferencesModal {
          buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

          equalWeightButtons?: boolean | null;

          flipButtons?: boolean | null;

          layout?: 'bar' | 'bar_wide' | 'box' | null;

          position?: 'left' | 'right' | null;
        }
      }
    }
  }

  export interface Service {
    internalNotes: string;

    label: string;

    additionalCategories?: Array<string> | null;

    category?: string | null;

    domainPatterns?: Array<string> | null;
  }
}

export declare namespace ConsentSettings {
  export {
    type ConsentSettingCreateResponse as ConsentSettingCreateResponse,
    type ConsentSettingRetrieveResponse as ConsentSettingRetrieveResponse,
    type ConsentSettingUpdateResponse as ConsentSettingUpdateResponse,
    type ConsentSettingListResponse as ConsentSettingListResponse,
    type ConsentSettingDeleteResponse as ConsentSettingDeleteResponse,
    type ConsentSettingUpdateParams as ConsentSettingUpdateParams,
  };
}
