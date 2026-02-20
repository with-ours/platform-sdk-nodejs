// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
  retrieve(id: string, options?: RequestOptions): APIPromise<ReplaySettingRetrieveResponse | null> {
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
  isSuccess: boolean;

  cause?: string | null;

  replaySettings?: ReplaySettingCreateResponse.ReplaySettings | null;
}

export namespace ReplaySettingCreateResponse {
  export interface ReplaySettings {
    id: string;

    createdAt: string;

    name: string;

    status: 'Disabled' | 'Enabled';

    updatedAt?: string | null;
  }
}

export interface ReplaySettingRetrieveResponse {
  id: string;

  createdAt: string;

  name: string;

  status: 'Disabled' | 'Enabled';

  updatedAt?: string | null;
}

export interface ReplaySettingUpdateResponse {
  isSuccess: boolean;

  cause?: string | null;

  replaySettings?: ReplaySettingUpdateResponse.ReplaySettings | null;
}

export namespace ReplaySettingUpdateResponse {
  export interface ReplaySettings {
    id: string;

    createdAt: string;

    name: string;

    status: 'Disabled' | 'Enabled';

    updatedAt?: string | null;
  }
}

export interface ReplaySettingListResponse {
  entities: Array<ReplaySettingListResponse.Entity>;
}

export namespace ReplaySettingListResponse {
  export interface Entity {
    id: string;

    createdAt: string;

    name: string;

    status: 'Disabled' | 'Enabled';

    updatedAt?: string | null;
  }
}

export interface ReplaySettingDeleteResponse {
  isSuccess: boolean;

  cause?: string | null;

  replaySettings?: ReplaySettingDeleteResponse.ReplaySettings | null;
}

export namespace ReplaySettingDeleteResponse {
  export interface ReplaySettings {
    id: string;

    createdAt: string;

    name: string;

    status: 'Disabled' | 'Enabled';

    updatedAt?: string | null;
  }
}

export interface ReplaySettingCreateParams {
  customDomain?: string | null;

  name?: string | null;

  status?: 'Disabled' | 'Enabled' | null;

  whitelistDomains?: Array<string> | null;
}

export interface ReplaySettingUpdateParams {
  customDomain?: string | null;

  name?: string | null;

  status?: 'Disabled' | 'Enabled' | null;

  whitelistDomains?: Array<string> | null;
}

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
