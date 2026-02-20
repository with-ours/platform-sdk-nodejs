// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AllowedEvents extends APIResource {
  /**
   * Create a new allowed event. Requires scope: allowedEvent:create
   */
  create(body: AllowedEventCreateParams, options?: RequestOptions): APIPromise<AllowedEventCreateResponse> {
    return this._client.post('/rest/v1/allowed-events', { body, ...options });
  }

  /**
   * Find a single allowed event by ID. Requires scope: allowedEvent:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AllowedEventRetrieveResponse> {
    return this._client.get(path`/rest/v1/allowed-events/${id}`, options);
  }

  /**
   * List all allowed events. Requires scope: allowedEvent:list
   */
  list(options?: RequestOptions): APIPromise<AllowedEventListResponse> {
    return this._client.get('/rest/v1/allowed-events', options);
  }

  /**
   * Delete a allowed event. Requires scope: allowedEvent:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<AllowedEventDeleteResponse> {
    return this._client.delete(path`/rest/v1/allowed-events/${id}`, options);
  }
}

export interface AllowedEventCreateResponse {
  id: string;

  createdAt: string;

  destinationIds: Array<string>;

  name: string;

  updatedAt?: string | null;
}

export interface AllowedEventRetrieveResponse {
  id: string;

  createdAt: string;

  destinationIds: Array<string>;

  name: string;

  updatedAt?: string | null;
}

export interface AllowedEventListResponse {
  entities: Array<AllowedEventListResponse.Entity>;
}

export namespace AllowedEventListResponse {
  export interface Entity {
    id: string;

    createdAt: string;

    destinationIds: Array<string>;

    name: string;

    updatedAt?: string | null;
  }
}

export type AllowedEventDeleteResponse = boolean;

export interface AllowedEventCreateParams {
  name: string;

  destinationIds?: Array<string> | string | null;
}

export declare namespace AllowedEvents {
  export {
    type AllowedEventCreateResponse as AllowedEventCreateResponse,
    type AllowedEventRetrieveResponse as AllowedEventRetrieveResponse,
    type AllowedEventListResponse as AllowedEventListResponse,
    type AllowedEventDeleteResponse as AllowedEventDeleteResponse,
    type AllowedEventCreateParams as AllowedEventCreateParams,
  };
}
