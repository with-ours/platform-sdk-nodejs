// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Experiments extends APIResource {
  /**
   * List experiments for this account. Supports cursor pagination and filtering by
   * `status`, `type`, and free-text `search` matched against experiment id, name,
   * and description. Combine filters with AND semantics. Requires scope:
   * experiment:list
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const experimentListResponse of client.experiments.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ExperimentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ExperimentListResponsesCursor, ExperimentListResponse> {
    return this._client.getAPIList('/rest/v1/experiments', Cursor<ExperimentListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create a new experiment. Requires scope: experiment:create
   *
   * @example
   * ```ts
   * const experiment = await client.experiments.create({
   *   experimentSettingsId:
   *     'settings_01HZX9BB73EY2Q37VGK5A0VW7A',
   *   name: 'Homepage Hero Headline Test',
   * });
   * ```
   */
  create(body: ExperimentCreateParams, options?: RequestOptions): APIPromise<ExperimentCreateResponse> {
    return this._client.post('/rest/v1/experiments', { body, ...options });
  }

  /**
   * Find a single experiment by ID. Requires scope: experiment:find
   *
   * @example
   * ```ts
   * const experiment = await client.experiments.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ExperimentRetrieveResponse> {
    return this._client.get(path`/rest/v1/experiments/${id}`, options);
  }

  /**
   * Partially update an experiment. Only the fields you send are changed. Edits are
   * allowed on draft, running, and paused experiments and are recorded in the change
   * log. Only completed experiments return 409 with
   * `A completed experiment can no longer be edited`. Use the lifecycle endpoints
   * (`/start`, `/pause`, `/resume`, `/stop`) to change status. Requires scope:
   * experiment:update
   *
   * @example
   * ```ts
   * const experiment = await client.experiments.update('id');
   * ```
   */
  update(
    id: string,
    body: ExperimentUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ExperimentUpdateResponse> {
    return this._client.patch(path`/rest/v1/experiments/${id}`, { body, ...options });
  }

  /**
   * Delete an experiment. Requires scope: experiment:delete
   *
   * @example
   * ```ts
   * const experiment = await client.experiments.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<ExperimentDeleteResponse> {
    return this._client.delete(path`/rest/v1/experiments/${id}`, options);
  }

  /**
   * Start an experiment. By default also publishes the experiment and its variants
   * atomically as a new version, making them live for end users — this is the
   * canonical publish path for experiment changes. They do NOT flow through
   * `POST /rest/v1/versions`. Pass `{ "publishAfterStart": false }` only if a
   * separate publish is desired (e.g. bundling with non-experiment edits via a
   * manual `POST /rest/v1/versions` afterwards). The request body is optional — send
   * `{}` to use defaults. Requires scope: experiment:start
   *
   * @example
   * ```ts
   * const response = await client.experiments.start('id');
   * ```
   */
  start(
    id: string,
    body: ExperimentStartParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExperimentStartResponse> {
    return this._client.post(path`/rest/v1/experiments/${id}/start`, { body, ...options });
  }

  /**
   * Stop an experiment. The request body is optional — send `{}` to stop without
   * recording a winner. Requires scope: experiment:stop
   *
   * @example
   * ```ts
   * const response = await client.experiments.stop('id');
   * ```
   */
  stop(
    id: string,
    body: ExperimentStopParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExperimentStopResponse> {
    return this._client.post(path`/rest/v1/experiments/${id}/stop`, { body, ...options });
  }

  /**
   * Pause a running experiment. Stops new variant assignments while preserving
   * existing ones; the experiment can later be resumed. The request body is
   * optional. Requires scope: experiment:stop
   *
   * @example
   * ```ts
   * const response = await client.experiments.pause('id');
   * ```
   */
  pause(
    id: string,
    body: ExperimentPauseParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExperimentPauseResponse> {
    return this._client.post(path`/rest/v1/experiments/${id}/pause`, { body, ...options });
  }

  /**
   * Resume a previously-paused experiment so new visitors can be assigned again. The
   * request body is optional. Requires scope: experiment:start
   *
   * @example
   * ```ts
   * const response = await client.experiments.resume('id');
   * ```
   */
  resume(
    id: string,
    body: ExperimentResumeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExperimentResumeResponse> {
    return this._client.post(path`/rest/v1/experiments/${id}/resume`, { body, ...options });
  }

  /**
   * Aggregate per-variant impressions, conversions, conversion rate, and Bayesian
   * probability-to-be-best across the experiment runtime window. Requires scope:
   * experiment:find
   *
   * @example
   * ```ts
   * const response = await client.experiments.results('id');
   * ```
   */
  results(
    id: string,
    query: ExperimentResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExperimentResultsResponse> {
    return this._client.get(path`/rest/v1/experiments/${id}/results`, { query, ...options });
  }

  /**
   * Per-day per-variant impressions, conversions, and conversion rate, sliced to a
   * date range. Use this to chart trends, compare windows, or zoom in on a specific
   * period. Pass `startDate` / `endDate` (`YYYY-MM-DD`, UTC, both inclusive) to set
   * the window; both default to the full experiment runtime when omitted, so the
   * no-arg call returns every day from start to today (or to `stoppedAt` for
   * completed experiments). The response orders days oldest-first and omits days
   * with no impressions, so an empty `days` array means there was no measured
   * traffic in the window. Requires scope: experiment:find
   *
   * @example
   * ```ts
   * const response = await client.experiments.resultsTimeSeries(
   *   'id',
   * );
   * ```
   */
  resultsTimeSeries(
    id: string,
    query: ExperimentResultsTimeSeriesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExperimentResultsTimeSeriesResponse> {
    return this._client.get(path`/rest/v1/experiments/${id}/results-time-series`, { query, ...options });
  }

  /**
   * List session replays for sessions in which the `$experiment_impression` event
   * fired for this experiment. Each row is one session with the variant the visitor
   * was assigned for that impression. Sessions are ordered newest first by session
   * start. Filter to one variant with `variant_id`. Cursor pagination via `limit`
   * (1–100, default 25) and `cursor`; malformed cursors return 400. Requires scope:
   * experiment:find
   *
   * @example
   * ```ts
   * const response = await client.experiments.sessionReplays(
   *   'id',
   * );
   * ```
   */
  sessionReplays(
    id: string,
    query: ExperimentSessionReplaysParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ExperimentSessionReplaysResponse> {
    return this._client.get(path`/rest/v1/experiments/${id}/session-replays`, { query, ...options });
  }
}

export type ExperimentListResponsesCursor = Cursor<ExperimentListResponse>;

export interface ExperimentListResponse {
  /**
   * Unique identifier for the experiment.
   */
  id: string;

  /**
   * ISO-8601 timestamp when the experiment was created.
   */
  createdAt: string;

  /**
   * Stable code-facing key for the experiment. Use this with the headless SDK
   * `getExperimentByKey()` API instead of hard-coding opaque experiment IDs into
   * application code.
   */
  key: string;

  /**
   * Short, human-readable experiment name.
   */
  name: string;

  /**
   * Lifecycle state. `draft` is editable, `running` is active, `paused` is
   * temporarily inactive, and `completed` is permanently stopped.
   */
  status: 'completed' | 'draft' | 'paused' | 'running';

  /**
   * Percent of eligible traffic assigned into the experiment. Use 0 to fully disable
   * enrollment without deleting the experiment.
   */
  trafficAllocation: number;

  /**
   * Optional human-readable hypothesis or summary. In GraphQL this is backed by the
   * experiment hypothesis field.
   */
  description?: string | null;

  /**
   * For redirect variants, whether the original page query string should be
   * forwarded onto the redirect URL.
   */
  includeQueryString?: boolean | null;

  /**
   * Configured success metrics. The read shape mirrors the write shape — `metrics`
   * from a GET response can be PATCHed back without modification.
   */
  metrics?: ExperimentListResponse.Metrics | null;

  /**
   * ISO-8601 timestamp when the experiment most recently entered a running state.
   */
  startedAt?: string | null;

  /**
   * ISO-8601 timestamp when the experiment was completed, if it has been stopped.
   */
  stoppedAt?: string | null;

  /**
   * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
   * visitor status, and (server-side) visitor properties. Same shape as the
   * create/patch input.
   */
  targetingRules?: ExperimentListResponse.TargetingRules | null;

  /**
   * Experiment mode. `ab` and `multivariate` use traffic allocation and results;
   * `personalization` is always-on targeting.
   */
  type?: 'ab' | 'multivariate' | 'personalization' | null;

  /**
   * ISO-8601 timestamp for the last persisted update, if any.
   */
  updatedAt?: string | null;

  /**
   * Variant ID persisted as the winner when the experiment was stopped. Set via
   * `POST /experiments/{id}/stop` with a `winnerVariantId` body field.
   */
  winnerVariantId?: string | null;
}

export namespace ExperimentListResponse {
  /**
   * Configured success metrics. The read shape mirrors the write shape — `metrics`
   * from a GET response can be PATCHed back without modification.
   */
  export interface Metrics {
    /**
     * Primary success metric used in the results report.
     */
    primary?: unknown | null;

    /**
     * Optional secondary metrics tracked alongside the primary goal.
     */
    secondary?: Array<Metrics.Secondary> | null;
  }

  export namespace Metrics {
    export interface Secondary {
      /**
       * Name of the event used to measure success for this metric.
       */
      eventName?: string | null;

      /**
       * Optional funnel identifier when the metric is derived from an existing funnel
       * definition.
       */
      funnelId?: string | null;
    }
  }

  /**
   * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
   * visitor status, and (server-side) visitor properties. Same shape as the
   * create/patch input.
   */
  export interface TargetingRules {
    /**
     * Glob-style URL patterns that must match for the experiment to be eligible. Each
     * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
     * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
     * against the full URL so a single domain or subdomain can be targeted). Use `*`
     * to match within a path segment and `**` to match across segments. Up to 200
     * patterns; each pattern up to 2000 characters. An empty array (or omitting the
     * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
     * also appear in the parent experiment settings' `whitelistDomains` — that
     * allowlist is what limits which domains can load your experiments (see
     * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
     * there and the experiment never runs, even after `POST /experiments/{id}/start`
     * succeeds.
     */
    urlPatterns: Array<string>;

    /**
     * Optional audience identifier used for server-side eligibility filtering.
     */
    audienceId?: string | null;

    /**
     * Additional query-string conditions that must all match for the visitor to
     * qualify.
     */
    queryParams?: Array<TargetingRules.QueryParam> | null;

    /**
     * Optional visitor-property matching rules. These are passed through as JSON for
     * experimentation targeting.
     */
    visitorProperties?: unknown | null;

    /**
     * Whether the experiment should target new visitors, returning visitors, or any
     * visitor.
     */
    visitorStatus?: string | null;
  }

  export namespace TargetingRules {
    export interface QueryParam {
      /**
       * Query string key to inspect on the current page URL.
       */
      key: string;

      /**
       * Comparison operator applied to the query string value.
       */
      operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

      /**
       * Comparison value used by operators that require one. Omit for `exists` and
       * `not_exists`.
       */
      value?: string | null;
    }
  }
}

export interface ExperimentCreateResponse {
  /**
   * Unique identifier for the experiment.
   */
  id: string;

  /**
   * ISO-8601 timestamp when the experiment was created.
   */
  createdAt: string;

  /**
   * Stable code-facing key for the experiment. Use this with the headless SDK
   * `getExperimentByKey()` API instead of hard-coding opaque experiment IDs into
   * application code.
   */
  key: string;

  /**
   * Short, human-readable experiment name.
   */
  name: string;

  /**
   * Lifecycle state. `draft` is editable, `running` is active, `paused` is
   * temporarily inactive, and `completed` is permanently stopped.
   */
  status: 'completed' | 'draft' | 'paused' | 'running';

  /**
   * Percent of eligible traffic assigned into the experiment. Use 0 to fully disable
   * enrollment without deleting the experiment.
   */
  trafficAllocation: number;

  /**
   * All persisted variants for this experiment, including the control variant. A
   * non-personalization experiment needs at least two variants before it can be
   * started.
   */
  variants: Array<ExperimentCreateResponse.Variant>;

  /**
   * Optional human-readable hypothesis or summary. In GraphQL this is backed by the
   * experiment hypothesis field.
   */
  description?: string | null;

  /**
   * For redirect variants, whether the original page query string should be
   * forwarded onto the redirect URL.
   */
  includeQueryString?: boolean | null;

  /**
   * Configured success metrics. The read shape mirrors the write shape — `metrics`
   * from a GET response can be PATCHed back without modification.
   */
  metrics?: ExperimentCreateResponse.Metrics | null;

  /**
   * ISO-8601 timestamp when the experiment most recently entered a running state.
   */
  startedAt?: string | null;

  /**
   * ISO-8601 timestamp when the experiment was completed, if it has been stopped.
   */
  stoppedAt?: string | null;

  /**
   * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
   * visitor status, and (server-side) visitor properties. Same shape as the
   * create/patch input.
   */
  targetingRules?: ExperimentCreateResponse.TargetingRules | null;

  /**
   * Experiment mode. `ab` and `multivariate` use traffic allocation and results;
   * `personalization` is always-on targeting.
   */
  type?: 'ab' | 'multivariate' | 'personalization' | null;

  /**
   * ISO-8601 timestamp for the last persisted update, if any.
   */
  updatedAt?: string | null;

  /**
   * Variant ID persisted as the winner when the experiment was stopped. Set via
   * `POST /experiments/{id}/stop` with a `winnerVariantId` body field.
   */
  winnerVariantId?: string | null;
}

export namespace ExperimentCreateResponse {
  export interface Variant {
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
    domModifications?: Array<Variant.DomModification> | null;

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

  export namespace Variant {
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

  /**
   * Configured success metrics. The read shape mirrors the write shape — `metrics`
   * from a GET response can be PATCHed back without modification.
   */
  export interface Metrics {
    /**
     * Primary success metric used in the results report.
     */
    primary?: unknown | null;

    /**
     * Optional secondary metrics tracked alongside the primary goal.
     */
    secondary?: Array<Metrics.Secondary> | null;
  }

  export namespace Metrics {
    export interface Secondary {
      /**
       * Name of the event used to measure success for this metric.
       */
      eventName?: string | null;

      /**
       * Optional funnel identifier when the metric is derived from an existing funnel
       * definition.
       */
      funnelId?: string | null;
    }
  }

  /**
   * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
   * visitor status, and (server-side) visitor properties. Same shape as the
   * create/patch input.
   */
  export interface TargetingRules {
    /**
     * Glob-style URL patterns that must match for the experiment to be eligible. Each
     * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
     * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
     * against the full URL so a single domain or subdomain can be targeted). Use `*`
     * to match within a path segment and `**` to match across segments. Up to 200
     * patterns; each pattern up to 2000 characters. An empty array (or omitting the
     * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
     * also appear in the parent experiment settings' `whitelistDomains` — that
     * allowlist is what limits which domains can load your experiments (see
     * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
     * there and the experiment never runs, even after `POST /experiments/{id}/start`
     * succeeds.
     */
    urlPatterns: Array<string>;

    /**
     * Optional audience identifier used for server-side eligibility filtering.
     */
    audienceId?: string | null;

    /**
     * Additional query-string conditions that must all match for the visitor to
     * qualify.
     */
    queryParams?: Array<TargetingRules.QueryParam> | null;

    /**
     * Optional visitor-property matching rules. These are passed through as JSON for
     * experimentation targeting.
     */
    visitorProperties?: unknown | null;

    /**
     * Whether the experiment should target new visitors, returning visitors, or any
     * visitor.
     */
    visitorStatus?: string | null;
  }

  export namespace TargetingRules {
    export interface QueryParam {
      /**
       * Query string key to inspect on the current page URL.
       */
      key: string;

      /**
       * Comparison operator applied to the query string value.
       */
      operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

      /**
       * Comparison value used by operators that require one. Omit for `exists` and
       * `not_exists`.
       */
      value?: string | null;
    }
  }
}

export interface ExperimentRetrieveResponse {
  /**
   * Unique identifier for the experiment.
   */
  id: string;

  /**
   * ISO-8601 timestamp when the experiment was created.
   */
  createdAt: string;

  /**
   * Stable code-facing key for the experiment. Use this with the headless SDK
   * `getExperimentByKey()` API instead of hard-coding opaque experiment IDs into
   * application code.
   */
  key: string;

  /**
   * Short, human-readable experiment name.
   */
  name: string;

  /**
   * Lifecycle state. `draft` is editable, `running` is active, `paused` is
   * temporarily inactive, and `completed` is permanently stopped.
   */
  status: 'completed' | 'draft' | 'paused' | 'running';

  /**
   * Percent of eligible traffic assigned into the experiment. Use 0 to fully disable
   * enrollment without deleting the experiment.
   */
  trafficAllocation: number;

  /**
   * All persisted variants for this experiment, including the control variant. A
   * non-personalization experiment needs at least two variants before it can be
   * started.
   */
  variants: Array<ExperimentRetrieveResponse.Variant>;

  /**
   * Optional human-readable hypothesis or summary. In GraphQL this is backed by the
   * experiment hypothesis field.
   */
  description?: string | null;

  /**
   * For redirect variants, whether the original page query string should be
   * forwarded onto the redirect URL.
   */
  includeQueryString?: boolean | null;

  /**
   * Configured success metrics. The read shape mirrors the write shape — `metrics`
   * from a GET response can be PATCHed back without modification.
   */
  metrics?: ExperimentRetrieveResponse.Metrics | null;

  /**
   * ISO-8601 timestamp when the experiment most recently entered a running state.
   */
  startedAt?: string | null;

  /**
   * ISO-8601 timestamp when the experiment was completed, if it has been stopped.
   */
  stoppedAt?: string | null;

  /**
   * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
   * visitor status, and (server-side) visitor properties. Same shape as the
   * create/patch input.
   */
  targetingRules?: ExperimentRetrieveResponse.TargetingRules | null;

  /**
   * Experiment mode. `ab` and `multivariate` use traffic allocation and results;
   * `personalization` is always-on targeting.
   */
  type?: 'ab' | 'multivariate' | 'personalization' | null;

  /**
   * ISO-8601 timestamp for the last persisted update, if any.
   */
  updatedAt?: string | null;

  /**
   * Variant ID persisted as the winner when the experiment was stopped. Set via
   * `POST /experiments/{id}/stop` with a `winnerVariantId` body field.
   */
  winnerVariantId?: string | null;
}

export namespace ExperimentRetrieveResponse {
  export interface Variant {
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
    domModifications?: Array<Variant.DomModification> | null;

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

  export namespace Variant {
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

  /**
   * Configured success metrics. The read shape mirrors the write shape — `metrics`
   * from a GET response can be PATCHed back without modification.
   */
  export interface Metrics {
    /**
     * Primary success metric used in the results report.
     */
    primary?: unknown | null;

    /**
     * Optional secondary metrics tracked alongside the primary goal.
     */
    secondary?: Array<Metrics.Secondary> | null;
  }

  export namespace Metrics {
    export interface Secondary {
      /**
       * Name of the event used to measure success for this metric.
       */
      eventName?: string | null;

      /**
       * Optional funnel identifier when the metric is derived from an existing funnel
       * definition.
       */
      funnelId?: string | null;
    }
  }

  /**
   * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
   * visitor status, and (server-side) visitor properties. Same shape as the
   * create/patch input.
   */
  export interface TargetingRules {
    /**
     * Glob-style URL patterns that must match for the experiment to be eligible. Each
     * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
     * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
     * against the full URL so a single domain or subdomain can be targeted). Use `*`
     * to match within a path segment and `**` to match across segments. Up to 200
     * patterns; each pattern up to 2000 characters. An empty array (or omitting the
     * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
     * also appear in the parent experiment settings' `whitelistDomains` — that
     * allowlist is what limits which domains can load your experiments (see
     * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
     * there and the experiment never runs, even after `POST /experiments/{id}/start`
     * succeeds.
     */
    urlPatterns: Array<string>;

    /**
     * Optional audience identifier used for server-side eligibility filtering.
     */
    audienceId?: string | null;

    /**
     * Additional query-string conditions that must all match for the visitor to
     * qualify.
     */
    queryParams?: Array<TargetingRules.QueryParam> | null;

    /**
     * Optional visitor-property matching rules. These are passed through as JSON for
     * experimentation targeting.
     */
    visitorProperties?: unknown | null;

    /**
     * Whether the experiment should target new visitors, returning visitors, or any
     * visitor.
     */
    visitorStatus?: string | null;
  }

  export namespace TargetingRules {
    export interface QueryParam {
      /**
       * Query string key to inspect on the current page URL.
       */
      key: string;

      /**
       * Comparison operator applied to the query string value.
       */
      operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

      /**
       * Comparison value used by operators that require one. Omit for `exists` and
       * `not_exists`.
       */
      value?: string | null;
    }
  }
}

export interface ExperimentUpdateResponse {
  /**
   * Unique identifier for the experiment.
   */
  id: string;

  /**
   * ISO-8601 timestamp when the experiment was created.
   */
  createdAt: string;

  /**
   * Stable code-facing key for the experiment. Use this with the headless SDK
   * `getExperimentByKey()` API instead of hard-coding opaque experiment IDs into
   * application code.
   */
  key: string;

  /**
   * Short, human-readable experiment name.
   */
  name: string;

  /**
   * Lifecycle state. `draft` is editable, `running` is active, `paused` is
   * temporarily inactive, and `completed` is permanently stopped.
   */
  status: 'completed' | 'draft' | 'paused' | 'running';

  /**
   * Percent of eligible traffic assigned into the experiment. Use 0 to fully disable
   * enrollment without deleting the experiment.
   */
  trafficAllocation: number;

  /**
   * Optional human-readable hypothesis or summary. In GraphQL this is backed by the
   * experiment hypothesis field.
   */
  description?: string | null;

  /**
   * For redirect variants, whether the original page query string should be
   * forwarded onto the redirect URL.
   */
  includeQueryString?: boolean | null;

  /**
   * Configured success metrics. The read shape mirrors the write shape — `metrics`
   * from a GET response can be PATCHed back without modification.
   */
  metrics?: ExperimentUpdateResponse.Metrics | null;

  /**
   * ISO-8601 timestamp when the experiment most recently entered a running state.
   */
  startedAt?: string | null;

  /**
   * ISO-8601 timestamp when the experiment was completed, if it has been stopped.
   */
  stoppedAt?: string | null;

  /**
   * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
   * visitor status, and (server-side) visitor properties. Same shape as the
   * create/patch input.
   */
  targetingRules?: ExperimentUpdateResponse.TargetingRules | null;

  /**
   * Experiment mode. `ab` and `multivariate` use traffic allocation and results;
   * `personalization` is always-on targeting.
   */
  type?: 'ab' | 'multivariate' | 'personalization' | null;

  /**
   * ISO-8601 timestamp for the last persisted update, if any.
   */
  updatedAt?: string | null;

  /**
   * Variant ID persisted as the winner when the experiment was stopped. Set via
   * `POST /experiments/{id}/stop` with a `winnerVariantId` body field.
   */
  winnerVariantId?: string | null;
}

export namespace ExperimentUpdateResponse {
  /**
   * Configured success metrics. The read shape mirrors the write shape — `metrics`
   * from a GET response can be PATCHed back without modification.
   */
  export interface Metrics {
    /**
     * Primary success metric used in the results report.
     */
    primary?: unknown | null;

    /**
     * Optional secondary metrics tracked alongside the primary goal.
     */
    secondary?: Array<Metrics.Secondary> | null;
  }

  export namespace Metrics {
    export interface Secondary {
      /**
       * Name of the event used to measure success for this metric.
       */
      eventName?: string | null;

      /**
       * Optional funnel identifier when the metric is derived from an existing funnel
       * definition.
       */
      funnelId?: string | null;
    }
  }

  /**
   * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
   * visitor status, and (server-side) visitor properties. Same shape as the
   * create/patch input.
   */
  export interface TargetingRules {
    /**
     * Glob-style URL patterns that must match for the experiment to be eligible. Each
     * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
     * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
     * against the full URL so a single domain or subdomain can be targeted). Use `*`
     * to match within a path segment and `**` to match across segments. Up to 200
     * patterns; each pattern up to 2000 characters. An empty array (or omitting the
     * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
     * also appear in the parent experiment settings' `whitelistDomains` — that
     * allowlist is what limits which domains can load your experiments (see
     * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
     * there and the experiment never runs, even after `POST /experiments/{id}/start`
     * succeeds.
     */
    urlPatterns: Array<string>;

    /**
     * Optional audience identifier used for server-side eligibility filtering.
     */
    audienceId?: string | null;

    /**
     * Additional query-string conditions that must all match for the visitor to
     * qualify.
     */
    queryParams?: Array<TargetingRules.QueryParam> | null;

    /**
     * Optional visitor-property matching rules. These are passed through as JSON for
     * experimentation targeting.
     */
    visitorProperties?: unknown | null;

    /**
     * Whether the experiment should target new visitors, returning visitors, or any
     * visitor.
     */
    visitorStatus?: string | null;
  }

  export namespace TargetingRules {
    export interface QueryParam {
      /**
       * Query string key to inspect on the current page URL.
       */
      key: string;

      /**
       * Comparison operator applied to the query string value.
       */
      operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

      /**
       * Comparison value used by operators that require one. Omit for `exists` and
       * `not_exists`.
       */
      value?: string | null;
    }
  }
}

/**
 * Whether the experiment was deleted successfully.
 */
export type ExperimentDeleteResponse = boolean;

export interface ExperimentStartResponse {
  /**
   * Number of unpublished version changes detected at the time of the lifecycle
   * action. Values greater than 1 mean other unpublished work exists besides this
   * experiment state change.
   */
  concurrentVersionChanges: number;

  experiment: ExperimentStartResponse.Experiment;

  /**
   * Whether the status change was also published to the current live version
   * immediately.
   */
  publishStatus: 'pending_publish' | 'published';
}

export namespace ExperimentStartResponse {
  export interface Experiment {
    /**
     * Unique identifier for the experiment.
     */
    id: string;

    /**
     * ISO-8601 timestamp when the experiment was created.
     */
    createdAt: string;

    /**
     * Stable code-facing key for the experiment. Use this with the headless SDK
     * `getExperimentByKey()` API instead of hard-coding opaque experiment IDs into
     * application code.
     */
    key: string;

    /**
     * Short, human-readable experiment name.
     */
    name: string;

    /**
     * Lifecycle state. `draft` is editable, `running` is active, `paused` is
     * temporarily inactive, and `completed` is permanently stopped.
     */
    status: 'completed' | 'draft' | 'paused' | 'running';

    /**
     * Percent of eligible traffic assigned into the experiment. Use 0 to fully disable
     * enrollment without deleting the experiment.
     */
    trafficAllocation: number;

    /**
     * Optional human-readable hypothesis or summary. In GraphQL this is backed by the
     * experiment hypothesis field.
     */
    description?: string | null;

    /**
     * For redirect variants, whether the original page query string should be
     * forwarded onto the redirect URL.
     */
    includeQueryString?: boolean | null;

    /**
     * Configured success metrics. The read shape mirrors the write shape — `metrics`
     * from a GET response can be PATCHed back without modification.
     */
    metrics?: Experiment.Metrics | null;

    /**
     * ISO-8601 timestamp when the experiment most recently entered a running state.
     */
    startedAt?: string | null;

    /**
     * ISO-8601 timestamp when the experiment was completed, if it has been stopped.
     */
    stoppedAt?: string | null;

    /**
     * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
     * visitor status, and (server-side) visitor properties. Same shape as the
     * create/patch input.
     */
    targetingRules?: Experiment.TargetingRules | null;

    /**
     * Experiment mode. `ab` and `multivariate` use traffic allocation and results;
     * `personalization` is always-on targeting.
     */
    type?: 'ab' | 'multivariate' | 'personalization' | null;

    /**
     * ISO-8601 timestamp for the last persisted update, if any.
     */
    updatedAt?: string | null;

    /**
     * Variant ID persisted as the winner when the experiment was stopped. Set via
     * `POST /experiments/{id}/stop` with a `winnerVariantId` body field.
     */
    winnerVariantId?: string | null;
  }

  export namespace Experiment {
    /**
     * Configured success metrics. The read shape mirrors the write shape — `metrics`
     * from a GET response can be PATCHed back without modification.
     */
    export interface Metrics {
      /**
       * Primary success metric used in the results report.
       */
      primary?: unknown | null;

      /**
       * Optional secondary metrics tracked alongside the primary goal.
       */
      secondary?: Array<Metrics.Secondary> | null;
    }

    export namespace Metrics {
      export interface Secondary {
        /**
         * Name of the event used to measure success for this metric.
         */
        eventName?: string | null;

        /**
         * Optional funnel identifier when the metric is derived from an existing funnel
         * definition.
         */
        funnelId?: string | null;
      }
    }

    /**
     * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
     * visitor status, and (server-side) visitor properties. Same shape as the
     * create/patch input.
     */
    export interface TargetingRules {
      /**
       * Glob-style URL patterns that must match for the experiment to be eligible. Each
       * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
       * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
       * against the full URL so a single domain or subdomain can be targeted). Use `*`
       * to match within a path segment and `**` to match across segments. Up to 200
       * patterns; each pattern up to 2000 characters. An empty array (or omitting the
       * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
       * also appear in the parent experiment settings' `whitelistDomains` — that
       * allowlist is what limits which domains can load your experiments (see
       * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
       * there and the experiment never runs, even after `POST /experiments/{id}/start`
       * succeeds.
       */
      urlPatterns: Array<string>;

      /**
       * Optional audience identifier used for server-side eligibility filtering.
       */
      audienceId?: string | null;

      /**
       * Additional query-string conditions that must all match for the visitor to
       * qualify.
       */
      queryParams?: Array<TargetingRules.QueryParam> | null;

      /**
       * Optional visitor-property matching rules. These are passed through as JSON for
       * experimentation targeting.
       */
      visitorProperties?: unknown | null;

      /**
       * Whether the experiment should target new visitors, returning visitors, or any
       * visitor.
       */
      visitorStatus?: string | null;
    }

    export namespace TargetingRules {
      export interface QueryParam {
        /**
         * Query string key to inspect on the current page URL.
         */
        key: string;

        /**
         * Comparison operator applied to the query string value.
         */
        operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

        /**
         * Comparison value used by operators that require one. Omit for `exists` and
         * `not_exists`.
         */
        value?: string | null;
      }
    }
  }
}

export interface ExperimentStopResponse {
  /**
   * Number of unpublished version changes detected at the time of the lifecycle
   * action. Values greater than 1 mean other unpublished work exists besides this
   * experiment state change.
   */
  concurrentVersionChanges: number;

  experiment: ExperimentStopResponse.Experiment;

  /**
   * Whether the status change was also published to the current live version
   * immediately.
   */
  publishStatus: 'pending_publish' | 'published';
}

export namespace ExperimentStopResponse {
  export interface Experiment {
    /**
     * Unique identifier for the experiment.
     */
    id: string;

    /**
     * ISO-8601 timestamp when the experiment was created.
     */
    createdAt: string;

    /**
     * Stable code-facing key for the experiment. Use this with the headless SDK
     * `getExperimentByKey()` API instead of hard-coding opaque experiment IDs into
     * application code.
     */
    key: string;

    /**
     * Short, human-readable experiment name.
     */
    name: string;

    /**
     * Lifecycle state. `draft` is editable, `running` is active, `paused` is
     * temporarily inactive, and `completed` is permanently stopped.
     */
    status: 'completed' | 'draft' | 'paused' | 'running';

    /**
     * Percent of eligible traffic assigned into the experiment. Use 0 to fully disable
     * enrollment without deleting the experiment.
     */
    trafficAllocation: number;

    /**
     * Optional human-readable hypothesis or summary. In GraphQL this is backed by the
     * experiment hypothesis field.
     */
    description?: string | null;

    /**
     * For redirect variants, whether the original page query string should be
     * forwarded onto the redirect URL.
     */
    includeQueryString?: boolean | null;

    /**
     * Configured success metrics. The read shape mirrors the write shape — `metrics`
     * from a GET response can be PATCHed back without modification.
     */
    metrics?: Experiment.Metrics | null;

    /**
     * ISO-8601 timestamp when the experiment most recently entered a running state.
     */
    startedAt?: string | null;

    /**
     * ISO-8601 timestamp when the experiment was completed, if it has been stopped.
     */
    stoppedAt?: string | null;

    /**
     * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
     * visitor status, and (server-side) visitor properties. Same shape as the
     * create/patch input.
     */
    targetingRules?: Experiment.TargetingRules | null;

    /**
     * Experiment mode. `ab` and `multivariate` use traffic allocation and results;
     * `personalization` is always-on targeting.
     */
    type?: 'ab' | 'multivariate' | 'personalization' | null;

    /**
     * ISO-8601 timestamp for the last persisted update, if any.
     */
    updatedAt?: string | null;

    /**
     * Variant ID persisted as the winner when the experiment was stopped. Set via
     * `POST /experiments/{id}/stop` with a `winnerVariantId` body field.
     */
    winnerVariantId?: string | null;
  }

  export namespace Experiment {
    /**
     * Configured success metrics. The read shape mirrors the write shape — `metrics`
     * from a GET response can be PATCHed back without modification.
     */
    export interface Metrics {
      /**
       * Primary success metric used in the results report.
       */
      primary?: unknown | null;

      /**
       * Optional secondary metrics tracked alongside the primary goal.
       */
      secondary?: Array<Metrics.Secondary> | null;
    }

    export namespace Metrics {
      export interface Secondary {
        /**
         * Name of the event used to measure success for this metric.
         */
        eventName?: string | null;

        /**
         * Optional funnel identifier when the metric is derived from an existing funnel
         * definition.
         */
        funnelId?: string | null;
      }
    }

    /**
     * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
     * visitor status, and (server-side) visitor properties. Same shape as the
     * create/patch input.
     */
    export interface TargetingRules {
      /**
       * Glob-style URL patterns that must match for the experiment to be eligible. Each
       * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
       * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
       * against the full URL so a single domain or subdomain can be targeted). Use `*`
       * to match within a path segment and `**` to match across segments. Up to 200
       * patterns; each pattern up to 2000 characters. An empty array (or omitting the
       * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
       * also appear in the parent experiment settings' `whitelistDomains` — that
       * allowlist is what limits which domains can load your experiments (see
       * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
       * there and the experiment never runs, even after `POST /experiments/{id}/start`
       * succeeds.
       */
      urlPatterns: Array<string>;

      /**
       * Optional audience identifier used for server-side eligibility filtering.
       */
      audienceId?: string | null;

      /**
       * Additional query-string conditions that must all match for the visitor to
       * qualify.
       */
      queryParams?: Array<TargetingRules.QueryParam> | null;

      /**
       * Optional visitor-property matching rules. These are passed through as JSON for
       * experimentation targeting.
       */
      visitorProperties?: unknown | null;

      /**
       * Whether the experiment should target new visitors, returning visitors, or any
       * visitor.
       */
      visitorStatus?: string | null;
    }

    export namespace TargetingRules {
      export interface QueryParam {
        /**
         * Query string key to inspect on the current page URL.
         */
        key: string;

        /**
         * Comparison operator applied to the query string value.
         */
        operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

        /**
         * Comparison value used by operators that require one. Omit for `exists` and
         * `not_exists`.
         */
        value?: string | null;
      }
    }
  }
}

export interface ExperimentPauseResponse {
  /**
   * Number of unpublished version changes detected at the time of the lifecycle
   * action. Values greater than 1 mean other unpublished work exists besides this
   * experiment state change.
   */
  concurrentVersionChanges: number;

  experiment: ExperimentPauseResponse.Experiment;

  /**
   * Whether the status change was also published to the current live version
   * immediately.
   */
  publishStatus: 'pending_publish' | 'published';
}

export namespace ExperimentPauseResponse {
  export interface Experiment {
    /**
     * Unique identifier for the experiment.
     */
    id: string;

    /**
     * ISO-8601 timestamp when the experiment was created.
     */
    createdAt: string;

    /**
     * Stable code-facing key for the experiment. Use this with the headless SDK
     * `getExperimentByKey()` API instead of hard-coding opaque experiment IDs into
     * application code.
     */
    key: string;

    /**
     * Short, human-readable experiment name.
     */
    name: string;

    /**
     * Lifecycle state. `draft` is editable, `running` is active, `paused` is
     * temporarily inactive, and `completed` is permanently stopped.
     */
    status: 'completed' | 'draft' | 'paused' | 'running';

    /**
     * Percent of eligible traffic assigned into the experiment. Use 0 to fully disable
     * enrollment without deleting the experiment.
     */
    trafficAllocation: number;

    /**
     * Optional human-readable hypothesis or summary. In GraphQL this is backed by the
     * experiment hypothesis field.
     */
    description?: string | null;

    /**
     * For redirect variants, whether the original page query string should be
     * forwarded onto the redirect URL.
     */
    includeQueryString?: boolean | null;

    /**
     * Configured success metrics. The read shape mirrors the write shape — `metrics`
     * from a GET response can be PATCHed back without modification.
     */
    metrics?: Experiment.Metrics | null;

    /**
     * ISO-8601 timestamp when the experiment most recently entered a running state.
     */
    startedAt?: string | null;

    /**
     * ISO-8601 timestamp when the experiment was completed, if it has been stopped.
     */
    stoppedAt?: string | null;

    /**
     * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
     * visitor status, and (server-side) visitor properties. Same shape as the
     * create/patch input.
     */
    targetingRules?: Experiment.TargetingRules | null;

    /**
     * Experiment mode. `ab` and `multivariate` use traffic allocation and results;
     * `personalization` is always-on targeting.
     */
    type?: 'ab' | 'multivariate' | 'personalization' | null;

    /**
     * ISO-8601 timestamp for the last persisted update, if any.
     */
    updatedAt?: string | null;

    /**
     * Variant ID persisted as the winner when the experiment was stopped. Set via
     * `POST /experiments/{id}/stop` with a `winnerVariantId` body field.
     */
    winnerVariantId?: string | null;
  }

  export namespace Experiment {
    /**
     * Configured success metrics. The read shape mirrors the write shape — `metrics`
     * from a GET response can be PATCHed back without modification.
     */
    export interface Metrics {
      /**
       * Primary success metric used in the results report.
       */
      primary?: unknown | null;

      /**
       * Optional secondary metrics tracked alongside the primary goal.
       */
      secondary?: Array<Metrics.Secondary> | null;
    }

    export namespace Metrics {
      export interface Secondary {
        /**
         * Name of the event used to measure success for this metric.
         */
        eventName?: string | null;

        /**
         * Optional funnel identifier when the metric is derived from an existing funnel
         * definition.
         */
        funnelId?: string | null;
      }
    }

    /**
     * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
     * visitor status, and (server-side) visitor properties. Same shape as the
     * create/patch input.
     */
    export interface TargetingRules {
      /**
       * Glob-style URL patterns that must match for the experiment to be eligible. Each
       * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
       * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
       * against the full URL so a single domain or subdomain can be targeted). Use `*`
       * to match within a path segment and `**` to match across segments. Up to 200
       * patterns; each pattern up to 2000 characters. An empty array (or omitting the
       * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
       * also appear in the parent experiment settings' `whitelistDomains` — that
       * allowlist is what limits which domains can load your experiments (see
       * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
       * there and the experiment never runs, even after `POST /experiments/{id}/start`
       * succeeds.
       */
      urlPatterns: Array<string>;

      /**
       * Optional audience identifier used for server-side eligibility filtering.
       */
      audienceId?: string | null;

      /**
       * Additional query-string conditions that must all match for the visitor to
       * qualify.
       */
      queryParams?: Array<TargetingRules.QueryParam> | null;

      /**
       * Optional visitor-property matching rules. These are passed through as JSON for
       * experimentation targeting.
       */
      visitorProperties?: unknown | null;

      /**
       * Whether the experiment should target new visitors, returning visitors, or any
       * visitor.
       */
      visitorStatus?: string | null;
    }

    export namespace TargetingRules {
      export interface QueryParam {
        /**
         * Query string key to inspect on the current page URL.
         */
        key: string;

        /**
         * Comparison operator applied to the query string value.
         */
        operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

        /**
         * Comparison value used by operators that require one. Omit for `exists` and
         * `not_exists`.
         */
        value?: string | null;
      }
    }
  }
}

export interface ExperimentResumeResponse {
  /**
   * Number of unpublished version changes detected at the time of the lifecycle
   * action. Values greater than 1 mean other unpublished work exists besides this
   * experiment state change.
   */
  concurrentVersionChanges: number;

  experiment: ExperimentResumeResponse.Experiment;

  /**
   * Whether the status change was also published to the current live version
   * immediately.
   */
  publishStatus: 'pending_publish' | 'published';
}

export namespace ExperimentResumeResponse {
  export interface Experiment {
    /**
     * Unique identifier for the experiment.
     */
    id: string;

    /**
     * ISO-8601 timestamp when the experiment was created.
     */
    createdAt: string;

    /**
     * Stable code-facing key for the experiment. Use this with the headless SDK
     * `getExperimentByKey()` API instead of hard-coding opaque experiment IDs into
     * application code.
     */
    key: string;

    /**
     * Short, human-readable experiment name.
     */
    name: string;

    /**
     * Lifecycle state. `draft` is editable, `running` is active, `paused` is
     * temporarily inactive, and `completed` is permanently stopped.
     */
    status: 'completed' | 'draft' | 'paused' | 'running';

    /**
     * Percent of eligible traffic assigned into the experiment. Use 0 to fully disable
     * enrollment without deleting the experiment.
     */
    trafficAllocation: number;

    /**
     * Optional human-readable hypothesis or summary. In GraphQL this is backed by the
     * experiment hypothesis field.
     */
    description?: string | null;

    /**
     * For redirect variants, whether the original page query string should be
     * forwarded onto the redirect URL.
     */
    includeQueryString?: boolean | null;

    /**
     * Configured success metrics. The read shape mirrors the write shape — `metrics`
     * from a GET response can be PATCHed back without modification.
     */
    metrics?: Experiment.Metrics | null;

    /**
     * ISO-8601 timestamp when the experiment most recently entered a running state.
     */
    startedAt?: string | null;

    /**
     * ISO-8601 timestamp when the experiment was completed, if it has been stopped.
     */
    stoppedAt?: string | null;

    /**
     * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
     * visitor status, and (server-side) visitor properties. Same shape as the
     * create/patch input.
     */
    targetingRules?: Experiment.TargetingRules | null;

    /**
     * Experiment mode. `ab` and `multivariate` use traffic allocation and results;
     * `personalization` is always-on targeting.
     */
    type?: 'ab' | 'multivariate' | 'personalization' | null;

    /**
     * ISO-8601 timestamp for the last persisted update, if any.
     */
    updatedAt?: string | null;

    /**
     * Variant ID persisted as the winner when the experiment was stopped. Set via
     * `POST /experiments/{id}/stop` with a `winnerVariantId` body field.
     */
    winnerVariantId?: string | null;
  }

  export namespace Experiment {
    /**
     * Configured success metrics. The read shape mirrors the write shape — `metrics`
     * from a GET response can be PATCHed back without modification.
     */
    export interface Metrics {
      /**
       * Primary success metric used in the results report.
       */
      primary?: unknown | null;

      /**
       * Optional secondary metrics tracked alongside the primary goal.
       */
      secondary?: Array<Metrics.Secondary> | null;
    }

    export namespace Metrics {
      export interface Secondary {
        /**
         * Name of the event used to measure success for this metric.
         */
        eventName?: string | null;

        /**
         * Optional funnel identifier when the metric is derived from an existing funnel
         * definition.
         */
        funnelId?: string | null;
      }
    }

    /**
     * Eligibility rules: URL-pattern globs, optional audience, query-param conditions,
     * visitor status, and (server-side) visitor properties. Same shape as the
     * create/patch input.
     */
    export interface TargetingRules {
      /**
       * Glob-style URL patterns that must match for the experiment to be eligible. Each
       * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
       * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
       * against the full URL so a single domain or subdomain can be targeted). Use `*`
       * to match within a path segment and `**` to match across segments. Up to 200
       * patterns; each pattern up to 2000 characters. An empty array (or omitting the
       * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
       * also appear in the parent experiment settings' `whitelistDomains` — that
       * allowlist is what limits which domains can load your experiments (see
       * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
       * there and the experiment never runs, even after `POST /experiments/{id}/start`
       * succeeds.
       */
      urlPatterns: Array<string>;

      /**
       * Optional audience identifier used for server-side eligibility filtering.
       */
      audienceId?: string | null;

      /**
       * Additional query-string conditions that must all match for the visitor to
       * qualify.
       */
      queryParams?: Array<TargetingRules.QueryParam> | null;

      /**
       * Optional visitor-property matching rules. These are passed through as JSON for
       * experimentation targeting.
       */
      visitorProperties?: unknown | null;

      /**
       * Whether the experiment should target new visitors, returning visitors, or any
       * visitor.
       */
      visitorStatus?: string | null;
    }

    export namespace TargetingRules {
      export interface QueryParam {
        /**
         * Query string key to inspect on the current page URL.
         */
        key: string;

        /**
         * Comparison operator applied to the query string value.
         */
        operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

        /**
         * Comparison value used by operators that require one. Omit for `exists` and
         * `not_exists`.
         */
        value?: string | null;
      }
    }
  }
}

export interface ExperimentResultsResponse {
  /**
   * Aggregate performance metrics for each variant in the experiment over the
   * experiment runtime window.
   */
  variants: Array<ExperimentResultsResponse.Variant>;
}

export namespace ExperimentResultsResponse {
  export interface Variant {
    /**
     * Variant ID this result row belongs to.
     */
    id: string;

    /**
     * Conversions divided by impressions for this variant.
     */
    conversionRate: number;

    /**
     * Number of post-exposure conversions attributed to the variant.
     */
    conversions: number;

    /**
     * Number of distinct experiment-impression events counted for the variant.
     */
    impressions: number;

    /**
     * Whether this variant is the experiment control. Exactly one variant per
     * experiment is the control.
     */
    isControl: boolean;

    /**
     * Human-readable variant name as configured on the experiment (e.g. `Control`,
     * `Treatment`). Lets callers label results without a separate lookup against
     * `/experiment-variants`.
     */
    name: string;

    /**
     * Bayesian probability that this variant is the best-performing option among all
     * variants in the experiment.
     */
    probabilityToBeBest: number;
  }
}

export interface ExperimentResultsTimeSeriesResponse {
  /**
   * Per-day metrics for each variant. Days with no impression rows are omitted from
   * the response.
   */
  days: Array<ExperimentResultsTimeSeriesResponse.Day>;
}

export namespace ExperimentResultsTimeSeriesResponse {
  export interface Day {
    /**
     * UTC calendar day in `YYYY-MM-DD` format.
     */
    date: string;

    variants: Array<Day.Variant>;
  }

  export namespace Day {
    export interface Variant {
      id: string;

      conversionRate: number;

      conversions: number;

      impressions: number;
    }
  }
}

export interface ExperimentSessionReplaysResponse {
  /**
   * Sessions in which a `$experiment_impression` event for this experiment was
   * recorded, ordered newest first by session start time.
   */
  entities: Array<ExperimentSessionReplaysResponse.Entity>;

  pagination: ExperimentSessionReplaysResponse.Pagination;
}

export namespace ExperimentSessionReplaysResponse {
  export interface Entity {
    /**
     * Time between the first and last events recorded for this session, in whole
     * seconds.
     */
    durationSeconds: number;

    /**
     * Number of distinct page paths visited during this session.
     */
    pageCount: number;

    /**
     * Deep link to the in-app replay viewer for this session. Requires an
     * authenticated session in the Ours Privacy app for an account that owns this
     * experiment — not embeddable in customer-facing emails.
     */
    replayUrl: string;

    /**
     * Session identifier (`dp_sid`). Combine with `visitorId` and the `YYYY-MM-DD`
     * date of `startTime` to deep-link to a replay outside of the response
     * `replayUrl`.
     */
    sessionId: string;

    /**
     * ISO-8601 timestamp of the first event recorded in this session. Sessions are
     * ordered newest first by this field.
     */
    startTime: string;

    /**
     * Human-readable name of the variant the visitor was assigned for the recorded
     * impression. May be empty if the variant has been deleted since the impression
     * fired.
     */
    variantName: string;

    /**
     * Visitor identifier whose session is recorded here.
     */
    visitorId: string;
  }

  export interface Pagination {
    hasMore: boolean;

    nextCursor?: string | null;
  }
}

export interface ExperimentListParams extends CursorParams {
  /**
   * Optional case-insensitive text search matched against experiment ID, name, and
   * description.
   */
  search?: string;

  /**
   * Optional lifecycle-state filter.
   */
  status?: 'completed' | 'draft' | 'paused' | 'running';

  /**
   * Optional experiment-type filter.
   */
  type?: 'ab' | 'multivariate' | 'personalization';
}

export interface ExperimentCreateParams {
  /**
   * ID of the experiment settings record that owns this experiment. Call
   * `GET /rest/v1/experiment-settings` first if you need to discover the correct ID
   * for the current account.
   */
  experimentSettingsId: string;

  /**
   * Short experiment name.
   */
  name: string;

  /**
   * Weight of the auto-created control variant, as a percentage (1–100). Defaults to
   * 100 (a new experiment is all control until treatments are added). The control
   * must keep at least 1% — a 0% control leaves visitors with no bucket to assign at
   * runtime. As treatments are added the control is reconciled to the remainder (100
   * − Σ treatment weights), so it normally does not need to be set explicitly.
   */
  controlWeight?: number | null;

  /**
   * Optional hypothesis or operator note.
   */
  description?: string | null;

  /**
   * Whether redirect variants in this experiment should preserve the original
   * request query string.
   */
  includeQueryString?: boolean | null;

  /**
   * Optional stable code-facing key. When omitted, the API slugifies the name
   * automatically.
   */
  key?: string | null;

  /**
   * Goal events. If you send `metrics.primary`, `metrics.primary.eventName` must be
   * a non-blank string. A primary event name is required before the experiment can
   * be started.
   */
  metrics?: ExperimentCreateParams.Metrics | null;

  /**
   * Eligibility rules — URL patterns, audience, visitor status, query-param
   * conditions. Omit to inherit defaults.
   */
  targetingRules?: ExperimentCreateParams.TargetingRules | null;

  /**
   * Initial traffic allocation percentage from 0 to 100.
   */
  trafficAllocation?: number | null;

  /**
   * Experiment mode to create. `ab` and `multivariate` use traffic allocation and
   * results; `personalization` is always-on targeting. Omit to create a standard
   * `ab` experiment.
   */
  type?: 'ab' | 'multivariate' | 'personalization' | null;
}

export namespace ExperimentCreateParams {
  /**
   * Goal events. If you send `metrics.primary`, `metrics.primary.eventName` must be
   * a non-blank string. A primary event name is required before the experiment can
   * be started.
   */
  export interface Metrics {
    /**
     * Primary success metric. When provided, `eventName` must be a non-blank string.
     */
    primary?: Metrics.Primary | null;

    /**
     * Optional secondary metrics tracked alongside the primary goal.
     */
    secondary?: Array<Metrics.Secondary> | null;
  }

  export namespace Metrics {
    /**
     * Primary success metric. When provided, `eventName` must be a non-blank string.
     */
    export interface Primary {
      /**
       * Event name to use as the goal for this metric.
       */
      eventName?: string | null;

      /**
       * Optional funnel identifier when the metric should be derived from an existing
       * funnel definition.
       */
      funnelId?: string | null;
    }

    export interface Secondary {
      /**
       * Event name to use as the goal for this metric.
       */
      eventName?: string | null;

      /**
       * Optional funnel identifier when the metric should be derived from an existing
       * funnel definition.
       */
      funnelId?: string | null;
    }
  }

  /**
   * Eligibility rules — URL patterns, audience, visitor status, query-param
   * conditions. Omit to inherit defaults.
   */
  export interface TargetingRules {
    /**
     * Glob-style URL patterns that must match for the experiment to be eligible. Each
     * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
     * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
     * against the full URL so a single domain or subdomain can be targeted). Use `*`
     * to match within a path segment and `**` to match across segments. Up to 200
     * patterns; each pattern up to 2000 characters. An empty array (or omitting the
     * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
     * also appear in the parent experiment settings' `whitelistDomains` — that
     * allowlist is what limits which domains can load your experiments (see
     * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
     * there and the experiment never runs, even after `POST /experiments/{id}/start`
     * succeeds.
     */
    urlPatterns: Array<string>;

    /**
     * Optional audience identifier used for server-side eligibility filtering.
     */
    audienceId?: string | null;

    /**
     * Additional query-string conditions that must all match for the visitor to
     * qualify.
     */
    queryParams?: Array<TargetingRules.QueryParam> | null;

    /**
     * Optional visitor-property matching rules. These are passed through as JSON for
     * experimentation targeting.
     */
    visitorProperties?: unknown | null;

    /**
     * Whether the experiment should target new visitors, returning visitors, or any
     * visitor.
     */
    visitorStatus?: string | null;
  }

  export namespace TargetingRules {
    export interface QueryParam {
      /**
       * Query string key to inspect on the current page URL.
       */
      key: string;

      /**
       * Comparison operator applied to the query string value.
       */
      operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

      /**
       * Comparison value used by operators that require one. Omit for `exists` and
       * `not_exists`.
       */
      value?: string | null;
    }
  }
}

export interface ExperimentUpdateParams {
  /**
   * Updated experiment hypothesis or operator note.
   */
  description?: string | null;

  /**
   * Updated redirect query-string forwarding behavior for the experiment.
   */
  includeQueryString?: boolean | null;

  /**
   * Updated stable code-facing key. When blank, the API falls back to a slugified
   * key derived from the current experiment name.
   */
  key?: string | null;

  /**
   * Updated goal events. Send the full nested object — replaces the previous value,
   * not merged. If you send `metrics.primary`, `metrics.primary.eventName` must be a
   * non-blank string.
   */
  metrics?: ExperimentUpdateParams.Metrics | null;

  /**
   * Updated experiment name.
   */
  name?: string | null;

  /**
   * Updated eligibility rules. Send the full nested object — replaces the previous
   * value, not merged.
   */
  targetingRules?: ExperimentUpdateParams.TargetingRules | null;

  /**
   * Updated traffic allocation percentage from 0 to 100.
   */
  trafficAllocation?: number | null;
}

export namespace ExperimentUpdateParams {
  /**
   * Updated goal events. Send the full nested object — replaces the previous value,
   * not merged. If you send `metrics.primary`, `metrics.primary.eventName` must be a
   * non-blank string.
   */
  export interface Metrics {
    /**
     * Primary success metric. When provided, `eventName` must be a non-blank string.
     */
    primary?: Metrics.Primary | null;

    /**
     * Optional secondary metrics tracked alongside the primary goal.
     */
    secondary?: Array<Metrics.Secondary> | null;
  }

  export namespace Metrics {
    /**
     * Primary success metric. When provided, `eventName` must be a non-blank string.
     */
    export interface Primary {
      /**
       * Event name to use as the goal for this metric.
       */
      eventName?: string | null;

      /**
       * Optional funnel identifier when the metric should be derived from an existing
       * funnel definition.
       */
      funnelId?: string | null;
    }

    export interface Secondary {
      /**
       * Event name to use as the goal for this metric.
       */
      eventName?: string | null;

      /**
       * Optional funnel identifier when the metric should be derived from an existing
       * funnel definition.
       */
      funnelId?: string | null;
    }
  }

  /**
   * Updated eligibility rules. Send the full nested object — replaces the previous
   * value, not merged.
   */
  export interface TargetingRules {
    /**
     * Glob-style URL patterns that must match for the experiment to be eligible. Each
     * pattern is either a path (`/pricing`, matched on any domain) or a host-qualified
     * pattern (`get.example.com/pricing` or `https://get.example.com/pricing`, matched
     * against the full URL so a single domain or subdomain can be targeted). Use `*`
     * to match within a path segment and `**` to match across segments. Up to 200
     * patterns; each pattern up to 2000 characters. An empty array (or omitting the
     * field) matches all URLs — equivalent to `['**']`. The host(s) targeted here must
     * also appear in the parent experiment settings' `whitelistDomains` — that
     * allowlist is what limits which domains can load your experiments (see
     * `GET /experiment-settings`). If the host is missing, the SDK refuses to load
     * there and the experiment never runs, even after `POST /experiments/{id}/start`
     * succeeds.
     */
    urlPatterns: Array<string>;

    /**
     * Optional audience identifier used for server-side eligibility filtering.
     */
    audienceId?: string | null;

    /**
     * Additional query-string conditions that must all match for the visitor to
     * qualify.
     */
    queryParams?: Array<TargetingRules.QueryParam> | null;

    /**
     * Optional visitor-property matching rules. These are passed through as JSON for
     * experimentation targeting.
     */
    visitorProperties?: unknown | null;

    /**
     * Whether the experiment should target new visitors, returning visitors, or any
     * visitor.
     */
    visitorStatus?: string | null;
  }

  export namespace TargetingRules {
    export interface QueryParam {
      /**
       * Query string key to inspect on the current page URL.
       */
      key: string;

      /**
       * Comparison operator applied to the query string value.
       */
      operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

      /**
       * Comparison value used by operators that require one. Omit for `exists` and
       * `not_exists`.
       */
      value?: string | null;
    }
  }
}

export interface ExperimentStartParams {
  /**
   * When true (the default), atomically publish the experiment and its variants as a
   * new version after starting — this is the canonical publish path for experiment
   * changes. Any other unpublished non-experiment changes (destinations, mappings,
   * settings, etc.) currently in draft are included in the same publish. Pass
   * `false` explicitly to stage the change without publishing; the response will
   * report `pending_publish` and a separate `POST /rest/v1/versions` call is then
   * required.
   */
  publishAfterStart?: boolean;
}

export interface ExperimentStopParams {
  /**
   * Optional winning variant ID to persist when completing the experiment.
   */
  winnerVariantId?: string;
}

export interface ExperimentPauseParams {
  /**
   * When true (default on the REST surface), publish the current draft version
   * immediately after pausing the experiment. Any other unpublished changes in the
   * same account version are included in that publish. Pass `false` explicitly to
   * stage the change without publishing; the response will report `pending_publish`.
   */
  publishAfterPause?: boolean;
}

export interface ExperimentResumeParams {
  /**
   * When true (default on the REST surface), publish the current draft version
   * immediately after resuming the experiment. Any other unpublished changes in the
   * same account version are included in that publish. Pass `false` explicitly to
   * stage the change without publishing; the response will report `pending_publish`.
   */
  publishAfterResume?: boolean;
}

export interface ExperimentResultsParams {
  /**
   * Optional override for the conversion event name. When omitted, the experiment
   * primary metric event is used.
   */
  eventName?: string;
}

export interface ExperimentResultsTimeSeriesParams {
  /**
   * Inclusive upper bound of the response window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Defaults to the experiment stop date for completed
   * experiments, or today for running experiments. Values after that are silently
   * clamped. The window between `startDate` and `endDate` must be 366 days or fewer.
   */
  endDate?: string;

  /**
   * Optional override for the conversion event name. When omitted, the experiment
   * primary metric event is used.
   */
  eventName?: string;

  /**
   * Inclusive lower bound of the response window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Defaults to the experiment start date when omitted. Values
   * before the experiment started are silently clamped to the experiment start.
   */
  startDate?: string;
}

export interface ExperimentSessionReplaysParams {
  /**
   * Opaque pagination cursor from pagination.nextCursor in the previous response. Do
   * not decode or modify it. Malformed cursors return 400 Bad Request.
   */
  cursor?: string;

  /**
   * Maximum number of items to return. Defaults to 25; values below 1 are clamped to
   * 1 and values above 100 are clamped to 100.
   */
  limit?: number | null;

  /**
   * Optional filter to a single variant ID. Returns sessions for all variants when
   * omitted.
   */
  variant_id?: string;
}

export declare namespace Experiments {
  export {
    type ExperimentListResponse as ExperimentListResponse,
    type ExperimentCreateResponse as ExperimentCreateResponse,
    type ExperimentRetrieveResponse as ExperimentRetrieveResponse,
    type ExperimentUpdateResponse as ExperimentUpdateResponse,
    type ExperimentDeleteResponse as ExperimentDeleteResponse,
    type ExperimentStartResponse as ExperimentStartResponse,
    type ExperimentStopResponse as ExperimentStopResponse,
    type ExperimentPauseResponse as ExperimentPauseResponse,
    type ExperimentResumeResponse as ExperimentResumeResponse,
    type ExperimentResultsResponse as ExperimentResultsResponse,
    type ExperimentResultsTimeSeriesResponse as ExperimentResultsTimeSeriesResponse,
    type ExperimentSessionReplaysResponse as ExperimentSessionReplaysResponse,
    type ExperimentListResponsesCursor as ExperimentListResponsesCursor,
    type ExperimentListParams as ExperimentListParams,
    type ExperimentCreateParams as ExperimentCreateParams,
    type ExperimentUpdateParams as ExperimentUpdateParams,
    type ExperimentStartParams as ExperimentStartParams,
    type ExperimentStopParams as ExperimentStopParams,
    type ExperimentPauseParams as ExperimentPauseParams,
    type ExperimentResumeParams as ExperimentResumeParams,
    type ExperimentResultsParams as ExperimentResultsParams,
    type ExperimentResultsTimeSeriesParams as ExperimentResultsTimeSeriesParams,
    type ExperimentSessionReplaysParams as ExperimentSessionReplaysParams,
  };
}
