// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Mappings extends APIResource {
  /**
   * List mappings for an entity (a source or destination). Requires the `entityId`
   * query parameter. Supports cursor pagination via `limit` and `cursor`. Sorted by
   * `priority` ascending, then by `id` for deterministic pagination. Requires scope:
   * mapping:list
   */
  list(
    query: MappingListParams,
    options?: RequestOptions,
  ): PagePromise<MappingListResponsesCursor, MappingListResponse> {
    return this._client.getAPIList('/rest/v1/mappings', Cursor<MappingListResponse>, { query, ...options });
  }

  /**
   * Create a mapping. Two body shapes are accepted:
   *
   * 1. Quick-create — `{ allowedEventId, destinationId }`. Binds an allowed event to
   *    a destination. Returns a slim entity with empty `mappings[]`; follow up with
   *    PATCH to populate fields.
   * 2. Template fat-create —
   *    `{ entityId, templateId, mappings?, logic?, isEnabled?, name?, insertAfterIdx? }`.
   *    Lands a fully-shaped mapping in one round-trip. Use
   *    `GET /rest/v1/mapping-templates?entityId=...` to discover the valid
   *    `templateId` and `mappings[].property` values.
   *
   * Sending both `allowedEventId` and `templateId` returns 400. Requires scope:
   * mapping:create
   */
  create(body: MappingCreateParams, options?: RequestOptions): APIPromise<MappingCreateResponse> {
    return this._client.post('/rest/v1/mappings', { body, ...options });
  }

  /**
   * Find a single mapping by ID. Requires scope: mapping:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<MappingRetrieveResponse> {
    return this._client.get(path`/rest/v1/mappings/${id}`, options);
  }

  /**
   * Partially update a mapping. Only the fields you send are changed. Send
   * `isEnabled: false` to pause the mapping without changing other fields (mirrors
   * `status` on destinations). `mappings[]` is replaced wholesale when sent.
   * Requires scope: mapping:update
   */
  update(id: string, body: MappingUpdateParams, options?: RequestOptions): APIPromise<MappingUpdateResponse> {
    return this._client.patch(path`/rest/v1/mappings/${id}`, { body, ...options });
  }

  /**
   * Delete a mapping. Requires scope: mapping:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<MappingDeleteResponse> {
    return this._client.delete(path`/rest/v1/mappings/${id}`, options);
  }

  /**
   * Reassign `priority` for a set of mappings. Pass `{ uuids: [...] }` with the
   * mapping ids in their new order — index 0 becomes the highest-priority mapping.
   * All ids must belong to the same parent entity (source or destination); mixing
   * entities returns 400. Requires scope: mapping:update
   */
  reorder(body: MappingReorderParams, options?: RequestOptions): APIPromise<MappingReorderResponse> {
    return this._client.post('/rest/v1/mappings/reorder', { body, ...options });
  }
}

export type MappingListResponsesCursor = Cursor<MappingListResponse>;

export interface MappingListResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<MappingListResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: unknown;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace MappingListResponse {
  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingCreateResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<MappingCreateResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: unknown;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace MappingCreateResponse {
  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingRetrieveResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<MappingRetrieveResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: unknown;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace MappingRetrieveResponse {
  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingUpdateResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<MappingUpdateResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: unknown;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace MappingUpdateResponse {
  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export type MappingDeleteResponse = boolean;

export interface MappingReorderResponse {
  entities: Array<MappingReorderResponse.Entity>;
}

export namespace MappingReorderResponse {
  export interface Entity {
    id: string;

    isEnabled: boolean;

    mappings: Array<Entity.Mapping>;

    destinationId?: string | null;

    isDefaultMapping?: boolean | null;

    /**
     * Condition tree gating when this mapping fires. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
     * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
     * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
     * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
     */
    logic?: unknown;

    name?: string | null;

    priority?: number | null;

    sourceId?: string | null;

    templateId?: string | null;

    templateName?: string | null;

    updatedAt?: string | null;
  }

  export namespace Entity {
    export interface Mapping {
      map: string;

      property: string;

      modification?:
        | 'CamelCase'
        | 'DmaIP'
        | 'DomainOnly'
        | 'DomainPathOnly'
        | 'DomainPathUTMs'
        | 'DomainUTMs'
        | 'FakeDomain'
        | 'FakeDomainRealPath'
        | 'FakeIP'
        | 'FullUrl'
        | 'Hash'
        | 'HashMD5'
        | 'HashedCountry'
        | 'HashedDateOfBirth'
        | 'HashedGender'
        | 'HashedNormalized'
        | 'HashedNormalizedNoSpecialChars'
        | 'HashedPhone'
        | 'HashedState'
        | 'HashedZip'
        | 'KebabCase'
        | 'LowerCase'
        | 'None'
        | 'Null'
        | 'Redacted'
        | 'RegionalIP'
        | 'SnakeCase'
        | 'StartCase'
        | 'UpperCase'
        | null;
    }
  }
}

export interface MappingListParams extends CursorParams {
  /**
   * Filter mappings by their parent entity id. Must be a destination id or source
   * id.
   */
  entityId: string;
}

export interface MappingCreateParams {
  /**
   * Quick-create variant: allowed event to bind the new mapping to. Required
   * together with `destinationId`. Mutually exclusive with `templateId`/`entityId`.
   */
  allowedEventId?: string;

  /**
   * Quick-create variant: destination that should receive events matched by this
   * mapping. Required together with `allowedEventId`.
   */
  destinationId?: string;

  /**
   * Template fat-create variant: destination or source id this mapping belongs to.
   * Required together with `templateId`.
   */
  entityId?: string;

  /**
   * Template fat-create only. Zero-based position in the destination/source priority
   * order to insert this mapping after. Omit to append at the end.
   */
  insertAfterIdx?: number;

  /**
   * Template fat-create only. Initial enabled state. Defaults to `true`.
   */
  isEnabled?: boolean;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: MappingCreateParams.Logic;

  /**
   * Template fat-create only. Optional initial property mappings. When omitted the
   * mapping is seeded with template defaults for sources and non-default destination
   * templates, and with `[]` for default destination templates.
   */
  mappings?: Array<MappingCreateParams.Mapping>;

  /**
   * Template fat-create only. Override the auto-generated mapping name.
   */
  name?: string | null;

  /**
   * Template fat-create variant: template id from `GET /rest/v1/mapping-templates`.
   * Picks the property descriptor set used to validate `mappings[].property`.
   * Required together with `entityId`.
   */
  templateId?: string;
}

export namespace MappingCreateParams {
  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  export interface Logic {
    /**
     * All child nodes must match. Each child is a `MappingLogic` node.
     */
    AND?: Array<unknown> | null;

    condition?: Logic.Condition;

    /**
     * Negates a single child `MappingLogic` node.
     */
    NOT?: unknown;

    /**
     * Any child node must match. Each child is a `MappingLogic` node.
     */
    OR?: Array<unknown> | null;
  }

  export namespace Logic {
    export interface Condition {
      operator:
        | 'Is'
        | 'IsNot'
        | 'Contains'
        | 'DoesNotContain'
        | 'StartsWith'
        | 'EndsWith'
        | 'IsFalsy'
        | 'IsTruthy'
        | 'IsNull'
        | 'IsNotNull'
        | 'IsUndefined'
        | 'IsNotUndefined'
        | 'IsGreaterThan'
        | 'IsGreaterThanOrEqual'
        | 'IsLessThan'
        | 'IsLessThanOrEqual'
        | 'IsIn'
        | 'IsNotIn'
        | 'IsFoundIn'
        | 'IsNotFoundIn'
        | 'IsTrue'
        | 'IsFalse'
        | 'IsBefore'
        | 'IsAfter'
        | 'IsBetween'
        | 'IsOnOrBefore'
        | 'IsOnOrAfter'
        | 'MatchesRegex'
        | 'MatchesRegexIgnoreCase'
        | 'DoesNotMatchRegex'
        | 'DoesNotMatchRegexIgnoreCase';

      property: string;

      value: string;
    }
  }

  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingUpdateParams {
  /**
   * Flip the mapping on/off without changing other fields. `null` is treated as
   * omitted.
   */
  isEnabled?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: MappingUpdateParams.Logic;

  mappings?: Array<MappingUpdateParams.Mapping>;

  name?: string | null;
}

export namespace MappingUpdateParams {
  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  export interface Logic {
    /**
     * All child nodes must match. Each child is a `MappingLogic` node.
     */
    AND?: Array<unknown> | null;

    condition?: Logic.Condition;

    /**
     * Negates a single child `MappingLogic` node.
     */
    NOT?: unknown;

    /**
     * Any child node must match. Each child is a `MappingLogic` node.
     */
    OR?: Array<unknown> | null;
  }

  export namespace Logic {
    export interface Condition {
      operator:
        | 'Is'
        | 'IsNot'
        | 'Contains'
        | 'DoesNotContain'
        | 'StartsWith'
        | 'EndsWith'
        | 'IsFalsy'
        | 'IsTruthy'
        | 'IsNull'
        | 'IsNotNull'
        | 'IsUndefined'
        | 'IsNotUndefined'
        | 'IsGreaterThan'
        | 'IsGreaterThanOrEqual'
        | 'IsLessThan'
        | 'IsLessThanOrEqual'
        | 'IsIn'
        | 'IsNotIn'
        | 'IsFoundIn'
        | 'IsNotFoundIn'
        | 'IsTrue'
        | 'IsFalse'
        | 'IsBefore'
        | 'IsAfter'
        | 'IsBetween'
        | 'IsOnOrBefore'
        | 'IsOnOrAfter'
        | 'MatchesRegex'
        | 'MatchesRegexIgnoreCase'
        | 'DoesNotMatchRegex'
        | 'DoesNotMatchRegexIgnoreCase';

      property: string;

      value: string;
    }
  }

  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingReorderParams {
  /**
   * Mapping ids in their new priority order, low priority index first. All ids must
   * belong to the same parent entity (source or destination).
   */
  uuids: Array<string>;
}

export declare namespace Mappings {
  export {
    type MappingListResponse as MappingListResponse,
    type MappingCreateResponse as MappingCreateResponse,
    type MappingRetrieveResponse as MappingRetrieveResponse,
    type MappingUpdateResponse as MappingUpdateResponse,
    type MappingDeleteResponse as MappingDeleteResponse,
    type MappingReorderResponse as MappingReorderResponse,
    type MappingListResponsesCursor as MappingListResponsesCursor,
    type MappingListParams as MappingListParams,
    type MappingCreateParams as MappingCreateParams,
    type MappingUpdateParams as MappingUpdateParams,
    type MappingReorderParams as MappingReorderParams,
  };
}
