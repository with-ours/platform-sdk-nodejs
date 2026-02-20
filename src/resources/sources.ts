// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Sources extends APIResource {
  /**
   * Create a new source. Requires scope: source:create
   */
  create(body: SourceCreateParams, options?: RequestOptions): APIPromise<SourceCreateResponse> {
    return this._client.post('/rest/v1/sources', { body, ...options });
  }

  /**
   * Find a single source by ID. Requires scope: source:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<SourceRetrieveResponse> {
    return this._client.get(path`/rest/v1/sources/${id}`, options);
  }

  /**
   * Update a source. Requires scope: source:update
   */
  update(id: string, body: SourceUpdateParams, options?: RequestOptions): APIPromise<SourceUpdateResponse> {
    return this._client.patch(path`/rest/v1/sources/${id}`, { body, ...options });
  }

  /**
   * List all sources. Requires scope: source:list
   */
  list(options?: RequestOptions): APIPromise<SourceListResponse> {
    return this._client.get('/rest/v1/sources', options);
  }

  /**
   * Delete a source. Requires scope: source:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<SourceDeleteResponse> {
    return this._client.delete(path`/rest/v1/sources/${id}`, options);
  }
}

export interface SourceCreateResponse {
  data?: unknown;
}

export interface SourceRetrieveResponse {
  data?: unknown;
}

export interface SourceUpdateResponse {
  data?: unknown;
}

export interface SourceListResponse {
  data?: unknown;
}

export interface SourceDeleteResponse {
  data?: unknown;
}

export interface SourceCreateParams {}

export interface SourceUpdateParams {}

export declare namespace Sources {
  export {
    type SourceCreateResponse as SourceCreateResponse,
    type SourceRetrieveResponse as SourceRetrieveResponse,
    type SourceUpdateResponse as SourceUpdateResponse,
    type SourceListResponse as SourceListResponse,
    type SourceDeleteResponse as SourceDeleteResponse,
    type SourceCreateParams as SourceCreateParams,
    type SourceUpdateParams as SourceUpdateParams,
  };
}
