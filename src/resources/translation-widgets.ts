// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TranslationWidgets extends APIResource {
  /**
   * List every translation widget configured on the account, including the domains
   * it runs on, its appearance settings, and the languages it offers. Not paginated
   * — widgets are capped by the account's translation widget limit. Requires scope:
   * translationWidget:list
   *
   * @example
   * ```ts
   * const translationWidgets =
   *   await client.translationWidgets.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<TranslationWidgetListResponse> {
    return this._client.get('/rest/v1/translation-widgets', options);
  }

  /**
   * Create a translation widget. Every field is optional — anything omitted comes
   * back as `null` and the widget falls back to its built-in appearance, and
   * omitting `enabledLanguages` offers every supported language. Returns the full
   * widget, including its id, so it can be installed without a follow-up request.
   * Requires scope: translationWidget:create
   *
   * @example
   * ```ts
   * const translationWidget =
   *   await client.translationWidgets.create();
   * ```
   */
  create(
    body: TranslationWidgetCreateParams,
    options?: RequestOptions,
  ): APIPromise<TranslationWidgetCreateResponse> {
    return this._client.post('/rest/v1/translation-widgets', { body, ...options });
  }

  /**
   * Fetch one translation widget by its id. Returns 404 when it does not exist.
   * Requires scope: translationWidget:find
   *
   * @example
   * ```ts
   * const translationWidget =
   *   await client.translationWidgets.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<TranslationWidgetRetrieveResponse> {
    return this._client.get(path`/rest/v1/translation-widgets/${id}`, options);
  }

  /**
   * Return usage totals and language, host, and page breakdowns for one translation
   * widget over the requested date range. Requires scope:
   * report:translation-analytics
   *
   * @example
   * ```ts
   * const response = await client.translationWidgets.analytics(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { from: '2019-12-27', to: '2019-12-27' },
   * );
   * ```
   */
  analytics(
    id: string,
    query: TranslationWidgetAnalyticsParams,
    options?: RequestOptions,
  ): APIPromise<TranslationWidgetAnalyticsResponse> {
    return this._client.get(path`/rest/v1/translation-widgets/${id}/analytics`, { query, ...options });
  }
}

export interface TranslationWidgetListResponse {
  /**
   * Every translation widget on the account. Not paginated — widgets are capped by
   * the account's translation widget limit, so the full set always fits in one
   * response.
   */
  entities: Array<TranslationWidgetListResponse.Entity>;
}

export namespace TranslationWidgetListResponse {
  export interface Entity {
    /**
     * Unique identifier for the translation widget.
     */
    id: string;

    /**
     * ISO-8601 timestamp when the widget was created.
     */
    createdAt: string;

    /**
     * Accent colour for the widget button and modal, as a hex value — `#RGB`,
     * `#RRGGBB`, or `#RRGGBBAA`.
     */
    brandColor?: string | null;

    /**
     * Custom domain used to serve the widget script (e.g. `translate.example.com`).
     * Leave null to use the default Ours Privacy domain. Send the bare host — no
     * scheme, port, or path.
     */
    customDomain?: string | null;

    /**
     * Languages offered in the widget, as ISO codes such as `en`, `es`, `fr`, `zh-TW`.
     * Omit or send an empty array to offer every supported language. An unrecognised
     * code is rejected with 400 rather than silently ignored.
     */
    enabledLanguages?: Array<string> | null;

    /**
     * Layout of the language-selection modal: `standard` list, `grid` of languages, or
     * a `dropdown`.
     */
    modalVariant?: 'standard' | 'grid' | 'dropdown' | null;

    /**
     * Terms the widget keeps in their original form in every language — brand names,
     * product names, and the like. Up to 500 terms of 200 characters each; duplicates
     * and purely numeric terms are dropped.
     */
    noTranslateTerms?: Array<string> | null;

    /**
     * Corner of the viewport the widget button is anchored to.
     */
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | null;

    /**
     * Colour scheme the widget renders in.
     */
    theme?: 'light' | 'dark' | null;

    /**
     * ISO-8601 timestamp of the most recent change. Matches `createdAt` on a widget
     * that has never been edited.
     */
    updatedAt?: string | null;

    /**
     * Domains where this widget is allowed to run. The widget refuses to load anywhere
     * else, so a missing host means the widget never appears. Send bare hosts — no
     * scheme, port, or path.
     */
    whitelistedDomains?: Array<string> | null;

    /**
     * Visual style of the widget button: `compact` for an icon-sized button,
     * `extended` for a labelled button, `minimal` for the least intrusive treatment.
     */
    widgetVariant?: 'compact' | 'extended' | 'minimal' | null;
  }
}

export interface TranslationWidgetCreateResponse {
  /**
   * Unique identifier for the translation widget.
   */
  id: string;

  /**
   * ISO-8601 timestamp when the widget was created.
   */
  createdAt: string;

  /**
   * Accent colour for the widget button and modal, as a hex value — `#RGB`,
   * `#RRGGBB`, or `#RRGGBBAA`.
   */
  brandColor?: string | null;

  /**
   * Custom domain used to serve the widget script (e.g. `translate.example.com`).
   * Leave null to use the default Ours Privacy domain. Send the bare host — no
   * scheme, port, or path.
   */
  customDomain?: string | null;

  /**
   * Languages offered in the widget, as ISO codes such as `en`, `es`, `fr`, `zh-TW`.
   * Omit or send an empty array to offer every supported language. An unrecognised
   * code is rejected with 400 rather than silently ignored.
   */
  enabledLanguages?: Array<string> | null;

  /**
   * Layout of the language-selection modal: `standard` list, `grid` of languages, or
   * a `dropdown`.
   */
  modalVariant?: 'standard' | 'grid' | 'dropdown' | null;

  /**
   * Terms the widget keeps in their original form in every language — brand names,
   * product names, and the like. Up to 500 terms of 200 characters each; duplicates
   * and purely numeric terms are dropped.
   */
  noTranslateTerms?: Array<string> | null;

  /**
   * Corner of the viewport the widget button is anchored to.
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | null;

  /**
   * Colour scheme the widget renders in.
   */
  theme?: 'light' | 'dark' | null;

  /**
   * ISO-8601 timestamp of the most recent change. Matches `createdAt` on a widget
   * that has never been edited.
   */
  updatedAt?: string | null;

  /**
   * Domains where this widget is allowed to run. The widget refuses to load anywhere
   * else, so a missing host means the widget never appears. Send bare hosts — no
   * scheme, port, or path.
   */
  whitelistedDomains?: Array<string> | null;

  /**
   * Visual style of the widget button: `compact` for an icon-sized button,
   * `extended` for a labelled button, `minimal` for the least intrusive treatment.
   */
  widgetVariant?: 'compact' | 'extended' | 'minimal' | null;
}

export interface TranslationWidgetRetrieveResponse {
  /**
   * Unique identifier for the translation widget.
   */
  id: string;

  /**
   * ISO-8601 timestamp when the widget was created.
   */
  createdAt: string;

  /**
   * Accent colour for the widget button and modal, as a hex value — `#RGB`,
   * `#RRGGBB`, or `#RRGGBBAA`.
   */
  brandColor?: string | null;

  /**
   * Custom domain used to serve the widget script (e.g. `translate.example.com`).
   * Leave null to use the default Ours Privacy domain. Send the bare host — no
   * scheme, port, or path.
   */
  customDomain?: string | null;

  /**
   * Languages offered in the widget, as ISO codes such as `en`, `es`, `fr`, `zh-TW`.
   * Omit or send an empty array to offer every supported language. An unrecognised
   * code is rejected with 400 rather than silently ignored.
   */
  enabledLanguages?: Array<string> | null;

  /**
   * Layout of the language-selection modal: `standard` list, `grid` of languages, or
   * a `dropdown`.
   */
  modalVariant?: 'standard' | 'grid' | 'dropdown' | null;

  /**
   * Terms the widget keeps in their original form in every language — brand names,
   * product names, and the like. Up to 500 terms of 200 characters each; duplicates
   * and purely numeric terms are dropped.
   */
  noTranslateTerms?: Array<string> | null;

  /**
   * Corner of the viewport the widget button is anchored to.
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | null;

  /**
   * Colour scheme the widget renders in.
   */
  theme?: 'light' | 'dark' | null;

  /**
   * ISO-8601 timestamp of the most recent change. Matches `createdAt` on a widget
   * that has never been edited.
   */
  updatedAt?: string | null;

  /**
   * Domains where this widget is allowed to run. The widget refuses to load anywhere
   * else, so a missing host means the widget never appears. Send bare hosts — no
   * scheme, port, or path.
   */
  whitelistedDomains?: Array<string> | null;

  /**
   * Visual style of the widget button: `compact` for an icon-sized button,
   * `extended` for a labelled button, `minimal` for the least intrusive treatment.
   */
  widgetVariant?: 'compact' | 'extended' | 'minimal' | null;
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

export interface TranslationWidgetCreateParams {
  /**
   * Accent colour for the widget button and modal, as a hex value — `#RGB`,
   * `#RRGGBB`, or `#RRGGBBAA`.
   */
  brandColor?: string | null;

  /**
   * Custom domain used to serve the widget script (e.g. `translate.example.com`).
   * Leave null to use the default Ours Privacy domain. Send the bare host — no
   * scheme, port, or path.
   */
  customDomain?: string | null;

  /**
   * Languages offered in the widget, as ISO codes such as `en`, `es`, `fr`, `zh-TW`.
   * Omit or send an empty array to offer every supported language. An unrecognised
   * code is rejected with 400 rather than silently ignored.
   */
  enabledLanguages?: Array<
    | 'af'
    | 'sq'
    | 'am'
    | 'ar'
    | 'hy'
    | 'az'
    | 'bn'
    | 'bs'
    | 'bg'
    | 'ca'
    | 'zh'
    | 'zh-TW'
    | 'hr'
    | 'cs'
    | 'da'
    | 'fa-AF'
    | 'nl'
    | 'en'
    | 'et'
    | 'fa'
    | 'tl'
    | 'fi'
    | 'fr'
    | 'fr-CA'
    | 'ka'
    | 'de'
    | 'el'
    | 'gu'
    | 'ht'
    | 'ha'
    | 'he'
    | 'hi'
    | 'hu'
    | 'is'
    | 'id'
    | 'ga'
    | 'it'
    | 'ja'
    | 'kn'
    | 'kk'
    | 'ko'
    | 'lv'
    | 'lt'
    | 'mk'
    | 'ms'
    | 'ml'
    | 'mt'
    | 'mr'
    | 'mn'
    | 'no'
    | 'ps'
    | 'pl'
    | 'pt'
    | 'pt-PT'
    | 'pa'
    | 'ro'
    | 'ru'
    | 'sr'
    | 'si'
    | 'sk'
    | 'sl'
    | 'so'
    | 'es'
    | 'es-MX'
    | 'sw'
    | 'sv'
    | 'ta'
    | 'te'
    | 'th'
    | 'tr'
    | 'uk'
    | 'ur'
    | 'uz'
    | 'vi'
    | 'cy'
  > | null;

  /**
   * Layout of the language-selection modal: `standard` list, `grid` of languages, or
   * a `dropdown`.
   */
  modalVariant?: 'standard' | 'grid' | 'dropdown';

  /**
   * Terms the widget keeps in their original form in every language — brand names,
   * product names, and the like. Up to 500 terms of 200 characters each; duplicates
   * and purely numeric terms are dropped.
   */
  noTranslateTerms?: Array<string> | null;

  /**
   * Corner of the viewport the widget button is anchored to.
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

  /**
   * Colour scheme the widget renders in.
   */
  theme?: 'light' | 'dark';

  /**
   * Domains where this widget is allowed to run. The widget refuses to load anywhere
   * else, so a missing host means the widget never appears. Send bare hosts — no
   * scheme, port, or path.
   */
  whitelistedDomains?: Array<string> | null;

  /**
   * Visual style of the widget button: `compact` for an icon-sized button,
   * `extended` for a labelled button, `minimal` for the least intrusive treatment.
   */
  widgetVariant?: 'compact' | 'extended' | 'minimal';
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
    type TranslationWidgetListResponse as TranslationWidgetListResponse,
    type TranslationWidgetCreateResponse as TranslationWidgetCreateResponse,
    type TranslationWidgetRetrieveResponse as TranslationWidgetRetrieveResponse,
    type TranslationWidgetAnalyticsResponse as TranslationWidgetAnalyticsResponse,
    type TranslationWidgetCreateParams as TranslationWidgetCreateParams,
    type TranslationWidgetAnalyticsParams as TranslationWidgetAnalyticsParams,
  };
}
