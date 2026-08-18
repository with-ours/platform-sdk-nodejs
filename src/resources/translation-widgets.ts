// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TranslationWidgets extends APIResource {
  /**
   * Return usage totals and language, host, and page breakdowns for one
   * translation widget over the requested date range. Requires scope:
   * report:translation-analytics
   */
  analytics(
    id: string,
    query: TranslationWidgetAnalyticsParams,
    options?: RequestOptions,
  ): APIPromise<TranslationWidgetAnalyticsResponse> {
    return this._client.get(path`/rest/v1/translation-widgets/${id}/analytics`, { query, ...options });
  }
}

export interface TranslationWidgetAnalyticsResponse {
  byHost: Array<TranslationWidgetAnalyticsResponse.ByHost>;

  byLanguage: Array<TranslationWidgetAnalyticsResponse.ByLanguage>;

  languagesUsed: number;

  topPages: Array<TranslationWidgetAnalyticsResponse.TopPage>;

  totalTranslations: number;

  uniqueUsers: number;
}

export namespace TranslationWidgetAnalyticsResponse {
  export interface ByHost {
    host: string;

    translations: number;

    uniqueUsers: number;
  }

  export interface ByLanguage {
    languageCode: string;

    translations: number;

    uniqueUsers: number;
  }

  export interface TopPage {
    byLanguage: Array<TopPage.ByLanguage>;

    translations: number;

    uniqueUsers: number;

    url: string;
  }

  export namespace TopPage {
    export interface ByLanguage {
      languageCode: string;

      translations: number;

      uniqueUsers: number;
    }
  }
}

export interface TranslationWidgetAnalyticsParams {
  /**
   * Inclusive lower bound of the analytics window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window as `YYYY-MM-DD`.
   */
  to: string;

  /**
   * Maximum rows to return for each breakdown. Defaults to 50.
   */
  limit?: number;
}

export declare namespace TranslationWidgets {
  export {
    type TranslationWidgetAnalyticsResponse as TranslationWidgetAnalyticsResponse,
    type TranslationWidgetAnalyticsParams as TranslationWidgetAnalyticsParams,
  };
}
