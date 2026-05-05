// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ExperimentVariants extends APIResource {
  /**
   * List variants for a specific parent experiment. Requires the `experimentId`
   * query parameter — variants are always scoped to a single experiment. Requires
   * scope: experiment:find
   *
   * @example
   * ```ts
   * const experimentVariants =
   *   await client.experimentVariants.list({
   *     experimentId: '08524dc8-5289-48e8-bf40-b3a7cfa6ca0a',
   *   });
   * ```
   */
  list(
    query: ExperimentVariantListParams,
    options?: RequestOptions,
  ): APIPromise<ExperimentVariantListResponse> {
    return this._client.get('/rest/v1/experiment-variants', { query, ...options });
  }

  /**
   * Create a new experiment variant. Requires scope: experiment:update
   *
   * @example
   * ```ts
   * const experimentVariant =
   *   await client.experimentVariants.create({
   *     experimentId: 'x',
   *     name: 'Variant B',
   *     weight: 50,
   *   });
   * ```
   */
  create(
    body: ExperimentVariantCreateParams,
    options?: RequestOptions,
  ): APIPromise<ExperimentVariantCreateResponse> {
    return this._client.post('/rest/v1/experiment-variants', { body, ...options });
  }

  /**
   * Find a single experiment variant by ID. Requires scope: experiment:find
   *
   * @example
   * ```ts
   * const experimentVariant =
   *   await client.experimentVariants.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ExperimentVariantRetrieveResponse> {
    return this._client.get(path`/rest/v1/experiment-variants/${id}`, options);
  }

  /**
   * Partially update an experiment variant. Only the fields you send are changed.
   * Requires scope: experiment:update
   *
   * @example
   * ```ts
   * const experimentVariant =
   *   await client.experimentVariants.update('id');
   * ```
   */
  update(
    id: string,
    body: ExperimentVariantUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ExperimentVariantUpdateResponse> {
    return this._client.patch(path`/rest/v1/experiment-variants/${id}`, { body, ...options });
  }

  /**
   * Delete an experiment variant. Requires scope: experiment:update
   *
   * @example
   * ```ts
   * const experimentVariant =
   *   await client.experimentVariants.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<ExperimentVariantDeleteResponse> {
    return this._client.delete(path`/rest/v1/experiment-variants/${id}`, options);
  }
}

export interface ExperimentVariantListResponse {
  /**
   * All variants on the parent experiment, including the auto-generated control.
   * Returns an empty list when the experiment does not exist or is not visible to
   * the caller. Variants per experiment are capped at 200; this list is not
   * paginated because the SDK runtime always needs the full set to drive bucketing.
   */
  entities: Array<ExperimentVariantListResponse.Entity>;
}

export namespace ExperimentVariantListResponse {
  export interface Entity {
    /**
     * Unique identifier for this experiment variant.
     */
    id: string;

    /**
     * Parent experiment ID this variant belongs to.
     */
    experimentId: string;

    /**
     * Whether this is the baseline control variant.
     */
    isControl: boolean;

    /**
     * Human-readable variant name shown in the dashboard and results.
     */
    name: string;

    /**
     * Relative traffic weight used when assigning visitors among variants in an active
     * experiment.
     */
    weight: number;

    /**
     * Ordered list of declarative DOM mutations applied when this variant is assigned.
     */
    domModifications?: Array<Entity.DomModification> | null;

    /**
     * Target URL for redirect variants. Use either a site-relative path such as
     * `/pricing-v2` or an absolute `https://` URL. Cross-origin `http://` URLs are
     * rejected. Omit for DOM modification variants.
     */
    redirectUrl?: string | null;

    /**
     * How this variant changes the user experience. `dom_modifications` for on-page
     * changes or `redirect` for redirect tests.
     */
    variantType?: string | null;
  }

  export namespace Entity {
    export interface DomModification {
      /**
       * Mutation to apply when the selector matches. Use `redirectUrl` instead of DOM
       * modifications for redirect variants.
       */
      action:
        | 'customCss'
        | 'customJs'
        | 'insertAfter'
        | 'insertBefore'
        | 'remove'
        | 'setAttribute'
        | 'setHtml'
        | 'setImage'
        | 'setStyle'
        | 'setText';

      /**
       * CSS selector used to find the element to modify on the page at runtime.
       */
      selector: string;

      /**
       * Canonical action payload. For `setText` / `setHtml` / `customCss` / `customJs` /
       * `setImage` / `insertBefore` / `insertAfter` this is the literal
       * text/HTML/CSS/JS/URL. For `setStyle` and `setAttribute` it is a JSON-stringified
       * `{key: value}` object — prefer the structured `styles` / `attribute` fields
       * below to avoid manual JSON encoding.
       */
      value: string;

      /**
       * Populated on read for `setAttribute` modifications, parsed from `value`.
       * Customers may also send this field instead of a JSON-stringified `value` on
       * write — see `domModificationInputSchema`.
       */
      attribute?: unknown | null;

      /**
       * Populated on read for `setStyle` modifications, parsed from `value`. Customers
       * may also send this field instead of a JSON-stringified `value` on write — see
       * `domModificationInputSchema`.
       */
      styles?: Array<DomModification.Style> | null;
    }

    export namespace DomModification {
      export interface Style {
        /**
         * CSS property name in camelCase or kebab-case.
         */
        property: string;

        /**
         * CSS value to assign to the property.
         */
        value: string;
      }
    }
  }
}

export interface ExperimentVariantCreateResponse {
  /**
   * Unique identifier for this experiment variant.
   */
  id: string;

  /**
   * Parent experiment ID this variant belongs to.
   */
  experimentId: string;

  /**
   * Whether this is the baseline control variant.
   */
  isControl: boolean;

  /**
   * Human-readable variant name shown in the dashboard and results.
   */
  name: string;

  /**
   * Relative traffic weight used when assigning visitors among variants in an active
   * experiment.
   */
  weight: number;

  /**
   * Ordered list of declarative DOM mutations applied when this variant is assigned.
   */
  domModifications?: Array<ExperimentVariantCreateResponse.DomModification> | null;

  /**
   * Target URL for redirect variants. Use either a site-relative path such as
   * `/pricing-v2` or an absolute `https://` URL. Cross-origin `http://` URLs are
   * rejected. Omit for DOM modification variants.
   */
  redirectUrl?: string | null;

  /**
   * How this variant changes the user experience. `dom_modifications` for on-page
   * changes or `redirect` for redirect tests.
   */
  variantType?: string | null;
}

export namespace ExperimentVariantCreateResponse {
  export interface DomModification {
    /**
     * Mutation to apply when the selector matches. Use `redirectUrl` instead of DOM
     * modifications for redirect variants.
     */
    action:
      | 'customCss'
      | 'customJs'
      | 'insertAfter'
      | 'insertBefore'
      | 'remove'
      | 'setAttribute'
      | 'setHtml'
      | 'setImage'
      | 'setStyle'
      | 'setText';

    /**
     * CSS selector used to find the element to modify on the page at runtime.
     */
    selector: string;

    /**
     * Canonical action payload. For `setText` / `setHtml` / `customCss` / `customJs` /
     * `setImage` / `insertBefore` / `insertAfter` this is the literal
     * text/HTML/CSS/JS/URL. For `setStyle` and `setAttribute` it is a JSON-stringified
     * `{key: value}` object — prefer the structured `styles` / `attribute` fields
     * below to avoid manual JSON encoding.
     */
    value: string;

    /**
     * Populated on read for `setAttribute` modifications, parsed from `value`.
     * Customers may also send this field instead of a JSON-stringified `value` on
     * write — see `domModificationInputSchema`.
     */
    attribute?: unknown | null;

    /**
     * Populated on read for `setStyle` modifications, parsed from `value`. Customers
     * may also send this field instead of a JSON-stringified `value` on write — see
     * `domModificationInputSchema`.
     */
    styles?: Array<DomModification.Style> | null;
  }

  export namespace DomModification {
    export interface Style {
      /**
       * CSS property name in camelCase or kebab-case.
       */
      property: string;

      /**
       * CSS value to assign to the property.
       */
      value: string;
    }
  }
}

export interface ExperimentVariantRetrieveResponse {
  /**
   * Unique identifier for this experiment variant.
   */
  id: string;

  /**
   * Parent experiment ID this variant belongs to.
   */
  experimentId: string;

  /**
   * Whether this is the baseline control variant.
   */
  isControl: boolean;

  /**
   * Human-readable variant name shown in the dashboard and results.
   */
  name: string;

  /**
   * Relative traffic weight used when assigning visitors among variants in an active
   * experiment.
   */
  weight: number;

  /**
   * Ordered list of declarative DOM mutations applied when this variant is assigned.
   */
  domModifications?: Array<ExperimentVariantRetrieveResponse.DomModification> | null;

  /**
   * Target URL for redirect variants. Use either a site-relative path such as
   * `/pricing-v2` or an absolute `https://` URL. Cross-origin `http://` URLs are
   * rejected. Omit for DOM modification variants.
   */
  redirectUrl?: string | null;

  /**
   * How this variant changes the user experience. `dom_modifications` for on-page
   * changes or `redirect` for redirect tests.
   */
  variantType?: string | null;
}

export namespace ExperimentVariantRetrieveResponse {
  export interface DomModification {
    /**
     * Mutation to apply when the selector matches. Use `redirectUrl` instead of DOM
     * modifications for redirect variants.
     */
    action:
      | 'customCss'
      | 'customJs'
      | 'insertAfter'
      | 'insertBefore'
      | 'remove'
      | 'setAttribute'
      | 'setHtml'
      | 'setImage'
      | 'setStyle'
      | 'setText';

    /**
     * CSS selector used to find the element to modify on the page at runtime.
     */
    selector: string;

    /**
     * Canonical action payload. For `setText` / `setHtml` / `customCss` / `customJs` /
     * `setImage` / `insertBefore` / `insertAfter` this is the literal
     * text/HTML/CSS/JS/URL. For `setStyle` and `setAttribute` it is a JSON-stringified
     * `{key: value}` object — prefer the structured `styles` / `attribute` fields
     * below to avoid manual JSON encoding.
     */
    value: string;

    /**
     * Populated on read for `setAttribute` modifications, parsed from `value`.
     * Customers may also send this field instead of a JSON-stringified `value` on
     * write — see `domModificationInputSchema`.
     */
    attribute?: unknown | null;

    /**
     * Populated on read for `setStyle` modifications, parsed from `value`. Customers
     * may also send this field instead of a JSON-stringified `value` on write — see
     * `domModificationInputSchema`.
     */
    styles?: Array<DomModification.Style> | null;
  }

  export namespace DomModification {
    export interface Style {
      /**
       * CSS property name in camelCase or kebab-case.
       */
      property: string;

      /**
       * CSS value to assign to the property.
       */
      value: string;
    }
  }
}

export interface ExperimentVariantUpdateResponse {
  /**
   * Unique identifier for this experiment variant.
   */
  id: string;

  /**
   * Parent experiment ID this variant belongs to.
   */
  experimentId: string;

  /**
   * Whether this is the baseline control variant.
   */
  isControl: boolean;

  /**
   * Human-readable variant name shown in the dashboard and results.
   */
  name: string;

  /**
   * Relative traffic weight used when assigning visitors among variants in an active
   * experiment.
   */
  weight: number;

  /**
   * Ordered list of declarative DOM mutations applied when this variant is assigned.
   */
  domModifications?: Array<ExperimentVariantUpdateResponse.DomModification> | null;

  /**
   * Target URL for redirect variants. Use either a site-relative path such as
   * `/pricing-v2` or an absolute `https://` URL. Cross-origin `http://` URLs are
   * rejected. Omit for DOM modification variants.
   */
  redirectUrl?: string | null;

  /**
   * How this variant changes the user experience. `dom_modifications` for on-page
   * changes or `redirect` for redirect tests.
   */
  variantType?: string | null;
}

export namespace ExperimentVariantUpdateResponse {
  export interface DomModification {
    /**
     * Mutation to apply when the selector matches. Use `redirectUrl` instead of DOM
     * modifications for redirect variants.
     */
    action:
      | 'customCss'
      | 'customJs'
      | 'insertAfter'
      | 'insertBefore'
      | 'remove'
      | 'setAttribute'
      | 'setHtml'
      | 'setImage'
      | 'setStyle'
      | 'setText';

    /**
     * CSS selector used to find the element to modify on the page at runtime.
     */
    selector: string;

    /**
     * Canonical action payload. For `setText` / `setHtml` / `customCss` / `customJs` /
     * `setImage` / `insertBefore` / `insertAfter` this is the literal
     * text/HTML/CSS/JS/URL. For `setStyle` and `setAttribute` it is a JSON-stringified
     * `{key: value}` object — prefer the structured `styles` / `attribute` fields
     * below to avoid manual JSON encoding.
     */
    value: string;

    /**
     * Populated on read for `setAttribute` modifications, parsed from `value`.
     * Customers may also send this field instead of a JSON-stringified `value` on
     * write — see `domModificationInputSchema`.
     */
    attribute?: unknown | null;

    /**
     * Populated on read for `setStyle` modifications, parsed from `value`. Customers
     * may also send this field instead of a JSON-stringified `value` on write — see
     * `domModificationInputSchema`.
     */
    styles?: Array<DomModification.Style> | null;
  }

  export namespace DomModification {
    export interface Style {
      /**
       * CSS property name in camelCase or kebab-case.
       */
      property: string;

      /**
       * CSS value to assign to the property.
       */
      value: string;
    }
  }
}

export interface ExperimentVariantDeleteResponse {
  /**
   * Unique identifier for this experiment variant.
   */
  id: string;

  /**
   * Parent experiment ID this variant belongs to.
   */
  experimentId: string;

  /**
   * Whether this is the baseline control variant.
   */
  isControl: boolean;

  /**
   * Human-readable variant name shown in the dashboard and results.
   */
  name: string;

  /**
   * Relative traffic weight used when assigning visitors among variants in an active
   * experiment.
   */
  weight: number;

  /**
   * Ordered list of declarative DOM mutations applied when this variant is assigned.
   */
  domModifications?: Array<ExperimentVariantDeleteResponse.DomModification> | null;

  /**
   * Target URL for redirect variants. Use either a site-relative path such as
   * `/pricing-v2` or an absolute `https://` URL. Cross-origin `http://` URLs are
   * rejected. Omit for DOM modification variants.
   */
  redirectUrl?: string | null;

  /**
   * How this variant changes the user experience. `dom_modifications` for on-page
   * changes or `redirect` for redirect tests.
   */
  variantType?: string | null;
}

export namespace ExperimentVariantDeleteResponse {
  export interface DomModification {
    /**
     * Mutation to apply when the selector matches. Use `redirectUrl` instead of DOM
     * modifications for redirect variants.
     */
    action:
      | 'customCss'
      | 'customJs'
      | 'insertAfter'
      | 'insertBefore'
      | 'remove'
      | 'setAttribute'
      | 'setHtml'
      | 'setImage'
      | 'setStyle'
      | 'setText';

    /**
     * CSS selector used to find the element to modify on the page at runtime.
     */
    selector: string;

    /**
     * Canonical action payload. For `setText` / `setHtml` / `customCss` / `customJs` /
     * `setImage` / `insertBefore` / `insertAfter` this is the literal
     * text/HTML/CSS/JS/URL. For `setStyle` and `setAttribute` it is a JSON-stringified
     * `{key: value}` object — prefer the structured `styles` / `attribute` fields
     * below to avoid manual JSON encoding.
     */
    value: string;

    /**
     * Populated on read for `setAttribute` modifications, parsed from `value`.
     * Customers may also send this field instead of a JSON-stringified `value` on
     * write — see `domModificationInputSchema`.
     */
    attribute?: unknown | null;

    /**
     * Populated on read for `setStyle` modifications, parsed from `value`. Customers
     * may also send this field instead of a JSON-stringified `value` on write — see
     * `domModificationInputSchema`.
     */
    styles?: Array<DomModification.Style> | null;
  }

  export namespace DomModification {
    export interface Style {
      /**
       * CSS property name in camelCase or kebab-case.
       */
      property: string;

      /**
       * CSS value to assign to the property.
       */
      value: string;
    }
  }
}

export interface ExperimentVariantListParams {
  /**
   * Required. List variants belonging to this parent experiment.
   */
  experimentId: string;
}

export interface ExperimentVariantCreateParams {
  /**
   * Parent experiment ID that will own this new variant.
   */
  experimentId: string;

  /**
   * Human-readable name for the new variant.
   */
  name: string;

  /**
   * Traffic weight to assign to this variant. Weights are relative shares; the
   * runtime normalizes by their sum. Must be a positive integer in the range
   * 1..1_000_000.
   */
  weight: number;

  /**
   * Required for DOM modification variants. Omit for redirect variants. Each entry
   * is `{selector, action, value}`.
   */
  domModifications?: Array<ExperimentVariantCreateParams.DomModification> | null;

  /**
   * Mark this variant as the experiment control. Defaults to `false`. The API
   * rejects the request with 409 if the experiment already has a control variant —
   * to swap controls, first PATCH the existing control to clear `isControl`, then
   * create or PATCH the new one with `isControl: true`. The auto-generated control
   * variant created with each new experiment can be replaced this way. DELETE on the
   * control returns 409.
   */
  isControl?: boolean | null;

  /**
   * Required for redirect variants. Use either a site-relative path such as
   * `/pricing-v2` or an absolute `https://` URL. Cross-origin `http://` URLs are
   * rejected. Omit for DOM modification variants.
   */
  redirectUrl?: string | null;

  /**
   * Variant type to create. Use `redirect` for redirect tests or `dom_modifications`
   * for on-page changes.
   */
  variantType?: 'dom_modifications' | 'redirect' | null;
}

export namespace ExperimentVariantCreateParams {
  export interface DomModification {
    /**
     * Mutation to apply when the selector matches.
     */
    action:
      | 'customCss'
      | 'customJs'
      | 'insertAfter'
      | 'insertBefore'
      | 'remove'
      | 'setAttribute'
      | 'setHtml'
      | 'setImage'
      | 'setStyle'
      | 'setText';

    /**
     * CSS selector used to find the element to modify on the page at runtime.
     */
    selector: string;

    /**
     * Use this for `setAttribute` to avoid JSON-stringifying `{name: value}` yourself.
     * Ignored for other actions.
     */
    attribute?: unknown | null;

    /**
     * Use this for `setStyle` to avoid JSON-stringifying `{property: value}` yourself.
     * Ignored for other actions.
     */
    styles?: Array<DomModification.Style> | null;

    /**
     * Canonical action payload. For `setText` / `setHtml` / `customCss` / `customJs` /
     * `setImage` / `insertBefore` / `insertAfter` this is the literal
     * text/HTML/CSS/JS/URL. For `setStyle` and `setAttribute` it is a JSON-stringified
     * `{key: value}` object — or you can supply the structured `styles` / `attribute`
     * field instead and the server will normalize.
     */
    value?: string | null;
  }

  export namespace DomModification {
    export interface Style {
      /**
       * CSS property name in camelCase or kebab-case.
       */
      property: string;

      /**
       * CSS value to assign to the property.
       */
      value: string;
    }
  }
}

export interface ExperimentVariantUpdateParams {
  /**
   * Updated declarative DOM mutations. Sending this field replaces the prior list —
   * partial-array merging is not supported.
   */
  domModifications?: Array<ExperimentVariantUpdateParams.DomModification> | null;

  /**
   * Promote or demote this variant as the control. Promoting a second variant while
   * another already has `isControl: true` is rejected with 409 — clear the existing
   * control first.
   */
  isControl?: boolean | null;

  /**
   * Updated variant name.
   */
  name?: string | null;

  /**
   * Updated redirect URL for redirect variants. Use either a site-relative path such
   * as `/pricing-v2` or an absolute `https://` URL. Cross-origin `http://` URLs are
   * rejected.
   */
  redirectUrl?: string | null;

  /**
   * Updated variant type — `redirect` or `dom_modifications`. Changing this also
   * requires updating the matching payload field (`redirectUrl` or
   * `domModifications`).
   */
  variantType?: 'dom_modifications' | 'redirect' | null;

  /**
   * Updated traffic weight relative to other variants. Must be a positive integer in
   * the range 1..1_000_000.
   */
  weight?: number | null;
}

export namespace ExperimentVariantUpdateParams {
  export interface DomModification {
    /**
     * Mutation to apply when the selector matches.
     */
    action:
      | 'customCss'
      | 'customJs'
      | 'insertAfter'
      | 'insertBefore'
      | 'remove'
      | 'setAttribute'
      | 'setHtml'
      | 'setImage'
      | 'setStyle'
      | 'setText';

    /**
     * CSS selector used to find the element to modify on the page at runtime.
     */
    selector: string;

    /**
     * Use this for `setAttribute` to avoid JSON-stringifying `{name: value}` yourself.
     * Ignored for other actions.
     */
    attribute?: unknown | null;

    /**
     * Use this for `setStyle` to avoid JSON-stringifying `{property: value}` yourself.
     * Ignored for other actions.
     */
    styles?: Array<DomModification.Style> | null;

    /**
     * Canonical action payload. For `setText` / `setHtml` / `customCss` / `customJs` /
     * `setImage` / `insertBefore` / `insertAfter` this is the literal
     * text/HTML/CSS/JS/URL. For `setStyle` and `setAttribute` it is a JSON-stringified
     * `{key: value}` object — or you can supply the structured `styles` / `attribute`
     * field instead and the server will normalize.
     */
    value?: string | null;
  }

  export namespace DomModification {
    export interface Style {
      /**
       * CSS property name in camelCase or kebab-case.
       */
      property: string;

      /**
       * CSS value to assign to the property.
       */
      value: string;
    }
  }
}

export declare namespace ExperimentVariants {
  export {
    type ExperimentVariantListResponse as ExperimentVariantListResponse,
    type ExperimentVariantCreateResponse as ExperimentVariantCreateResponse,
    type ExperimentVariantRetrieveResponse as ExperimentVariantRetrieveResponse,
    type ExperimentVariantUpdateResponse as ExperimentVariantUpdateResponse,
    type ExperimentVariantDeleteResponse as ExperimentVariantDeleteResponse,
    type ExperimentVariantListParams as ExperimentVariantListParams,
    type ExperimentVariantCreateParams as ExperimentVariantCreateParams,
    type ExperimentVariantUpdateParams as ExperimentVariantUpdateParams,
  };
}
