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
  data?: unknown;
}

export interface VersionRetrieveResponse {
  data?: unknown;
}

export interface VersionUpdateResponse {
  data?: unknown;
}

export interface VersionListResponse {
  data?: unknown;
}

export interface VersionCreateParams {}

export interface VersionUpdateParams {}

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
