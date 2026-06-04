// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ExperimentVariants extends APIResource {
  /**
   * List variants for a specific parent experiment. Requires the `experimentId`
   * query parameter — variants are always scoped to a single experiment. Supports
   * cursor pagination via `limit` and `cursor`; SDK runtimes that need the full set
   * in one request can pass `?limit=100`. Requires scope: experiment:find
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const experimentVariantListResponse of client.experimentVariants.list(
   *   { experimentId: '08524dc8-5289-48e8-bf40-b3a7cfa6ca0a' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ExperimentVariantListParams,
    options?: RequestOptions,
  ): PagePromise<ExperimentVariantListResponsesCursor, ExperimentVariantListResponse> {
    return this._client.getAPIList('/rest/v1/experiment-variants', Cursor<ExperimentVariantListResponse>, {
      query,
      ...options,
    });
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

export type ExperimentVariantListResponsesCursor = Cursor<ExperimentVariantListResponse>;

export interface ExperimentVariantListResponse {
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
  domModifications?: Array<ExperimentVariantListResponse.DomModification> | null;

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

export namespace ExperimentVariantListResponse {
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

export interface ExperimentVariantListParams extends CursorParams {
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
   * Traffic weight for this variant as a percentage (0–100). Treatment weights are
   * percentages of the split and must total 99% or less to leave room for the
   * control; the control variant is the remainder (100 − Σ treatment weights, always
   * ≥ 1%) and is maintained automatically.
   */
  weight: number;

  /**
   * Required for DOM modification variants. Omit for redirect variants. Each entry
   * is `{selector, action, value}`.
   */
  domModifications?: Array<ExperimentVariantCreateParams.DomModification> | null;

  /**
   * Mark this variant as the experiment control. Defaults to `false`. The API
   * rejects the request with 409 if the experiment already has a control variant.
   * Every experiment keeps exactly one control whose weight is the auto-derived
   * remainder of the split, so the control cannot be cleared while it would leave
   * the treatments at 100% (no room for a control). DELETE on the control
   * returns 409.
   */
  isControl?: boolean | null;

  /**
   * Required for redirect variants. Use either a site-relative path such as
   * `/pricing-v2` or an absolute `https://` URL. Cross-origin `http://` URLs are
   * rejected. Omit for DOM modification variants.
   */
  redirectUrl?: string | null;

  /**
   * Variant delivery mechanism. `dom_modifications` mutates the current page
   * in-place at SDK runtime — use it for copy/style/image/HTML changes that keep
   * visitors on the same URL (headline copy tests, button color, hero image swap).
   * `redirect` routes the visitor to a different URL entirely — use it for
   * landing-page A/B tests, alternate pricing pages, or any test where the _page
   * itself_ is the variable. They are not interchangeable: a redirect variant cannot
   * also tweak DOM, and a dom_modifications variant cannot send the visitor
   * elsewhere.
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
     * CSS selector for the element to modify at runtime. PREFER specific selectors
     * that match exactly one element: an `id` (`#hero-headline`), a stable `data-*`
     * attribute (`[data-testid="hero-headline"]`), or a unique class/structural chain
     * (`section.hero > h1.headline`). AVOID bare tag selectors like `h1`, `button`, or
     * `img` — modern pages usually contain several, and the runtime applies the
     * mutation to ONLY THE FIRST match, which silently picks the wrong element. If you
     * only have a tag name, scope it with the nearest unique ancestor (e.g. `main h1`,
     * `header nav a:first-of-type`).
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
   * another already has `isControl: true` is rejected with 409. Demoting the control
   * (`isControl: false`) is rejected when it would leave the treatments at 100% —
   * there must always be room for a control.
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
   * Updated variant delivery mechanism. `dom_modifications` mutates the current page
   * in-place; `redirect` sends the visitor to a different URL — pick based on
   * whether the _page_ or the _content_ is the variable. Changing this also requires
   * updating the matching payload field (`redirectUrl` or `domModifications`).
   */
  variantType?: 'dom_modifications' | 'redirect' | null;

  /**
   * Updated traffic weight as a percentage (0–100). The control variant weight is
   * derived from the treatments (it is the remainder of the split) and cannot be set
   * directly.
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
     * CSS selector for the element to modify at runtime. PREFER specific selectors
     * that match exactly one element: an `id` (`#hero-headline`), a stable `data-*`
     * attribute (`[data-testid="hero-headline"]`), or a unique class/structural chain
     * (`section.hero > h1.headline`). AVOID bare tag selectors like `h1`, `button`, or
     * `img` — modern pages usually contain several, and the runtime applies the
     * mutation to ONLY THE FIRST match, which silently picks the wrong element. If you
     * only have a tag name, scope it with the nearest unique ancestor (e.g. `main h1`,
     * `header nav a:first-of-type`).
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
    type ExperimentVariantListResponsesCursor as ExperimentVariantListResponsesCursor,
    type ExperimentVariantListParams as ExperimentVariantListParams,
    type ExperimentVariantCreateParams as ExperimentVariantCreateParams,
    type ExperimentVariantUpdateParams as ExperimentVariantUpdateParams,
  };
}
