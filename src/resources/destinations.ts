// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Destinations extends APIResource {
  /**
   * Create a new destination. Requires scope: destination:create
   */
  create(body: DestinationCreateParams, options?: RequestOptions): APIPromise<DestinationCreateResponse> {
    return this._client.post('/rest/v1/destinations', { body, ...options });
  }

  /**
   * Find a single destination by ID. Requires scope: destination:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DestinationRetrieveResponse> {
    return this._client.get(path`/rest/v1/destinations/${id}`, options);
  }

  /**
   * Update a destination. Requires scope: destination:update
   */
  update(
    id: string,
    body: DestinationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<DestinationUpdateResponse> {
    return this._client.patch(path`/rest/v1/destinations/${id}`, { body, ...options });
  }

  /**
   * List all destinations. Requires scope: destination:list
   */
  list(options?: RequestOptions): APIPromise<DestinationListResponse> {
    return this._client.get('/rest/v1/destinations', options);
  }

  /**
   * Delete a destination. Requires scope: destination:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<DestinationDeleteResponse> {
    return this._client.delete(path`/rest/v1/destinations/${id}`, options);
  }
}

export interface DestinationCreateResponse {
  data?: unknown;
}

export interface DestinationRetrieveResponse {
  data?: unknown;
}

export interface DestinationUpdateResponse {
  data?: unknown;
}

export interface DestinationListResponse {
  data?: unknown;
}

export interface DestinationDeleteResponse {
  data?: unknown;
}

export interface DestinationCreateParams {}

export interface DestinationUpdateParams {}

export declare namespace Destinations {
  export {
    type DestinationCreateResponse as DestinationCreateResponse,
    type DestinationRetrieveResponse as DestinationRetrieveResponse,
    type DestinationUpdateResponse as DestinationUpdateResponse,
    type DestinationListResponse as DestinationListResponse,
    type DestinationDeleteResponse as DestinationDeleteResponse,
    type DestinationCreateParams as DestinationCreateParams,
    type DestinationUpdateParams as DestinationUpdateParams,
  };
}
