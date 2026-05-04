// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Versions extends APIResource {
  /**
   * Publish the current draft (i.e. all unpublished entity changes) as a new
   * version. Returns the full Version on success. Returns HTTP 409 with the reason
   * in the response `error` field when there are no draft changes to publish, when
   * another publish is already in flight, or when the action otherwise conflicts
   * with current state. To re-publish an existing version, use POST
   * /rest/v1/versions/{id}/publish instead. Requires scope: version:publish
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
   * Partially update a version. Only the fields you send are changed. Requires
   * scope: version:update
   */
  update(id: string, body: VersionUpdateParams, options?: RequestOptions): APIPromise<VersionUpdateResponse> {
    return this._client.patch(path`/rest/v1/versions/${id}`, { body, ...options });
  }

  /**
   * List versions for this account, newest first. Supports cursor pagination and
   * filtering by `isPublished`, `nameContains`, and `notesContains`. Combine filters
   * with AND semantics. Requires scope: version:list
   */
  list(
    query: VersionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VersionListResponse> {
    return this._client.get('/rest/v1/versions', { query, ...options });
  }
}

export interface VersionCreateResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  /**
   * When this version was most recently published. NOT cleared when a newer version
   * is published — `publishedAt` reflects the most recent successful publish of this
   * row, regardless of whether `isPublished` is currently true. Use `isPublished` to
   * determine the current live version.
   */
  publishedAt?: string | null;
}

export interface VersionRetrieveResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  /**
   * When this version was most recently published. NOT cleared when a newer version
   * is published — `publishedAt` reflects the most recent successful publish of this
   * row, regardless of whether `isPublished` is currently true. Use `isPublished` to
   * determine the current live version.
   */
  publishedAt?: string | null;
}

export interface VersionUpdateResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  /**
   * When this version was most recently published. NOT cleared when a newer version
   * is published — `publishedAt` reflects the most recent successful publish of this
   * row, regardless of whether `isPublished` is currently true. Use `isPublished` to
   * determine the current live version.
   */
  publishedAt?: string | null;
}

export interface VersionListResponse {
  entities: Array<VersionListResponse.Entity>;

  pagination: VersionListResponse.Pagination;
}

export namespace VersionListResponse {
  export interface Entity {
    id: string;

    createdAt: string;

    isPublished: boolean;

    versionNumber: number;

    name?: string | null;

    /**
     * When this version was most recently published. NOT cleared when a newer version
     * is published — `publishedAt` reflects the most recent successful publish of this
     * row, regardless of whether `isPublished` is currently true. Use `isPublished` to
     * determine the current live version.
     */
    publishedAt?: string | null;
  }

  export interface Pagination {
    hasMore: boolean;

    nextCursor?: string | null;
  }
}

export interface VersionCreateParams {
  includeAllowedEvents?: Array<string> | null;

  includeConsentSettings?: Array<string> | null;

  includeDestinations?: Array<string> | null;

  includeExternalAllowedEventData?: Array<string> | null;

  includeGlobalDispatchCenters?: Array<string> | null;

  includeMappings?: Array<string> | null;

  includeReplaySettings?: Array<string> | null;

  includeSources?: Array<string> | null;

  includeTagManagerTags?: Array<string> | null;

  includeTagManagerTriggers?: Array<string> | null;

  includeTagManagerVariables?: Array<string> | null;

  name?: string | null;

  notes?: string | null;
}

export interface VersionUpdateParams {
  name?: string | null;

  notes?: string | null;
}

export interface VersionListParams {
  /**
   * Opaque pagination cursor from pagination.nextCursor in the previous response. Do
   * not decode or modify it. Malformed cursors return 400 Bad Request.
   */
  cursor?: string;

  /**
   * Filter to only published or unpublished versions.
   */
  isPublished?: 'true' | 'false';

  /**
   * Maximum number of versions to return. Defaults to 25; values below 1 are clamped
   * to 1 and values above 100 are clamped to 100.
   */
  limit?: number | null;

  /**
   * Case-insensitive substring match on the version name.
   */
  nameContains?: string;

  /**
   * Case-insensitive substring match on the version notes.
   */
  notesContains?: string;
}

export declare namespace Versions {
  export {
    type VersionCreateResponse as VersionCreateResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionUpdateResponse as VersionUpdateResponse,
    type VersionListResponse as VersionListResponse,
    type VersionCreateParams as VersionCreateParams,
    type VersionUpdateParams as VersionUpdateParams,
    type VersionListParams as VersionListParams,
  };
}
