// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Versions extends APIResource {
  /**
   * Create a new version. Requires scope: version:publish
   */
  create(body: VersionCreateParams, options?: RequestOptions): APIPromise<VersionCreateResponse> {
    return this._client.post('/rest/v1/versions', { body, ...options });
  }

  /**
   * Find a single version by ID. Requires scope: version:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<VersionRetrieveResponse> {
    return this._client.get(path`/rest/v1/versions/${id}`, options);
  }

  /**
   * Update a version. Requires scope: version:update
   */
  update(id: string, body: VersionUpdateParams, options?: RequestOptions): APIPromise<VersionUpdateResponse> {
    return this._client.patch(path`/rest/v1/versions/${id}`, { body, ...options });
  }

  /**
   * List all versions. Requires scope: version:list
   */
  list(options?: RequestOptions): APIPromise<VersionListResponse> {
    return this._client.get('/rest/v1/versions', options);
  }
}

export interface VersionCreateResponse {
  success: boolean;

  error?: string | null;
}

export interface VersionRetrieveResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  publishedAt?: string | null;
}

export interface VersionUpdateResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  publishedAt?: string | null;
}

export type VersionListResponse = Array<VersionListResponse.VersionListResponseItem>;

export namespace VersionListResponse {
  export interface VersionListResponseItem {
    id: string;

    createdAt: string;

    isPublished: boolean;

    versionNumber: number;

    name?: string | null;

    publishedAt?: string | null;
  }
}

export interface VersionCreateParams {
  includeAllowedEvents?: Array<string> | null;

  includeConsentSettings?: Array<string> | null;

  includeDestinations?: Array<string> | null;

  includeExternalAllowedEventData?: Array<string> | null;

  includeGlobalDispatchCenters?: Array<string> | null;

  includeMappings?: Array<string> | null;

  includeReplaySettings?: Array<string> | null;

  includeSources?: Array<string> | null;

  includeTagManagerTags?: Array<string> | null;

  includeTagManagerTriggers?: Array<string> | null;

  includeTagManagerVariables?: Array<string> | null;

  name?: string | null;

  notes?: string | null;
}

export interface VersionUpdateParams {
  name?: string | null;

  notes?: string | null;
}

export declare namespace Versions {
  export {
    type VersionCreateResponse as VersionCreateResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionUpdateResponse as VersionUpdateResponse,
    type VersionListResponse as VersionListResponse,
    type VersionCreateParams as VersionCreateParams,
    type VersionUpdateParams as VersionUpdateParams,
  };
}
