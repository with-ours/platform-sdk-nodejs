// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ReplaySettings extends APIResource {
  /**
   * List the replay configurations on this account. Supports cursor pagination via
   * `limit` and `cursor`. Replay settings control which domains may capture session
   * replays and where the capture script is hosted. Requires scope:
   * replaySettings:list
   */
  list(
    query: ReplaySettingListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ReplaySettingListResponsesCursor, ReplaySettingListResponse> {
    return this._client.getAPIList('/rest/v1/replay-settings', Cursor<ReplaySettingListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create the replay configuration for this account. Each account is limited to one
   * replay configuration — calls made when one already exists return HTTP 409 with
   * the reason in the response `error` field. Requires scope: replaySettings:create
   */
  create(body: ReplaySettingCreateParams, options?: RequestOptions): APIPromise<ReplaySettingCreateResponse> {
    return this._client.post('/rest/v1/replay-settings', { body, ...options });
  }

  /**
   * Fetch a single replay configuration by ID, including its whitelisted domains and
   * custom domain. Requires scope: replaySettings:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ReplaySettingRetrieveResponse | null> {
    return this._client.get(path`/rest/v1/replay-settings/${id}`, options);
  }

  /**
   * Update one or more fields on an existing replay configuration. Only the fields
   * you send are changed; omitted fields keep their current value. Note that
   * `whitelistDomains` is replaced wholesale (not merged with the existing list).
   * Requires scope: replaySettings:update
   */
  update(
    id: string,
    body: ReplaySettingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ReplaySettingUpdateResponse> {
    return this._client.patch(path`/rest/v1/replay-settings/${id}`, { body, ...options });
  }

  /**
   * Delete the replay configuration. Capture stops immediately for all whitelisted
   * domains. Requires scope: replaySettings:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<ReplaySettingDeleteResponse> {
    return this._client.delete(path`/rest/v1/replay-settings/${id}`, options);
  }
}

export type ReplaySettingListResponsesCursor = Cursor<ReplaySettingListResponse>;

export interface ReplaySettingListResponse {
  /**
   * Stable identifier (UUID) for this replay configuration.
   */
  id: string;

  /**
   * ISO-8601 timestamp when this configuration was created.
   */
  createdAt: string;

  /**
   * Human-readable label for this replay configuration. Shown in the dashboard. May
   * be empty.
   */
  name: string;

  /**
   * Whether session replay capture is currently active. Set to "Enabled" to start
   * capturing replays from whitelisted domains, or "Disabled" to pause capture
   * without losing the configuration.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Optional custom domain (CNAME) for hosting the replay capture script. Leave null
   * to use the default Ours Privacy domain.
   */
  customDomain?: string | null;

  /**
   * ISO-8601 timestamp of the most recent update, or null if never updated.
   */
  updatedAt?: string | null;

  /**
   * Hostnames where session replay capture is permitted. Replays initiated from any
   * host not in this list are dropped. PATCH replaces the list — partial updates are
   * not merged.
   */
  whitelistDomains?: Array<string> | null;
}

export interface ReplaySettingCreateResponse {
  isSuccess: boolean;

  cause?: string | null;

  replaySettings?: unknown | null;
}

export interface ReplaySettingRetrieveResponse {
  /**
   * Stable identifier (UUID) for this replay configuration.
   */
  id: string;

  /**
   * ISO-8601 timestamp when this configuration was created.
   */
  createdAt: string;

  /**
   * Human-readable label for this replay configuration. Shown in the dashboard. May
   * be empty.
   */
  name: string;

  /**
   * Whether session replay capture is currently active. Set to "Enabled" to start
   * capturing replays from whitelisted domains, or "Disabled" to pause capture
   * without losing the configuration.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Optional custom domain (CNAME) for hosting the replay capture script. Leave null
   * to use the default Ours Privacy domain.
   */
  customDomain?: string | null;

  /**
   * ISO-8601 timestamp of the most recent update, or null if never updated.
   */
  updatedAt?: string | null;

  /**
   * Hostnames where session replay capture is permitted. Replays initiated from any
   * host not in this list are dropped. PATCH replaces the list — partial updates are
   * not merged.
   */
  whitelistDomains?: Array<string> | null;
}

export interface ReplaySettingUpdateResponse {
  isSuccess: boolean;

  cause?: string | null;

  replaySettings?: unknown | null;
}

export interface ReplaySettingDeleteResponse {
  isSuccess: boolean;

  cause?: string | null;

  replaySettings?: unknown | null;
}

export interface ReplaySettingListParams extends CursorParams {}

export interface ReplaySettingCreateParams {
  /**
   * Optional custom domain (CNAME) for hosting the replay capture script. Leave null
   * to use the default Ours Privacy domain.
   */
  customDomain?: string | null;

  /**
   * Human-readable label for this replay configuration. Shown in the dashboard. May
   * be empty.
   */
  name?: string | null;

  /**
   * Whether session replay capture is currently active. Set to "Enabled" to start
   * capturing replays from whitelisted domains, or "Disabled" to pause capture
   * without losing the configuration.
   */
  status?: 'Disabled' | 'Enabled' | null;

  /**
   * Hostnames where session replay capture is permitted. Replays initiated from any
   * host not in this list are dropped. PATCH replaces the list — partial updates are
   * not merged.
   */
  whitelistDomains?: Array<string> | null;
}

export interface ReplaySettingUpdateParams {
  /**
   * Optional custom domain (CNAME) for hosting the replay capture script. Leave null
   * to use the default Ours Privacy domain.
   */
  customDomain?: string | null;

  /**
   * Human-readable label for this replay configuration. Shown in the dashboard. May
   * be empty.
   */
  name?: string | null;

  /**
   * Whether session replay capture is currently active. Set to "Enabled" to start
   * capturing replays from whitelisted domains, or "Disabled" to pause capture
   * without losing the configuration.
   */
  status?: 'Disabled' | 'Enabled' | null;

  /**
   * Hostnames where session replay capture is permitted. Replays initiated from any
   * host not in this list are dropped. PATCH replaces the list — partial updates are
   * not merged.
   */
  whitelistDomains?: Array<string> | null;
}

export declare namespace ReplaySettings {
  export {
    type ReplaySettingListResponse as ReplaySettingListResponse,
    type ReplaySettingCreateResponse as ReplaySettingCreateResponse,
    type ReplaySettingRetrieveResponse as ReplaySettingRetrieveResponse,
    type ReplaySettingUpdateResponse as ReplaySettingUpdateResponse,
    type ReplaySettingDeleteResponse as ReplaySettingDeleteResponse,
    type ReplaySettingListResponsesCursor as ReplaySettingListResponsesCursor,
    type ReplaySettingListParams as ReplaySettingListParams,
    type ReplaySettingCreateParams as ReplaySettingCreateParams,
    type ReplaySettingUpdateParams as ReplaySettingUpdateParams,
  };
}
