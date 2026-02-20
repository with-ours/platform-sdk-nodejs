// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class GlobalDispatchCenters extends APIResource {
  /**
   * Create a new global dispatch center. Requires scope: globalDispatch:create
   */
  create(options?: RequestOptions): APIPromise<GlobalDispatchCenterCreateResponse> {
    return this._client.post('/rest/v1/global-dispatch-centers', options);
  }

  /**
   * Find a single global dispatch center by ID. Requires scope: globalDispatch:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<GlobalDispatchCenterRetrieveResponse | null> {
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
  id: string;

  createdAt: string;

  isEnabled: boolean;

  kind: string;

  name?: string | null;

  updatedAt?: string | null;
}

export interface GlobalDispatchCenterRetrieveResponse {
  id: string;

  createdAt: string;

  isEnabled: boolean;

  kind: string;

  name?: string | null;

  updatedAt?: string | null;
}

export interface GlobalDispatchCenterUpdateResponse {
  id: string;

  createdAt: string;

  isEnabled: boolean;

  kind: string;

  name?: string | null;

  updatedAt?: string | null;
}

export interface GlobalDispatchCenterListResponse {
  entities: Array<GlobalDispatchCenterListResponse.Entity>;
}

export namespace GlobalDispatchCenterListResponse {
  export interface Entity {
    id: string;

    createdAt: string;

    isEnabled: boolean;

    kind: string;

    name?: string | null;

    updatedAt?: string | null;
  }
}

export type GlobalDispatchCenterDeleteResponse = boolean;

export interface GlobalDispatchCenterUpdateParams {
  categories?: Array<GlobalDispatchCenterUpdateParams.Category> | null;

  isEnabled?: boolean | null;

  name?: string | null;

  notes?: string | null;
}

export namespace GlobalDispatchCenterUpdateParams {
  export interface Category {
    description?: string | null;

    destinationIds?: Array<string> | null;

    logic?: unknown;

    name?: string | null;

    priority?: number | null;
  }
}

export declare namespace GlobalDispatchCenters {
  export {
    type GlobalDispatchCenterCreateResponse as GlobalDispatchCenterCreateResponse,
    type GlobalDispatchCenterRetrieveResponse as GlobalDispatchCenterRetrieveResponse,
    type GlobalDispatchCenterUpdateResponse as GlobalDispatchCenterUpdateResponse,
    type GlobalDispatchCenterListResponse as GlobalDispatchCenterListResponse,
    type GlobalDispatchCenterDeleteResponse as GlobalDispatchCenterDeleteResponse,
    type GlobalDispatchCenterUpdateParams as GlobalDispatchCenterUpdateParams,
  };
}
