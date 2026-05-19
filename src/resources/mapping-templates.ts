// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class MappingTemplates extends APIResource {
  /**
   * Discover every mapping template available for a destination or source, with full
   * property descriptors inlined. Use the returned `id` as `templateId` when calling
   * `POST /rest/v1/mappings` (template fat-create variant), and use each entry under
   * `mappings[]` to learn the valid `property`, `kind`, `modificationOptions`, and
   * any enforced `options`. The `isDefault: true` entry is the destination's
   * built-in default template (the one stored at `MAPPER#{destinationId}` when
   * configured via `PUT /rest/v1/default-mappings/{destinationId}`). Requires scope:
   * mapping:find
   */
  list(query: MappingTemplateListParams, options?: RequestOptions): APIPromise<MappingTemplateListResponse> {
    return this._client.get('/rest/v1/mapping-templates', { query, ...options });
  }
}

export interface MappingTemplateListResponse {
  entities: Array<MappingTemplateListResponse.Entity>;
}

export namespace MappingTemplateListResponse {
  export interface Entity {
    /**
     * Template identifier — pass to `POST /rest/v1/mappings` as `templateId`.
     */
    id: string;

    /**
     * True for the destination's built-in default template (the one stored at
     * `MAPPER#{destinationId}` when configured). Sources only have one template; it is
     * always default.
     */
    isDefault: boolean;

    mappings: Array<Entity.Mapping>;

    name: string;

    description?: string | null;
  }

  export namespace Entity {
    export interface Mapping {
      /**
       * Long-form description / tooltip for this property.
       */
      description: string | null;

      isPII: boolean;

      /**
       * Type information for SDK validation (Text, Integer, Email, Url, IP, Object,
       * KnownObject, Date, DateTime, Array, Boolean, JSON).
       */
      kind:
        | 'Array'
        | 'Boolean'
        | 'Date'
        | 'DateTime'
        | 'Email'
        | 'IP'
        | 'Integer'
        | 'JSON'
        | 'KnownObject'
        | 'Object'
        | 'Text'
        | 'Url';

      /**
       * Human-readable label (e.g. "Email", "Event Name").
       */
      label: string;

      /**
       * The template default source expression, e.g. `{{visitor.email}}`.
       */
      map: string;

      /**
       * The value to send as `mappings[].property` when creating or patching a mapping.
       */
      property: string;

      required: boolean;

      /**
       * The template default modification (hashing / case / URL truncation).
       */
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

      /**
       * Suggested modification options for this property. Not a whitelist.
       */
      modificationOptions?: Array<
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
      > | null;

      /**
       * When set, the ONLY valid `map` values for this property. Typically used for
       * enum-shaped destinations.
       */
      options?: Array<Mapping.Option> | null;

      /**
       * Non-binding suggestions for the `map` value (e.g. common event names a customer
       * might want to use).
       */
      suggestedOptions?: Array<Mapping.SuggestedOption> | null;
    }

    export namespace Mapping {
      export interface Option {
        label: string;

        value: string;
      }

      export interface SuggestedOption {
        label: string;

        value: string;
      }
    }
  }
}

export interface MappingTemplateListParams {
  /**
   * Destination or source id. Required.
   */
  entityId: string;
}

export declare namespace MappingTemplates {
  export {
    type MappingTemplateListResponse as MappingTemplateListResponse,
    type MappingTemplateListParams as MappingTemplateListParams,
  };
}
