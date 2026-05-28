// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class TagManagerAssetFolders extends APIResource {
  /**
   * Assign a tag, trigger, or variable to a folder within its tag manager, or send
   * `folderId: null` to remove the asset from its current folder. The assignment is
   * a full replace — calling it again with a different `folderId` silently moves the
   * asset. Requires scope: tagManagers:update
   */
  create(
    body: TagManagerAssetFolderCreateParams,
    options?: RequestOptions,
  ): APIPromise<TagManagerAssetFolderCreateResponse> {
    return this._client.post('/rest/v1/tag-manager-asset-folders', { body, ...options });
  }
}

export interface TagManagerAssetFolderCreateResponse {
  id: string;

  accountId: string;

  assetId: string;

  assetType: 'tagManagerTag' | 'tagManagerTrigger' | 'tagManagerVariable';

  tagManagerId: string;

  createdAt?: string | null;

  folderId?: string | null;

  updatedAt?: string | null;
}

export interface TagManagerAssetFolderCreateParams {
  /**
   * UUID of the tag, trigger, or variable to assign.
   */
  assetId: string;

  /**
   * Asset type to assign. Must be one of `tagManagerTag`, `tagManagerTrigger`, or
   * `tagManagerVariable`.
   */
  assetType: 'tagManagerTag' | 'tagManagerTrigger' | 'tagManagerVariable';

  /**
   * Folder UUID to assign to. Send `null` to remove the asset from its current
   * folder.
   */
  folderId: string | null;
}

export declare namespace TagManagerAssetFolders {
  export {
    type TagManagerAssetFolderCreateResponse as TagManagerAssetFolderCreateResponse,
    type TagManagerAssetFolderCreateParams as TagManagerAssetFolderCreateParams,
  };
}
