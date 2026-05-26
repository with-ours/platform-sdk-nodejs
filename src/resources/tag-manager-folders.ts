// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TagManagerFolders extends APIResource {
  /**
   * List folders inside a single tag manager. Folders are dashboard-only
   * organizational containers — they do not affect tag evaluation. Requires the
   * `tagManagerId` query parameter. Supports cursor pagination via `limit` and
   * `cursor`; the limit clamp is 1000 so a single request can return the full set
   * (the web-app workspace renders all folders in one shot). Requires scope:
   * tagManagers:find
   */
  list(
    query: TagManagerFolderListParams,
    options?: RequestOptions,
  ): PagePromise<TagManagerFolderListResponsesCursor, TagManagerFolderListResponse> {
    return this._client.getAPIList('/rest/v1/tag-manager-folders', Cursor<TagManagerFolderListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create a folder inside a tag manager. `tagManagerId` is required in the body.
   * Names are case-insensitively unique within the tag manager — collisions return
   * 409 with the reason in the response `error` field. Requires scope:
   * tagManagers:update
   */
  create(
    body: TagManagerFolderCreateParams,
    options?: RequestOptions,
  ): APIPromise<TagManagerFolderCreateResponse> {
    return this._client.post('/rest/v1/tag-manager-folders', { body, ...options });
  }

  /**
   * Find a single tag manager folder by ID. Requires scope: tagManagers:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<TagManagerFolderRetrieveResponse> {
    return this._client.get(path`/rest/v1/tag-manager-folders/${id}`, options);
  }

  /**
   * Rename a folder. The new name must be case-insensitively unique within the tag
   * manager; collisions return 409. Requires scope: tagManagers:update
   */
  update(
    id: string,
    body: TagManagerFolderUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TagManagerFolderUpdateResponse> {
    return this._client.patch(path`/rest/v1/tag-manager-folders/${id}`, { body, ...options });
  }

  /**
   * Delete a folder. Tags, triggers, and variables previously assigned to the folder
   * are no longer grouped under it; the assets themselves are not deleted. Requires
   * scope: tagManagers:update
   */
  delete(id: string, options?: RequestOptions): APIPromise<TagManagerFolderDeleteResponse> {
    return this._client.delete(path`/rest/v1/tag-manager-folders/${id}`, options);
  }
}

export type TagManagerFolderListResponsesCursor = Cursor<TagManagerFolderListResponse>;

export interface TagManagerFolderListResponse {
  id: string;

  accountId: string;

  name: string;

  tagManagerId: string;

  createdAt?: string | null;

  updatedAt?: string | null;
}

export interface TagManagerFolderCreateResponse {
  id: string;

  accountId: string;

  name: string;

  tagManagerId: string;

  createdAt?: string | null;

  updatedAt?: string | null;
}

export interface TagManagerFolderRetrieveResponse {
  id: string;

  accountId: string;

  name: string;

  tagManagerId: string;

  createdAt?: string | null;

  updatedAt?: string | null;
}

export interface TagManagerFolderUpdateResponse {
  id: string;

  accountId: string;

  name: string;

  tagManagerId: string;

  createdAt?: string | null;

  updatedAt?: string | null;
}

export interface TagManagerFolderDeleteResponse {
  id: string;

  deleted: boolean;
}

export interface TagManagerFolderListParams extends CursorParams {
  /**
   * Parent tag manager whose folders should be returned.
   */
  tagManagerId: string;
}

export interface TagManagerFolderCreateParams {
  /**
   * Folder name. Case-insensitively unique within the tag manager.
   */
  name: string;

  /**
   * Parent tag manager that will own the new folder.
   */
  tagManagerId: string;
}

export interface TagManagerFolderUpdateParams {
  /**
   * New folder name. Case-insensitively unique within the tag manager.
   */
  name: string;
}

export declare namespace TagManagerFolders {
  export {
    type TagManagerFolderListResponse as TagManagerFolderListResponse,
    type TagManagerFolderCreateResponse as TagManagerFolderCreateResponse,
    type TagManagerFolderRetrieveResponse as TagManagerFolderRetrieveResponse,
    type TagManagerFolderUpdateResponse as TagManagerFolderUpdateResponse,
    type TagManagerFolderDeleteResponse as TagManagerFolderDeleteResponse,
    type TagManagerFolderListResponsesCursor as TagManagerFolderListResponsesCursor,
    type TagManagerFolderListParams as TagManagerFolderListParams,
    type TagManagerFolderCreateParams as TagManagerFolderCreateParams,
    type TagManagerFolderUpdateParams as TagManagerFolderUpdateParams,
  };
}
