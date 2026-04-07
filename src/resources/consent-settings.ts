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
  retrieve(id: string, options?: RequestOptions): APIPromise<unknown> {
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

  consentSettings?: unknown | null;
}

export type ConsentSettingRetrieveResponse = unknown;

export interface ConsentSettingUpdateResponse {
  isSuccess: boolean;

  cause?: string | null;

  consentSettings?: unknown | null;
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

  skipBlockingClassNames?: Array<unknown> | null;

  webSDKToken?: string | null;

  whitelistDomains?: Array<unknown> | null;
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

    autoShowDismissConfig?: unknown | null;

    autoShowDismissMode?: string | null;

    disablePageInteraction?: boolean | null;

    guiOptions?: unknown | null;

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
        consentModal?: unknown | null;

        preferencesModal?: unknown | null;
      }
    }
  }

  export interface Region {
    regionCode: string;

    rule: Region.Rule;

    additionalRegions?: Array<unknown> | null;
  }

  export namespace Region {
    export interface Rule {
      categories: Array<Rule.Category>;

      language: string;

      mode: 'opt_in' | 'opt_out';

      translations: Array<Rule.Translation>;

      autoShow?: boolean | null;

      autoShowDismissConfig?: unknown | null;

      autoShowDismissMode?: string | null;

      disablePageInteraction?: boolean | null;

      guiOptions?: unknown | null;

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
          consentModal?: unknown | null;

          preferencesModal?: unknown | null;
        }
      }
    }
  }

  export interface Service {
    internalNotes: string;

    label: string;

    additionalCategories?: Array<unknown> | null;

    category?: string | null;

    domainPatterns?: Array<unknown> | null;
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
