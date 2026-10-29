// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Insights extends APIResource {
  /**
   * List saved Insights, most recently updated first. Supports cursor pagination and
   * case-insensitive name/description search. Preserve unavailableCount and warnings
   * when presenting partial lists. Requires API-key scope or current OAuth user
   * permission: web-analytics:view, variables:find-custom
   */
  list(
    query: InsightListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InsightListResponsesCursor, InsightListResponse> {
    return this._client.getAPIList('/rest/v1/insights', Cursor<InsightListResponse>, { query, ...options });
  }

  /**
   * Save an Insight report. Use GET /rest/v1/insights/capabilities to discover
   * supported features and GET /rest/v1/insights/{id}/result to compute results.
   * Requires API-key scope or current OAuth user permission: web-analytics:write,
   * variables:find-custom
   */
  create(body: InsightCreateParams, options?: RequestOptions): APIPromise<InsightCreateResponse> {
    return this._client.post('/rest/v1/insights', { body, ...options });
  }

  /**
   * Get a saved Insight by id, including its revision, metric definition, date
   * range, and chart settings. Requires API-key scope or current OAuth user
   * permission: web-analytics:view, variables:find-custom
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<InsightRetrieveResponse> {
    return this._client.get(path`/rest/v1/insights/${id}`, options);
  }

  /**
   * Update a saved Insight using expectedRevision. Omitted top-level fields remain
   * unchanged; supplied definition, reportContext, and view replace the entire
   * nested value. Null clears the description. Requires API-key scope or current
   * OAuth user permission: web-analytics:write, variables:find-custom
   */
  update(id: string, body: InsightUpdateParams, options?: RequestOptions): APIPromise<InsightUpdateResponse> {
    return this._client.patch(path`/rest/v1/insights/${id}`, { body, ...options });
  }

  /**
   * Delete a saved Insight using expectedRevision. Reload the report before retrying
   * a revision conflict. Requires API-key scope or current OAuth user permission:
   * web-analytics:write, variables:find-custom
   */
  delete(
    id: string,
    params: InsightDeleteParams,
    options?: RequestOptions,
  ): APIPromise<InsightDeleteResponse> {
    const { expectedRevision } = params;
    return this._client.delete(path`/rest/v1/insights/${id}`, { query: { expectedRevision }, ...options });
  }

  /**
   * Discover supported Insight metrics, intervals, date presets, visualizations,
   * comparisons, and limits before creating a report. Requires API-key scope or
   * current OAuth user permission: web-analytics:view, variables:find-custom
   */
  capabilities(options?: RequestOptions): APIPromise<InsightCapabilitiesResponse> {
    return this._client.get('/rest/v1/insights/capabilities', options);
  }

  /**
   * Compute a saved Insight using expectedRevision with optional date, smoothing,
   * cumulative, and comparison overrides. Overrides do not change the saved report.
   * Requires API-key scope or current OAuth user permission: web-analytics:view,
   * variables:find-custom
   */
  results(
    id: string,
    query: InsightResultsParams,
    options?: RequestOptions,
  ): APIPromise<InsightResultsResponse> {
    return this._client.get(path`/rest/v1/insights/${id}/result`, { query, ...options });
  }

  /**
   * Compute an unsaved Insight preview from its metric definition and date range.
   * JSON-encode input in the query string; maximum 16384 bytes before URL encoding.
   * Requires API-key scope or current OAuth user permission: web-analytics:view,
   * variables:find-custom
   */
  preview(query: InsightPreviewParams, options?: RequestOptions): APIPromise<InsightPreviewResponse> {
    return this._client.get('/rest/v1/insights/preview', { query, ...options });
  }
}

export type InsightListResponsesCursor = Cursor<InsightListResponse>;

export interface InsightListResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  definition: InsightListResponse.Definition;

  /**
   * Display name for the saved Insight.
   */
  name: string;

  /**
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
   */
  reportContext: InsightListResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  view: InsightListResponse.View;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace InsightListResponse {
  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  export interface Definition {
    interval: 'day' | 'week' | 'month';

    kind: 'insight';

    metrics: Array<Definition.Metric>;

    version: 1;

    filter?: Definition.Filter;
  }

  export namespace Definition {
    export interface Metric {
      id: string;

      aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

      eventNames: Array<string>;

      name: string;

      filter?: Metric.Filter;

      property?: Metric.Property;
    }

    export namespace Metric {
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

      export interface Property {
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
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
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

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  export interface View {
    cumulative?: boolean;

    series?: Array<View.Series>;

    smoothing?: 'none' | 'rolling_average';

    smoothingWindow?: number;

    stacked?: boolean;

    tableSort?: View.TableSort;

    visualization?: 'line' | 'column' | 'bar' | 'pie' | 'table' | 'metric';

    yAxisScale?: 'linear' | 'log';
  }

  export namespace View {
    export interface Series {
      metricId: string;

      color?: string;

      hidden?: boolean;
    }

    export interface TableSort {
      column: 'label' | 'range_value' | 'average';

      direction: 'asc' | 'desc';
    }
  }
}

export interface InsightCreateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  definition: InsightCreateResponse.Definition;

  /**
   * Display name for the saved Insight.
   */
  name: string;

  /**
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
   */
  reportContext: InsightCreateResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  view: InsightCreateResponse.View;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace InsightCreateResponse {
  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  export interface Definition {
    interval: 'day' | 'week' | 'month';

    kind: 'insight';

    metrics: Array<Definition.Metric>;

    version: 1;

    filter?: Definition.Filter;
  }

  export namespace Definition {
    export interface Metric {
      id: string;

      aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

      eventNames: Array<string>;

      name: string;

      filter?: Metric.Filter;

      property?: Metric.Property;
    }

    export namespace Metric {
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

      export interface Property {
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
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
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

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  export interface View {
    cumulative?: boolean;

    series?: Array<View.Series>;

    smoothing?: 'none' | 'rolling_average';

    smoothingWindow?: number;

    stacked?: boolean;

    tableSort?: View.TableSort;

    visualization?: 'line' | 'column' | 'bar' | 'pie' | 'table' | 'metric';

    yAxisScale?: 'linear' | 'log';
  }

  export namespace View {
    export interface Series {
      metricId: string;

      color?: string;

      hidden?: boolean;
    }

    export interface TableSort {
      column: 'label' | 'range_value' | 'average';

      direction: 'asc' | 'desc';
    }
  }
}

export interface InsightRetrieveResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  definition: InsightRetrieveResponse.Definition;

  /**
   * Display name for the saved Insight.
   */
  name: string;

  /**
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
   */
  reportContext: InsightRetrieveResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  view: InsightRetrieveResponse.View;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace InsightRetrieveResponse {
  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  export interface Definition {
    interval: 'day' | 'week' | 'month';

    kind: 'insight';

    metrics: Array<Definition.Metric>;

    version: 1;

    filter?: Definition.Filter;
  }

  export namespace Definition {
    export interface Metric {
      id: string;

      aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

      eventNames: Array<string>;

      name: string;

      filter?: Metric.Filter;

      property?: Metric.Property;
    }

    export namespace Metric {
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

      export interface Property {
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
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
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

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  export interface View {
    cumulative?: boolean;

    series?: Array<View.Series>;

    smoothing?: 'none' | 'rolling_average';

    smoothingWindow?: number;

    stacked?: boolean;

    tableSort?: View.TableSort;

    visualization?: 'line' | 'column' | 'bar' | 'pie' | 'table' | 'metric';

    yAxisScale?: 'linear' | 'log';
  }

  export namespace View {
    export interface Series {
      metricId: string;

      color?: string;

      hidden?: boolean;
    }

    export interface TableSort {
      column: 'label' | 'range_value' | 'average';

      direction: 'asc' | 'desc';
    }
  }
}

export interface InsightUpdateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  definition: InsightUpdateResponse.Definition;

  /**
   * Display name for the saved Insight.
   */
  name: string;

  /**
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
   */
  reportContext: InsightUpdateResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  view: InsightUpdateResponse.View;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace InsightUpdateResponse {
  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  export interface Definition {
    interval: 'day' | 'week' | 'month';

    kind: 'insight';

    metrics: Array<Definition.Metric>;

    version: 1;

    filter?: Definition.Filter;
  }

  export namespace Definition {
    export interface Metric {
      id: string;

      aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

      eventNames: Array<string>;

      name: string;

      filter?: Metric.Filter;

      property?: Metric.Property;
    }

    export namespace Metric {
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

      export interface Property {
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
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
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

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  export interface View {
    cumulative?: boolean;

    series?: Array<View.Series>;

    smoothing?: 'none' | 'rolling_average';

    smoothingWindow?: number;

    stacked?: boolean;

    tableSort?: View.TableSort;

    visualization?: 'line' | 'column' | 'bar' | 'pie' | 'table' | 'metric';

    yAxisScale?: 'linear' | 'log';
  }

  export namespace View {
    export interface Series {
      metricId: string;

      color?: string;

      hidden?: boolean;
    }

    export interface TableSort {
      column: 'label' | 'range_value' | 'average';

      direction: 'asc' | 'desc';
    }
  }
}

export interface InsightDeleteResponse {
  id: string;

  deleted: true;

  deletedRevision: string;
}

export interface InsightCapabilitiesResponse {
  definitionVersion: 1;

  maxDateRangeDays: 366;

  maxEventNamesPerMetric: 10;

  maxMetrics: 10;

  maxSmoothingWindow: 30;

  minSmoothingWindow: 2;

  supportedAggregations: Array<'event_count' | 'unique_visitors' | 'sum' | 'average'>;

  supportedAxisScales: Array<'linear' | 'log'>;

  supportedComparisons: Array<'previous_period' | 'previous_year' | 'custom'>;

  supportedCumulativeAggregations: Array<'event_count' | 'unique_visitors' | 'sum' | 'average'>;

  supportedDatePresets: Array<
    | 'today'
    | 'yesterday'
    | 'last_7_days'
    | 'last_30_days'
    | 'last_90_days'
    | 'last_12_months'
    | 'week_to_date'
    | 'month_to_date'
    | 'year_to_date'
  >;

  supportedIntervals: Array<'day' | 'week' | 'month'>;

  supportedSmoothing: Array<'none' | 'rolling_average'>;

  supportedVisualizations: Array<'line' | 'column' | 'bar' | 'pie' | 'table' | 'metric'>;

  supportsBreakdowns: false;

  supportsComparisons: true;

  supportsMetricFilter: true;

  supportsNonUtcTimeZones: false;

  supportsNumericProperty: true;

  supportsReportFilter: true;
}

export interface InsightResultsResponse {
  engine: 'clickhouse';

  /**
   * Saved report identifier; null for previews.
   */
  reportId: string | null;

  /**
   * Saved report revision; null for previews.
   */
  revision: string | null;

  scope: InsightResultsResponse.Scope;

  semanticVersion: 1;

  series: Array<InsightResultsResponse.Series>;

  sourceLimitations: Array<string>;

  sourcePolicy: string;

  sourceRevision?: string | null;
}

export namespace InsightResultsResponse {
  export interface Scope {
    cumulative: boolean;

    executedAt: string;

    from: string;

    interval: 'day' | 'week' | 'month';

    sourceCompleteness: 'unknown';

    timeZone: 'UTC';

    to: string;

    comparison?: Scope.Comparison | null;
  }

  export namespace Scope {
    export interface Comparison {
      from: string;

      kind: 'previous_period' | 'previous_year' | 'custom';

      to: string;
    }
  }

  export interface Series {
    aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

    breakdownValues: Array<Series.BreakdownValue>;

    comparison: 'previous_period' | 'previous_year' | 'custom' | null;

    key: string;

    label: string;

    metricId: string;

    points: Array<Series.Point>;

    rangeValue: number | null;
  }

  export namespace Series {
    export interface BreakdownValue {
      property: string;

      value: string | null;
    }

    export interface Point {
      bucketEnd: string;

      bucketStart: string;

      cumulative: number | null;

      isPartial: boolean;

      raw: number | null;

      smoothed: number | null;
    }
  }
}

export interface InsightPreviewResponse {
  engine: 'clickhouse';

  /**
   * Saved report identifier; null for previews.
   */
  reportId: string | null;

  /**
   * Saved report revision; null for previews.
   */
  revision: string | null;

  scope: InsightPreviewResponse.Scope;

  semanticVersion: 1;

  series: Array<InsightPreviewResponse.Series>;

  sourceLimitations: Array<string>;

  sourcePolicy: string;

  sourceRevision?: string | null;
}

export namespace InsightPreviewResponse {
  export interface Scope {
    cumulative: boolean;

    executedAt: string;

    from: string;

    interval: 'day' | 'week' | 'month';

    sourceCompleteness: 'unknown';

    timeZone: 'UTC';

    to: string;

    comparison?: Scope.Comparison | null;
  }

  export namespace Scope {
    export interface Comparison {
      from: string;

      kind: 'previous_period' | 'previous_year' | 'custom';

      to: string;
    }
  }

  export interface Series {
    aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

    breakdownValues: Array<Series.BreakdownValue>;

    comparison: 'previous_period' | 'previous_year' | 'custom' | null;

    key: string;

    label: string;

    metricId: string;

    points: Array<Series.Point>;

    rangeValue: number | null;
  }

  export namespace Series {
    export interface BreakdownValue {
      property: string;

      value: string | null;
    }

    export interface Point {
      bucketEnd: string;

      bucketStart: string;

      cumulative: number | null;

      isPartial: boolean;

      raw: number | null;

      smoothed: number | null;
    }
  }
}

export interface InsightListParams extends CursorParams {
  /**
   * Case-insensitive search in the name and description.
   */
  search?: string;
}

export interface InsightCreateParams {
  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  definition: InsightCreateParams.Definition;

  /**
   * Display name for the saved Insight.
   */
  name: string;

  /**
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
   */
  reportContext: InsightCreateParams.ReportContext;

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  view: InsightCreateParams.View;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;
}

export namespace InsightCreateParams {
  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  export interface Definition {
    interval: 'day' | 'week' | 'month';

    kind: 'insight';

    metrics: Array<Definition.Metric>;

    version: 1;

    filter?: Definition.Filter;
  }

  export namespace Definition {
    export interface Metric {
      id: string;

      aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

      eventNames: Array<string>;

      name: string;

      filter?: Metric.Filter;

      property?: Metric.Property;
    }

    export namespace Metric {
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

      export interface Property {
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
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
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

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  export interface View {
    cumulative?: boolean;

    series?: Array<View.Series>;

    smoothing?: 'none' | 'rolling_average';

    smoothingWindow?: number;

    stacked?: boolean;

    tableSort?: View.TableSort;

    visualization?: 'line' | 'column' | 'bar' | 'pie' | 'table' | 'metric';

    yAxisScale?: 'linear' | 'log';
  }

  export namespace View {
    export interface Series {
      metricId: string;

      color?: string;

      hidden?: boolean;
    }

    export interface TableSort {
      column: 'label' | 'range_value' | 'average';

      direction: 'asc' | 'desc';
    }
  }
}

export interface InsightUpdateParams {
  /**
   * Revision returned by get/list or the last write. A stale revision returns 409;
   * reload before retrying.
   */
  expectedRevision: string;

  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  definition?: InsightUpdateParams.Definition;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Display name for the saved Insight.
   */
  name?: string;

  /**
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
   */
  reportContext?: InsightUpdateParams.ReportContext;

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  view?: InsightUpdateParams.View;
}

export namespace InsightUpdateParams {
  /**
   * Version 1 Insight definition: one to ten metrics and a day, week, or month
   * interval. Sum and average require a numeric event property. Filters use the
   * analytics property catalog.
   */
  export interface Definition {
    interval: 'day' | 'week' | 'month';

    kind: 'insight';

    metrics: Array<Definition.Metric>;

    version: 1;

    filter?: Definition.Filter;
  }

  export namespace Definition {
    export interface Metric {
      id: string;

      aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

      eventNames: Array<string>;

      name: string;

      filter?: Metric.Filter;

      property?: Metric.Property;
    }

    export namespace Metric {
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

      export interface Property {
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
   * UTC date range using either a preset or inclusive from/to calendar dates, up to
   * 366 days.
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

  /**
   * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
   * view fields reset to their defaults.
   */
  export interface View {
    cumulative?: boolean;

    series?: Array<View.Series>;

    smoothing?: 'none' | 'rolling_average';

    smoothingWindow?: number;

    stacked?: boolean;

    tableSort?: View.TableSort;

    visualization?: 'line' | 'column' | 'bar' | 'pie' | 'table' | 'metric';

    yAxisScale?: 'linear' | 'log';
  }

  export namespace View {
    export interface Series {
      metricId: string;

      color?: string;

      hidden?: boolean;
    }

    export interface TableSort {
      column: 'label' | 'range_value' | 'average';

      direction: 'asc' | 'desc';
    }
  }
}

export interface InsightDeleteParams {
  /**
   * Revision returned by get/list or the last write. A stale revision returns 409;
   * reload before retrying.
   */
  expectedRevision: string;
}

export interface InsightResultsParams {
  /**
   * Revision returned by get/list or the last write. A stale revision returns 409;
   * reload before retrying.
   */
  expectedRevision: string;

  /**
   * Compare with the previous period, previous year, or a custom starting date.
   * JSON-encoded in the REST query string; never saved.
   */
  comparison?: string;

  /**
   * Omit or send null to use the saved cumulative setting; true or false overrides
   * it for this query.
   */
  cumulativeOverride?: boolean | null;

  /**
   * Complete date range override for this query. JSON-encoded in the REST query
   * string; does not change the saved report.
   */
  reportContextOverride?: string;

  /**
   * Omit to use saved smoothing, send null to disable it, or supply a window of 2–30
   * buckets.
   */
  smoothingWindowOverride?: number | null;
}

export interface InsightPreviewParams {
  /**
   * Object with required definition and reportContext, plus optional
   * smoothingWindow, cumulative, and comparison. Chart view settings belong to saved
   * reports. JSON-encode input in the REST query string; maximum 16384 bytes.
   */
  input: string;
}

export declare namespace Insights {
  export {
    type InsightListResponse as InsightListResponse,
    type InsightCreateResponse as InsightCreateResponse,
    type InsightRetrieveResponse as InsightRetrieveResponse,
    type InsightUpdateResponse as InsightUpdateResponse,
    type InsightDeleteResponse as InsightDeleteResponse,
    type InsightCapabilitiesResponse as InsightCapabilitiesResponse,
    type InsightResultsResponse as InsightResultsResponse,
    type InsightPreviewResponse as InsightPreviewResponse,
    type InsightListResponsesCursor as InsightListResponsesCursor,
    type InsightListParams as InsightListParams,
    type InsightCreateParams as InsightCreateParams,
    type InsightUpdateParams as InsightUpdateParams,
    type InsightDeleteParams as InsightDeleteParams,
    type InsightResultsParams as InsightResultsParams,
    type InsightPreviewParams as InsightPreviewParams,
  };
}
