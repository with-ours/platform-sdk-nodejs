// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TagManagerTags extends APIResource {
  /**
   * List tags inside a single tag manager. Requires the `tagManagerId` query
   * parameter — tags are always scoped to one parent container. Supports cursor
   * pagination via `limit` and `cursor`; the limit clamp is 1000 so a single request
   * can return the full set (the web-app workspace renders all tags in one shot).
   * Requires scope: tagManagers:find
   */
  list(
    query: TagManagerTagListParams,
    options?: RequestOptions,
  ): PagePromise<TagManagerTagListResponsesCursor, TagManagerTagListResponse> {
    return this._client.getAPIList('/rest/v1/tag-manager-tags', Cursor<TagManagerTagListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create a new tag inside a tag manager. `tagManagerId` is required in the body.
   * Newly created tags are not assigned to any folder — use the GraphQL
   * `assignTagManagerAssetToFolder` mutation to place them. Requires scope:
   * tagManagers:update
   */
  create(body: TagManagerTagCreateParams, options?: RequestOptions): APIPromise<TagManagerTagCreateResponse> {
    return this._client.post('/rest/v1/tag-manager-tags', { body, ...options });
  }

  /**
   * Fetch a single tag by id, including its `folderId` (read-only on this endpoint).
   * Requires scope: tagManagers:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<TagManagerTagRetrieveResponse> {
    return this._client.get(path`/rest/v1/tag-manager-tags/${id}`, options);
  }

  /**
   * Partially update a tag. Only the fields you send are changed. `folderId` is
   * read-only here; change folder membership via the GraphQL
   * `assignTagManagerAssetToFolder` mutation. Tags cannot be moved between tag
   * managers (omit `tagManagerId` on patch). Requires scope: tagManagers:update
   */
  update(
    id: string,
    body: TagManagerTagUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TagManagerTagUpdateResponse> {
    return this._client.patch(path`/rest/v1/tag-manager-tags/${id}`, { body, ...options });
  }

  /**
   * Delete a tag manager tag. Requires scope: tagManagers:update
   */
  delete(id: string, options?: RequestOptions): APIPromise<TagManagerTagDeleteResponse> {
    return this._client.delete(path`/rest/v1/tag-manager-tags/${id}`, options);
  }

  /**
   * Lists every tag template the platform supports — what `type` discriminator to
   * send on create/patch, and the shape of the type-specific `parameters` payload
   * (fields, validators, required flags, available values for selects).
   * Account-agnostic: the response is the same for every API key. The same registry
   * powers server-side validation on `POST` / `PATCH` so what this endpoint
   * advertises matches what the server enforces. Requires scope: tagManagers:find
   */
  types(options?: RequestOptions): APIPromise<TagManagerTagTypesResponse> {
    return this._client.get('/rest/v1/tag-manager-tags/types', options);
  }
}

export type TagManagerTagListResponsesCursor = Cursor<TagManagerTagListResponse>;

export interface TagManagerTagListResponse {
  /**
   * Server-assigned UUID for this tag.
   */
  id: string;

  accountId: string;

  /**
   * Triggers that fire this tag. Tag does nothing if this list is empty.
   */
  fireTriggerIds: Array<string>;

  /**
   * Human-readable tag name.
   */
  name: string;

  /**
   * Type-specific JSON configuration. Shape depends on `type` — inspect a known-good
   * tag of the same type for the field set. Empty object is valid for placeholder
   * tags.
   */
  parameters: { [key: string]: unknown };

  /**
   * Tag implementation identifier — usually matches `type` but kept distinct for
   * legacy tags whose implementation diverged from the type label.
   */
  Tag: string;

  /**
   * Parent tag manager that owns this tag.
   */
  tagManagerId: string;

  /**
   * Tag type discriminator (e.g. `GA4Event`, `MetaPixel`, `OursInitTag`).
   */
  type: string;

  /**
   * Triggers that suppress this tag when they match — evaluated after fire triggers.
   */
  blockTriggerIds?: Array<string> | null;

  createdAt?: string | null;

  /**
   * Defaults to `true` on create.
   */
  enabled?: boolean | null;

  /**
   * Folder this tag belongs to in the dashboard. Read-only on this endpoint — change
   * folder membership via the GraphQL `assignTagManagerAssetToFolder` mutation.
   */
  folderId?: string | null;

  /**
   * Lower numbers fire first. Defaults to 0.
   */
  priority?: number | null;

  updatedAt?: string | null;
}

export interface TagManagerTagCreateResponse {
  /**
   * Server-assigned UUID for this tag.
   */
  id: string;

  accountId: string;

  /**
   * Triggers that fire this tag. Tag does nothing if this list is empty.
   */
  fireTriggerIds: Array<string>;

  /**
   * Human-readable tag name.
   */
  name: string;

  /**
   * Type-specific JSON configuration. Shape depends on `type` — inspect a known-good
   * tag of the same type for the field set. Empty object is valid for placeholder
   * tags.
   */
  parameters: { [key: string]: unknown };

  /**
   * Tag implementation identifier — usually matches `type` but kept distinct for
   * legacy tags whose implementation diverged from the type label.
   */
  Tag: string;

  /**
   * Parent tag manager that owns this tag.
   */
  tagManagerId: string;

  /**
   * Tag type discriminator (e.g. `GA4Event`, `MetaPixel`, `OursInitTag`).
   */
  type: string;

  /**
   * Triggers that suppress this tag when they match — evaluated after fire triggers.
   */
  blockTriggerIds?: Array<string> | null;

  createdAt?: string | null;

  /**
   * Defaults to `true` on create.
   */
  enabled?: boolean | null;

  /**
   * Folder this tag belongs to in the dashboard. Read-only on this endpoint — change
   * folder membership via the GraphQL `assignTagManagerAssetToFolder` mutation.
   */
  folderId?: string | null;

  /**
   * Lower numbers fire first. Defaults to 0.
   */
  priority?: number | null;

  updatedAt?: string | null;
}

export interface TagManagerTagRetrieveResponse {
  /**
   * Server-assigned UUID for this tag.
   */
  id: string;

  accountId: string;

  /**
   * Triggers that fire this tag. Tag does nothing if this list is empty.
   */
  fireTriggerIds: Array<string>;

  /**
   * Human-readable tag name.
   */
  name: string;

  /**
   * Type-specific JSON configuration. Shape depends on `type` — inspect a known-good
   * tag of the same type for the field set. Empty object is valid for placeholder
   * tags.
   */
  parameters: { [key: string]: unknown };

  /**
   * Tag implementation identifier — usually matches `type` but kept distinct for
   * legacy tags whose implementation diverged from the type label.
   */
  Tag: string;

  /**
   * Parent tag manager that owns this tag.
   */
  tagManagerId: string;

  /**
   * Tag type discriminator (e.g. `GA4Event`, `MetaPixel`, `OursInitTag`).
   */
  type: string;

  /**
   * Triggers that suppress this tag when they match — evaluated after fire triggers.
   */
  blockTriggerIds?: Array<string> | null;

  createdAt?: string | null;

  /**
   * Defaults to `true` on create.
   */
  enabled?: boolean | null;

  /**
   * Folder this tag belongs to in the dashboard. Read-only on this endpoint — change
   * folder membership via the GraphQL `assignTagManagerAssetToFolder` mutation.
   */
  folderId?: string | null;

  /**
   * Lower numbers fire first. Defaults to 0.
   */
  priority?: number | null;

  updatedAt?: string | null;
}

export interface TagManagerTagUpdateResponse {
  /**
   * Server-assigned UUID for this tag.
   */
  id: string;

  accountId: string;

  /**
   * Triggers that fire this tag. Tag does nothing if this list is empty.
   */
  fireTriggerIds: Array<string>;

  /**
   * Human-readable tag name.
   */
  name: string;

  /**
   * Type-specific JSON configuration. Shape depends on `type` — inspect a known-good
   * tag of the same type for the field set. Empty object is valid for placeholder
   * tags.
   */
  parameters: { [key: string]: unknown };

  /**
   * Tag implementation identifier — usually matches `type` but kept distinct for
   * legacy tags whose implementation diverged from the type label.
   */
  Tag: string;

  /**
   * Parent tag manager that owns this tag.
   */
  tagManagerId: string;

  /**
   * Tag type discriminator (e.g. `GA4Event`, `MetaPixel`, `OursInitTag`).
   */
  type: string;

  /**
   * Triggers that suppress this tag when they match — evaluated after fire triggers.
   */
  blockTriggerIds?: Array<string> | null;

  createdAt?: string | null;

  /**
   * Defaults to `true` on create.
   */
  enabled?: boolean | null;

  /**
   * Folder this tag belongs to in the dashboard. Read-only on this endpoint — change
   * folder membership via the GraphQL `assignTagManagerAssetToFolder` mutation.
   */
  folderId?: string | null;

  /**
   * Lower numbers fire first. Defaults to 0.
   */
  priority?: number | null;

  updatedAt?: string | null;
}

export interface TagManagerTagDeleteResponse {
  id: string;

  deleted: boolean;
}

export interface TagManagerTagTypesResponse {
  entities: Array<TagManagerTagTypesResponse.Entity>;
}

export namespace TagManagerTagTypesResponse {
  export interface Entity {
    /**
     * Type discriminator — pass this as `type` on create/patch.
     */
    id: string;

    /**
     * Grouping label.
     */
    category: string;

    fields: Array<Entity.Field>;

    /**
     * Human-readable display name.
     */
    name: string;

    description?: string | null;
  }

  export namespace Entity {
    export interface Field {
      /**
       * Parameter key that goes in the `parameters` payload at create/patch.
       */
      id: string;

      /**
       * Human-readable title for the field.
       */
      title: string;

      /**
       * Underlying data type of the parameter value.
       */
      type: 'STRING' | 'BOOLEAN' | 'INTEGER' | 'FLOAT' | 'TABLE';

      /**
       * For TABLE-typed fields, the predefined keys each row may contain.
       */
      allowedKeys?: Array<string> | null;

      /**
       * When present, the field accepts only one of these values. Send the `value`
       * string in `parameters`; the `label` is for display.
       */
      availableValues?: Array<Field.AvailableValue> | null;

      /**
       * Default value when the caller omits the parameter on create.
       */
      default?: { [key: string]: unknown };

      description?: string | null;

      /**
       * When `true`, omitting or sending an empty value for this parameter on
       * create/patch returns HTTP 400.
       */
      required?: boolean | null;

      /**
       * Server-enforced rules applied to this field at create and patch.
       */
      validators?: Array<Field.Validator> | null;
    }

    export namespace Field {
      export interface AvailableValue {
        label: string;

        value: string;
      }

      export interface Validator {
        type: 'NotEmpty' | 'CharacterLength' | 'Url' | 'Email' | 'Number' | 'Range';

        max?: number | null;

        min?: number | null;
      }
    }
  }
}

export interface TagManagerTagListParams extends CursorParams {
  /**
   * Parent tag manager whose tags should be returned.
   */
  tagManagerId: string;
}

export interface TagManagerTagCreateParams {
  /**
   * Trigger ids that cause this tag to fire. Use `[]` only for placeholder tags.
   */
  fireTriggerIds: Array<string>;

  /**
   * Human-readable tag name.
   */
  name: string;

  /**
   * Type-specific JSON configuration. Send `{}` for a placeholder.
   */
  parameters: { [key: string]: unknown };

  /**
   * Tag implementation identifier (typically equals `type`).
   */
  Tag: string;

  /**
   * Parent tag manager that will own the new tag.
   */
  tagManagerId: string;

  /**
   * Tag type discriminator (e.g. `GA4Event`).
   */
  type: string;

  /**
   * Optional trigger ids that block this tag when they match.
   */
  blockTriggerIds?: Array<string> | null;

  /**
   * Defaults to `true`.
   */
  enabled?: boolean | null;

  /**
   * Defaults to 0.
   */
  priority?: number | null;
}

export interface TagManagerTagUpdateParams {
  /**
   * Replaces the block trigger list wholesale. Send `null` to clear.
   */
  blockTriggerIds?: Array<string> | null;

  /**
   * Pause/resume the tag without changing other fields.
   */
  enabled?: boolean | null;

  /**
   * Replaces the fire trigger list wholesale.
   */
  fireTriggerIds?: Array<string>;

  /**
   * Updated tag name.
   */
  name?: string;

  /**
   * Updated type-specific JSON configuration.
   */
  parameters?: { [key: string]: unknown };

  /**
   * Updated priority.
   */
  priority?: number | null;

  /**
   * Updated tag implementation identifier.
   */
  Tag?: string;

  /**
   * Updated tag type.
   */
  type?: string;
}

export declare namespace TagManagerTags {
  export {
    type TagManagerTagListResponse as TagManagerTagListResponse,
    type TagManagerTagCreateResponse as TagManagerTagCreateResponse,
    type TagManagerTagRetrieveResponse as TagManagerTagRetrieveResponse,
    type TagManagerTagUpdateResponse as TagManagerTagUpdateResponse,
    type TagManagerTagDeleteResponse as TagManagerTagDeleteResponse,
    type TagManagerTagTypesResponse as TagManagerTagTypesResponse,
    type TagManagerTagListResponsesCursor as TagManagerTagListResponsesCursor,
    type TagManagerTagListParams as TagManagerTagListParams,
    type TagManagerTagCreateParams as TagManagerTagCreateParams,
    type TagManagerTagUpdateParams as TagManagerTagUpdateParams,
  };
}
