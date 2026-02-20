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
  categories: Array<unknown>;

  name: string;

  regions: Array<unknown>;

  services: Array<unknown>;

  status: 'Disabled' | 'Enabled';

  consentCookieName?: string | null;

  customDomain?: unknown;

  default?: unknown;

  revision?: number | null;

  skipBlockingClassNames?: Array<string> | null;

  webSDKToken?: string | null;

  whitelistDomains?: Array<unknown> | null;
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
