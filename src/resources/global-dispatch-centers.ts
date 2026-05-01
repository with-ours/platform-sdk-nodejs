// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
  /**
   * Server-assigned UUID for this dispatch center.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the center was created.
   */
  createdAt: string;

  /**
   * When false, the dispatch center is configured but does not route events.
   */
  isEnabled: boolean;

  /**
   * Discriminator for the entity type. Always "globalDispatchCenter".
   */
  kind: string;

  /**
   * Human-readable name shown in the dashboard.
   */
  name?: string | null;

  /**
   * ISO 8601 timestamp of the last write. Equal to createdAt on a freshly created
   * center; advances on every PATCH.
   */
  updatedAt?: string | null;
}

export interface GlobalDispatchCenterRetrieveResponse {
  /**
   * Server-assigned UUID for this dispatch center.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the center was created.
   */
  createdAt: string;

  /**
   * When false, the dispatch center is configured but does not route events.
   */
  isEnabled: boolean;

  /**
   * Discriminator for the entity type. Always "globalDispatchCenter".
   */
  kind: string;

  /**
   * Routing categories in priority order (1..N).
   */
  categories?: Array<GlobalDispatchCenterRetrieveResponse.Category> | null;

  /**
   * Human-readable name shown in the dashboard.
   */
  name?: string | null;

  /**
   * Free-form notes for this center.
   */
  notes?: string | null;

  /**
   * ISO 8601 timestamp of the last write. Equal to createdAt on a freshly created
   * center; advances on every PATCH.
   */
  updatedAt?: string | null;
}

export namespace GlobalDispatchCenterRetrieveResponse {
  export interface Category {
    /**
     * Display name for the category.
     */
    name: string;

    /**
     * 1-indexed sort position. Always equals (sorted index + 1) — see PATCH for
     * details.
     */
    priority: number;

    /**
     * Optional human-readable description.
     */
    description?: string | null;

    /**
     * Destinations that receive events matching this category.
     */
    destinationIds?: Array<string> | null;

    /**
     * Optional condition tree gating which events match this category.
     */
    logic?: unknown | null;
  }
}

export interface GlobalDispatchCenterUpdateResponse {
  /**
   * Server-assigned UUID for this dispatch center.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the center was created.
   */
  createdAt: string;

  /**
   * When false, the dispatch center is configured but does not route events.
   */
  isEnabled: boolean;

  /**
   * Discriminator for the entity type. Always "globalDispatchCenter".
   */
  kind: string;

  /**
   * Human-readable name shown in the dashboard.
   */
  name?: string | null;

  /**
   * ISO 8601 timestamp of the last write. Equal to createdAt on a freshly created
   * center; advances on every PATCH.
   */
  updatedAt?: string | null;
}

export interface GlobalDispatchCenterListResponse {
  entities: Array<GlobalDispatchCenterListResponse.Entity>;
}

export namespace GlobalDispatchCenterListResponse {
  export interface Entity {
    /**
     * Server-assigned UUID for this dispatch center.
     */
    id: string;

    /**
     * ISO 8601 timestamp when the center was created.
     */
    createdAt: string;

    /**
     * When false, the dispatch center is configured but does not route events.
     */
    isEnabled: boolean;

    /**
     * Discriminator for the entity type. Always "globalDispatchCenter".
     */
    kind: string;

    /**
     * Routing categories in priority order (1..N).
     */
    categories?: Array<Entity.Category> | null;

    /**
     * Human-readable name shown in the dashboard.
     */
    name?: string | null;

    /**
     * Free-form notes for this center.
     */
    notes?: string | null;

    /**
     * ISO 8601 timestamp of the last write. Equal to createdAt on a freshly created
     * center; advances on every PATCH.
     */
    updatedAt?: string | null;
  }

  export namespace Entity {
    export interface Category {
      /**
       * Display name for the category.
       */
      name: string;

      /**
       * 1-indexed sort position. Always equals (sorted index + 1) — see PATCH for
       * details.
       */
      priority: number;

      /**
       * Optional human-readable description.
       */
      description?: string | null;

      /**
       * Destinations that receive events matching this category.
       */
      destinationIds?: Array<string> | null;

      /**
       * Optional condition tree gating which events match this category.
       */
      logic?: unknown | null;
    }
  }
}

export interface GlobalDispatchCenterDeleteResponse {
  /**
   * The id of the dispatch center that was deleted.
   */
  id: string;

  /**
   * True when the underlying mutation succeeded; the entity is gone.
   */
  deleted: boolean;
}

export interface GlobalDispatchCenterCreateParams {
  /**
   * Whether the center starts enabled. Defaults to false — opt in by setting true
   * here or via PATCH later.
   */
  isEnabled?: boolean | null;

  /**
   * Display name for the new center. Defaults to "Consent Dispatch Center".
   */
  name?: string | null;

  /**
   * Free-form notes shown in the dashboard. Not used for routing.
   */
  notes?: string | null;
}

export interface GlobalDispatchCenterUpdateParams {
  /**
   * Full replacement of the categories list. Categories are sorted by priority on
   * write and re-stamped 1..N — see the priority field. Omit to leave existing
   * categories untouched.
   */
  categories?: Array<GlobalDispatchCenterUpdateParams.Category> | null;

  /**
   * Toggle the dispatch center on/off without changing any other config.
   */
  isEnabled?: boolean | null;

  /**
   * New display name for the center.
   */
  name?: string | null;

  /**
   * Replace the free-form notes.
   */
  notes?: string | null;
}

export namespace GlobalDispatchCenterUpdateParams {
  export interface Category {
    /**
     * Optional human-readable description shown in the dashboard.
     */
    description?: string | null;

    /**
     * Destinations that receive events matching this category. Stale IDs (deleted
     * destinations or ones from another account) are silently filtered out at write
     * time.
     */
    destinationIds?: Array<string> | null;

    /**
     * Optional condition tree. When set, only matching events route to this category.
     */
    logic?: unknown | null;

    /**
     * Display name for the category. Auto-generated if omitted.
     */
    name?: string | null;

    /**
     * Used as a sort key on write. The server sorts categories by this value
     * (ascending), then re-stamps priority as (sorted index + 1) on persist. Send any
     * positive number — gaps are ironed out, duplicate values keep input order via
     * stable sort. Omit to fall to the end.
     */
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
    type GlobalDispatchCenterCreateParams as GlobalDispatchCenterCreateParams,
    type GlobalDispatchCenterUpdateParams as GlobalDispatchCenterUpdateParams,
  };
}
