// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class DefaultMappings extends APIResource {
  /**
   * List every stored default mapping for the account, one per destination that has
   * ever written a default. Destinations that have not yet written a default mapping
   * do not appear here. Use `GET /rest/v1/default-mappings/{destinationId}` to fetch
   * the hydrated would-be row for a specific destination. Requires scope:
   * mapping:list
   */
  list(options?: RequestOptions): APIPromise<DefaultMappingListResponse> {
    return this._client.get('/rest/v1/default-mappings', options);
  }

  /**
   * Fetch the destination's default mapping by destination id. Returns a hydrated
   * row with empty `mappings[]` when no default mapping has been written yet (so
   * callers do not need to handle a 404-vs-200 branch). Each destination has at most
   * one default mapping. Requires scope: mapping:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DefaultMappingRetrieveResponse> {
    return this._client.get(path`/rest/v1/default-mappings/${id}`, options);
  }

  /**
   * Upsert the destination default mapping. Always replaces `mappings[]` wholesale
   * (default mappings have no merge-partial semantic). Default mappings cannot have
   * custom `logic`; the field is not accepted on this endpoint. Requires scope:
   * mapping:update
   */
  replace(
    id: string,
    body: DefaultMappingReplaceParams,
    options?: RequestOptions,
  ): APIPromise<DefaultMappingReplaceResponse> {
    return this._client.put(path`/rest/v1/default-mappings/${id}`, { body, ...options });
  }
}

export interface DefaultMappingListResponse {
  entities: Array<DefaultMappingListResponse.Entity>;
}

export namespace DefaultMappingListResponse {
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

export interface DefaultMappingRetrieveResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<DefaultMappingRetrieveResponse.Mapping>;

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

export namespace DefaultMappingRetrieveResponse {
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

export interface DefaultMappingReplaceResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<DefaultMappingReplaceResponse.Mapping>;

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

export namespace DefaultMappingReplaceResponse {
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

export interface DefaultMappingReplaceParams {
  /**
   * Property mappings to persist as the destination default. Use
   * `GET /rest/v1/mapping-templates?entityId={destinationId}` to discover the valid
   * `property` values.
   */
  mappings: Array<DefaultMappingReplaceParams.Mapping>;

  /**
   * Toggle the default mapping on/off. Defaults to `true` when omitted. `null` is
   * treated as omitted.
   */
  isEnabled?: boolean | null;
}

export namespace DefaultMappingReplaceParams {
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

export declare namespace DefaultMappings {
  export {
    type DefaultMappingListResponse as DefaultMappingListResponse,
    type DefaultMappingRetrieveResponse as DefaultMappingRetrieveResponse,
    type DefaultMappingReplaceResponse as DefaultMappingReplaceResponse,
    type DefaultMappingReplaceParams as DefaultMappingReplaceParams,
  };
}
