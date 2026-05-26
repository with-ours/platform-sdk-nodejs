// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TagManagers extends APIResource {
  /**
   * List every tag manager on this account. Each tag manager is a pixel-scoped
   * container of tags, triggers, variables, and folders. Not paginated — accounts
   * are capped at a small number of tag managers in practice, so the response fits
   * in a single page. Requires scope: tagManagers:list
   */
  list(options?: RequestOptions): APIPromise<TagManagerListResponse> {
    return this._client.get('/rest/v1/tag-managers', options);
  }

  /**
   * Create a new tag manager. The server seeds three default triggers
   * (`Initialization`, `PageView`, `DomReady`) and one `OursInitTag` so the
   * container is immediately usable — call
   * `GET /tag-manager-triggers?tagManagerId={id}` right after create to grab their
   * server-assigned ids so you can reuse them in `fireTriggerIds` instead of
   * redundantly creating a second `PageView`/`DomReady`/`Initialization`. Returns
   * the bare entity. Accounts have a per-account tag manager limit — exceeding it
   * returns 409 with the reason in the response `error` field. Requires scope:
   * tagManagers:create
   */
  create(body: TagManagerCreateParams, options?: RequestOptions): APIPromise<TagManagerCreateResponse> {
    return this._client.post('/rest/v1/tag-managers', { body, ...options });
  }

  /**
   * Fetch a single tag manager by id, including its server-assigned `pixel` token
   * used by the install snippet. Requires scope: tagManagers:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<TagManagerRetrieveResponse> {
    return this._client.get(path`/rest/v1/tag-managers/${id}`, options);
  }

  /**
   * Partially update a tag manager. Only the fields you send are changed; omitted
   * fields keep their current value. Send `dataLayerName: null` to clear the
   * override and fall back to the SDK default. Requires scope: tagManagers:update
   */
  update(
    id: string,
    body: TagManagerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TagManagerUpdateResponse> {
    return this._client.patch(path`/rest/v1/tag-managers/${id}`, { body, ...options });
  }

  /**
   * Delete a tag manager. Child tags, triggers, variables, and folders are
   * cascade-deleted with the container. Requires scope: tagManagers:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<TagManagerDeleteResponse> {
    return this._client.delete(path`/rest/v1/tag-managers/${id}`, options);
  }
}

export interface TagManagerListResponse {
  entities: Array<TagManagerListResponse.Entity>;
}

export namespace TagManagerListResponse {
  export interface Entity {
    /**
     * Server-assigned UUID for this tag manager container.
     */
    id: string;

    /**
     * Account that owns this tag manager.
     */
    accountId: string;

    /**
     * Human-readable name for the tag manager.
     */
    name: string;

    /**
     * Server-assigned pixel/container token. Used in the tag-manager install snippet
     * served on customer sites — do not regenerate via the API.
     */
    pixel: string;

    /**
     * ISO 8601 timestamp when the tag manager was created.
     */
    createdAt?: string | null;

    /**
     * Window-global name of the customer data layer that triggers and variables read
     * from (e.g. `dataLayer`). Defaults to `null`, which means the SDK falls back to
     * its built-in name.
     */
    dataLayerName?: string | null;

    /**
     * ISO 8601 timestamp of the last update.
     */
    updatedAt?: string | null;
  }
}

export interface TagManagerCreateResponse {
  /**
   * Server-assigned UUID for this tag manager container.
   */
  id: string;

  /**
   * Account that owns this tag manager.
   */
  accountId: string;

  /**
   * Human-readable name for the tag manager.
   */
  name: string;

  /**
   * Server-assigned pixel/container token. Used in the tag-manager install snippet
   * served on customer sites — do not regenerate via the API.
   */
  pixel: string;

  /**
   * ISO 8601 timestamp when the tag manager was created.
   */
  createdAt?: string | null;

  /**
   * Window-global name of the customer data layer that triggers and variables read
   * from (e.g. `dataLayer`). Defaults to `null`, which means the SDK falls back to
   * its built-in name.
   */
  dataLayerName?: string | null;

  /**
   * ISO 8601 timestamp of the last update.
   */
  updatedAt?: string | null;
}

export interface TagManagerRetrieveResponse {
  /**
   * Server-assigned UUID for this tag manager container.
   */
  id: string;

  /**
   * Account that owns this tag manager.
   */
  accountId: string;

  /**
   * Human-readable name for the tag manager.
   */
  name: string;

  /**
   * Server-assigned pixel/container token. Used in the tag-manager install snippet
   * served on customer sites — do not regenerate via the API.
   */
  pixel: string;

  /**
   * ISO 8601 timestamp when the tag manager was created.
   */
  createdAt?: string | null;

  /**
   * Window-global name of the customer data layer that triggers and variables read
   * from (e.g. `dataLayer`). Defaults to `null`, which means the SDK falls back to
   * its built-in name.
   */
  dataLayerName?: string | null;

  /**
   * ISO 8601 timestamp of the last update.
   */
  updatedAt?: string | null;
}

export interface TagManagerUpdateResponse {
  /**
   * Server-assigned UUID for this tag manager container.
   */
  id: string;

  /**
   * Account that owns this tag manager.
   */
  accountId: string;

  /**
   * Human-readable name for the tag manager.
   */
  name: string;

  /**
   * Server-assigned pixel/container token. Used in the tag-manager install snippet
   * served on customer sites — do not regenerate via the API.
   */
  pixel: string;

  /**
   * ISO 8601 timestamp when the tag manager was created.
   */
  createdAt?: string | null;

  /**
   * Window-global name of the customer data layer that triggers and variables read
   * from (e.g. `dataLayer`). Defaults to `null`, which means the SDK falls back to
   * its built-in name.
   */
  dataLayerName?: string | null;

  /**
   * ISO 8601 timestamp of the last update.
   */
  updatedAt?: string | null;
}

export interface TagManagerDeleteResponse {
  /**
   * The id of the tag manager that was deleted.
   */
  id: string;

  /**
   * True when the underlying mutation succeeded.
   */
  deleted: boolean;
}

export interface TagManagerCreateParams {
  /**
   * Human-readable name for the new tag manager.
   */
  name: string;

  /**
   * Optional global data-layer name (e.g. `dataLayer`). Omit to use the SDK default.
   */
  dataLayerName?: string | null;
}

export interface TagManagerUpdateParams {
  /**
   * New data-layer name. Send `null` to clear and fall back to the SDK default.
   */
  dataLayerName?: string | null;

  /**
   * New display name.
   */
  name?: string;
}

export declare namespace TagManagers {
  export {
    type TagManagerListResponse as TagManagerListResponse,
    type TagManagerCreateResponse as TagManagerCreateResponse,
    type TagManagerRetrieveResponse as TagManagerRetrieveResponse,
    type TagManagerUpdateResponse as TagManagerUpdateResponse,
    type TagManagerDeleteResponse as TagManagerDeleteResponse,
    type TagManagerCreateParams as TagManagerCreateParams,
    type TagManagerUpdateParams as TagManagerUpdateParams,
  };
}
