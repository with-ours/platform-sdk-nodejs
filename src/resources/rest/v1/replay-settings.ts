// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class ReplaySettings extends APIResource {
  /**
   * Create a new replay setting. Requires scope: replaySettings:create
   */
  create(body: ReplaySettingCreateParams, options?: RequestOptions): APIPromise<ReplaySettingCreateResponse> {
    return this._client.post('/rest/v1/replay-settings', { body, ...options });
  }

  /**
   * Find a single replay setting by ID. Requires scope: replaySettings:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ReplaySettingRetrieveResponse> {
    return this._client.get(path`/rest/v1/replay-settings/${id}`, options);
  }

  /**
   * Update a replay setting. Requires scope: replaySettings:update
   */
  update(
    id: string,
    body: ReplaySettingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ReplaySettingUpdateResponse> {
    return this._client.patch(path`/rest/v1/replay-settings/${id}`, { body, ...options });
  }

  /**
   * List all replay settings. Requires scope: replaySettings:list
   */
  list(options?: RequestOptions): APIPromise<ReplaySettingListResponse> {
    return this._client.get('/rest/v1/replay-settings', options);
  }

  /**
   * Delete a replay setting. Requires scope: replaySettings:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<ReplaySettingDeleteResponse> {
    return this._client.delete(path`/rest/v1/replay-settings/${id}`, options);
  }
}

export interface ReplaySettingCreateResponse {
  data?: unknown;
}

export interface ReplaySettingRetrieveResponse {
  data?: unknown;
}

export interface ReplaySettingUpdateResponse {
  data?: unknown;
}

export interface ReplaySettingListResponse {
  data?: unknown;
}

export interface ReplaySettingDeleteResponse {
  data?: unknown;
}

export interface ReplaySettingCreateParams {}

export interface ReplaySettingUpdateParams {}

export declare namespace ReplaySettings {
  export {
    type ReplaySettingCreateResponse as ReplaySettingCreateResponse,
    type ReplaySettingRetrieveResponse as ReplaySettingRetrieveResponse,
    type ReplaySettingUpdateResponse as ReplaySettingUpdateResponse,
    type ReplaySettingListResponse as ReplaySettingListResponse,
    type ReplaySettingDeleteResponse as ReplaySettingDeleteResponse,
    type ReplaySettingCreateParams as ReplaySettingCreateParams,
    type ReplaySettingUpdateParams as ReplaySettingUpdateParams,
  };
}
