// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class GlobalDispatchCenters extends APIResource {
  /**
   * Create a new global dispatch center. Requires scope: globalDispatch:create
   */
  create(
    body: GlobalDispatchCenterCreateParams,
    options?: RequestOptions,
  ): APIPromise<GlobalDispatchCenterCreateResponse> {
    return this._client.post('/rest/v1/global-dispatch-centers', { body, ...options });
  }

  /**
   * Find a single global dispatch center by ID. Requires scope: globalDispatch:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<GlobalDispatchCenterRetrieveResponse> {
    return this._client.get(path`/rest/v1/global-dispatch-centers/${id}`, options);
  }

  /**
   * Update a global dispatch center. Requires scope: globalDispatch:update
   */
  update(
    id: string,
    body: GlobalDispatchCenterUpdateParams,
    options?: RequestOptions,
  ): APIPromise<GlobalDispatchCenterUpdateResponse> {
    return this._client.patch(path`/rest/v1/global-dispatch-centers/${id}`, { body, ...options });
  }

  /**
   * List all global dispatch centers. Requires scope: globalDispatch:list
   */
  list(options?: RequestOptions): APIPromise<GlobalDispatchCenterListResponse> {
    return this._client.get('/rest/v1/global-dispatch-centers', options);
  }

  /**
   * Delete a global dispatch center. Requires scope: globalDispatch:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<GlobalDispatchCenterDeleteResponse> {
    return this._client.delete(path`/rest/v1/global-dispatch-centers/${id}`, options);
  }
}

export interface GlobalDispatchCenterCreateResponse {
  data?: unknown;
}

export interface GlobalDispatchCenterRetrieveResponse {
  data?: unknown;
}

export interface GlobalDispatchCenterUpdateResponse {
  data?: unknown;
}

export interface GlobalDispatchCenterListResponse {
  data?: unknown;
}

export interface GlobalDispatchCenterDeleteResponse {
  data?: unknown;
}

export interface GlobalDispatchCenterCreateParams {}

export interface GlobalDispatchCenterUpdateParams {}

export declare namespace GlobalDispatchCenters {
  export {
    type GlobalDispatchCenterCreateResponse as GlobalDispatchCenterCreateResponse,
    type GlobalDispatchCenterRetrieveResponse as GlobalDispatchCenterRetrieveResponse,
    type GlobalDispatchCenterUpdateResponse as GlobalDispatchCenterUpdateResponse,
    type GlobalDispatchCenterListResponse as GlobalDispatchCenterListResponse,
    type GlobalDispatchCenterDeleteResponse as GlobalDispatchCenterDeleteResponse,
    type GlobalDispatchCenterCreateParams as GlobalDispatchCenterCreateParams,
    type GlobalDispatchCenterUpdateParams as GlobalDispatchCenterUpdateParams,
  };
}
