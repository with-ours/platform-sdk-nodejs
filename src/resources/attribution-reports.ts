// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AttributionReports extends APIResource {
  /**
   * List saved attribution reports in stable ID order with case-insensitive name
   * search. Defaults to 20 results; each request scans at most 100 reports. Search
   * and unavailable or deleted entries can yield short pages. Continue with
   * pagination.nextCursor while hasMore is true and preserve unavailableCount.
   * Requires Analytics Suite access. Requires API-key scope or current OAuth user
   * permission: web-analytics:view
   */
  list(
    query: AttributionReportListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AttributionReportListResponsesCursor, AttributionReportListResponse> {
    return this._client.getAPIList('/rest/v1/attribution-reports', Cursor<AttributionReportListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Save an attribution report with a default date context and a definition of up to
   * five conversion outcomes, the credit model, counting unit, lookback window, and
   * currency. Use GET /rest/v1/attribution-reports/preview to compute results.
   * Requires Analytics Suite access. Requires API-key scope or current OAuth user
   * permission: web-analytics:write
   */
  create(
    body: AttributionReportCreateParams,
    options?: RequestOptions,
  ): APIPromise<AttributionReportCreateResponse> {
    return this._client.post('/rest/v1/attribution-reports', { body, ...options });
  }

  /**
   * Get a saved attribution report including its revision, default date context, and
   * attribution definition. Requires Analytics Suite access; unavailable reports
   * return 404. Requires API-key scope or current OAuth user permission:
   * web-analytics:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AttributionReportRetrieveResponse> {
    return this._client.get(path`/rest/v1/attribution-reports/${id}`, options);
  }

  /**
   * Update an attribution report using expectedRevision. Omitted fields remain
   * unchanged; null clears the description. Supplied reportContext and definition
   * replace the entire saved value. Requires Analytics Suite access. Requires
   * API-key scope or current OAuth user permission: web-analytics:write
   */
  update(
    id: string,
    body: AttributionReportUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AttributionReportUpdateResponse> {
    return this._client.patch(path`/rest/v1/attribution-reports/${id}`, { body, ...options });
  }

  /**
   * Delete an attribution report using expectedRevision. Requires Analytics Suite
   * access. Requires API-key scope or current OAuth user permission:
   * web-analytics:write
   */
  delete(
    id: string,
    params: AttributionReportDeleteParams,
    options?: RequestOptions,
  ): APIPromise<AttributionReportDeleteResponse> {
    const { expectedRevision } = params;
    return this._client.delete(path`/rest/v1/attribution-reports/${id}`, {
      query: { expectedRevision },
      ...options,
    });
  }

  /**
   * Duplicate an attribution report using the expectedRevision in the request body.
   * Copies the description, date context, and definition under a new id with
   * "(copy)" appended to the name. Requires Analytics Suite access. Requires API-key
   * scope or current OAuth user permission: web-analytics:write, web-analytics:view
   */
  duplicate(
    id: string,
    body: AttributionReportDuplicateParams,
    options?: RequestOptions,
  ): APIPromise<AttributionReportDuplicateResponse> {
    return this._client.post(path`/rest/v1/attribution-reports/${id}/duplicate`, { body, ...options });
  }

  /**
   * Compute attribution credit for a saved or draft definition without saving it.
   * JSON-encode input as {definition,from,to,comparison?,interval?}; dates are
   * inclusive UTC calendar strings spanning at most 92 days. Results include a total
   * row, channel, source/medium, campaign, and term breakdowns, and a time series,
   * with credit under every model. Maximum 16384 bytes before URL encoding. Requires
   * Analytics Suite access. Requires API-key scope or current OAuth user permission:
   * web-analytics:view
   */
  preview(
    query: AttributionReportPreviewParams,
    options?: RequestOptions,
  ): APIPromise<AttributionReportPreviewResponse> {
    return this._client.get('/rest/v1/attribution-reports/preview', { query, ...options });
  }

  /**
   * List the visitors behind one number in an attribution result: an outcome,
   * period, row, touch role (first, last, any, or assist), and optional interval
   * bucket. Send the same definition, dates, comparison, and interval that produced
   * the result. Each visitor includes the credit and value they give that row, their
   * credited first and last touch, conversion time, sessions in the lookback window,
   * and up to three recent session replays. totalUnits equals the first- or
   * last-touch credit for those roles and the row creditedUnits for any. Ordered
   * newest conversion first; continue with pagination.nextCursor while hasMore is
   * true. Requires Analytics Suite access and permission to view visitor data.
   * Requires API-key scope or current OAuth user permission: web-analytics:view,
   * report:view-visitor
   */
  visitors(
    query: AttributionReportVisitorsParams,
    options?: RequestOptions,
  ): APIPromise<AttributionReportVisitorsResponse> {
    return this._client.get('/rest/v1/attribution-reports/visitors', { query, ...options });
  }

  /**
   * Explain what moved in an attribution result: new sources, campaigns, and terms
   * with credited conversions and no sessions in the prior 180 days; the largest
   * share-adjusted credit changes against the comparison period; channels credited
   * very differently by first and last touch; and rows that went quiet. Takes the
   * same JSON input as the preview. Without a comparison only new values are
   * returned. Returns at most 8 aggregate findings with their baselines and sample
   * sizes, ranked by effect size and not tested for significance. Requires Analytics
   * Suite access. Requires API-key scope or current OAuth user permission:
   * web-analytics:view
   */
  insights(
    query: AttributionReportInsightsParams,
    options?: RequestOptions,
  ): APIPromise<AttributionReportInsightsResponse> {
    return this._client.get('/rest/v1/attribution-reports/insights', { query, ...options });
  }
}

export type AttributionReportListResponsesCursor = Cursor<AttributionReportListResponse>;

export interface AttributionReportListResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  definition: AttributionReportListResponse.Definition;

  /**
   * Display name for the saved attribution report.
   */
  name: string;

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  reportContext: AttributionReportListResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace AttributionReportListResponse {
  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  export interface Definition {
    kind: 'attribution';

    outcomes: Array<Definition.Outcome>;

    version: 1;

    counting?: 'unique' | 'totals' | 'sessions';

    currency?: 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AUD';

    filter?: Definition.Filter;

    lookbackDays?: 7 | 14 | 30 | 60 | 90;

    model?: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';
  }

  export namespace Definition {
    export interface Outcome {
      id: string;

      eventNames: Array<string>;

      label: string;

      filter?: Outcome.Filter;

      value?: Outcome.Value;
    }

    export namespace Outcome {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }

      export interface Value {
        path: Array<string>;

        property: 'event.properties';

        type?: 'number';
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }
}

export interface AttributionReportCreateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  definition: AttributionReportCreateResponse.Definition;

  /**
   * Display name for the saved attribution report.
   */
  name: string;

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  reportContext: AttributionReportCreateResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace AttributionReportCreateResponse {
  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  export interface Definition {
    kind: 'attribution';

    outcomes: Array<Definition.Outcome>;

    version: 1;

    counting?: 'unique' | 'totals' | 'sessions';

    currency?: 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AUD';

    filter?: Definition.Filter;

    lookbackDays?: 7 | 14 | 30 | 60 | 90;

    model?: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';
  }

  export namespace Definition {
    export interface Outcome {
      id: string;

      eventNames: Array<string>;

      label: string;

      filter?: Outcome.Filter;

      value?: Outcome.Value;
    }

    export namespace Outcome {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }

      export interface Value {
        path: Array<string>;

        property: 'event.properties';

        type?: 'number';
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }
}

export interface AttributionReportRetrieveResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  definition: AttributionReportRetrieveResponse.Definition;

  /**
   * Display name for the saved attribution report.
   */
  name: string;

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  reportContext: AttributionReportRetrieveResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace AttributionReportRetrieveResponse {
  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  export interface Definition {
    kind: 'attribution';

    outcomes: Array<Definition.Outcome>;

    version: 1;

    counting?: 'unique' | 'totals' | 'sessions';

    currency?: 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AUD';

    filter?: Definition.Filter;

    lookbackDays?: 7 | 14 | 30 | 60 | 90;

    model?: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';
  }

  export namespace Definition {
    export interface Outcome {
      id: string;

      eventNames: Array<string>;

      label: string;

      filter?: Outcome.Filter;

      value?: Outcome.Value;
    }

    export namespace Outcome {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }

      export interface Value {
        path: Array<string>;

        property: 'event.properties';

        type?: 'number';
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }
}

export interface AttributionReportUpdateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  definition: AttributionReportUpdateResponse.Definition;

  /**
   * Display name for the saved attribution report.
   */
  name: string;

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  reportContext: AttributionReportUpdateResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace AttributionReportUpdateResponse {
  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  export interface Definition {
    kind: 'attribution';

    outcomes: Array<Definition.Outcome>;

    version: 1;

    counting?: 'unique' | 'totals' | 'sessions';

    currency?: 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AUD';

    filter?: Definition.Filter;

    lookbackDays?: 7 | 14 | 30 | 60 | 90;

    model?: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';
  }

  export namespace Definition {
    export interface Outcome {
      id: string;

      eventNames: Array<string>;

      label: string;

      filter?: Outcome.Filter;

      value?: Outcome.Value;
    }

    export namespace Outcome {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }

      export interface Value {
        path: Array<string>;

        property: 'event.properties';

        type?: 'number';
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }
}

export interface AttributionReportDeleteResponse {
  id: string;

  deleted: true;

  deletedRevision: string;
}

export interface AttributionReportDuplicateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  definition: AttributionReportDuplicateResponse.Definition;

  /**
   * Display name for the saved attribution report.
   */
  name: string;

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  reportContext: AttributionReportDuplicateResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace AttributionReportDuplicateResponse {
  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  export interface Definition {
    kind: 'attribution';

    outcomes: Array<Definition.Outcome>;

    version: 1;

    counting?: 'unique' | 'totals' | 'sessions';

    currency?: 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AUD';

    filter?: Definition.Filter;

    lookbackDays?: 7 | 14 | 30 | 60 | 90;

    model?: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';
  }

  export namespace Definition {
    export interface Outcome {
      id: string;

      eventNames: Array<string>;

      label: string;

      filter?: Outcome.Filter;

      value?: Outcome.Value;
    }

    export namespace Outcome {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }

      export interface Value {
        path: Array<string>;

        property: 'event.properties';

        type?: 'number';
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }
}

export interface AttributionReportPreviewResponse {
  channelRulesVersion: number;

  computedAt: string;

  counting: 'unique' | 'totals' | 'sessions';

  from: string;

  interval: 'day' | 'week';

  /**
   * True when more breakdown rows matched than the response returns; the total row
   * is always complete.
   */
  isTruncated: boolean;

  /**
   * Time-series credit per bucket, period, and outcome; channel is null for the
   * all-channel series.
   */
  points: Array<AttributionReportPreviewResponse.Point>;

  /**
   * Inclusive comparison start date; null without a comparison.
   */
  previousFrom: string | null;

  /**
   * Inclusive comparison end date; null without a comparison.
   */
  previousTo: string | null;

  /**
   * The total row followed by channel, source/medium, campaign, and term breakdown
   * rows, ordered by current-period credit under the selected model.
   */
  rows: Array<AttributionReportPreviewResponse.Row>;

  to: string;
}

export namespace AttributionReportPreviewResponse {
  export interface Point {
    bucket: string;

    channel: string | null;

    /**
     * Credit under every model, keyed by model name, for this bucket.
     */
    credit: Point.Credit;

    outcomeId: string;

    period: 'current' | 'previous';

    /**
     * Attributed value under every model for this bucket; null when the outcome has no
     * value property.
     */
    value: Point.Value | null;
  }

  export namespace Point {
    /**
     * Credit under every model, keyed by model name, for this bucket.
     */
    export interface Credit {
      first_touch: number;

      j_shaped: number;

      last_touch: number;

      linear: number;

      time_decay: number;

      u_shaped: number;
    }

    /**
     * Attributed value under every model for this bucket; null when the outcome has no
     * value property.
     */
    export interface Value {
      first_touch: number;

      j_shaped: number;

      last_touch: number;

      linear: number;

      time_decay: number;

      u_shaped: number;
    }
  }

  export interface Row {
    campaign: string | null;

    /**
     * One cell per outcome and period, current period first, in outcome order.
     */
    cells: Array<Row.Cell>;

    channel: string | null;

    grain: 'total' | 'channel' | 'source_medium' | 'campaign' | 'term';

    sourceMedium: string | null;

    term: string | null;
  }

  export namespace Row {
    export interface Cell {
      assistedVisitors: number;

      /**
       * Credit under every model, keyed by model name, in the definition counting unit.
       * Compare models without recomputing.
       */
      credit: Cell.Credit;

      creditedUnits: number;

      medianDaysToConvert: number | null;

      outcomeId: string;

      period: 'current' | 'previous';

      /**
       * Attributed value under every model, in the definition currency; null when the
       * outcome has no value property.
       */
      value: Cell.Value | null;
    }

    export namespace Cell {
      /**
       * Credit under every model, keyed by model name, in the definition counting unit.
       * Compare models without recomputing.
       */
      export interface Credit {
        first_touch: number;

        j_shaped: number;

        last_touch: number;

        linear: number;

        time_decay: number;

        u_shaped: number;
      }

      /**
       * Attributed value under every model, in the definition currency; null when the
       * outcome has no value property.
       */
      export interface Value {
        first_touch: number;

        j_shaped: number;

        last_touch: number;

        linear: number;

        time_decay: number;

        u_shaped: number;
      }
    }
  }
}

export interface AttributionReportVisitorsResponse {
  /**
   * Visitors ordered by latest matching conversion, newest first, then visitor id.
   */
  entities: Array<AttributionReportVisitorsResponse.Entity>;

  pagination: AttributionReportVisitorsResponse.Pagination;

  /**
   * Visitors behind the selection.
   */
  totalCount: number;

  /**
   * Counted units behind the selection. Equals the first- or last-touch credit for
   * those roles and the row's creditedUnits for any.
   */
  totalUnits: number;
}

export namespace AttributionReportVisitorsResponse {
  export interface Entity {
    /**
     * When the latest matching conversion happened (UTC).
     */
    convertedAt: string;

    /**
     * Credit this visitor gives the selected row under the definition's model.
     */
    credit: number;

    /**
     * The credited first touch of the latest matching conversion; null when it had no
     * eligible touch.
     */
    firstTouch: Entity.FirstTouch | null;

    /**
     * The credited last touch of the latest matching conversion; null when it had no
     * eligible touch.
     */
    lastTouch: Entity.LastTouch | null;

    /**
     * Up to three recorded sessions from the matching lookback windows, newest first,
     * within session replay retention.
     */
    latestReplays: Array<Entity.LatestReplay>;

    /**
     * Sessions in the latest matching conversion's lookback window.
     */
    sessionCount: number;

    /**
     * Matching conversions (totals counting) or converting sessions (sessions
     * counting); always 1 under unique counting.
     */
    units: number;

    /**
     * Value this visitor credits to the selected row under the definition's model;
     * null when the outcome has no value property.
     */
    value: number | null;

    visitorId: string;
  }

  export namespace Entity {
    /**
     * The credited first touch of the latest matching conversion; null when it had no
     * eligible touch.
     */
    export interface FirstTouch {
      at: string;

      campaign: string;

      channel: string;

      sessionId: string;

      sourceMedium: string;

      term: string;
    }

    /**
     * The credited last touch of the latest matching conversion; null when it had no
     * eligible touch.
     */
    export interface LastTouch {
      at: string;

      campaign: string;

      channel: string;

      sessionId: string;

      sourceMedium: string;

      term: string;
    }

    export interface LatestReplay {
      date: string;

      sessionId: string;

      startedAt: string;
    }
  }

  export interface Pagination {
    hasMore: boolean;

    nextCursor: string | null;
  }
}

export interface AttributionReportInsightsResponse {
  computedAt: string;

  counting: 'unique' | 'totals' | 'sessions';

  from: string;

  /**
   * At most 8 findings, most notable first, one per row. Aggregates only; no visitor
   * identifiers.
   */
  insights: Array<AttributionReportInsightsResponse.Insight>;

  model: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';

  /**
   * A value is new when it had no sessions in this many days before from.
   */
  newValueLookbackDays: number;

  /**
   * Inclusive comparison start date; null without a comparison.
   */
  previousFrom: string | null;

  /**
   * Inclusive comparison end date; null without a comparison.
   */
  previousTo: string | null;

  to: string;
}

export namespace AttributionReportInsightsResponse {
  export interface Insight {
    /**
     * Stable identifier for the same input, made of the kind, outcome, and row.
     */
    id: string;

    /**
     * The number current is compared with; see baselineKind.
     */
    baseline: number;

    /**
     * previous_period: baseline is the same model in the comparison period.
     * other_model: baseline is baselineModel in the current period. lookback: baseline
     * is the number of sessions with the value before the range, always 0.
     */
    baselineKind: 'previous_period' | 'other_model' | 'lookback';

    baselineModel: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';

    /**
     * The row's share of the outcome's baseline credit; null for new values.
     */
    baselineShare: number | null;

    /**
     * Relative change from baseline; null when the baseline is 0.
     */
    change: number | null;

    /**
     * Credit in the current period under model, in the definition counting unit.
     */
    current: number;

    /**
     * The row's share of the outcome's current credit; null when the outcome has none.
     */
    currentShare: number | null;

    /**
     * current minus baseline.
     */
    delta: number;

    /**
     * Child rows that together explain most of a move, largest first.
     */
    drivers: Array<string>;

    /**
     * Always descriptive: findings are ranked by effect size above minimum volumes and
     * are not tested for significance.
     */
    evidence: 'descriptive';

    /**
     * First session date with the new value; new_value only.
     */
    firstSeen: string | null;

    /**
     * new_value: a source / medium, campaign, or term with credited conversions and no
     * sessions in the lookback before the range. mover_up / mover_down: the largest
     * share-adjusted credit changes against the comparison period. model_disagreement:
     * a channel or source / medium credited at least twice as much by last touch as by
     * first touch, or the reverse. went_quiet: a row that had credit in the comparison
     * period and almost none now.
     */
    kind: 'new_value' | 'mover_up' | 'mover_down' | 'model_disagreement' | 'went_quiet';

    /**
     * Credit model of current.
     */
    model: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';

    /**
     * Relative change of the outcome's total credit, so a row's move can be read
     * against the account's.
     */
    outcomeChange: number | null;

    /**
     * Outcome id from the definition the numbers belong to.
     */
    outcomeId: string;

    /**
     * Counted units with a touch on this row in the comparison period; null without
     * one.
     */
    previousSampleUnits: number | null;

    /**
     * The breakdown row the finding is about; matches a preview row by grain, channel,
     * sourceMedium, campaign, and term.
     */
    row: Insight.Row;

    /**
     * Sessions with the new value in the range; new_value only.
     */
    sampleSessions: number | null;

    /**
     * Counted units with a touch on this row in the current period.
     */
    sampleUnits: number;

    /**
     * Ranking score from 0 to 1, weighted by kind.
     */
    score: number;
  }

  export namespace Insight {
    /**
     * The breakdown row the finding is about; matches a preview row by grain, channel,
     * sourceMedium, campaign, and term.
     */
    export interface Row {
      campaign: string | null;

      channel: string;

      grain: 'channel' | 'source_medium' | 'campaign' | 'term';

      sourceMedium: string | null;

      term: string | null;
    }
  }
}

export interface AttributionReportListParams extends CursorParams {
  /**
   * Case-insensitive substring search on attribution report names.
   */
  search?: string;
}

export interface AttributionReportCreateParams {
  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  definition: AttributionReportCreateParams.Definition;

  /**
   * Display name for the saved attribution report.
   */
  name: string;

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  reportContext: AttributionReportCreateParams.ReportContext;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace AttributionReportCreateParams {
  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  export interface Definition {
    kind: 'attribution';

    outcomes: Array<Definition.Outcome>;

    version: 1;

    counting?: 'unique' | 'totals' | 'sessions';

    currency?: 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AUD';

    filter?: Definition.Filter;

    lookbackDays?: 7 | 14 | 30 | 60 | 90;

    model?: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';
  }

  export namespace Definition {
    export interface Outcome {
      id: string;

      eventNames: Array<string>;

      label: string;

      filter?: Outcome.Filter;

      value?: Outcome.Value;
    }

    export namespace Outcome {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }

      export interface Value {
        path: Array<string>;

        property: 'event.properties';

        type?: 'number';
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }
}

export interface AttributionReportUpdateParams {
  /**
   * Current revision from get_attribution_report, list_attribution_reports, or the
   * last write. A stale revision returns 409; reload before retrying.
   */
  expectedRevision: string;

  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  definition?: AttributionReportUpdateParams.Definition;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Display name for the saved attribution report.
   */
  name?: string;

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  reportContext?: AttributionReportUpdateParams.ReportContext;
}

export namespace AttributionReportUpdateParams {
  /**
   * Version 1 attribution definition: one to five conversion outcomes, each with one
   * to ten unique event names, an optional filter, and an optional numeric event
   * property summed as value. Set the credit model (default last_touch), counting
   * unit (default unique), lookback window of 7, 14, 30, 60, or 90 days (default
   * 30), an optional filter applied to every outcome, and the value currency
   * (default USD). Outcome ids identify outcomes in results. Replaces the saved
   * definition on PATCH.
   */
  export interface Definition {
    kind: 'attribution';

    outcomes: Array<Definition.Outcome>;

    version: 1;

    counting?: 'unique' | 'totals' | 'sessions';

    currency?: 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AUD';

    filter?: Definition.Filter;

    lookbackDays?: 7 | 14 | 30 | 60 | 90;

    model?: 'first_touch' | 'last_touch' | 'linear' | 'u_shaped' | 'j_shaped' | 'time_decay';
  }

  export namespace Definition {
    export interface Outcome {
      id: string;

      eventNames: Array<string>;

      label: string;

      filter?: Outcome.Filter;

      value?: Outcome.Value;
    }

    export namespace Outcome {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }

      export interface Value {
        path: Array<string>;

        property: 'event.properties';

        type?: 'number';
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  /**
   * Default UTC date range: a preset or inclusive from/to calendar dates. Replaces
   * the saved context on PATCH. Results cover at most 92 inclusive days.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }
}

export interface AttributionReportDeleteParams {
  /**
   * Current revision from get_attribution_report, list_attribution_reports, or the
   * last write. A stale revision returns 409; reload before retrying.
   */
  expectedRevision: string;
}

export interface AttributionReportDuplicateParams {
  /**
   * Current revision from get_attribution_report, list_attribution_reports, or the
   * last write. A stale revision returns 409; reload before retrying.
   */
  expectedRevision: string;
}

export interface AttributionReportPreviewParams {
  /**
   * Required input: definition, from, and to; comparison and interval are optional.
   * JSON-encode this object in the REST query string; maximum 16384 bytes before URL
   * encoding. Computing a result never saves or changes a report.
   */
  input: string;
}

export interface AttributionReportVisitorsParams {
  /**
   * Required input: the same definition, from, to, and optional comparison and
   * interval that produced the result, plus the selection to open; limit and cursor
   * are optional. JSON-encode this object in the REST query string; maximum 16384
   * bytes before URL encoding.
   */
  input: string;
}

export interface AttributionReportInsightsParams {
  /**
   * Required input: definition, from, and to; comparison and interval are optional.
   * Use the same input as the preview to explain what moved in that result.
   * JSON-encode this object in the REST query string; maximum 16384 bytes before URL
   * encoding. Nothing is saved.
   */
  input: string;
}

export declare namespace AttributionReports {
  export {
    type AttributionReportListResponse as AttributionReportListResponse,
    type AttributionReportCreateResponse as AttributionReportCreateResponse,
    type AttributionReportRetrieveResponse as AttributionReportRetrieveResponse,
    type AttributionReportUpdateResponse as AttributionReportUpdateResponse,
    type AttributionReportDeleteResponse as AttributionReportDeleteResponse,
    type AttributionReportDuplicateResponse as AttributionReportDuplicateResponse,
    type AttributionReportPreviewResponse as AttributionReportPreviewResponse,
    type AttributionReportVisitorsResponse as AttributionReportVisitorsResponse,
    type AttributionReportInsightsResponse as AttributionReportInsightsResponse,
    type AttributionReportListResponsesCursor as AttributionReportListResponsesCursor,
    type AttributionReportListParams as AttributionReportListParams,
    type AttributionReportCreateParams as AttributionReportCreateParams,
    type AttributionReportUpdateParams as AttributionReportUpdateParams,
    type AttributionReportDeleteParams as AttributionReportDeleteParams,
    type AttributionReportDuplicateParams as AttributionReportDuplicateParams,
    type AttributionReportPreviewParams as AttributionReportPreviewParams,
    type AttributionReportVisitorsParams as AttributionReportVisitorsParams,
    type AttributionReportInsightsParams as AttributionReportInsightsParams,
  };
}
