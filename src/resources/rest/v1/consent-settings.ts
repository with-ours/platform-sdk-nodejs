// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class ConsentSettings extends APIResource {
  /**
   * Create a new consent setting. Requires scope: consentSettings:create
   */
  create(
    body: ConsentSettingCreateParams,
    options?: RequestOptions,
  ): APIPromise<ConsentSettingCreateResponse> {
    return this._client.post('/rest/v1/consent-settings', { body, ...options });
  }

  /**
   * Find a single consent setting by ID. Requires scope: consentSettings:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ConsentSettingRetrieveResponse> {
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
  data?: unknown;
}

export interface ConsentSettingRetrieveResponse {
  data?: unknown;
}

export interface ConsentSettingUpdateResponse {
  data?: unknown;
}

export interface ConsentSettingListResponse {
  data?: unknown;
}

export interface ConsentSettingDeleteResponse {
  data?: unknown;
}

export interface ConsentSettingCreateParams {}

export interface ConsentSettingUpdateParams {}

export declare namespace ConsentSettings {
  export {
    type ConsentSettingCreateResponse as ConsentSettingCreateResponse,
    type ConsentSettingRetrieveResponse as ConsentSettingRetrieveResponse,
    type ConsentSettingUpdateResponse as ConsentSettingUpdateResponse,
    type ConsentSettingListResponse as ConsentSettingListResponse,
    type ConsentSettingDeleteResponse as ConsentSettingDeleteResponse,
    type ConsentSettingCreateParams as ConsentSettingCreateParams,
    type ConsentSettingUpdateParams as ConsentSettingUpdateParams,
  };
}
