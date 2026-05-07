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
   * Create a new mapping. Requires scope: mapping:create
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
   * Partially update a mapping. Only the fields you send are changed. Requires
   * scope: mapping:update
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
}

export type MappingListResponsesCursor = Cursor<MappingListResponse>;

export interface MappingListResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<MappingListResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

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

export interface MappingListParams extends CursorParams {
  /**
   * Filter mappings by their parent entity id. Must be a destination id or source
   * id.
   */
  entityId: string;
}

export interface MappingCreateParams {
  allowedEventId: string;

  destinationId: string;
}

export interface MappingUpdateParams {
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

export declare namespace Mappings {
  export {
    type MappingListResponse as MappingListResponse,
    type MappingCreateResponse as MappingCreateResponse,
    type MappingRetrieveResponse as MappingRetrieveResponse,
    type MappingUpdateResponse as MappingUpdateResponse,
    type MappingDeleteResponse as MappingDeleteResponse,
    type MappingListResponsesCursor as MappingListResponsesCursor,
    type MappingListParams as MappingListParams,
    type MappingCreateParams as MappingCreateParams,
    type MappingUpdateParams as MappingUpdateParams,
  };
}
