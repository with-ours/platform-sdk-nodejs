// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ConsentSettings extends APIResource {
  /**
   * List all consent settings. Requires API-key scope or current OAuth user
   * permission: consentSettings:list
   */
  list(options?: RequestOptions): APIPromise<ConsentSettingListResponse> {
    return this._client.get('/rest/v1/consent-settings', options);
  }

  /**
   * Create a new consent setting. POST takes no request body. The new draft is
   * Disabled with no allowed domains, an opt-out default rule, English translations,
   * necessary/analytics/advertising categories, and no regions. Configure it with
   * PATCH or PUT before enabling it. Returns the same fields as GET, including its
   * `id`, default rule, and categories. Requires API-key scope or current OAuth user
   * permission: consentSettings:create
   */
  create(options?: RequestOptions): APIPromise<ConsentSettingCreateResponse> {
    return this._client.post('/rest/v1/consent-settings', options);
  }

  /**
   * Find a single consent setting by ID. Requires API-key scope or current OAuth
   * user permission: consentSettings:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ConsentSettingRetrieveResponse | null> {
    return this._client.get(path`/rest/v1/consent-settings/${id}`, options);
  }

  /**
   * Update a consent setting with all required fields. Omitted optional top-level
   * fields retain their saved values; the required default rule and lists are
   * replaced by supplied values. Send null or [] to clear an optional field when
   * allowed. Enabled requires at least one allowed domain in this request. Omitting
   * or clearing `whitelistDomains` with null or [] while Enabled returns an HTTP 400
   * validation error. Disabled settings may have no allowed domains. Use PATCH for
   * partial updates. Requires API-key scope or current OAuth user permission:
   * consentSettings:update
   */
  replace(
    id: string,
    body: ConsentSettingReplaceParams,
    options?: RequestOptions,
  ): APIPromise<ConsentSettingReplaceResponse> {
    return this._client.put(path`/rest/v1/consent-settings/${id}`, { body, ...options });
  }

  /**
   * Partially update a consent setting. Omitted fields keep their saved values.
   * List-valued fields (services, categories, regions) are replaced in full when
   * sent. Omitting `whitelistDomains` preserves saved domains; sending it replaces
   * the list. Clear allowed domains with null or [] only when the resulting status
   * is Disabled. Enabled requires at least one allowed domain, either already saved
   * or sent with this request. Invalid combinations return HTTP 400 validation
   * errors. Requires API-key scope or current OAuth user permission:
   * consentSettings:update
   */
  update(
    id: string,
    body: ConsentSettingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ConsentSettingUpdateResponse> {
    return this._client.patch(path`/rest/v1/consent-settings/${id}`, { body, ...options });
  }

  /**
   * Delete a consent setting. Requires API-key scope or current OAuth user
   * permission: consentSettings:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<ConsentSettingDeleteResponse> {
    return this._client.delete(path`/rest/v1/consent-settings/${id}`, options);
  }

  /**
   * Time-series consent analytics for a single consent settings record: banner
   * views, opt-ins, opt-outs, close-icon clicks, and derived opt-in/out rates per
   * UTC hour, day, Monday-based week, or calendar month. The window is zero-filled
   * so callers get a contiguous series, and rates are person-level
   * (`COUNT(DISTINCT visitor_id)`). Use the JSON-encoded shared analytics `filter`
   * to scope events by source, page, visitor, or session properties; use
   * `compareWithPreviousPeriod=true` to also receive the matching prior window.
   * Included days: at most 180 days for `DAILY`, 365 for `WEEKLY`, 365 for
   * `MONTHLY`, or 14 for `HOURLY`. Partial buckets identify their actual selected
   * dates. Previous-period comparisons are supported for daily and hourly output.
   * Requires the API-key scope `report:consent-analytics` (this endpoint returns
   * consent analytics report data, which is PHI-bearing and gated separately from
   * consent-settings management). Requires API-key scope or current OAuth user
   * permission: report:consent-analytics
   */
  analytics(
    id: string,
    query: ConsentSettingAnalyticsParams,
    options?: RequestOptions,
  ): APIPromise<ConsentSettingAnalyticsResponse> {
    return this._client.get(path`/rest/v1/consent-settings/${id}/analytics`, { query, ...options });
  }

  /**
   * Monthly consent trends over up to 365 included days. Returns unique visitor
   * counts within each UTC calendar month, event counts for dismissals, rates, and
   * partial-month bounds. Uses the same shared analytics filter as the other consent
   * reports. This series-only output omits whole-window totals and breakdowns.
   * Requires API-key scope or current OAuth user permission:
   * report:consent-analytics
   */
  analyticsMonthly(
    id: string,
    query: ConsentSettingAnalyticsMonthlyParams,
    options?: RequestOptions,
  ): APIPromise<ConsentSettingAnalyticsMonthlyResponse> {
    return this._client.get(path`/rest/v1/consent-settings/${id}/analytics-monthly`, { query, ...options });
  }

  /**
   * Returns interval limits for a Consent report kind: SUMMARY, TRENDS, or PAGES.
   * The organization is determined by the API key. Default included days: at most
   * 180 days for `DAILY`, 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`;
   * organization limits may narrow these allowances. TRENDS requires
   * report:consent-analytics, PAGES requires report:consent-page-analysis, and
   * SUMMARY requires both. Dates, filters, search and pagination are not part of
   * this request. Requires API-key scope or current OAuth user permission:
   * report:consent-analytics or report:consent-page-analysis
   */
  analyticsCapabilities(
    query: ConsentSettingAnalyticsCapabilitiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConsentSettingAnalyticsCapabilitiesResponse> {
    return this._client.get('/rest/v1/consent-settings/analytics-capabilities', { query, ...options });
  }

  /**
   * Per-page consent breakdown for one consent settings record, ranked by opt-outs
   * (descending). Each row bundles banner views, opt-outs, close-icon clicks, and
   * the derived opt-out rate. Returns `{ entities, pagination }`. Continue with
   * `pagination.nextCursor`; results sort by opt-outs descending, then page path
   * ascending. `search` is a substring match against `pathname`; the JSON-encoded
   * shared analytics `filter` scopes the underlying events. Requires the API-key
   * scope `report:consent-page-analysis` (PHI-bearing report data). Requires API-key
   * scope or current OAuth user permission: report:consent-page-analysis
   */
  pageAnalysis(
    id: string,
    query: ConsentSettingPageAnalysisParams,
    options?: RequestOptions,
  ): APIPromise<ConsentSettingPageAnalysisResponse> {
    return this._client.get(path`/rest/v1/consent-settings/${id}/page-analysis`, { query, ...options });
  }

  /**
   * Region-grouped consent totals for the window: banner views, opt-ins, opt-outs,
   * close-icon clicks, and derived rates per visitor `country_region_name`, ranked
   * by banner views (descending). Visitors whose region cannot be resolved (e.g. bot
   * traffic, IP geo failure) are bucketed under the literal `Unknown` so per-region
   * counts always sum to the global totals. Use the JSON-encoded shared analytics
   * `filter` to scope the underlying events. Requires the API-key scope
   * `report:consent-analytics` (PHI-bearing report data). Requires API-key scope or
   * current OAuth user permission: report:consent-analytics
   */
  analyticsByRegion(
    id: string,
    query: ConsentSettingAnalyticsByRegionParams,
    options?: RequestOptions,
  ): APIPromise<ConsentSettingAnalyticsByRegionResponse> {
    return this._client.get(path`/rest/v1/consent-settings/${id}/analytics-by-region`, { query, ...options });
  }
}

export interface ConsentSettingListResponse {
  entities: Array<ConsentSettingListResponse.Entity>;
}

export namespace ConsentSettingListResponse {
  export interface Entity {
    /**
     * Server-assigned UUID for this consent settings record.
     */
    id: string;

    /**
     * Top-level consent categories (e.g. necessary / analytics / advertising). Server
     * re-stamps `priority` to 0..N on write.
     */
    categories: Array<Entity.Category>;

    /**
     * ISO 8601 timestamp when the record was created.
     */
    createdAt: string;

    /**
     * Default rule used when the user is not in any region listed in `regions[]`.
     */
    default: Entity.Default;

    /**
     * Discriminator for the entity type. Always "consentSettings".
     */
    kind: string;

    /**
     * Human-readable name shown in the dashboard.
     */
    name: string;

    /**
     * Per-region rule overrides. The first rule whose `regionCode`/`additionalRegions`
     * includes the user's region wins; otherwise `default` applies.
     */
    regions: Array<Entity.Region>;

    /**
     * Per-service entries powering "show vendors" and category-aware blocking.
     */
    services: Array<Entity.Service>;

    /**
     * Enabled serves the CMP on its allowed domains and requires at least one.
     * Disabled does not serve the CMP and may have no allowed domains.
     */
    status: 'Disabled' | 'Enabled';

    /**
     * Name of the cookie that stores the user's consent state. Defaults to
     * "op_consent".
     */
    consentCookieName?: string | null;

    /**
     * Optional custom CDN domain for serving the CMP script (e.g.
     * consent.example.com).
     */
    customDomain?: string | null;

    /**
     * Cookie/localStorage key for the visitor (device) ID. Must exactly match the web
     * SDK's cookie_names.device_id (default "ours_device_id") so consent and SDK
     * events resolve to the same visitor.
     */
    deviceIdCookieName?: string | null;

    /**
     * Revision counter. Bump this to force users who already consented to see the
     * modal again (the SDK compares the persisted revision against this value).
     */
    revision?: number | null;

    /**
     * CSS class names that opt scripts out of consent blocking. Each entry must be a
     * single class token (no whitespace).
     */
    skipBlockingClassNames?: Array<string> | null;

    /**
     * ISO 8601 timestamp of the last write. Null on a freshly created record.
     */
    updatedAt?: string | null;

    /**
     * Pixel of the WebSource that this CMP is wired into. Setting this to a token that
     * is not a valid WebSource of yours is rejected; use null to clear the link.
     */
    webSDKToken?: string | null;

    /**
     * Domains where this CMP may run. An Enabled CMP requires at least one allowed
     * domain; with none configured, the CMP does not run. Matching domains may share
     * consent across subdomains.
     */
    whitelistDomains?: Array<string> | null;
  }

  export namespace Entity {
    export interface Category {
      /**
       * Human-readable label shown next to the toggle in the preferences modal.
       */
      label: string;

      /**
       * Sort key. Lower numbers render first. Server re-stamps to 0..N on write — send
       * any integer, gaps and duplicates are ironed out.
       */
      priority: number;

      /**
       * Stable identifier referenced by services and translation sections.
       * Conventionally lowercase (e.g. "necessary", "analytics", "advertising").
       */
      value: string;
    }

    /**
     * Default rule used when the user is not in any region listed in `regions[]`.
     */
    export interface Default {
      /**
       * Per-category default config for this rule. Every category defined in the
       * top-level `categories[].value` should have an entry here.
       */
      categories: Array<Default.Category>;

      /**
       * BCP 47 default language for this rule. Must have a matching entry in
       * `translations`. Examples: "en", "en-US", "es", "de".
       */
      language: string;

      /**
       * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
       * default until user rejects (CCPA style).
       */
      mode: 'opt_in' | 'opt_out';

      /**
       * All UI copy, keyed by language. Must include an entry whose `language` matches
       * the rule's `language` field.
       */
      translations: Array<Default.Translation>;

      /**
       * When true, scripts not classified by services[] are blocked until the user opts
       * in.
       */
      autoblockUnknown?: boolean | null;

      /**
       * When true, the consent modal auto-opens on page load.
       */
      autoShow?: boolean | null;

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      autoShowDismissConfig?: Default.AutoShowDismissConfig | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: Default.GuiOptions | null;

      /**
       * When true, the modal is suppressed for known bot user agents.
       */
      hideFromBots?: boolean | null;

      /**
       * When true, the per-service list (services[]) is rendered inside the preferences
       * modal.
       */
      showVendorsInPreferences?: boolean | null;
    }

    export namespace Default {
      export interface Category {
        /**
         * Category value (matches `categories[].value`) this entry configures.
         */
        key: string;

        value: Category.Value;
      }

      export namespace Category {
        export interface Value {
          /**
           * Whether this category is on by default before the user interacts.
           */
          enabled: boolean;

          /**
           * When true, this category defaults off if the browser sends Sec-GPC: 1.
           */
          autoDisableOnGPC?: boolean | null;

          /**
           * When true, the user cannot toggle this category in the preferences modal.
           */
          readOnly?: boolean | null;

          /**
           * When true, the page reloads after this category is toggled so newly-allowed
           * scripts can run.
           */
          reloadPage?: boolean | null;
        }
      }

      export interface Translation {
        /**
         * BCP 47 language tag identifying which translation this entry provides. Examples:
         * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
         */
        language: string;

        value: Translation.Value;
      }

      export namespace Translation {
        export interface Value {
          /**
           * Translated copy for the initial consent modal.
           */
          consentModal?: Value.ConsentModal | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: Value.PreferencesModal | null;
        }

        export namespace Value {
          /**
           * Translated copy for the initial consent modal.
           */
          export interface ConsentModal {
            /**
             * Label for the "accept all" button.
             */
            acceptAllBtn: string;

            /**
             * Body text shown in the consent modal.
             */
            description: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the button that opens the preferences modal.
             */
            showPreferencesBtn: string;

            /**
             * Heading shown at the top of the consent modal.
             */
            title: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel?: string | null;

            /**
             * Optional footer HTML/text shown below the body.
             */
            footer?: string | null;

            /**
             * Optional text shown when the browser is sending Sec-GPC: 1.
             */
            gpcNotification?: string | null;

            /**
             * Link label for the privacy policy (defaults to "Privacy Policy").
             */
            privacyPolicyLabel?: string | null;

            /**
             * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
             * (/legal/privacy) so one config can run across multiple domains. javascript:,
             * data:, and vbscript: schemes are rejected.
             */
            privacyPolicyUrl?: string | null;

            /**
             * Optional message shown when the consent revision has bumped (re-prompt copy).
             */
            revisionMessage?: string | null;

            /**
             * Link label for terms of service (defaults to "Terms of Service").
             */
            termsOfServiceLabel?: string | null;

            /**
             * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
             * relative path only.
             */
            termsOfServiceUrl?: string | null;
          }

          /**
           * Translated copy for the preferences modal.
           */
          export interface PreferencesModal {
            /**
             * Label for the "accept all" button in the preferences modal.
             */
            acceptAllBtn: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the "save my choices" button.
             */
            savePreferencesBtn: string;

            /**
             * Per-category sections plus a leading general section. The server backfills
             * sections for each defined category if absent.
             */
            sections: Array<PreferencesModal.Section>;

            /**
             * Heading for the preferences modal.
             */
            title: string;

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            additionalInfo?: PreferencesModal.AdditionalInfo | null;

            /**
             * Pluralizable label for the "N services" counter (e.g. "Service|Services").
             */
            serviceCounterLabel?: string | null;
          }

          export namespace PreferencesModal {
            export interface Section {
              /**
               * Body text for this preferences-modal section.
               */
              description: string;

              /**
               * Heading for this preferences-modal section.
               */
              title: string;

              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              cookieTable?: Section.CookieTable | null;

              /**
               * Category value this section configures. Use null/omit for the introductory
               * section that applies to no specific category.
               */
              linkedCategory?: string | null;
            }

            export namespace Section {
              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              export interface CookieTable {
                /**
                 * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
                 * purpose).
                 */
                body: Array<CookieTable.Body>;

                /**
                 * Header cells. Same {key,value} shape as rows.
                 */
                headers: Array<CookieTable.Header>;

                /**
                 * Optional table caption.
                 */
                caption?: string | null;
              }

              export namespace CookieTable {
                export interface Body {
                  key: string;

                  value: string;
                }

                export interface Header {
                  key: string;

                  value: string;
                }
              }
            }

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            export interface AdditionalInfo {
              /**
               * Body text for the additional-info block. Supports the rich-text markdown subset
               * used by section descriptions: line breaks, [text](url) links (https:// or
               * relative paths), and **bold**. HTML is stripped.
               */
              body: string;

              /**
               * Heading for the additional-info block.
               */
              title: string;
            }
          }
        }
      }

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      export interface AutoShowDismissConfig {
        /**
         * Pages-viewed threshold when autoShowDismissMode = after_pages.
         */
        pageCount?: number | null;

        /**
         * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
         */
        seconds?: number | null;
      }

      /**
       * Visual options for the modals (layout/position/colors).
       */
      export interface GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        consentModal?: GuiOptions.ConsentModal | null;

        /**
         * Global CSS variable overrides applied to both modals.
         */
        cssVariables?: GuiOptions.CssVariables | null;

        /**
         * Visual options for the per-category preferences modal.
         */
        preferencesModal?: GuiOptions.PreferencesModal | null;
      }

      export namespace GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Which buttons to render in the consent modal and in what arrangement.
           */
          buttonLayout?:
            | 'AcceptAllNecessaryPreferences'
            | 'AcceptAllPreferences'
            | 'AcceptOnly'
            | 'InformationOnly'
            | 'PreferencesOnly'
            | null;

          /**
           * When true, accept and reject buttons share the same visual weight (no
           * primary/secondary).
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Modal layout style (box, bar, cloud, etc.).
           */
          layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

          /**
           * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
           * middle_center).
           */
          position?:
            | 'bottom'
            | 'bottom_center'
            | 'bottom_left'
            | 'bottom_right'
            | 'middle'
            | 'middle_center'
            | 'middle_left'
            | 'middle_right'
            | 'top'
            | 'top_center'
            | 'top_left'
            | 'top_right'
            | null;

          /**
           * Show an X to dismiss the modal without choosing.
           */
          showCloseIcon?: boolean | null;
        }

        /**
         * Global CSS variable overrides applied to both modals.
         */
        export interface CssVariables {
          /**
           * CSS length, e.g. "4px" or "0.25rem".
           */
          buttonBorderRadius?: string | null;

          /**
           * CSS color for the per-category block background in the preferences modal.
           */
          cookieCategoryBlockBg?: string | null;

          /**
           * CSS color for the per-category block background on hover.
           */
          cookieCategoryBlockHoverBg?: string | null;

          /**
           * CSS color for the modal footer background.
           */
          footerBg?: string | null;

          /**
           * CSS color for footer text.
           */
          footerColor?: string | null;

          /**
           * CSS color for footer links.
           */
          footerLinkColor?: string | null;

          /**
           * CSS color for footer links on hover.
           */
          footerLinkHoverColor?: string | null;

          /**
           * CSS color for the modal background.
           */
          modalBg?: string | null;

          /**
           * CSS length for modal corner radius.
           */
          modalBorderRadius?: string | null;

          /**
           * CSS color for the primary button background.
           */
          primaryButtonBg?: string | null;

          /**
           * CSS color for primary button text.
           */
          primaryButtonColor?: string | null;

          /**
           * CSS color for the primary button background on hover.
           */
          primaryButtonHoverBg?: string | null;

          /**
           * CSS color for primary button text on hover.
           */
          primaryButtonHoverColor?: string | null;

          /**
           * CSS color for primary text in the modal body.
           */
          primaryTextColor?: string | null;

          /**
           * CSS color for the secondary button background.
           */
          secondaryButtonBg?: string | null;

          /**
           * CSS color for secondary button text.
           */
          secondaryButtonColor?: string | null;

          /**
           * CSS color for secondary button background on hover.
           */
          secondaryButtonHoverBg?: string | null;

          /**
           * CSS color for secondary button text on hover.
           */
          secondaryButtonHoverColor?: string | null;

          /**
           * CSS color for secondary text in the modal body.
           */
          secondaryTextColor?: string | null;

          /**
           * CSS color for the "on" state of category toggles.
           */
          toggleOnBg?: string | null;
        }

        /**
         * Visual options for the per-category preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Button layout for the preferences modal.
           */
          buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

          /**
           * When true, accept/reject share the same visual weight.
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Preferences modal layout (box, bar, bar_wide).
           */
          layout?: 'bar' | 'bar_wide' | 'box' | null;

          /**
           * Preferences modal anchor (left, right).
           */
          position?: 'left' | 'right' | null;
        }
      }
    }

    export interface Region {
      /**
       * Region this rule applies to. Use ISO 3166-1 alpha-2 country code ("US", "DE",
       * "BR") or country-subdivision code ("US-CA", "GB-ENG", "CA-ON"). Each region code
       * may appear in only one rule across `regions[]`.
       */
      regionCode: string;

      rule: Region.Rule;

      /**
       * Other region codes that should reuse this rule. Same code-format rules as
       * `regionCode`. Cannot include `regionCode` itself, cannot duplicate, cannot
       * overlap with another rule's regions.
       */
      additionalRegions?: Array<string> | null;

      /**
       * Optional label for this override group, e.g. "CCPA States". Shown in the
       * dashboard instead of the region codes. Pass null to clear it and fall back to
       * the codes.
       */
      name?: string | null;
    }

    export namespace Region {
      export interface Rule {
        /**
         * Per-category default config for this rule. Every category defined in the
         * top-level `categories[].value` should have an entry here.
         */
        categories: Array<Rule.Category>;

        /**
         * BCP 47 default language for this rule. Must have a matching entry in
         * `translations`. Examples: "en", "en-US", "es", "de".
         */
        language: string;

        /**
         * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
         * default until user rejects (CCPA style).
         */
        mode: 'opt_in' | 'opt_out';

        /**
         * All UI copy, keyed by language. Must include an entry whose `language` matches
         * the rule's `language` field.
         */
        translations: Array<Rule.Translation>;

        /**
         * When true, scripts not classified by services[] are blocked until the user opts
         * in.
         */
        autoblockUnknown?: boolean | null;

        /**
         * When true, the consent modal auto-opens on page load.
         */
        autoShow?: boolean | null;

        /**
         * Threshold config for autoShowDismissMode (page count or seconds).
         */
        autoShowDismissConfig?: Rule.AutoShowDismissConfig | null;

        /**
         * How the modal is treated as dismissed (never, after_pages, after_seconds).
         */
        autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

        /**
         * When true, the rest of the page is locked behind a backdrop until the user
         * chooses.
         */
        disablePageInteraction?: boolean | null;

        /**
         * Visual options for the modals (layout/position/colors).
         */
        guiOptions?: Rule.GuiOptions | null;

        /**
         * When true, the modal is suppressed for known bot user agents.
         */
        hideFromBots?: boolean | null;

        /**
         * When true, the per-service list (services[]) is rendered inside the preferences
         * modal.
         */
        showVendorsInPreferences?: boolean | null;
      }

      export namespace Rule {
        export interface Category {
          /**
           * Category value (matches `categories[].value`) this entry configures.
           */
          key: string;

          value: Category.Value;
        }

        export namespace Category {
          export interface Value {
            /**
             * Whether this category is on by default before the user interacts.
             */
            enabled: boolean;

            /**
             * When true, this category defaults off if the browser sends Sec-GPC: 1.
             */
            autoDisableOnGPC?: boolean | null;

            /**
             * When true, the user cannot toggle this category in the preferences modal.
             */
            readOnly?: boolean | null;

            /**
             * When true, the page reloads after this category is toggled so newly-allowed
             * scripts can run.
             */
            reloadPage?: boolean | null;
          }
        }

        export interface Translation {
          /**
           * BCP 47 language tag identifying which translation this entry provides. Examples:
           * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
           */
          language: string;

          value: Translation.Value;
        }

        export namespace Translation {
          export interface Value {
            /**
             * Translated copy for the initial consent modal.
             */
            consentModal?: Value.ConsentModal | null;

            /**
             * Translated copy for the preferences modal.
             */
            preferencesModal?: Value.PreferencesModal | null;
          }

          export namespace Value {
            /**
             * Translated copy for the initial consent modal.
             */
            export interface ConsentModal {
              /**
               * Label for the "accept all" button.
               */
              acceptAllBtn: string;

              /**
               * Body text shown in the consent modal.
               */
              description: string;

              /**
               * Label for the "reject all" / "necessary only" button.
               */
              rejectAllBtn: string;

              /**
               * Label for the button that opens the preferences modal.
               */
              showPreferencesBtn: string;

              /**
               * Heading shown at the top of the consent modal.
               */
              title: string;

              /**
               * Accessibility label for the close (X) icon.
               */
              closeIconLabel?: string | null;

              /**
               * Optional footer HTML/text shown below the body.
               */
              footer?: string | null;

              /**
               * Optional text shown when the browser is sending Sec-GPC: 1.
               */
              gpcNotification?: string | null;

              /**
               * Link label for the privacy policy (defaults to "Privacy Policy").
               */
              privacyPolicyLabel?: string | null;

              /**
               * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
               * (/legal/privacy) so one config can run across multiple domains. javascript:,
               * data:, and vbscript: schemes are rejected.
               */
              privacyPolicyUrl?: string | null;

              /**
               * Optional message shown when the consent revision has bumped (re-prompt copy).
               */
              revisionMessage?: string | null;

              /**
               * Link label for terms of service (defaults to "Terms of Service").
               */
              termsOfServiceLabel?: string | null;

              /**
               * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
               * relative path only.
               */
              termsOfServiceUrl?: string | null;
            }

            /**
             * Translated copy for the preferences modal.
             */
            export interface PreferencesModal {
              /**
               * Label for the "accept all" button in the preferences modal.
               */
              acceptAllBtn: string;

              /**
               * Accessibility label for the close (X) icon.
               */
              closeIconLabel: string;

              /**
               * Label for the "reject all" / "necessary only" button.
               */
              rejectAllBtn: string;

              /**
               * Label for the "save my choices" button.
               */
              savePreferencesBtn: string;

              /**
               * Per-category sections plus a leading general section. The server backfills
               * sections for each defined category if absent.
               */
              sections: Array<PreferencesModal.Section>;

              /**
               * Heading for the preferences modal.
               */
              title: string;

              /**
               * Optional collapsible info block rendered after the category sections. Renders
               * only when both title and body are non-empty. Use it for long-form text unrelated
               * to any specific category (e.g. a third-party advertisers disclosure).
               */
              additionalInfo?: PreferencesModal.AdditionalInfo | null;

              /**
               * Pluralizable label for the "N services" counter (e.g. "Service|Services").
               */
              serviceCounterLabel?: string | null;
            }

            export namespace PreferencesModal {
              export interface Section {
                /**
                 * Body text for this preferences-modal section.
                 */
                description: string;

                /**
                 * Heading for this preferences-modal section.
                 */
                title: string;

                /**
                 * Optional disclosure table listing cookies/services in this section.
                 */
                cookieTable?: Section.CookieTable | null;

                /**
                 * Category value this section configures. Use null/omit for the introductory
                 * section that applies to no specific category.
                 */
                linkedCategory?: string | null;
              }

              export namespace Section {
                /**
                 * Optional disclosure table listing cookies/services in this section.
                 */
                export interface CookieTable {
                  /**
                   * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
                   * purpose).
                   */
                  body: Array<CookieTable.Body>;

                  /**
                   * Header cells. Same {key,value} shape as rows.
                   */
                  headers: Array<CookieTable.Header>;

                  /**
                   * Optional table caption.
                   */
                  caption?: string | null;
                }

                export namespace CookieTable {
                  export interface Body {
                    key: string;

                    value: string;
                  }

                  export interface Header {
                    key: string;

                    value: string;
                  }
                }
              }

              /**
               * Optional collapsible info block rendered after the category sections. Renders
               * only when both title and body are non-empty. Use it for long-form text unrelated
               * to any specific category (e.g. a third-party advertisers disclosure).
               */
              export interface AdditionalInfo {
                /**
                 * Body text for the additional-info block. Supports the rich-text markdown subset
                 * used by section descriptions: line breaks, [text](url) links (https:// or
                 * relative paths), and **bold**. HTML is stripped.
                 */
                body: string;

                /**
                 * Heading for the additional-info block.
                 */
                title: string;
              }
            }
          }
        }

        /**
         * Threshold config for autoShowDismissMode (page count or seconds).
         */
        export interface AutoShowDismissConfig {
          /**
           * Pages-viewed threshold when autoShowDismissMode = after_pages.
           */
          pageCount?: number | null;

          /**
           * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
           */
          seconds?: number | null;
        }

        /**
         * Visual options for the modals (layout/position/colors).
         */
        export interface GuiOptions {
          /**
           * Visual options for the initial consent modal.
           */
          consentModal?: GuiOptions.ConsentModal | null;

          /**
           * Global CSS variable overrides applied to both modals.
           */
          cssVariables?: GuiOptions.CssVariables | null;

          /**
           * Visual options for the per-category preferences modal.
           */
          preferencesModal?: GuiOptions.PreferencesModal | null;
        }

        export namespace GuiOptions {
          /**
           * Visual options for the initial consent modal.
           */
          export interface ConsentModal {
            /**
             * Which buttons to render in the consent modal and in what arrangement.
             */
            buttonLayout?:
              | 'AcceptAllNecessaryPreferences'
              | 'AcceptAllPreferences'
              | 'AcceptOnly'
              | 'InformationOnly'
              | 'PreferencesOnly'
              | null;

            /**
             * When true, accept and reject buttons share the same visual weight (no
             * primary/secondary).
             */
            equalWeightButtons?: boolean | null;

            /**
             * When true, swap accept/reject button order.
             */
            flipButtons?: boolean | null;

            /**
             * Modal layout style (box, bar, cloud, etc.).
             */
            layout?:
              | 'bar'
              | 'bar_inline'
              | 'box'
              | 'box_inline'
              | 'box_wide'
              | 'cloud'
              | 'cloud_inline'
              | null;

            /**
             * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
             * middle_center).
             */
            position?:
              | 'bottom'
              | 'bottom_center'
              | 'bottom_left'
              | 'bottom_right'
              | 'middle'
              | 'middle_center'
              | 'middle_left'
              | 'middle_right'
              | 'top'
              | 'top_center'
              | 'top_left'
              | 'top_right'
              | null;

            /**
             * Show an X to dismiss the modal without choosing.
             */
            showCloseIcon?: boolean | null;
          }

          /**
           * Global CSS variable overrides applied to both modals.
           */
          export interface CssVariables {
            /**
             * CSS length, e.g. "4px" or "0.25rem".
             */
            buttonBorderRadius?: string | null;

            /**
             * CSS color for the per-category block background in the preferences modal.
             */
            cookieCategoryBlockBg?: string | null;

            /**
             * CSS color for the per-category block background on hover.
             */
            cookieCategoryBlockHoverBg?: string | null;

            /**
             * CSS color for the modal footer background.
             */
            footerBg?: string | null;

            /**
             * CSS color for footer text.
             */
            footerColor?: string | null;

            /**
             * CSS color for footer links.
             */
            footerLinkColor?: string | null;

            /**
             * CSS color for footer links on hover.
             */
            footerLinkHoverColor?: string | null;

            /**
             * CSS color for the modal background.
             */
            modalBg?: string | null;

            /**
             * CSS length for modal corner radius.
             */
            modalBorderRadius?: string | null;

            /**
             * CSS color for the primary button background.
             */
            primaryButtonBg?: string | null;

            /**
             * CSS color for primary button text.
             */
            primaryButtonColor?: string | null;

            /**
             * CSS color for the primary button background on hover.
             */
            primaryButtonHoverBg?: string | null;

            /**
             * CSS color for primary button text on hover.
             */
            primaryButtonHoverColor?: string | null;

            /**
             * CSS color for primary text in the modal body.
             */
            primaryTextColor?: string | null;

            /**
             * CSS color for the secondary button background.
             */
            secondaryButtonBg?: string | null;

            /**
             * CSS color for secondary button text.
             */
            secondaryButtonColor?: string | null;

            /**
             * CSS color for secondary button background on hover.
             */
            secondaryButtonHoverBg?: string | null;

            /**
             * CSS color for secondary button text on hover.
             */
            secondaryButtonHoverColor?: string | null;

            /**
             * CSS color for secondary text in the modal body.
             */
            secondaryTextColor?: string | null;

            /**
             * CSS color for the "on" state of category toggles.
             */
            toggleOnBg?: string | null;
          }

          /**
           * Visual options for the per-category preferences modal.
           */
          export interface PreferencesModal {
            /**
             * Button layout for the preferences modal.
             */
            buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

            /**
             * When true, accept/reject share the same visual weight.
             */
            equalWeightButtons?: boolean | null;

            /**
             * When true, swap accept/reject button order.
             */
            flipButtons?: boolean | null;

            /**
             * Preferences modal layout (box, bar, bar_wide).
             */
            layout?: 'bar' | 'bar_wide' | 'box' | null;

            /**
             * Preferences modal anchor (left, right).
             */
            position?: 'left' | 'right' | null;
          }
        }
      }
    }

    export interface Service {
      /**
       * Internal notes shown to admins in the dashboard. Not user-facing.
       */
      internalNotes: string;

      /**
       * Display name for this service in the preferences modal.
       */
      label: string;

      /**
       * Extra category values this service belongs to. Each must match a
       * `categories[].value`.
       */
      additionalCategories?: Array<string> | null;

      /**
       * Primary category value this service belongs to. Must match one of the top-level
       * `categories[].value` entries.
       */
      category?: string | null;

      /**
       * Domains/paths this service matches. Patterns matching the CMP's own scripts
       * (e.g. cdn.oursprivacy.com/cmp-init) are rejected to prevent the CMP blocking
       * itself — use a more specific path like cdn.oursprivacy.com/main.js to block a
       * specific script.
       */
      domainPatterns?: Array<string> | null;
    }
  }
}

export interface ConsentSettingCreateResponse {
  /**
   * Server-assigned UUID for this consent settings record.
   */
  id: string;

  /**
   * Top-level consent categories (e.g. necessary / analytics / advertising). Server
   * re-stamps `priority` to 0..N on write.
   */
  categories: Array<ConsentSettingCreateResponse.Category>;

  /**
   * ISO 8601 timestamp when the record was created.
   */
  createdAt: string;

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  default: ConsentSettingCreateResponse.Default;

  /**
   * Discriminator for the entity type. Always "consentSettings".
   */
  kind: string;

  /**
   * Human-readable name shown in the dashboard.
   */
  name: string;

  /**
   * Per-region rule overrides. The first rule whose `regionCode`/`additionalRegions`
   * includes the user's region wins; otherwise `default` applies.
   */
  regions: Array<ConsentSettingCreateResponse.Region>;

  /**
   * Per-service entries powering "show vendors" and category-aware blocking.
   */
  services: Array<ConsentSettingCreateResponse.Service>;

  /**
   * Enabled serves the CMP on its allowed domains and requires at least one.
   * Disabled does not serve the CMP and may have no allowed domains.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the cookie that stores the user's consent state. Defaults to
   * "op_consent".
   */
  consentCookieName?: string | null;

  /**
   * Optional custom CDN domain for serving the CMP script (e.g.
   * consent.example.com).
   */
  customDomain?: string | null;

  /**
   * Cookie/localStorage key for the visitor (device) ID. Must exactly match the web
   * SDK's cookie_names.device_id (default "ours_device_id") so consent and SDK
   * events resolve to the same visitor.
   */
  deviceIdCookieName?: string | null;

  /**
   * Revision counter. Bump this to force users who already consented to see the
   * modal again (the SDK compares the persisted revision against this value).
   */
  revision?: number | null;

  /**
   * CSS class names that opt scripts out of consent blocking. Each entry must be a
   * single class token (no whitespace).
   */
  skipBlockingClassNames?: Array<string> | null;

  /**
   * ISO 8601 timestamp of the last write. Null on a freshly created record.
   */
  updatedAt?: string | null;

  /**
   * Pixel of the WebSource that this CMP is wired into. Setting this to a token that
   * is not a valid WebSource of yours is rejected; use null to clear the link.
   */
  webSDKToken?: string | null;

  /**
   * Domains where this CMP may run. An Enabled CMP requires at least one allowed
   * domain; with none configured, the CMP does not run. Matching domains may share
   * consent across subdomains.
   */
  whitelistDomains?: Array<string> | null;
}

export namespace ConsentSettingCreateResponse {
  export interface Category {
    /**
     * Human-readable label shown next to the toggle in the preferences modal.
     */
    label: string;

    /**
     * Sort key. Lower numbers render first. Server re-stamps to 0..N on write — send
     * any integer, gaps and duplicates are ironed out.
     */
    priority: number;

    /**
     * Stable identifier referenced by services and translation sections.
     * Conventionally lowercase (e.g. "necessary", "analytics", "advertising").
     */
    value: string;
  }

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  export interface Default {
    /**
     * Per-category default config for this rule. Every category defined in the
     * top-level `categories[].value` should have an entry here.
     */
    categories: Array<Default.Category>;

    /**
     * BCP 47 default language for this rule. Must have a matching entry in
     * `translations`. Examples: "en", "en-US", "es", "de".
     */
    language: string;

    /**
     * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
     * default until user rejects (CCPA style).
     */
    mode: 'opt_in' | 'opt_out';

    /**
     * All UI copy, keyed by language. Must include an entry whose `language` matches
     * the rule's `language` field.
     */
    translations: Array<Default.Translation>;

    /**
     * When true, scripts not classified by services[] are blocked until the user opts
     * in.
     */
    autoblockUnknown?: boolean | null;

    /**
     * When true, the consent modal auto-opens on page load.
     */
    autoShow?: boolean | null;

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    autoShowDismissConfig?: Default.AutoShowDismissConfig | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: Default.GuiOptions | null;

    /**
     * When true, the modal is suppressed for known bot user agents.
     */
    hideFromBots?: boolean | null;

    /**
     * When true, the per-service list (services[]) is rendered inside the preferences
     * modal.
     */
    showVendorsInPreferences?: boolean | null;
  }

  export namespace Default {
    export interface Category {
      /**
       * Category value (matches `categories[].value`) this entry configures.
       */
      key: string;

      value: Category.Value;
    }

    export namespace Category {
      export interface Value {
        /**
         * Whether this category is on by default before the user interacts.
         */
        enabled: boolean;

        /**
         * When true, this category defaults off if the browser sends Sec-GPC: 1.
         */
        autoDisableOnGPC?: boolean | null;

        /**
         * When true, the user cannot toggle this category in the preferences modal.
         */
        readOnly?: boolean | null;

        /**
         * When true, the page reloads after this category is toggled so newly-allowed
         * scripts can run.
         */
        reloadPage?: boolean | null;
      }
    }

    export interface Translation {
      /**
       * BCP 47 language tag identifying which translation this entry provides. Examples:
       * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
       */
      language: string;

      value: Translation.Value;
    }

    export namespace Translation {
      export interface Value {
        /**
         * Translated copy for the initial consent modal.
         */
        consentModal?: Value.ConsentModal | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: Value.PreferencesModal | null;
      }

      export namespace Value {
        /**
         * Translated copy for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Label for the "accept all" button.
           */
          acceptAllBtn: string;

          /**
           * Body text shown in the consent modal.
           */
          description: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the button that opens the preferences modal.
           */
          showPreferencesBtn: string;

          /**
           * Heading shown at the top of the consent modal.
           */
          title: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel?: string | null;

          /**
           * Optional footer HTML/text shown below the body.
           */
          footer?: string | null;

          /**
           * Optional text shown when the browser is sending Sec-GPC: 1.
           */
          gpcNotification?: string | null;

          /**
           * Link label for the privacy policy (defaults to "Privacy Policy").
           */
          privacyPolicyLabel?: string | null;

          /**
           * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
           * (/legal/privacy) so one config can run across multiple domains. javascript:,
           * data:, and vbscript: schemes are rejected.
           */
          privacyPolicyUrl?: string | null;

          /**
           * Optional message shown when the consent revision has bumped (re-prompt copy).
           */
          revisionMessage?: string | null;

          /**
           * Link label for terms of service (defaults to "Terms of Service").
           */
          termsOfServiceLabel?: string | null;

          /**
           * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
           * relative path only.
           */
          termsOfServiceUrl?: string | null;
        }

        /**
         * Translated copy for the preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Label for the "accept all" button in the preferences modal.
           */
          acceptAllBtn: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the "save my choices" button.
           */
          savePreferencesBtn: string;

          /**
           * Per-category sections plus a leading general section. The server backfills
           * sections for each defined category if absent.
           */
          sections: Array<PreferencesModal.Section>;

          /**
           * Heading for the preferences modal.
           */
          title: string;

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          additionalInfo?: PreferencesModal.AdditionalInfo | null;

          /**
           * Pluralizable label for the "N services" counter (e.g. "Service|Services").
           */
          serviceCounterLabel?: string | null;
        }

        export namespace PreferencesModal {
          export interface Section {
            /**
             * Body text for this preferences-modal section.
             */
            description: string;

            /**
             * Heading for this preferences-modal section.
             */
            title: string;

            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            cookieTable?: Section.CookieTable | null;

            /**
             * Category value this section configures. Use null/omit for the introductory
             * section that applies to no specific category.
             */
            linkedCategory?: string | null;
          }

          export namespace Section {
            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            export interface CookieTable {
              /**
               * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
               * purpose).
               */
              body: Array<CookieTable.Body>;

              /**
               * Header cells. Same {key,value} shape as rows.
               */
              headers: Array<CookieTable.Header>;

              /**
               * Optional table caption.
               */
              caption?: string | null;
            }

            export namespace CookieTable {
              export interface Body {
                key: string;

                value: string;
              }

              export interface Header {
                key: string;

                value: string;
              }
            }
          }

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          export interface AdditionalInfo {
            /**
             * Body text for the additional-info block. Supports the rich-text markdown subset
             * used by section descriptions: line breaks, [text](url) links (https:// or
             * relative paths), and **bold**. HTML is stripped.
             */
            body: string;

            /**
             * Heading for the additional-info block.
             */
            title: string;
          }
        }
      }
    }

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    export interface AutoShowDismissConfig {
      /**
       * Pages-viewed threshold when autoShowDismissMode = after_pages.
       */
      pageCount?: number | null;

      /**
       * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
       */
      seconds?: number | null;
    }

    /**
     * Visual options for the modals (layout/position/colors).
     */
    export interface GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      consentModal?: GuiOptions.ConsentModal | null;

      /**
       * Global CSS variable overrides applied to both modals.
       */
      cssVariables?: GuiOptions.CssVariables | null;

      /**
       * Visual options for the per-category preferences modal.
       */
      preferencesModal?: GuiOptions.PreferencesModal | null;
    }

    export namespace GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      export interface ConsentModal {
        /**
         * Which buttons to render in the consent modal and in what arrangement.
         */
        buttonLayout?:
          | 'AcceptAllNecessaryPreferences'
          | 'AcceptAllPreferences'
          | 'AcceptOnly'
          | 'InformationOnly'
          | 'PreferencesOnly'
          | null;

        /**
         * When true, accept and reject buttons share the same visual weight (no
         * primary/secondary).
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Modal layout style (box, bar, cloud, etc.).
         */
        layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

        /**
         * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
         * middle_center).
         */
        position?:
          | 'bottom'
          | 'bottom_center'
          | 'bottom_left'
          | 'bottom_right'
          | 'middle'
          | 'middle_center'
          | 'middle_left'
          | 'middle_right'
          | 'top'
          | 'top_center'
          | 'top_left'
          | 'top_right'
          | null;

        /**
         * Show an X to dismiss the modal without choosing.
         */
        showCloseIcon?: boolean | null;
      }

      /**
       * Global CSS variable overrides applied to both modals.
       */
      export interface CssVariables {
        /**
         * CSS length, e.g. "4px" or "0.25rem".
         */
        buttonBorderRadius?: string | null;

        /**
         * CSS color for the per-category block background in the preferences modal.
         */
        cookieCategoryBlockBg?: string | null;

        /**
         * CSS color for the per-category block background on hover.
         */
        cookieCategoryBlockHoverBg?: string | null;

        /**
         * CSS color for the modal footer background.
         */
        footerBg?: string | null;

        /**
         * CSS color for footer text.
         */
        footerColor?: string | null;

        /**
         * CSS color for footer links.
         */
        footerLinkColor?: string | null;

        /**
         * CSS color for footer links on hover.
         */
        footerLinkHoverColor?: string | null;

        /**
         * CSS color for the modal background.
         */
        modalBg?: string | null;

        /**
         * CSS length for modal corner radius.
         */
        modalBorderRadius?: string | null;

        /**
         * CSS color for the primary button background.
         */
        primaryButtonBg?: string | null;

        /**
         * CSS color for primary button text.
         */
        primaryButtonColor?: string | null;

        /**
         * CSS color for the primary button background on hover.
         */
        primaryButtonHoverBg?: string | null;

        /**
         * CSS color for primary button text on hover.
         */
        primaryButtonHoverColor?: string | null;

        /**
         * CSS color for primary text in the modal body.
         */
        primaryTextColor?: string | null;

        /**
         * CSS color for the secondary button background.
         */
        secondaryButtonBg?: string | null;

        /**
         * CSS color for secondary button text.
         */
        secondaryButtonColor?: string | null;

        /**
         * CSS color for secondary button background on hover.
         */
        secondaryButtonHoverBg?: string | null;

        /**
         * CSS color for secondary button text on hover.
         */
        secondaryButtonHoverColor?: string | null;

        /**
         * CSS color for secondary text in the modal body.
         */
        secondaryTextColor?: string | null;

        /**
         * CSS color for the "on" state of category toggles.
         */
        toggleOnBg?: string | null;
      }

      /**
       * Visual options for the per-category preferences modal.
       */
      export interface PreferencesModal {
        /**
         * Button layout for the preferences modal.
         */
        buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

        /**
         * When true, accept/reject share the same visual weight.
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Preferences modal layout (box, bar, bar_wide).
         */
        layout?: 'bar' | 'bar_wide' | 'box' | null;

        /**
         * Preferences modal anchor (left, right).
         */
        position?: 'left' | 'right' | null;
      }
    }
  }

  export interface Region {
    /**
     * Region this rule applies to. Use ISO 3166-1 alpha-2 country code ("US", "DE",
     * "BR") or country-subdivision code ("US-CA", "GB-ENG", "CA-ON"). Each region code
     * may appear in only one rule across `regions[]`.
     */
    regionCode: string;

    rule: Region.Rule;

    /**
     * Other region codes that should reuse this rule. Same code-format rules as
     * `regionCode`. Cannot include `regionCode` itself, cannot duplicate, cannot
     * overlap with another rule's regions.
     */
    additionalRegions?: Array<string> | null;

    /**
     * Optional label for this override group, e.g. "CCPA States". Shown in the
     * dashboard instead of the region codes. Pass null to clear it and fall back to
     * the codes.
     */
    name?: string | null;
  }

  export namespace Region {
    export interface Rule {
      /**
       * Per-category default config for this rule. Every category defined in the
       * top-level `categories[].value` should have an entry here.
       */
      categories: Array<Rule.Category>;

      /**
       * BCP 47 default language for this rule. Must have a matching entry in
       * `translations`. Examples: "en", "en-US", "es", "de".
       */
      language: string;

      /**
       * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
       * default until user rejects (CCPA style).
       */
      mode: 'opt_in' | 'opt_out';

      /**
       * All UI copy, keyed by language. Must include an entry whose `language` matches
       * the rule's `language` field.
       */
      translations: Array<Rule.Translation>;

      /**
       * When true, scripts not classified by services[] are blocked until the user opts
       * in.
       */
      autoblockUnknown?: boolean | null;

      /**
       * When true, the consent modal auto-opens on page load.
       */
      autoShow?: boolean | null;

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      autoShowDismissConfig?: Rule.AutoShowDismissConfig | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: Rule.GuiOptions | null;

      /**
       * When true, the modal is suppressed for known bot user agents.
       */
      hideFromBots?: boolean | null;

      /**
       * When true, the per-service list (services[]) is rendered inside the preferences
       * modal.
       */
      showVendorsInPreferences?: boolean | null;
    }

    export namespace Rule {
      export interface Category {
        /**
         * Category value (matches `categories[].value`) this entry configures.
         */
        key: string;

        value: Category.Value;
      }

      export namespace Category {
        export interface Value {
          /**
           * Whether this category is on by default before the user interacts.
           */
          enabled: boolean;

          /**
           * When true, this category defaults off if the browser sends Sec-GPC: 1.
           */
          autoDisableOnGPC?: boolean | null;

          /**
           * When true, the user cannot toggle this category in the preferences modal.
           */
          readOnly?: boolean | null;

          /**
           * When true, the page reloads after this category is toggled so newly-allowed
           * scripts can run.
           */
          reloadPage?: boolean | null;
        }
      }

      export interface Translation {
        /**
         * BCP 47 language tag identifying which translation this entry provides. Examples:
         * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
         */
        language: string;

        value: Translation.Value;
      }

      export namespace Translation {
        export interface Value {
          /**
           * Translated copy for the initial consent modal.
           */
          consentModal?: Value.ConsentModal | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: Value.PreferencesModal | null;
        }

        export namespace Value {
          /**
           * Translated copy for the initial consent modal.
           */
          export interface ConsentModal {
            /**
             * Label for the "accept all" button.
             */
            acceptAllBtn: string;

            /**
             * Body text shown in the consent modal.
             */
            description: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the button that opens the preferences modal.
             */
            showPreferencesBtn: string;

            /**
             * Heading shown at the top of the consent modal.
             */
            title: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel?: string | null;

            /**
             * Optional footer HTML/text shown below the body.
             */
            footer?: string | null;

            /**
             * Optional text shown when the browser is sending Sec-GPC: 1.
             */
            gpcNotification?: string | null;

            /**
             * Link label for the privacy policy (defaults to "Privacy Policy").
             */
            privacyPolicyLabel?: string | null;

            /**
             * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
             * (/legal/privacy) so one config can run across multiple domains. javascript:,
             * data:, and vbscript: schemes are rejected.
             */
            privacyPolicyUrl?: string | null;

            /**
             * Optional message shown when the consent revision has bumped (re-prompt copy).
             */
            revisionMessage?: string | null;

            /**
             * Link label for terms of service (defaults to "Terms of Service").
             */
            termsOfServiceLabel?: string | null;

            /**
             * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
             * relative path only.
             */
            termsOfServiceUrl?: string | null;
          }

          /**
           * Translated copy for the preferences modal.
           */
          export interface PreferencesModal {
            /**
             * Label for the "accept all" button in the preferences modal.
             */
            acceptAllBtn: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the "save my choices" button.
             */
            savePreferencesBtn: string;

            /**
             * Per-category sections plus a leading general section. The server backfills
             * sections for each defined category if absent.
             */
            sections: Array<PreferencesModal.Section>;

            /**
             * Heading for the preferences modal.
             */
            title: string;

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            additionalInfo?: PreferencesModal.AdditionalInfo | null;

            /**
             * Pluralizable label for the "N services" counter (e.g. "Service|Services").
             */
            serviceCounterLabel?: string | null;
          }

          export namespace PreferencesModal {
            export interface Section {
              /**
               * Body text for this preferences-modal section.
               */
              description: string;

              /**
               * Heading for this preferences-modal section.
               */
              title: string;

              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              cookieTable?: Section.CookieTable | null;

              /**
               * Category value this section configures. Use null/omit for the introductory
               * section that applies to no specific category.
               */
              linkedCategory?: string | null;
            }

            export namespace Section {
              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              export interface CookieTable {
                /**
                 * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
                 * purpose).
                 */
                body: Array<CookieTable.Body>;

                /**
                 * Header cells. Same {key,value} shape as rows.
                 */
                headers: Array<CookieTable.Header>;

                /**
                 * Optional table caption.
                 */
                caption?: string | null;
              }

              export namespace CookieTable {
                export interface Body {
                  key: string;

                  value: string;
                }

                export interface Header {
                  key: string;

                  value: string;
                }
              }
            }

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            export interface AdditionalInfo {
              /**
               * Body text for the additional-info block. Supports the rich-text markdown subset
               * used by section descriptions: line breaks, [text](url) links (https:// or
               * relative paths), and **bold**. HTML is stripped.
               */
              body: string;

              /**
               * Heading for the additional-info block.
               */
              title: string;
            }
          }
        }
      }

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      export interface AutoShowDismissConfig {
        /**
         * Pages-viewed threshold when autoShowDismissMode = after_pages.
         */
        pageCount?: number | null;

        /**
         * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
         */
        seconds?: number | null;
      }

      /**
       * Visual options for the modals (layout/position/colors).
       */
      export interface GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        consentModal?: GuiOptions.ConsentModal | null;

        /**
         * Global CSS variable overrides applied to both modals.
         */
        cssVariables?: GuiOptions.CssVariables | null;

        /**
         * Visual options for the per-category preferences modal.
         */
        preferencesModal?: GuiOptions.PreferencesModal | null;
      }

      export namespace GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Which buttons to render in the consent modal and in what arrangement.
           */
          buttonLayout?:
            | 'AcceptAllNecessaryPreferences'
            | 'AcceptAllPreferences'
            | 'AcceptOnly'
            | 'InformationOnly'
            | 'PreferencesOnly'
            | null;

          /**
           * When true, accept and reject buttons share the same visual weight (no
           * primary/secondary).
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Modal layout style (box, bar, cloud, etc.).
           */
          layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

          /**
           * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
           * middle_center).
           */
          position?:
            | 'bottom'
            | 'bottom_center'
            | 'bottom_left'
            | 'bottom_right'
            | 'middle'
            | 'middle_center'
            | 'middle_left'
            | 'middle_right'
            | 'top'
            | 'top_center'
            | 'top_left'
            | 'top_right'
            | null;

          /**
           * Show an X to dismiss the modal without choosing.
           */
          showCloseIcon?: boolean | null;
        }

        /**
         * Global CSS variable overrides applied to both modals.
         */
        export interface CssVariables {
          /**
           * CSS length, e.g. "4px" or "0.25rem".
           */
          buttonBorderRadius?: string | null;

          /**
           * CSS color for the per-category block background in the preferences modal.
           */
          cookieCategoryBlockBg?: string | null;

          /**
           * CSS color for the per-category block background on hover.
           */
          cookieCategoryBlockHoverBg?: string | null;

          /**
           * CSS color for the modal footer background.
           */
          footerBg?: string | null;

          /**
           * CSS color for footer text.
           */
          footerColor?: string | null;

          /**
           * CSS color for footer links.
           */
          footerLinkColor?: string | null;

          /**
           * CSS color for footer links on hover.
           */
          footerLinkHoverColor?: string | null;

          /**
           * CSS color for the modal background.
           */
          modalBg?: string | null;

          /**
           * CSS length for modal corner radius.
           */
          modalBorderRadius?: string | null;

          /**
           * CSS color for the primary button background.
           */
          primaryButtonBg?: string | null;

          /**
           * CSS color for primary button text.
           */
          primaryButtonColor?: string | null;

          /**
           * CSS color for the primary button background on hover.
           */
          primaryButtonHoverBg?: string | null;

          /**
           * CSS color for primary button text on hover.
           */
          primaryButtonHoverColor?: string | null;

          /**
           * CSS color for primary text in the modal body.
           */
          primaryTextColor?: string | null;

          /**
           * CSS color for the secondary button background.
           */
          secondaryButtonBg?: string | null;

          /**
           * CSS color for secondary button text.
           */
          secondaryButtonColor?: string | null;

          /**
           * CSS color for secondary button background on hover.
           */
          secondaryButtonHoverBg?: string | null;

          /**
           * CSS color for secondary button text on hover.
           */
          secondaryButtonHoverColor?: string | null;

          /**
           * CSS color for secondary text in the modal body.
           */
          secondaryTextColor?: string | null;

          /**
           * CSS color for the "on" state of category toggles.
           */
          toggleOnBg?: string | null;
        }

        /**
         * Visual options for the per-category preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Button layout for the preferences modal.
           */
          buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

          /**
           * When true, accept/reject share the same visual weight.
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Preferences modal layout (box, bar, bar_wide).
           */
          layout?: 'bar' | 'bar_wide' | 'box' | null;

          /**
           * Preferences modal anchor (left, right).
           */
          position?: 'left' | 'right' | null;
        }
      }
    }
  }

  export interface Service {
    /**
     * Internal notes shown to admins in the dashboard. Not user-facing.
     */
    internalNotes: string;

    /**
     * Display name for this service in the preferences modal.
     */
    label: string;

    /**
     * Extra category values this service belongs to. Each must match a
     * `categories[].value`.
     */
    additionalCategories?: Array<string> | null;

    /**
     * Primary category value this service belongs to. Must match one of the top-level
     * `categories[].value` entries.
     */
    category?: string | null;

    /**
     * Domains/paths this service matches. Patterns matching the CMP's own scripts
     * (e.g. cdn.oursprivacy.com/cmp-init) are rejected to prevent the CMP blocking
     * itself — use a more specific path like cdn.oursprivacy.com/main.js to block a
     * specific script.
     */
    domainPatterns?: Array<string> | null;
  }
}

export interface ConsentSettingRetrieveResponse {
  /**
   * Server-assigned UUID for this consent settings record.
   */
  id: string;

  /**
   * Top-level consent categories (e.g. necessary / analytics / advertising). Server
   * re-stamps `priority` to 0..N on write.
   */
  categories: Array<ConsentSettingRetrieveResponse.Category>;

  /**
   * ISO 8601 timestamp when the record was created.
   */
  createdAt: string;

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  default: ConsentSettingRetrieveResponse.Default;

  /**
   * Discriminator for the entity type. Always "consentSettings".
   */
  kind: string;

  /**
   * Human-readable name shown in the dashboard.
   */
  name: string;

  /**
   * Per-region rule overrides. The first rule whose `regionCode`/`additionalRegions`
   * includes the user's region wins; otherwise `default` applies.
   */
  regions: Array<ConsentSettingRetrieveResponse.Region>;

  /**
   * Per-service entries powering "show vendors" and category-aware blocking.
   */
  services: Array<ConsentSettingRetrieveResponse.Service>;

  /**
   * Enabled serves the CMP on its allowed domains and requires at least one.
   * Disabled does not serve the CMP and may have no allowed domains.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the cookie that stores the user's consent state. Defaults to
   * "op_consent".
   */
  consentCookieName?: string | null;

  /**
   * Optional custom CDN domain for serving the CMP script (e.g.
   * consent.example.com).
   */
  customDomain?: string | null;

  /**
   * Cookie/localStorage key for the visitor (device) ID. Must exactly match the web
   * SDK's cookie_names.device_id (default "ours_device_id") so consent and SDK
   * events resolve to the same visitor.
   */
  deviceIdCookieName?: string | null;

  /**
   * Revision counter. Bump this to force users who already consented to see the
   * modal again (the SDK compares the persisted revision against this value).
   */
  revision?: number | null;

  /**
   * CSS class names that opt scripts out of consent blocking. Each entry must be a
   * single class token (no whitespace).
   */
  skipBlockingClassNames?: Array<string> | null;

  /**
   * ISO 8601 timestamp of the last write. Null on a freshly created record.
   */
  updatedAt?: string | null;

  /**
   * Pixel of the WebSource that this CMP is wired into. Setting this to a token that
   * is not a valid WebSource of yours is rejected; use null to clear the link.
   */
  webSDKToken?: string | null;

  /**
   * Domains where this CMP may run. An Enabled CMP requires at least one allowed
   * domain; with none configured, the CMP does not run. Matching domains may share
   * consent across subdomains.
   */
  whitelistDomains?: Array<string> | null;
}

export namespace ConsentSettingRetrieveResponse {
  export interface Category {
    /**
     * Human-readable label shown next to the toggle in the preferences modal.
     */
    label: string;

    /**
     * Sort key. Lower numbers render first. Server re-stamps to 0..N on write — send
     * any integer, gaps and duplicates are ironed out.
     */
    priority: number;

    /**
     * Stable identifier referenced by services and translation sections.
     * Conventionally lowercase (e.g. "necessary", "analytics", "advertising").
     */
    value: string;
  }

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  export interface Default {
    /**
     * Per-category default config for this rule. Every category defined in the
     * top-level `categories[].value` should have an entry here.
     */
    categories: Array<Default.Category>;

    /**
     * BCP 47 default language for this rule. Must have a matching entry in
     * `translations`. Examples: "en", "en-US", "es", "de".
     */
    language: string;

    /**
     * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
     * default until user rejects (CCPA style).
     */
    mode: 'opt_in' | 'opt_out';

    /**
     * All UI copy, keyed by language. Must include an entry whose `language` matches
     * the rule's `language` field.
     */
    translations: Array<Default.Translation>;

    /**
     * When true, scripts not classified by services[] are blocked until the user opts
     * in.
     */
    autoblockUnknown?: boolean | null;

    /**
     * When true, the consent modal auto-opens on page load.
     */
    autoShow?: boolean | null;

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    autoShowDismissConfig?: Default.AutoShowDismissConfig | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: Default.GuiOptions | null;

    /**
     * When true, the modal is suppressed for known bot user agents.
     */
    hideFromBots?: boolean | null;

    /**
     * When true, the per-service list (services[]) is rendered inside the preferences
     * modal.
     */
    showVendorsInPreferences?: boolean | null;
  }

  export namespace Default {
    export interface Category {
      /**
       * Category value (matches `categories[].value`) this entry configures.
       */
      key: string;

      value: Category.Value;
    }

    export namespace Category {
      export interface Value {
        /**
         * Whether this category is on by default before the user interacts.
         */
        enabled: boolean;

        /**
         * When true, this category defaults off if the browser sends Sec-GPC: 1.
         */
        autoDisableOnGPC?: boolean | null;

        /**
         * When true, the user cannot toggle this category in the preferences modal.
         */
        readOnly?: boolean | null;

        /**
         * When true, the page reloads after this category is toggled so newly-allowed
         * scripts can run.
         */
        reloadPage?: boolean | null;
      }
    }

    export interface Translation {
      /**
       * BCP 47 language tag identifying which translation this entry provides. Examples:
       * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
       */
      language: string;

      value: Translation.Value;
    }

    export namespace Translation {
      export interface Value {
        /**
         * Translated copy for the initial consent modal.
         */
        consentModal?: Value.ConsentModal | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: Value.PreferencesModal | null;
      }

      export namespace Value {
        /**
         * Translated copy for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Label for the "accept all" button.
           */
          acceptAllBtn: string;

          /**
           * Body text shown in the consent modal.
           */
          description: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the button that opens the preferences modal.
           */
          showPreferencesBtn: string;

          /**
           * Heading shown at the top of the consent modal.
           */
          title: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel?: string | null;

          /**
           * Optional footer HTML/text shown below the body.
           */
          footer?: string | null;

          /**
           * Optional text shown when the browser is sending Sec-GPC: 1.
           */
          gpcNotification?: string | null;

          /**
           * Link label for the privacy policy (defaults to "Privacy Policy").
           */
          privacyPolicyLabel?: string | null;

          /**
           * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
           * (/legal/privacy) so one config can run across multiple domains. javascript:,
           * data:, and vbscript: schemes are rejected.
           */
          privacyPolicyUrl?: string | null;

          /**
           * Optional message shown when the consent revision has bumped (re-prompt copy).
           */
          revisionMessage?: string | null;

          /**
           * Link label for terms of service (defaults to "Terms of Service").
           */
          termsOfServiceLabel?: string | null;

          /**
           * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
           * relative path only.
           */
          termsOfServiceUrl?: string | null;
        }

        /**
         * Translated copy for the preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Label for the "accept all" button in the preferences modal.
           */
          acceptAllBtn: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the "save my choices" button.
           */
          savePreferencesBtn: string;

          /**
           * Per-category sections plus a leading general section. The server backfills
           * sections for each defined category if absent.
           */
          sections: Array<PreferencesModal.Section>;

          /**
           * Heading for the preferences modal.
           */
          title: string;

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          additionalInfo?: PreferencesModal.AdditionalInfo | null;

          /**
           * Pluralizable label for the "N services" counter (e.g. "Service|Services").
           */
          serviceCounterLabel?: string | null;
        }

        export namespace PreferencesModal {
          export interface Section {
            /**
             * Body text for this preferences-modal section.
             */
            description: string;

            /**
             * Heading for this preferences-modal section.
             */
            title: string;

            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            cookieTable?: Section.CookieTable | null;

            /**
             * Category value this section configures. Use null/omit for the introductory
             * section that applies to no specific category.
             */
            linkedCategory?: string | null;
          }

          export namespace Section {
            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            export interface CookieTable {
              /**
               * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
               * purpose).
               */
              body: Array<CookieTable.Body>;

              /**
               * Header cells. Same {key,value} shape as rows.
               */
              headers: Array<CookieTable.Header>;

              /**
               * Optional table caption.
               */
              caption?: string | null;
            }

            export namespace CookieTable {
              export interface Body {
                key: string;

                value: string;
              }

              export interface Header {
                key: string;

                value: string;
              }
            }
          }

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          export interface AdditionalInfo {
            /**
             * Body text for the additional-info block. Supports the rich-text markdown subset
             * used by section descriptions: line breaks, [text](url) links (https:// or
             * relative paths), and **bold**. HTML is stripped.
             */
            body: string;

            /**
             * Heading for the additional-info block.
             */
            title: string;
          }
        }
      }
    }

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    export interface AutoShowDismissConfig {
      /**
       * Pages-viewed threshold when autoShowDismissMode = after_pages.
       */
      pageCount?: number | null;

      /**
       * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
       */
      seconds?: number | null;
    }

    /**
     * Visual options for the modals (layout/position/colors).
     */
    export interface GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      consentModal?: GuiOptions.ConsentModal | null;

      /**
       * Global CSS variable overrides applied to both modals.
       */
      cssVariables?: GuiOptions.CssVariables | null;

      /**
       * Visual options for the per-category preferences modal.
       */
      preferencesModal?: GuiOptions.PreferencesModal | null;
    }

    export namespace GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      export interface ConsentModal {
        /**
         * Which buttons to render in the consent modal and in what arrangement.
         */
        buttonLayout?:
          | 'AcceptAllNecessaryPreferences'
          | 'AcceptAllPreferences'
          | 'AcceptOnly'
          | 'InformationOnly'
          | 'PreferencesOnly'
          | null;

        /**
         * When true, accept and reject buttons share the same visual weight (no
         * primary/secondary).
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Modal layout style (box, bar, cloud, etc.).
         */
        layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

        /**
         * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
         * middle_center).
         */
        position?:
          | 'bottom'
          | 'bottom_center'
          | 'bottom_left'
          | 'bottom_right'
          | 'middle'
          | 'middle_center'
          | 'middle_left'
          | 'middle_right'
          | 'top'
          | 'top_center'
          | 'top_left'
          | 'top_right'
          | null;

        /**
         * Show an X to dismiss the modal without choosing.
         */
        showCloseIcon?: boolean | null;
      }

      /**
       * Global CSS variable overrides applied to both modals.
       */
      export interface CssVariables {
        /**
         * CSS length, e.g. "4px" or "0.25rem".
         */
        buttonBorderRadius?: string | null;

        /**
         * CSS color for the per-category block background in the preferences modal.
         */
        cookieCategoryBlockBg?: string | null;

        /**
         * CSS color for the per-category block background on hover.
         */
        cookieCategoryBlockHoverBg?: string | null;

        /**
         * CSS color for the modal footer background.
         */
        footerBg?: string | null;

        /**
         * CSS color for footer text.
         */
        footerColor?: string | null;

        /**
         * CSS color for footer links.
         */
        footerLinkColor?: string | null;

        /**
         * CSS color for footer links on hover.
         */
        footerLinkHoverColor?: string | null;

        /**
         * CSS color for the modal background.
         */
        modalBg?: string | null;

        /**
         * CSS length for modal corner radius.
         */
        modalBorderRadius?: string | null;

        /**
         * CSS color for the primary button background.
         */
        primaryButtonBg?: string | null;

        /**
         * CSS color for primary button text.
         */
        primaryButtonColor?: string | null;

        /**
         * CSS color for the primary button background on hover.
         */
        primaryButtonHoverBg?: string | null;

        /**
         * CSS color for primary button text on hover.
         */
        primaryButtonHoverColor?: string | null;

        /**
         * CSS color for primary text in the modal body.
         */
        primaryTextColor?: string | null;

        /**
         * CSS color for the secondary button background.
         */
        secondaryButtonBg?: string | null;

        /**
         * CSS color for secondary button text.
         */
        secondaryButtonColor?: string | null;

        /**
         * CSS color for secondary button background on hover.
         */
        secondaryButtonHoverBg?: string | null;

        /**
         * CSS color for secondary button text on hover.
         */
        secondaryButtonHoverColor?: string | null;

        /**
         * CSS color for secondary text in the modal body.
         */
        secondaryTextColor?: string | null;

        /**
         * CSS color for the "on" state of category toggles.
         */
        toggleOnBg?: string | null;
      }

      /**
       * Visual options for the per-category preferences modal.
       */
      export interface PreferencesModal {
        /**
         * Button layout for the preferences modal.
         */
        buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

        /**
         * When true, accept/reject share the same visual weight.
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Preferences modal layout (box, bar, bar_wide).
         */
        layout?: 'bar' | 'bar_wide' | 'box' | null;

        /**
         * Preferences modal anchor (left, right).
         */
        position?: 'left' | 'right' | null;
      }
    }
  }

  export interface Region {
    /**
     * Region this rule applies to. Use ISO 3166-1 alpha-2 country code ("US", "DE",
     * "BR") or country-subdivision code ("US-CA", "GB-ENG", "CA-ON"). Each region code
     * may appear in only one rule across `regions[]`.
     */
    regionCode: string;

    rule: Region.Rule;

    /**
     * Other region codes that should reuse this rule. Same code-format rules as
     * `regionCode`. Cannot include `regionCode` itself, cannot duplicate, cannot
     * overlap with another rule's regions.
     */
    additionalRegions?: Array<string> | null;

    /**
     * Optional label for this override group, e.g. "CCPA States". Shown in the
     * dashboard instead of the region codes. Pass null to clear it and fall back to
     * the codes.
     */
    name?: string | null;
  }

  export namespace Region {
    export interface Rule {
      /**
       * Per-category default config for this rule. Every category defined in the
       * top-level `categories[].value` should have an entry here.
       */
      categories: Array<Rule.Category>;

      /**
       * BCP 47 default language for this rule. Must have a matching entry in
       * `translations`. Examples: "en", "en-US", "es", "de".
       */
      language: string;

      /**
       * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
       * default until user rejects (CCPA style).
       */
      mode: 'opt_in' | 'opt_out';

      /**
       * All UI copy, keyed by language. Must include an entry whose `language` matches
       * the rule's `language` field.
       */
      translations: Array<Rule.Translation>;

      /**
       * When true, scripts not classified by services[] are blocked until the user opts
       * in.
       */
      autoblockUnknown?: boolean | null;

      /**
       * When true, the consent modal auto-opens on page load.
       */
      autoShow?: boolean | null;

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      autoShowDismissConfig?: Rule.AutoShowDismissConfig | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: Rule.GuiOptions | null;

      /**
       * When true, the modal is suppressed for known bot user agents.
       */
      hideFromBots?: boolean | null;

      /**
       * When true, the per-service list (services[]) is rendered inside the preferences
       * modal.
       */
      showVendorsInPreferences?: boolean | null;
    }

    export namespace Rule {
      export interface Category {
        /**
         * Category value (matches `categories[].value`) this entry configures.
         */
        key: string;

        value: Category.Value;
      }

      export namespace Category {
        export interface Value {
          /**
           * Whether this category is on by default before the user interacts.
           */
          enabled: boolean;

          /**
           * When true, this category defaults off if the browser sends Sec-GPC: 1.
           */
          autoDisableOnGPC?: boolean | null;

          /**
           * When true, the user cannot toggle this category in the preferences modal.
           */
          readOnly?: boolean | null;

          /**
           * When true, the page reloads after this category is toggled so newly-allowed
           * scripts can run.
           */
          reloadPage?: boolean | null;
        }
      }

      export interface Translation {
        /**
         * BCP 47 language tag identifying which translation this entry provides. Examples:
         * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
         */
        language: string;

        value: Translation.Value;
      }

      export namespace Translation {
        export interface Value {
          /**
           * Translated copy for the initial consent modal.
           */
          consentModal?: Value.ConsentModal | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: Value.PreferencesModal | null;
        }

        export namespace Value {
          /**
           * Translated copy for the initial consent modal.
           */
          export interface ConsentModal {
            /**
             * Label for the "accept all" button.
             */
            acceptAllBtn: string;

            /**
             * Body text shown in the consent modal.
             */
            description: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the button that opens the preferences modal.
             */
            showPreferencesBtn: string;

            /**
             * Heading shown at the top of the consent modal.
             */
            title: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel?: string | null;

            /**
             * Optional footer HTML/text shown below the body.
             */
            footer?: string | null;

            /**
             * Optional text shown when the browser is sending Sec-GPC: 1.
             */
            gpcNotification?: string | null;

            /**
             * Link label for the privacy policy (defaults to "Privacy Policy").
             */
            privacyPolicyLabel?: string | null;

            /**
             * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
             * (/legal/privacy) so one config can run across multiple domains. javascript:,
             * data:, and vbscript: schemes are rejected.
             */
            privacyPolicyUrl?: string | null;

            /**
             * Optional message shown when the consent revision has bumped (re-prompt copy).
             */
            revisionMessage?: string | null;

            /**
             * Link label for terms of service (defaults to "Terms of Service").
             */
            termsOfServiceLabel?: string | null;

            /**
             * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
             * relative path only.
             */
            termsOfServiceUrl?: string | null;
          }

          /**
           * Translated copy for the preferences modal.
           */
          export interface PreferencesModal {
            /**
             * Label for the "accept all" button in the preferences modal.
             */
            acceptAllBtn: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the "save my choices" button.
             */
            savePreferencesBtn: string;

            /**
             * Per-category sections plus a leading general section. The server backfills
             * sections for each defined category if absent.
             */
            sections: Array<PreferencesModal.Section>;

            /**
             * Heading for the preferences modal.
             */
            title: string;

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            additionalInfo?: PreferencesModal.AdditionalInfo | null;

            /**
             * Pluralizable label for the "N services" counter (e.g. "Service|Services").
             */
            serviceCounterLabel?: string | null;
          }

          export namespace PreferencesModal {
            export interface Section {
              /**
               * Body text for this preferences-modal section.
               */
              description: string;

              /**
               * Heading for this preferences-modal section.
               */
              title: string;

              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              cookieTable?: Section.CookieTable | null;

              /**
               * Category value this section configures. Use null/omit for the introductory
               * section that applies to no specific category.
               */
              linkedCategory?: string | null;
            }

            export namespace Section {
              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              export interface CookieTable {
                /**
                 * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
                 * purpose).
                 */
                body: Array<CookieTable.Body>;

                /**
                 * Header cells. Same {key,value} shape as rows.
                 */
                headers: Array<CookieTable.Header>;

                /**
                 * Optional table caption.
                 */
                caption?: string | null;
              }

              export namespace CookieTable {
                export interface Body {
                  key: string;

                  value: string;
                }

                export interface Header {
                  key: string;

                  value: string;
                }
              }
            }

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            export interface AdditionalInfo {
              /**
               * Body text for the additional-info block. Supports the rich-text markdown subset
               * used by section descriptions: line breaks, [text](url) links (https:// or
               * relative paths), and **bold**. HTML is stripped.
               */
              body: string;

              /**
               * Heading for the additional-info block.
               */
              title: string;
            }
          }
        }
      }

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      export interface AutoShowDismissConfig {
        /**
         * Pages-viewed threshold when autoShowDismissMode = after_pages.
         */
        pageCount?: number | null;

        /**
         * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
         */
        seconds?: number | null;
      }

      /**
       * Visual options for the modals (layout/position/colors).
       */
      export interface GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        consentModal?: GuiOptions.ConsentModal | null;

        /**
         * Global CSS variable overrides applied to both modals.
         */
        cssVariables?: GuiOptions.CssVariables | null;

        /**
         * Visual options for the per-category preferences modal.
         */
        preferencesModal?: GuiOptions.PreferencesModal | null;
      }

      export namespace GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Which buttons to render in the consent modal and in what arrangement.
           */
          buttonLayout?:
            | 'AcceptAllNecessaryPreferences'
            | 'AcceptAllPreferences'
            | 'AcceptOnly'
            | 'InformationOnly'
            | 'PreferencesOnly'
            | null;

          /**
           * When true, accept and reject buttons share the same visual weight (no
           * primary/secondary).
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Modal layout style (box, bar, cloud, etc.).
           */
          layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

          /**
           * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
           * middle_center).
           */
          position?:
            | 'bottom'
            | 'bottom_center'
            | 'bottom_left'
            | 'bottom_right'
            | 'middle'
            | 'middle_center'
            | 'middle_left'
            | 'middle_right'
            | 'top'
            | 'top_center'
            | 'top_left'
            | 'top_right'
            | null;

          /**
           * Show an X to dismiss the modal without choosing.
           */
          showCloseIcon?: boolean | null;
        }

        /**
         * Global CSS variable overrides applied to both modals.
         */
        export interface CssVariables {
          /**
           * CSS length, e.g. "4px" or "0.25rem".
           */
          buttonBorderRadius?: string | null;

          /**
           * CSS color for the per-category block background in the preferences modal.
           */
          cookieCategoryBlockBg?: string | null;

          /**
           * CSS color for the per-category block background on hover.
           */
          cookieCategoryBlockHoverBg?: string | null;

          /**
           * CSS color for the modal footer background.
           */
          footerBg?: string | null;

          /**
           * CSS color for footer text.
           */
          footerColor?: string | null;

          /**
           * CSS color for footer links.
           */
          footerLinkColor?: string | null;

          /**
           * CSS color for footer links on hover.
           */
          footerLinkHoverColor?: string | null;

          /**
           * CSS color for the modal background.
           */
          modalBg?: string | null;

          /**
           * CSS length for modal corner radius.
           */
          modalBorderRadius?: string | null;

          /**
           * CSS color for the primary button background.
           */
          primaryButtonBg?: string | null;

          /**
           * CSS color for primary button text.
           */
          primaryButtonColor?: string | null;

          /**
           * CSS color for the primary button background on hover.
           */
          primaryButtonHoverBg?: string | null;

          /**
           * CSS color for primary button text on hover.
           */
          primaryButtonHoverColor?: string | null;

          /**
           * CSS color for primary text in the modal body.
           */
          primaryTextColor?: string | null;

          /**
           * CSS color for the secondary button background.
           */
          secondaryButtonBg?: string | null;

          /**
           * CSS color for secondary button text.
           */
          secondaryButtonColor?: string | null;

          /**
           * CSS color for secondary button background on hover.
           */
          secondaryButtonHoverBg?: string | null;

          /**
           * CSS color for secondary button text on hover.
           */
          secondaryButtonHoverColor?: string | null;

          /**
           * CSS color for secondary text in the modal body.
           */
          secondaryTextColor?: string | null;

          /**
           * CSS color for the "on" state of category toggles.
           */
          toggleOnBg?: string | null;
        }

        /**
         * Visual options for the per-category preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Button layout for the preferences modal.
           */
          buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

          /**
           * When true, accept/reject share the same visual weight.
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Preferences modal layout (box, bar, bar_wide).
           */
          layout?: 'bar' | 'bar_wide' | 'box' | null;

          /**
           * Preferences modal anchor (left, right).
           */
          position?: 'left' | 'right' | null;
        }
      }
    }
  }

  export interface Service {
    /**
     * Internal notes shown to admins in the dashboard. Not user-facing.
     */
    internalNotes: string;

    /**
     * Display name for this service in the preferences modal.
     */
    label: string;

    /**
     * Extra category values this service belongs to. Each must match a
     * `categories[].value`.
     */
    additionalCategories?: Array<string> | null;

    /**
     * Primary category value this service belongs to. Must match one of the top-level
     * `categories[].value` entries.
     */
    category?: string | null;

    /**
     * Domains/paths this service matches. Patterns matching the CMP's own scripts
     * (e.g. cdn.oursprivacy.com/cmp-init) are rejected to prevent the CMP blocking
     * itself — use a more specific path like cdn.oursprivacy.com/main.js to block a
     * specific script.
     */
    domainPatterns?: Array<string> | null;
  }
}

export interface ConsentSettingReplaceResponse {
  /**
   * Server-assigned UUID for this consent settings record.
   */
  id: string;

  /**
   * Top-level consent categories (e.g. necessary / analytics / advertising). Server
   * re-stamps `priority` to 0..N on write.
   */
  categories: Array<ConsentSettingReplaceResponse.Category>;

  /**
   * ISO 8601 timestamp when the record was created.
   */
  createdAt: string;

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  default: ConsentSettingReplaceResponse.Default;

  /**
   * Discriminator for the entity type. Always "consentSettings".
   */
  kind: string;

  /**
   * Human-readable name shown in the dashboard.
   */
  name: string;

  /**
   * Per-region rule overrides. The first rule whose `regionCode`/`additionalRegions`
   * includes the user's region wins; otherwise `default` applies.
   */
  regions: Array<ConsentSettingReplaceResponse.Region>;

  /**
   * Per-service entries powering "show vendors" and category-aware blocking.
   */
  services: Array<ConsentSettingReplaceResponse.Service>;

  /**
   * Enabled serves the CMP on its allowed domains and requires at least one.
   * Disabled does not serve the CMP and may have no allowed domains.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the cookie that stores the user's consent state. Defaults to
   * "op_consent".
   */
  consentCookieName?: string | null;

  /**
   * Optional custom CDN domain for serving the CMP script (e.g.
   * consent.example.com).
   */
  customDomain?: string | null;

  /**
   * Cookie/localStorage key for the visitor (device) ID. Must exactly match the web
   * SDK's cookie_names.device_id (default "ours_device_id") so consent and SDK
   * events resolve to the same visitor.
   */
  deviceIdCookieName?: string | null;

  /**
   * Revision counter. Bump this to force users who already consented to see the
   * modal again (the SDK compares the persisted revision against this value).
   */
  revision?: number | null;

  /**
   * CSS class names that opt scripts out of consent blocking. Each entry must be a
   * single class token (no whitespace).
   */
  skipBlockingClassNames?: Array<string> | null;

  /**
   * ISO 8601 timestamp of the last write. Null on a freshly created record.
   */
  updatedAt?: string | null;

  /**
   * Pixel of the WebSource that this CMP is wired into. Setting this to a token that
   * is not a valid WebSource of yours is rejected; use null to clear the link.
   */
  webSDKToken?: string | null;

  /**
   * Domains where this CMP may run. An Enabled CMP requires at least one allowed
   * domain; with none configured, the CMP does not run. Matching domains may share
   * consent across subdomains.
   */
  whitelistDomains?: Array<string> | null;
}

export namespace ConsentSettingReplaceResponse {
  export interface Category {
    /**
     * Human-readable label shown next to the toggle in the preferences modal.
     */
    label: string;

    /**
     * Sort key. Lower numbers render first. Server re-stamps to 0..N on write — send
     * any integer, gaps and duplicates are ironed out.
     */
    priority: number;

    /**
     * Stable identifier referenced by services and translation sections.
     * Conventionally lowercase (e.g. "necessary", "analytics", "advertising").
     */
    value: string;
  }

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  export interface Default {
    /**
     * Per-category default config for this rule. Every category defined in the
     * top-level `categories[].value` should have an entry here.
     */
    categories: Array<Default.Category>;

    /**
     * BCP 47 default language for this rule. Must have a matching entry in
     * `translations`. Examples: "en", "en-US", "es", "de".
     */
    language: string;

    /**
     * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
     * default until user rejects (CCPA style).
     */
    mode: 'opt_in' | 'opt_out';

    /**
     * All UI copy, keyed by language. Must include an entry whose `language` matches
     * the rule's `language` field.
     */
    translations: Array<Default.Translation>;

    /**
     * When true, scripts not classified by services[] are blocked until the user opts
     * in.
     */
    autoblockUnknown?: boolean | null;

    /**
     * When true, the consent modal auto-opens on page load.
     */
    autoShow?: boolean | null;

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    autoShowDismissConfig?: Default.AutoShowDismissConfig | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: Default.GuiOptions | null;

    /**
     * When true, the modal is suppressed for known bot user agents.
     */
    hideFromBots?: boolean | null;

    /**
     * When true, the per-service list (services[]) is rendered inside the preferences
     * modal.
     */
    showVendorsInPreferences?: boolean | null;
  }

  export namespace Default {
    export interface Category {
      /**
       * Category value (matches `categories[].value`) this entry configures.
       */
      key: string;

      value: Category.Value;
    }

    export namespace Category {
      export interface Value {
        /**
         * Whether this category is on by default before the user interacts.
         */
        enabled: boolean;

        /**
         * When true, this category defaults off if the browser sends Sec-GPC: 1.
         */
        autoDisableOnGPC?: boolean | null;

        /**
         * When true, the user cannot toggle this category in the preferences modal.
         */
        readOnly?: boolean | null;

        /**
         * When true, the page reloads after this category is toggled so newly-allowed
         * scripts can run.
         */
        reloadPage?: boolean | null;
      }
    }

    export interface Translation {
      /**
       * BCP 47 language tag identifying which translation this entry provides. Examples:
       * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
       */
      language: string;

      value: Translation.Value;
    }

    export namespace Translation {
      export interface Value {
        /**
         * Translated copy for the initial consent modal.
         */
        consentModal?: Value.ConsentModal | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: Value.PreferencesModal | null;
      }

      export namespace Value {
        /**
         * Translated copy for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Label for the "accept all" button.
           */
          acceptAllBtn: string;

          /**
           * Body text shown in the consent modal.
           */
          description: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the button that opens the preferences modal.
           */
          showPreferencesBtn: string;

          /**
           * Heading shown at the top of the consent modal.
           */
          title: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel?: string | null;

          /**
           * Optional footer HTML/text shown below the body.
           */
          footer?: string | null;

          /**
           * Optional text shown when the browser is sending Sec-GPC: 1.
           */
          gpcNotification?: string | null;

          /**
           * Link label for the privacy policy (defaults to "Privacy Policy").
           */
          privacyPolicyLabel?: string | null;

          /**
           * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
           * (/legal/privacy) so one config can run across multiple domains. javascript:,
           * data:, and vbscript: schemes are rejected.
           */
          privacyPolicyUrl?: string | null;

          /**
           * Optional message shown when the consent revision has bumped (re-prompt copy).
           */
          revisionMessage?: string | null;

          /**
           * Link label for terms of service (defaults to "Terms of Service").
           */
          termsOfServiceLabel?: string | null;

          /**
           * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
           * relative path only.
           */
          termsOfServiceUrl?: string | null;
        }

        /**
         * Translated copy for the preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Label for the "accept all" button in the preferences modal.
           */
          acceptAllBtn: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the "save my choices" button.
           */
          savePreferencesBtn: string;

          /**
           * Per-category sections plus a leading general section. The server backfills
           * sections for each defined category if absent.
           */
          sections: Array<PreferencesModal.Section>;

          /**
           * Heading for the preferences modal.
           */
          title: string;

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          additionalInfo?: PreferencesModal.AdditionalInfo | null;

          /**
           * Pluralizable label for the "N services" counter (e.g. "Service|Services").
           */
          serviceCounterLabel?: string | null;
        }

        export namespace PreferencesModal {
          export interface Section {
            /**
             * Body text for this preferences-modal section.
             */
            description: string;

            /**
             * Heading for this preferences-modal section.
             */
            title: string;

            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            cookieTable?: Section.CookieTable | null;

            /**
             * Category value this section configures. Use null/omit for the introductory
             * section that applies to no specific category.
             */
            linkedCategory?: string | null;
          }

          export namespace Section {
            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            export interface CookieTable {
              /**
               * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
               * purpose).
               */
              body: Array<CookieTable.Body>;

              /**
               * Header cells. Same {key,value} shape as rows.
               */
              headers: Array<CookieTable.Header>;

              /**
               * Optional table caption.
               */
              caption?: string | null;
            }

            export namespace CookieTable {
              export interface Body {
                key: string;

                value: string;
              }

              export interface Header {
                key: string;

                value: string;
              }
            }
          }

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          export interface AdditionalInfo {
            /**
             * Body text for the additional-info block. Supports the rich-text markdown subset
             * used by section descriptions: line breaks, [text](url) links (https:// or
             * relative paths), and **bold**. HTML is stripped.
             */
            body: string;

            /**
             * Heading for the additional-info block.
             */
            title: string;
          }
        }
      }
    }

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    export interface AutoShowDismissConfig {
      /**
       * Pages-viewed threshold when autoShowDismissMode = after_pages.
       */
      pageCount?: number | null;

      /**
       * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
       */
      seconds?: number | null;
    }

    /**
     * Visual options for the modals (layout/position/colors).
     */
    export interface GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      consentModal?: GuiOptions.ConsentModal | null;

      /**
       * Global CSS variable overrides applied to both modals.
       */
      cssVariables?: GuiOptions.CssVariables | null;

      /**
       * Visual options for the per-category preferences modal.
       */
      preferencesModal?: GuiOptions.PreferencesModal | null;
    }

    export namespace GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      export interface ConsentModal {
        /**
         * Which buttons to render in the consent modal and in what arrangement.
         */
        buttonLayout?:
          | 'AcceptAllNecessaryPreferences'
          | 'AcceptAllPreferences'
          | 'AcceptOnly'
          | 'InformationOnly'
          | 'PreferencesOnly'
          | null;

        /**
         * When true, accept and reject buttons share the same visual weight (no
         * primary/secondary).
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Modal layout style (box, bar, cloud, etc.).
         */
        layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

        /**
         * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
         * middle_center).
         */
        position?:
          | 'bottom'
          | 'bottom_center'
          | 'bottom_left'
          | 'bottom_right'
          | 'middle'
          | 'middle_center'
          | 'middle_left'
          | 'middle_right'
          | 'top'
          | 'top_center'
          | 'top_left'
          | 'top_right'
          | null;

        /**
         * Show an X to dismiss the modal without choosing.
         */
        showCloseIcon?: boolean | null;
      }

      /**
       * Global CSS variable overrides applied to both modals.
       */
      export interface CssVariables {
        /**
         * CSS length, e.g. "4px" or "0.25rem".
         */
        buttonBorderRadius?: string | null;

        /**
         * CSS color for the per-category block background in the preferences modal.
         */
        cookieCategoryBlockBg?: string | null;

        /**
         * CSS color for the per-category block background on hover.
         */
        cookieCategoryBlockHoverBg?: string | null;

        /**
         * CSS color for the modal footer background.
         */
        footerBg?: string | null;

        /**
         * CSS color for footer text.
         */
        footerColor?: string | null;

        /**
         * CSS color for footer links.
         */
        footerLinkColor?: string | null;

        /**
         * CSS color for footer links on hover.
         */
        footerLinkHoverColor?: string | null;

        /**
         * CSS color for the modal background.
         */
        modalBg?: string | null;

        /**
         * CSS length for modal corner radius.
         */
        modalBorderRadius?: string | null;

        /**
         * CSS color for the primary button background.
         */
        primaryButtonBg?: string | null;

        /**
         * CSS color for primary button text.
         */
        primaryButtonColor?: string | null;

        /**
         * CSS color for the primary button background on hover.
         */
        primaryButtonHoverBg?: string | null;

        /**
         * CSS color for primary button text on hover.
         */
        primaryButtonHoverColor?: string | null;

        /**
         * CSS color for primary text in the modal body.
         */
        primaryTextColor?: string | null;

        /**
         * CSS color for the secondary button background.
         */
        secondaryButtonBg?: string | null;

        /**
         * CSS color for secondary button text.
         */
        secondaryButtonColor?: string | null;

        /**
         * CSS color for secondary button background on hover.
         */
        secondaryButtonHoverBg?: string | null;

        /**
         * CSS color for secondary button text on hover.
         */
        secondaryButtonHoverColor?: string | null;

        /**
         * CSS color for secondary text in the modal body.
         */
        secondaryTextColor?: string | null;

        /**
         * CSS color for the "on" state of category toggles.
         */
        toggleOnBg?: string | null;
      }

      /**
       * Visual options for the per-category preferences modal.
       */
      export interface PreferencesModal {
        /**
         * Button layout for the preferences modal.
         */
        buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

        /**
         * When true, accept/reject share the same visual weight.
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Preferences modal layout (box, bar, bar_wide).
         */
        layout?: 'bar' | 'bar_wide' | 'box' | null;

        /**
         * Preferences modal anchor (left, right).
         */
        position?: 'left' | 'right' | null;
      }
    }
  }

  export interface Region {
    /**
     * Region this rule applies to. Use ISO 3166-1 alpha-2 country code ("US", "DE",
     * "BR") or country-subdivision code ("US-CA", "GB-ENG", "CA-ON"). Each region code
     * may appear in only one rule across `regions[]`.
     */
    regionCode: string;

    rule: Region.Rule;

    /**
     * Other region codes that should reuse this rule. Same code-format rules as
     * `regionCode`. Cannot include `regionCode` itself, cannot duplicate, cannot
     * overlap with another rule's regions.
     */
    additionalRegions?: Array<string> | null;

    /**
     * Optional label for this override group, e.g. "CCPA States". Shown in the
     * dashboard instead of the region codes. Pass null to clear it and fall back to
     * the codes.
     */
    name?: string | null;
  }

  export namespace Region {
    export interface Rule {
      /**
       * Per-category default config for this rule. Every category defined in the
       * top-level `categories[].value` should have an entry here.
       */
      categories: Array<Rule.Category>;

      /**
       * BCP 47 default language for this rule. Must have a matching entry in
       * `translations`. Examples: "en", "en-US", "es", "de".
       */
      language: string;

      /**
       * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
       * default until user rejects (CCPA style).
       */
      mode: 'opt_in' | 'opt_out';

      /**
       * All UI copy, keyed by language. Must include an entry whose `language` matches
       * the rule's `language` field.
       */
      translations: Array<Rule.Translation>;

      /**
       * When true, scripts not classified by services[] are blocked until the user opts
       * in.
       */
      autoblockUnknown?: boolean | null;

      /**
       * When true, the consent modal auto-opens on page load.
       */
      autoShow?: boolean | null;

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      autoShowDismissConfig?: Rule.AutoShowDismissConfig | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: Rule.GuiOptions | null;

      /**
       * When true, the modal is suppressed for known bot user agents.
       */
      hideFromBots?: boolean | null;

      /**
       * When true, the per-service list (services[]) is rendered inside the preferences
       * modal.
       */
      showVendorsInPreferences?: boolean | null;
    }

    export namespace Rule {
      export interface Category {
        /**
         * Category value (matches `categories[].value`) this entry configures.
         */
        key: string;

        value: Category.Value;
      }

      export namespace Category {
        export interface Value {
          /**
           * Whether this category is on by default before the user interacts.
           */
          enabled: boolean;

          /**
           * When true, this category defaults off if the browser sends Sec-GPC: 1.
           */
          autoDisableOnGPC?: boolean | null;

          /**
           * When true, the user cannot toggle this category in the preferences modal.
           */
          readOnly?: boolean | null;

          /**
           * When true, the page reloads after this category is toggled so newly-allowed
           * scripts can run.
           */
          reloadPage?: boolean | null;
        }
      }

      export interface Translation {
        /**
         * BCP 47 language tag identifying which translation this entry provides. Examples:
         * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
         */
        language: string;

        value: Translation.Value;
      }

      export namespace Translation {
        export interface Value {
          /**
           * Translated copy for the initial consent modal.
           */
          consentModal?: Value.ConsentModal | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: Value.PreferencesModal | null;
        }

        export namespace Value {
          /**
           * Translated copy for the initial consent modal.
           */
          export interface ConsentModal {
            /**
             * Label for the "accept all" button.
             */
            acceptAllBtn: string;

            /**
             * Body text shown in the consent modal.
             */
            description: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the button that opens the preferences modal.
             */
            showPreferencesBtn: string;

            /**
             * Heading shown at the top of the consent modal.
             */
            title: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel?: string | null;

            /**
             * Optional footer HTML/text shown below the body.
             */
            footer?: string | null;

            /**
             * Optional text shown when the browser is sending Sec-GPC: 1.
             */
            gpcNotification?: string | null;

            /**
             * Link label for the privacy policy (defaults to "Privacy Policy").
             */
            privacyPolicyLabel?: string | null;

            /**
             * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
             * (/legal/privacy) so one config can run across multiple domains. javascript:,
             * data:, and vbscript: schemes are rejected.
             */
            privacyPolicyUrl?: string | null;

            /**
             * Optional message shown when the consent revision has bumped (re-prompt copy).
             */
            revisionMessage?: string | null;

            /**
             * Link label for terms of service (defaults to "Terms of Service").
             */
            termsOfServiceLabel?: string | null;

            /**
             * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
             * relative path only.
             */
            termsOfServiceUrl?: string | null;
          }

          /**
           * Translated copy for the preferences modal.
           */
          export interface PreferencesModal {
            /**
             * Label for the "accept all" button in the preferences modal.
             */
            acceptAllBtn: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the "save my choices" button.
             */
            savePreferencesBtn: string;

            /**
             * Per-category sections plus a leading general section. The server backfills
             * sections for each defined category if absent.
             */
            sections: Array<PreferencesModal.Section>;

            /**
             * Heading for the preferences modal.
             */
            title: string;

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            additionalInfo?: PreferencesModal.AdditionalInfo | null;

            /**
             * Pluralizable label for the "N services" counter (e.g. "Service|Services").
             */
            serviceCounterLabel?: string | null;
          }

          export namespace PreferencesModal {
            export interface Section {
              /**
               * Body text for this preferences-modal section.
               */
              description: string;

              /**
               * Heading for this preferences-modal section.
               */
              title: string;

              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              cookieTable?: Section.CookieTable | null;

              /**
               * Category value this section configures. Use null/omit for the introductory
               * section that applies to no specific category.
               */
              linkedCategory?: string | null;
            }

            export namespace Section {
              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              export interface CookieTable {
                /**
                 * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
                 * purpose).
                 */
                body: Array<CookieTable.Body>;

                /**
                 * Header cells. Same {key,value} shape as rows.
                 */
                headers: Array<CookieTable.Header>;

                /**
                 * Optional table caption.
                 */
                caption?: string | null;
              }

              export namespace CookieTable {
                export interface Body {
                  key: string;

                  value: string;
                }

                export interface Header {
                  key: string;

                  value: string;
                }
              }
            }

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            export interface AdditionalInfo {
              /**
               * Body text for the additional-info block. Supports the rich-text markdown subset
               * used by section descriptions: line breaks, [text](url) links (https:// or
               * relative paths), and **bold**. HTML is stripped.
               */
              body: string;

              /**
               * Heading for the additional-info block.
               */
              title: string;
            }
          }
        }
      }

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      export interface AutoShowDismissConfig {
        /**
         * Pages-viewed threshold when autoShowDismissMode = after_pages.
         */
        pageCount?: number | null;

        /**
         * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
         */
        seconds?: number | null;
      }

      /**
       * Visual options for the modals (layout/position/colors).
       */
      export interface GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        consentModal?: GuiOptions.ConsentModal | null;

        /**
         * Global CSS variable overrides applied to both modals.
         */
        cssVariables?: GuiOptions.CssVariables | null;

        /**
         * Visual options for the per-category preferences modal.
         */
        preferencesModal?: GuiOptions.PreferencesModal | null;
      }

      export namespace GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Which buttons to render in the consent modal and in what arrangement.
           */
          buttonLayout?:
            | 'AcceptAllNecessaryPreferences'
            | 'AcceptAllPreferences'
            | 'AcceptOnly'
            | 'InformationOnly'
            | 'PreferencesOnly'
            | null;

          /**
           * When true, accept and reject buttons share the same visual weight (no
           * primary/secondary).
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Modal layout style (box, bar, cloud, etc.).
           */
          layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

          /**
           * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
           * middle_center).
           */
          position?:
            | 'bottom'
            | 'bottom_center'
            | 'bottom_left'
            | 'bottom_right'
            | 'middle'
            | 'middle_center'
            | 'middle_left'
            | 'middle_right'
            | 'top'
            | 'top_center'
            | 'top_left'
            | 'top_right'
            | null;

          /**
           * Show an X to dismiss the modal without choosing.
           */
          showCloseIcon?: boolean | null;
        }

        /**
         * Global CSS variable overrides applied to both modals.
         */
        export interface CssVariables {
          /**
           * CSS length, e.g. "4px" or "0.25rem".
           */
          buttonBorderRadius?: string | null;

          /**
           * CSS color for the per-category block background in the preferences modal.
           */
          cookieCategoryBlockBg?: string | null;

          /**
           * CSS color for the per-category block background on hover.
           */
          cookieCategoryBlockHoverBg?: string | null;

          /**
           * CSS color for the modal footer background.
           */
          footerBg?: string | null;

          /**
           * CSS color for footer text.
           */
          footerColor?: string | null;

          /**
           * CSS color for footer links.
           */
          footerLinkColor?: string | null;

          /**
           * CSS color for footer links on hover.
           */
          footerLinkHoverColor?: string | null;

          /**
           * CSS color for the modal background.
           */
          modalBg?: string | null;

          /**
           * CSS length for modal corner radius.
           */
          modalBorderRadius?: string | null;

          /**
           * CSS color for the primary button background.
           */
          primaryButtonBg?: string | null;

          /**
           * CSS color for primary button text.
           */
          primaryButtonColor?: string | null;

          /**
           * CSS color for the primary button background on hover.
           */
          primaryButtonHoverBg?: string | null;

          /**
           * CSS color for primary button text on hover.
           */
          primaryButtonHoverColor?: string | null;

          /**
           * CSS color for primary text in the modal body.
           */
          primaryTextColor?: string | null;

          /**
           * CSS color for the secondary button background.
           */
          secondaryButtonBg?: string | null;

          /**
           * CSS color for secondary button text.
           */
          secondaryButtonColor?: string | null;

          /**
           * CSS color for secondary button background on hover.
           */
          secondaryButtonHoverBg?: string | null;

          /**
           * CSS color for secondary button text on hover.
           */
          secondaryButtonHoverColor?: string | null;

          /**
           * CSS color for secondary text in the modal body.
           */
          secondaryTextColor?: string | null;

          /**
           * CSS color for the "on" state of category toggles.
           */
          toggleOnBg?: string | null;
        }

        /**
         * Visual options for the per-category preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Button layout for the preferences modal.
           */
          buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

          /**
           * When true, accept/reject share the same visual weight.
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Preferences modal layout (box, bar, bar_wide).
           */
          layout?: 'bar' | 'bar_wide' | 'box' | null;

          /**
           * Preferences modal anchor (left, right).
           */
          position?: 'left' | 'right' | null;
        }
      }
    }
  }

  export interface Service {
    /**
     * Internal notes shown to admins in the dashboard. Not user-facing.
     */
    internalNotes: string;

    /**
     * Display name for this service in the preferences modal.
     */
    label: string;

    /**
     * Extra category values this service belongs to. Each must match a
     * `categories[].value`.
     */
    additionalCategories?: Array<string> | null;

    /**
     * Primary category value this service belongs to. Must match one of the top-level
     * `categories[].value` entries.
     */
    category?: string | null;

    /**
     * Domains/paths this service matches. Patterns matching the CMP's own scripts
     * (e.g. cdn.oursprivacy.com/cmp-init) are rejected to prevent the CMP blocking
     * itself — use a more specific path like cdn.oursprivacy.com/main.js to block a
     * specific script.
     */
    domainPatterns?: Array<string> | null;
  }
}

export interface ConsentSettingUpdateResponse {
  /**
   * Server-assigned UUID for this consent settings record.
   */
  id: string;

  /**
   * Top-level consent categories (e.g. necessary / analytics / advertising). Server
   * re-stamps `priority` to 0..N on write.
   */
  categories: Array<ConsentSettingUpdateResponse.Category>;

  /**
   * ISO 8601 timestamp when the record was created.
   */
  createdAt: string;

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  default: ConsentSettingUpdateResponse.Default;

  /**
   * Discriminator for the entity type. Always "consentSettings".
   */
  kind: string;

  /**
   * Human-readable name shown in the dashboard.
   */
  name: string;

  /**
   * Per-region rule overrides. The first rule whose `regionCode`/`additionalRegions`
   * includes the user's region wins; otherwise `default` applies.
   */
  regions: Array<ConsentSettingUpdateResponse.Region>;

  /**
   * Per-service entries powering "show vendors" and category-aware blocking.
   */
  services: Array<ConsentSettingUpdateResponse.Service>;

  /**
   * Enabled serves the CMP on its allowed domains and requires at least one.
   * Disabled does not serve the CMP and may have no allowed domains.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the cookie that stores the user's consent state. Defaults to
   * "op_consent".
   */
  consentCookieName?: string | null;

  /**
   * Optional custom CDN domain for serving the CMP script (e.g.
   * consent.example.com).
   */
  customDomain?: string | null;

  /**
   * Cookie/localStorage key for the visitor (device) ID. Must exactly match the web
   * SDK's cookie_names.device_id (default "ours_device_id") so consent and SDK
   * events resolve to the same visitor.
   */
  deviceIdCookieName?: string | null;

  /**
   * Revision counter. Bump this to force users who already consented to see the
   * modal again (the SDK compares the persisted revision against this value).
   */
  revision?: number | null;

  /**
   * CSS class names that opt scripts out of consent blocking. Each entry must be a
   * single class token (no whitespace).
   */
  skipBlockingClassNames?: Array<string> | null;

  /**
   * ISO 8601 timestamp of the last write. Null on a freshly created record.
   */
  updatedAt?: string | null;

  /**
   * Pixel of the WebSource that this CMP is wired into. Setting this to a token that
   * is not a valid WebSource of yours is rejected; use null to clear the link.
   */
  webSDKToken?: string | null;

  /**
   * Domains where this CMP may run. An Enabled CMP requires at least one allowed
   * domain; with none configured, the CMP does not run. Matching domains may share
   * consent across subdomains.
   */
  whitelistDomains?: Array<string> | null;
}

export namespace ConsentSettingUpdateResponse {
  export interface Category {
    /**
     * Human-readable label shown next to the toggle in the preferences modal.
     */
    label: string;

    /**
     * Sort key. Lower numbers render first. Server re-stamps to 0..N on write — send
     * any integer, gaps and duplicates are ironed out.
     */
    priority: number;

    /**
     * Stable identifier referenced by services and translation sections.
     * Conventionally lowercase (e.g. "necessary", "analytics", "advertising").
     */
    value: string;
  }

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  export interface Default {
    /**
     * Per-category default config for this rule. Every category defined in the
     * top-level `categories[].value` should have an entry here.
     */
    categories: Array<Default.Category>;

    /**
     * BCP 47 default language for this rule. Must have a matching entry in
     * `translations`. Examples: "en", "en-US", "es", "de".
     */
    language: string;

    /**
     * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
     * default until user rejects (CCPA style).
     */
    mode: 'opt_in' | 'opt_out';

    /**
     * All UI copy, keyed by language. Must include an entry whose `language` matches
     * the rule's `language` field.
     */
    translations: Array<Default.Translation>;

    /**
     * When true, scripts not classified by services[] are blocked until the user opts
     * in.
     */
    autoblockUnknown?: boolean | null;

    /**
     * When true, the consent modal auto-opens on page load.
     */
    autoShow?: boolean | null;

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    autoShowDismissConfig?: Default.AutoShowDismissConfig | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: Default.GuiOptions | null;

    /**
     * When true, the modal is suppressed for known bot user agents.
     */
    hideFromBots?: boolean | null;

    /**
     * When true, the per-service list (services[]) is rendered inside the preferences
     * modal.
     */
    showVendorsInPreferences?: boolean | null;
  }

  export namespace Default {
    export interface Category {
      /**
       * Category value (matches `categories[].value`) this entry configures.
       */
      key: string;

      value: Category.Value;
    }

    export namespace Category {
      export interface Value {
        /**
         * Whether this category is on by default before the user interacts.
         */
        enabled: boolean;

        /**
         * When true, this category defaults off if the browser sends Sec-GPC: 1.
         */
        autoDisableOnGPC?: boolean | null;

        /**
         * When true, the user cannot toggle this category in the preferences modal.
         */
        readOnly?: boolean | null;

        /**
         * When true, the page reloads after this category is toggled so newly-allowed
         * scripts can run.
         */
        reloadPage?: boolean | null;
      }
    }

    export interface Translation {
      /**
       * BCP 47 language tag identifying which translation this entry provides. Examples:
       * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
       */
      language: string;

      value: Translation.Value;
    }

    export namespace Translation {
      export interface Value {
        /**
         * Translated copy for the initial consent modal.
         */
        consentModal?: Value.ConsentModal | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: Value.PreferencesModal | null;
      }

      export namespace Value {
        /**
         * Translated copy for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Label for the "accept all" button.
           */
          acceptAllBtn: string;

          /**
           * Body text shown in the consent modal.
           */
          description: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the button that opens the preferences modal.
           */
          showPreferencesBtn: string;

          /**
           * Heading shown at the top of the consent modal.
           */
          title: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel?: string | null;

          /**
           * Optional footer HTML/text shown below the body.
           */
          footer?: string | null;

          /**
           * Optional text shown when the browser is sending Sec-GPC: 1.
           */
          gpcNotification?: string | null;

          /**
           * Link label for the privacy policy (defaults to "Privacy Policy").
           */
          privacyPolicyLabel?: string | null;

          /**
           * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
           * (/legal/privacy) so one config can run across multiple domains. javascript:,
           * data:, and vbscript: schemes are rejected.
           */
          privacyPolicyUrl?: string | null;

          /**
           * Optional message shown when the consent revision has bumped (re-prompt copy).
           */
          revisionMessage?: string | null;

          /**
           * Link label for terms of service (defaults to "Terms of Service").
           */
          termsOfServiceLabel?: string | null;

          /**
           * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
           * relative path only.
           */
          termsOfServiceUrl?: string | null;
        }

        /**
         * Translated copy for the preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Label for the "accept all" button in the preferences modal.
           */
          acceptAllBtn: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the "save my choices" button.
           */
          savePreferencesBtn: string;

          /**
           * Per-category sections plus a leading general section. The server backfills
           * sections for each defined category if absent.
           */
          sections: Array<PreferencesModal.Section>;

          /**
           * Heading for the preferences modal.
           */
          title: string;

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          additionalInfo?: PreferencesModal.AdditionalInfo | null;

          /**
           * Pluralizable label for the "N services" counter (e.g. "Service|Services").
           */
          serviceCounterLabel?: string | null;
        }

        export namespace PreferencesModal {
          export interface Section {
            /**
             * Body text for this preferences-modal section.
             */
            description: string;

            /**
             * Heading for this preferences-modal section.
             */
            title: string;

            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            cookieTable?: Section.CookieTable | null;

            /**
             * Category value this section configures. Use null/omit for the introductory
             * section that applies to no specific category.
             */
            linkedCategory?: string | null;
          }

          export namespace Section {
            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            export interface CookieTable {
              /**
               * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
               * purpose).
               */
              body: Array<CookieTable.Body>;

              /**
               * Header cells. Same {key,value} shape as rows.
               */
              headers: Array<CookieTable.Header>;

              /**
               * Optional table caption.
               */
              caption?: string | null;
            }

            export namespace CookieTable {
              export interface Body {
                key: string;

                value: string;
              }

              export interface Header {
                key: string;

                value: string;
              }
            }
          }

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          export interface AdditionalInfo {
            /**
             * Body text for the additional-info block. Supports the rich-text markdown subset
             * used by section descriptions: line breaks, [text](url) links (https:// or
             * relative paths), and **bold**. HTML is stripped.
             */
            body: string;

            /**
             * Heading for the additional-info block.
             */
            title: string;
          }
        }
      }
    }

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    export interface AutoShowDismissConfig {
      /**
       * Pages-viewed threshold when autoShowDismissMode = after_pages.
       */
      pageCount?: number | null;

      /**
       * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
       */
      seconds?: number | null;
    }

    /**
     * Visual options for the modals (layout/position/colors).
     */
    export interface GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      consentModal?: GuiOptions.ConsentModal | null;

      /**
       * Global CSS variable overrides applied to both modals.
       */
      cssVariables?: GuiOptions.CssVariables | null;

      /**
       * Visual options for the per-category preferences modal.
       */
      preferencesModal?: GuiOptions.PreferencesModal | null;
    }

    export namespace GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      export interface ConsentModal {
        /**
         * Which buttons to render in the consent modal and in what arrangement.
         */
        buttonLayout?:
          | 'AcceptAllNecessaryPreferences'
          | 'AcceptAllPreferences'
          | 'AcceptOnly'
          | 'InformationOnly'
          | 'PreferencesOnly'
          | null;

        /**
         * When true, accept and reject buttons share the same visual weight (no
         * primary/secondary).
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Modal layout style (box, bar, cloud, etc.).
         */
        layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

        /**
         * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
         * middle_center).
         */
        position?:
          | 'bottom'
          | 'bottom_center'
          | 'bottom_left'
          | 'bottom_right'
          | 'middle'
          | 'middle_center'
          | 'middle_left'
          | 'middle_right'
          | 'top'
          | 'top_center'
          | 'top_left'
          | 'top_right'
          | null;

        /**
         * Show an X to dismiss the modal without choosing.
         */
        showCloseIcon?: boolean | null;
      }

      /**
       * Global CSS variable overrides applied to both modals.
       */
      export interface CssVariables {
        /**
         * CSS length, e.g. "4px" or "0.25rem".
         */
        buttonBorderRadius?: string | null;

        /**
         * CSS color for the per-category block background in the preferences modal.
         */
        cookieCategoryBlockBg?: string | null;

        /**
         * CSS color for the per-category block background on hover.
         */
        cookieCategoryBlockHoverBg?: string | null;

        /**
         * CSS color for the modal footer background.
         */
        footerBg?: string | null;

        /**
         * CSS color for footer text.
         */
        footerColor?: string | null;

        /**
         * CSS color for footer links.
         */
        footerLinkColor?: string | null;

        /**
         * CSS color for footer links on hover.
         */
        footerLinkHoverColor?: string | null;

        /**
         * CSS color for the modal background.
         */
        modalBg?: string | null;

        /**
         * CSS length for modal corner radius.
         */
        modalBorderRadius?: string | null;

        /**
         * CSS color for the primary button background.
         */
        primaryButtonBg?: string | null;

        /**
         * CSS color for primary button text.
         */
        primaryButtonColor?: string | null;

        /**
         * CSS color for the primary button background on hover.
         */
        primaryButtonHoverBg?: string | null;

        /**
         * CSS color for primary button text on hover.
         */
        primaryButtonHoverColor?: string | null;

        /**
         * CSS color for primary text in the modal body.
         */
        primaryTextColor?: string | null;

        /**
         * CSS color for the secondary button background.
         */
        secondaryButtonBg?: string | null;

        /**
         * CSS color for secondary button text.
         */
        secondaryButtonColor?: string | null;

        /**
         * CSS color for secondary button background on hover.
         */
        secondaryButtonHoverBg?: string | null;

        /**
         * CSS color for secondary button text on hover.
         */
        secondaryButtonHoverColor?: string | null;

        /**
         * CSS color for secondary text in the modal body.
         */
        secondaryTextColor?: string | null;

        /**
         * CSS color for the "on" state of category toggles.
         */
        toggleOnBg?: string | null;
      }

      /**
       * Visual options for the per-category preferences modal.
       */
      export interface PreferencesModal {
        /**
         * Button layout for the preferences modal.
         */
        buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

        /**
         * When true, accept/reject share the same visual weight.
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Preferences modal layout (box, bar, bar_wide).
         */
        layout?: 'bar' | 'bar_wide' | 'box' | null;

        /**
         * Preferences modal anchor (left, right).
         */
        position?: 'left' | 'right' | null;
      }
    }
  }

  export interface Region {
    /**
     * Region this rule applies to. Use ISO 3166-1 alpha-2 country code ("US", "DE",
     * "BR") or country-subdivision code ("US-CA", "GB-ENG", "CA-ON"). Each region code
     * may appear in only one rule across `regions[]`.
     */
    regionCode: string;

    rule: Region.Rule;

    /**
     * Other region codes that should reuse this rule. Same code-format rules as
     * `regionCode`. Cannot include `regionCode` itself, cannot duplicate, cannot
     * overlap with another rule's regions.
     */
    additionalRegions?: Array<string> | null;

    /**
     * Optional label for this override group, e.g. "CCPA States". Shown in the
     * dashboard instead of the region codes. Pass null to clear it and fall back to
     * the codes.
     */
    name?: string | null;
  }

  export namespace Region {
    export interface Rule {
      /**
       * Per-category default config for this rule. Every category defined in the
       * top-level `categories[].value` should have an entry here.
       */
      categories: Array<Rule.Category>;

      /**
       * BCP 47 default language for this rule. Must have a matching entry in
       * `translations`. Examples: "en", "en-US", "es", "de".
       */
      language: string;

      /**
       * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
       * default until user rejects (CCPA style).
       */
      mode: 'opt_in' | 'opt_out';

      /**
       * All UI copy, keyed by language. Must include an entry whose `language` matches
       * the rule's `language` field.
       */
      translations: Array<Rule.Translation>;

      /**
       * When true, scripts not classified by services[] are blocked until the user opts
       * in.
       */
      autoblockUnknown?: boolean | null;

      /**
       * When true, the consent modal auto-opens on page load.
       */
      autoShow?: boolean | null;

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      autoShowDismissConfig?: Rule.AutoShowDismissConfig | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: Rule.GuiOptions | null;

      /**
       * When true, the modal is suppressed for known bot user agents.
       */
      hideFromBots?: boolean | null;

      /**
       * When true, the per-service list (services[]) is rendered inside the preferences
       * modal.
       */
      showVendorsInPreferences?: boolean | null;
    }

    export namespace Rule {
      export interface Category {
        /**
         * Category value (matches `categories[].value`) this entry configures.
         */
        key: string;

        value: Category.Value;
      }

      export namespace Category {
        export interface Value {
          /**
           * Whether this category is on by default before the user interacts.
           */
          enabled: boolean;

          /**
           * When true, this category defaults off if the browser sends Sec-GPC: 1.
           */
          autoDisableOnGPC?: boolean | null;

          /**
           * When true, the user cannot toggle this category in the preferences modal.
           */
          readOnly?: boolean | null;

          /**
           * When true, the page reloads after this category is toggled so newly-allowed
           * scripts can run.
           */
          reloadPage?: boolean | null;
        }
      }

      export interface Translation {
        /**
         * BCP 47 language tag identifying which translation this entry provides. Examples:
         * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
         */
        language: string;

        value: Translation.Value;
      }

      export namespace Translation {
        export interface Value {
          /**
           * Translated copy for the initial consent modal.
           */
          consentModal?: Value.ConsentModal | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: Value.PreferencesModal | null;
        }

        export namespace Value {
          /**
           * Translated copy for the initial consent modal.
           */
          export interface ConsentModal {
            /**
             * Label for the "accept all" button.
             */
            acceptAllBtn: string;

            /**
             * Body text shown in the consent modal.
             */
            description: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the button that opens the preferences modal.
             */
            showPreferencesBtn: string;

            /**
             * Heading shown at the top of the consent modal.
             */
            title: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel?: string | null;

            /**
             * Optional footer HTML/text shown below the body.
             */
            footer?: string | null;

            /**
             * Optional text shown when the browser is sending Sec-GPC: 1.
             */
            gpcNotification?: string | null;

            /**
             * Link label for the privacy policy (defaults to "Privacy Policy").
             */
            privacyPolicyLabel?: string | null;

            /**
             * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
             * (/legal/privacy) so one config can run across multiple domains. javascript:,
             * data:, and vbscript: schemes are rejected.
             */
            privacyPolicyUrl?: string | null;

            /**
             * Optional message shown when the consent revision has bumped (re-prompt copy).
             */
            revisionMessage?: string | null;

            /**
             * Link label for terms of service (defaults to "Terms of Service").
             */
            termsOfServiceLabel?: string | null;

            /**
             * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
             * relative path only.
             */
            termsOfServiceUrl?: string | null;
          }

          /**
           * Translated copy for the preferences modal.
           */
          export interface PreferencesModal {
            /**
             * Label for the "accept all" button in the preferences modal.
             */
            acceptAllBtn: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the "save my choices" button.
             */
            savePreferencesBtn: string;

            /**
             * Per-category sections plus a leading general section. The server backfills
             * sections for each defined category if absent.
             */
            sections: Array<PreferencesModal.Section>;

            /**
             * Heading for the preferences modal.
             */
            title: string;

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            additionalInfo?: PreferencesModal.AdditionalInfo | null;

            /**
             * Pluralizable label for the "N services" counter (e.g. "Service|Services").
             */
            serviceCounterLabel?: string | null;
          }

          export namespace PreferencesModal {
            export interface Section {
              /**
               * Body text for this preferences-modal section.
               */
              description: string;

              /**
               * Heading for this preferences-modal section.
               */
              title: string;

              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              cookieTable?: Section.CookieTable | null;

              /**
               * Category value this section configures. Use null/omit for the introductory
               * section that applies to no specific category.
               */
              linkedCategory?: string | null;
            }

            export namespace Section {
              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              export interface CookieTable {
                /**
                 * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
                 * purpose).
                 */
                body: Array<CookieTable.Body>;

                /**
                 * Header cells. Same {key,value} shape as rows.
                 */
                headers: Array<CookieTable.Header>;

                /**
                 * Optional table caption.
                 */
                caption?: string | null;
              }

              export namespace CookieTable {
                export interface Body {
                  key: string;

                  value: string;
                }

                export interface Header {
                  key: string;

                  value: string;
                }
              }
            }

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            export interface AdditionalInfo {
              /**
               * Body text for the additional-info block. Supports the rich-text markdown subset
               * used by section descriptions: line breaks, [text](url) links (https:// or
               * relative paths), and **bold**. HTML is stripped.
               */
              body: string;

              /**
               * Heading for the additional-info block.
               */
              title: string;
            }
          }
        }
      }

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      export interface AutoShowDismissConfig {
        /**
         * Pages-viewed threshold when autoShowDismissMode = after_pages.
         */
        pageCount?: number | null;

        /**
         * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
         */
        seconds?: number | null;
      }

      /**
       * Visual options for the modals (layout/position/colors).
       */
      export interface GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        consentModal?: GuiOptions.ConsentModal | null;

        /**
         * Global CSS variable overrides applied to both modals.
         */
        cssVariables?: GuiOptions.CssVariables | null;

        /**
         * Visual options for the per-category preferences modal.
         */
        preferencesModal?: GuiOptions.PreferencesModal | null;
      }

      export namespace GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Which buttons to render in the consent modal and in what arrangement.
           */
          buttonLayout?:
            | 'AcceptAllNecessaryPreferences'
            | 'AcceptAllPreferences'
            | 'AcceptOnly'
            | 'InformationOnly'
            | 'PreferencesOnly'
            | null;

          /**
           * When true, accept and reject buttons share the same visual weight (no
           * primary/secondary).
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Modal layout style (box, bar, cloud, etc.).
           */
          layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

          /**
           * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
           * middle_center).
           */
          position?:
            | 'bottom'
            | 'bottom_center'
            | 'bottom_left'
            | 'bottom_right'
            | 'middle'
            | 'middle_center'
            | 'middle_left'
            | 'middle_right'
            | 'top'
            | 'top_center'
            | 'top_left'
            | 'top_right'
            | null;

          /**
           * Show an X to dismiss the modal without choosing.
           */
          showCloseIcon?: boolean | null;
        }

        /**
         * Global CSS variable overrides applied to both modals.
         */
        export interface CssVariables {
          /**
           * CSS length, e.g. "4px" or "0.25rem".
           */
          buttonBorderRadius?: string | null;

          /**
           * CSS color for the per-category block background in the preferences modal.
           */
          cookieCategoryBlockBg?: string | null;

          /**
           * CSS color for the per-category block background on hover.
           */
          cookieCategoryBlockHoverBg?: string | null;

          /**
           * CSS color for the modal footer background.
           */
          footerBg?: string | null;

          /**
           * CSS color for footer text.
           */
          footerColor?: string | null;

          /**
           * CSS color for footer links.
           */
          footerLinkColor?: string | null;

          /**
           * CSS color for footer links on hover.
           */
          footerLinkHoverColor?: string | null;

          /**
           * CSS color for the modal background.
           */
          modalBg?: string | null;

          /**
           * CSS length for modal corner radius.
           */
          modalBorderRadius?: string | null;

          /**
           * CSS color for the primary button background.
           */
          primaryButtonBg?: string | null;

          /**
           * CSS color for primary button text.
           */
          primaryButtonColor?: string | null;

          /**
           * CSS color for the primary button background on hover.
           */
          primaryButtonHoverBg?: string | null;

          /**
           * CSS color for primary button text on hover.
           */
          primaryButtonHoverColor?: string | null;

          /**
           * CSS color for primary text in the modal body.
           */
          primaryTextColor?: string | null;

          /**
           * CSS color for the secondary button background.
           */
          secondaryButtonBg?: string | null;

          /**
           * CSS color for secondary button text.
           */
          secondaryButtonColor?: string | null;

          /**
           * CSS color for secondary button background on hover.
           */
          secondaryButtonHoverBg?: string | null;

          /**
           * CSS color for secondary button text on hover.
           */
          secondaryButtonHoverColor?: string | null;

          /**
           * CSS color for secondary text in the modal body.
           */
          secondaryTextColor?: string | null;

          /**
           * CSS color for the "on" state of category toggles.
           */
          toggleOnBg?: string | null;
        }

        /**
         * Visual options for the per-category preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Button layout for the preferences modal.
           */
          buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

          /**
           * When true, accept/reject share the same visual weight.
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Preferences modal layout (box, bar, bar_wide).
           */
          layout?: 'bar' | 'bar_wide' | 'box' | null;

          /**
           * Preferences modal anchor (left, right).
           */
          position?: 'left' | 'right' | null;
        }
      }
    }
  }

  export interface Service {
    /**
     * Internal notes shown to admins in the dashboard. Not user-facing.
     */
    internalNotes: string;

    /**
     * Display name for this service in the preferences modal.
     */
    label: string;

    /**
     * Extra category values this service belongs to. Each must match a
     * `categories[].value`.
     */
    additionalCategories?: Array<string> | null;

    /**
     * Primary category value this service belongs to. Must match one of the top-level
     * `categories[].value` entries.
     */
    category?: string | null;

    /**
     * Domains/paths this service matches. Patterns matching the CMP's own scripts
     * (e.g. cdn.oursprivacy.com/cmp-init) are rejected to prevent the CMP blocking
     * itself — use a more specific path like cdn.oursprivacy.com/main.js to block a
     * specific script.
     */
    domainPatterns?: Array<string> | null;
  }
}

export interface ConsentSettingDeleteResponse {
  /**
   * Server-assigned UUID for this consent settings record.
   */
  id: string;

  /**
   * Top-level consent categories (e.g. necessary / analytics / advertising). Server
   * re-stamps `priority` to 0..N on write.
   */
  categories: Array<ConsentSettingDeleteResponse.Category>;

  /**
   * ISO 8601 timestamp when the record was created.
   */
  createdAt: string;

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  default: ConsentSettingDeleteResponse.Default;

  /**
   * Discriminator for the entity type. Always "consentSettings".
   */
  kind: string;

  /**
   * Human-readable name shown in the dashboard.
   */
  name: string;

  /**
   * Per-region rule overrides. The first rule whose `regionCode`/`additionalRegions`
   * includes the user's region wins; otherwise `default` applies.
   */
  regions: Array<ConsentSettingDeleteResponse.Region>;

  /**
   * Per-service entries powering "show vendors" and category-aware blocking.
   */
  services: Array<ConsentSettingDeleteResponse.Service>;

  /**
   * Enabled serves the CMP on its allowed domains and requires at least one.
   * Disabled does not serve the CMP and may have no allowed domains.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the cookie that stores the user's consent state. Defaults to
   * "op_consent".
   */
  consentCookieName?: string | null;

  /**
   * Optional custom CDN domain for serving the CMP script (e.g.
   * consent.example.com).
   */
  customDomain?: string | null;

  /**
   * Cookie/localStorage key for the visitor (device) ID. Must exactly match the web
   * SDK's cookie_names.device_id (default "ours_device_id") so consent and SDK
   * events resolve to the same visitor.
   */
  deviceIdCookieName?: string | null;

  /**
   * Revision counter. Bump this to force users who already consented to see the
   * modal again (the SDK compares the persisted revision against this value).
   */
  revision?: number | null;

  /**
   * CSS class names that opt scripts out of consent blocking. Each entry must be a
   * single class token (no whitespace).
   */
  skipBlockingClassNames?: Array<string> | null;

  /**
   * ISO 8601 timestamp of the last write. Null on a freshly created record.
   */
  updatedAt?: string | null;

  /**
   * Pixel of the WebSource that this CMP is wired into. Setting this to a token that
   * is not a valid WebSource of yours is rejected; use null to clear the link.
   */
  webSDKToken?: string | null;

  /**
   * Domains where this CMP may run. An Enabled CMP requires at least one allowed
   * domain; with none configured, the CMP does not run. Matching domains may share
   * consent across subdomains.
   */
  whitelistDomains?: Array<string> | null;
}

export namespace ConsentSettingDeleteResponse {
  export interface Category {
    /**
     * Human-readable label shown next to the toggle in the preferences modal.
     */
    label: string;

    /**
     * Sort key. Lower numbers render first. Server re-stamps to 0..N on write — send
     * any integer, gaps and duplicates are ironed out.
     */
    priority: number;

    /**
     * Stable identifier referenced by services and translation sections.
     * Conventionally lowercase (e.g. "necessary", "analytics", "advertising").
     */
    value: string;
  }

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  export interface Default {
    /**
     * Per-category default config for this rule. Every category defined in the
     * top-level `categories[].value` should have an entry here.
     */
    categories: Array<Default.Category>;

    /**
     * BCP 47 default language for this rule. Must have a matching entry in
     * `translations`. Examples: "en", "en-US", "es", "de".
     */
    language: string;

    /**
     * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
     * default until user rejects (CCPA style).
     */
    mode: 'opt_in' | 'opt_out';

    /**
     * All UI copy, keyed by language. Must include an entry whose `language` matches
     * the rule's `language` field.
     */
    translations: Array<Default.Translation>;

    /**
     * When true, scripts not classified by services[] are blocked until the user opts
     * in.
     */
    autoblockUnknown?: boolean | null;

    /**
     * When true, the consent modal auto-opens on page load.
     */
    autoShow?: boolean | null;

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    autoShowDismissConfig?: Default.AutoShowDismissConfig | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: Default.GuiOptions | null;

    /**
     * When true, the modal is suppressed for known bot user agents.
     */
    hideFromBots?: boolean | null;

    /**
     * When true, the per-service list (services[]) is rendered inside the preferences
     * modal.
     */
    showVendorsInPreferences?: boolean | null;
  }

  export namespace Default {
    export interface Category {
      /**
       * Category value (matches `categories[].value`) this entry configures.
       */
      key: string;

      value: Category.Value;
    }

    export namespace Category {
      export interface Value {
        /**
         * Whether this category is on by default before the user interacts.
         */
        enabled: boolean;

        /**
         * When true, this category defaults off if the browser sends Sec-GPC: 1.
         */
        autoDisableOnGPC?: boolean | null;

        /**
         * When true, the user cannot toggle this category in the preferences modal.
         */
        readOnly?: boolean | null;

        /**
         * When true, the page reloads after this category is toggled so newly-allowed
         * scripts can run.
         */
        reloadPage?: boolean | null;
      }
    }

    export interface Translation {
      /**
       * BCP 47 language tag identifying which translation this entry provides. Examples:
       * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
       */
      language: string;

      value: Translation.Value;
    }

    export namespace Translation {
      export interface Value {
        /**
         * Translated copy for the initial consent modal.
         */
        consentModal?: Value.ConsentModal | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: Value.PreferencesModal | null;
      }

      export namespace Value {
        /**
         * Translated copy for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Label for the "accept all" button.
           */
          acceptAllBtn: string;

          /**
           * Body text shown in the consent modal.
           */
          description: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the button that opens the preferences modal.
           */
          showPreferencesBtn: string;

          /**
           * Heading shown at the top of the consent modal.
           */
          title: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel?: string | null;

          /**
           * Optional footer HTML/text shown below the body.
           */
          footer?: string | null;

          /**
           * Optional text shown when the browser is sending Sec-GPC: 1.
           */
          gpcNotification?: string | null;

          /**
           * Link label for the privacy policy (defaults to "Privacy Policy").
           */
          privacyPolicyLabel?: string | null;

          /**
           * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
           * (/legal/privacy) so one config can run across multiple domains. javascript:,
           * data:, and vbscript: schemes are rejected.
           */
          privacyPolicyUrl?: string | null;

          /**
           * Optional message shown when the consent revision has bumped (re-prompt copy).
           */
          revisionMessage?: string | null;

          /**
           * Link label for terms of service (defaults to "Terms of Service").
           */
          termsOfServiceLabel?: string | null;

          /**
           * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
           * relative path only.
           */
          termsOfServiceUrl?: string | null;
        }

        /**
         * Translated copy for the preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Label for the "accept all" button in the preferences modal.
           */
          acceptAllBtn: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the "save my choices" button.
           */
          savePreferencesBtn: string;

          /**
           * Per-category sections plus a leading general section. The server backfills
           * sections for each defined category if absent.
           */
          sections: Array<PreferencesModal.Section>;

          /**
           * Heading for the preferences modal.
           */
          title: string;

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          additionalInfo?: PreferencesModal.AdditionalInfo | null;

          /**
           * Pluralizable label for the "N services" counter (e.g. "Service|Services").
           */
          serviceCounterLabel?: string | null;
        }

        export namespace PreferencesModal {
          export interface Section {
            /**
             * Body text for this preferences-modal section.
             */
            description: string;

            /**
             * Heading for this preferences-modal section.
             */
            title: string;

            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            cookieTable?: Section.CookieTable | null;

            /**
             * Category value this section configures. Use null/omit for the introductory
             * section that applies to no specific category.
             */
            linkedCategory?: string | null;
          }

          export namespace Section {
            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            export interface CookieTable {
              /**
               * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
               * purpose).
               */
              body: Array<CookieTable.Body>;

              /**
               * Header cells. Same {key,value} shape as rows.
               */
              headers: Array<CookieTable.Header>;

              /**
               * Optional table caption.
               */
              caption?: string | null;
            }

            export namespace CookieTable {
              export interface Body {
                key: string;

                value: string;
              }

              export interface Header {
                key: string;

                value: string;
              }
            }
          }

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          export interface AdditionalInfo {
            /**
             * Body text for the additional-info block. Supports the rich-text markdown subset
             * used by section descriptions: line breaks, [text](url) links (https:// or
             * relative paths), and **bold**. HTML is stripped.
             */
            body: string;

            /**
             * Heading for the additional-info block.
             */
            title: string;
          }
        }
      }
    }

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    export interface AutoShowDismissConfig {
      /**
       * Pages-viewed threshold when autoShowDismissMode = after_pages.
       */
      pageCount?: number | null;

      /**
       * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
       */
      seconds?: number | null;
    }

    /**
     * Visual options for the modals (layout/position/colors).
     */
    export interface GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      consentModal?: GuiOptions.ConsentModal | null;

      /**
       * Global CSS variable overrides applied to both modals.
       */
      cssVariables?: GuiOptions.CssVariables | null;

      /**
       * Visual options for the per-category preferences modal.
       */
      preferencesModal?: GuiOptions.PreferencesModal | null;
    }

    export namespace GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      export interface ConsentModal {
        /**
         * Which buttons to render in the consent modal and in what arrangement.
         */
        buttonLayout?:
          | 'AcceptAllNecessaryPreferences'
          | 'AcceptAllPreferences'
          | 'AcceptOnly'
          | 'InformationOnly'
          | 'PreferencesOnly'
          | null;

        /**
         * When true, accept and reject buttons share the same visual weight (no
         * primary/secondary).
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Modal layout style (box, bar, cloud, etc.).
         */
        layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

        /**
         * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
         * middle_center).
         */
        position?:
          | 'bottom'
          | 'bottom_center'
          | 'bottom_left'
          | 'bottom_right'
          | 'middle'
          | 'middle_center'
          | 'middle_left'
          | 'middle_right'
          | 'top'
          | 'top_center'
          | 'top_left'
          | 'top_right'
          | null;

        /**
         * Show an X to dismiss the modal without choosing.
         */
        showCloseIcon?: boolean | null;
      }

      /**
       * Global CSS variable overrides applied to both modals.
       */
      export interface CssVariables {
        /**
         * CSS length, e.g. "4px" or "0.25rem".
         */
        buttonBorderRadius?: string | null;

        /**
         * CSS color for the per-category block background in the preferences modal.
         */
        cookieCategoryBlockBg?: string | null;

        /**
         * CSS color for the per-category block background on hover.
         */
        cookieCategoryBlockHoverBg?: string | null;

        /**
         * CSS color for the modal footer background.
         */
        footerBg?: string | null;

        /**
         * CSS color for footer text.
         */
        footerColor?: string | null;

        /**
         * CSS color for footer links.
         */
        footerLinkColor?: string | null;

        /**
         * CSS color for footer links on hover.
         */
        footerLinkHoverColor?: string | null;

        /**
         * CSS color for the modal background.
         */
        modalBg?: string | null;

        /**
         * CSS length for modal corner radius.
         */
        modalBorderRadius?: string | null;

        /**
         * CSS color for the primary button background.
         */
        primaryButtonBg?: string | null;

        /**
         * CSS color for primary button text.
         */
        primaryButtonColor?: string | null;

        /**
         * CSS color for the primary button background on hover.
         */
        primaryButtonHoverBg?: string | null;

        /**
         * CSS color for primary button text on hover.
         */
        primaryButtonHoverColor?: string | null;

        /**
         * CSS color for primary text in the modal body.
         */
        primaryTextColor?: string | null;

        /**
         * CSS color for the secondary button background.
         */
        secondaryButtonBg?: string | null;

        /**
         * CSS color for secondary button text.
         */
        secondaryButtonColor?: string | null;

        /**
         * CSS color for secondary button background on hover.
         */
        secondaryButtonHoverBg?: string | null;

        /**
         * CSS color for secondary button text on hover.
         */
        secondaryButtonHoverColor?: string | null;

        /**
         * CSS color for secondary text in the modal body.
         */
        secondaryTextColor?: string | null;

        /**
         * CSS color for the "on" state of category toggles.
         */
        toggleOnBg?: string | null;
      }

      /**
       * Visual options for the per-category preferences modal.
       */
      export interface PreferencesModal {
        /**
         * Button layout for the preferences modal.
         */
        buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

        /**
         * When true, accept/reject share the same visual weight.
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Preferences modal layout (box, bar, bar_wide).
         */
        layout?: 'bar' | 'bar_wide' | 'box' | null;

        /**
         * Preferences modal anchor (left, right).
         */
        position?: 'left' | 'right' | null;
      }
    }
  }

  export interface Region {
    /**
     * Region this rule applies to. Use ISO 3166-1 alpha-2 country code ("US", "DE",
     * "BR") or country-subdivision code ("US-CA", "GB-ENG", "CA-ON"). Each region code
     * may appear in only one rule across `regions[]`.
     */
    regionCode: string;

    rule: Region.Rule;

    /**
     * Other region codes that should reuse this rule. Same code-format rules as
     * `regionCode`. Cannot include `regionCode` itself, cannot duplicate, cannot
     * overlap with another rule's regions.
     */
    additionalRegions?: Array<string> | null;

    /**
     * Optional label for this override group, e.g. "CCPA States". Shown in the
     * dashboard instead of the region codes. Pass null to clear it and fall back to
     * the codes.
     */
    name?: string | null;
  }

  export namespace Region {
    export interface Rule {
      /**
       * Per-category default config for this rule. Every category defined in the
       * top-level `categories[].value` should have an entry here.
       */
      categories: Array<Rule.Category>;

      /**
       * BCP 47 default language for this rule. Must have a matching entry in
       * `translations`. Examples: "en", "en-US", "es", "de".
       */
      language: string;

      /**
       * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
       * default until user rejects (CCPA style).
       */
      mode: 'opt_in' | 'opt_out';

      /**
       * All UI copy, keyed by language. Must include an entry whose `language` matches
       * the rule's `language` field.
       */
      translations: Array<Rule.Translation>;

      /**
       * When true, scripts not classified by services[] are blocked until the user opts
       * in.
       */
      autoblockUnknown?: boolean | null;

      /**
       * When true, the consent modal auto-opens on page load.
       */
      autoShow?: boolean | null;

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      autoShowDismissConfig?: Rule.AutoShowDismissConfig | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: Rule.GuiOptions | null;

      /**
       * When true, the modal is suppressed for known bot user agents.
       */
      hideFromBots?: boolean | null;

      /**
       * When true, the per-service list (services[]) is rendered inside the preferences
       * modal.
       */
      showVendorsInPreferences?: boolean | null;
    }

    export namespace Rule {
      export interface Category {
        /**
         * Category value (matches `categories[].value`) this entry configures.
         */
        key: string;

        value: Category.Value;
      }

      export namespace Category {
        export interface Value {
          /**
           * Whether this category is on by default before the user interacts.
           */
          enabled: boolean;

          /**
           * When true, this category defaults off if the browser sends Sec-GPC: 1.
           */
          autoDisableOnGPC?: boolean | null;

          /**
           * When true, the user cannot toggle this category in the preferences modal.
           */
          readOnly?: boolean | null;

          /**
           * When true, the page reloads after this category is toggled so newly-allowed
           * scripts can run.
           */
          reloadPage?: boolean | null;
        }
      }

      export interface Translation {
        /**
         * BCP 47 language tag identifying which translation this entry provides. Examples:
         * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
         */
        language: string;

        value: Translation.Value;
      }

      export namespace Translation {
        export interface Value {
          /**
           * Translated copy for the initial consent modal.
           */
          consentModal?: Value.ConsentModal | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: Value.PreferencesModal | null;
        }

        export namespace Value {
          /**
           * Translated copy for the initial consent modal.
           */
          export interface ConsentModal {
            /**
             * Label for the "accept all" button.
             */
            acceptAllBtn: string;

            /**
             * Body text shown in the consent modal.
             */
            description: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the button that opens the preferences modal.
             */
            showPreferencesBtn: string;

            /**
             * Heading shown at the top of the consent modal.
             */
            title: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel?: string | null;

            /**
             * Optional footer HTML/text shown below the body.
             */
            footer?: string | null;

            /**
             * Optional text shown when the browser is sending Sec-GPC: 1.
             */
            gpcNotification?: string | null;

            /**
             * Link label for the privacy policy (defaults to "Privacy Policy").
             */
            privacyPolicyLabel?: string | null;

            /**
             * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
             * (/legal/privacy) so one config can run across multiple domains. javascript:,
             * data:, and vbscript: schemes are rejected.
             */
            privacyPolicyUrl?: string | null;

            /**
             * Optional message shown when the consent revision has bumped (re-prompt copy).
             */
            revisionMessage?: string | null;

            /**
             * Link label for terms of service (defaults to "Terms of Service").
             */
            termsOfServiceLabel?: string | null;

            /**
             * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
             * relative path only.
             */
            termsOfServiceUrl?: string | null;
          }

          /**
           * Translated copy for the preferences modal.
           */
          export interface PreferencesModal {
            /**
             * Label for the "accept all" button in the preferences modal.
             */
            acceptAllBtn: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the "save my choices" button.
             */
            savePreferencesBtn: string;

            /**
             * Per-category sections plus a leading general section. The server backfills
             * sections for each defined category if absent.
             */
            sections: Array<PreferencesModal.Section>;

            /**
             * Heading for the preferences modal.
             */
            title: string;

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            additionalInfo?: PreferencesModal.AdditionalInfo | null;

            /**
             * Pluralizable label for the "N services" counter (e.g. "Service|Services").
             */
            serviceCounterLabel?: string | null;
          }

          export namespace PreferencesModal {
            export interface Section {
              /**
               * Body text for this preferences-modal section.
               */
              description: string;

              /**
               * Heading for this preferences-modal section.
               */
              title: string;

              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              cookieTable?: Section.CookieTable | null;

              /**
               * Category value this section configures. Use null/omit for the introductory
               * section that applies to no specific category.
               */
              linkedCategory?: string | null;
            }

            export namespace Section {
              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              export interface CookieTable {
                /**
                 * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
                 * purpose).
                 */
                body: Array<CookieTable.Body>;

                /**
                 * Header cells. Same {key,value} shape as rows.
                 */
                headers: Array<CookieTable.Header>;

                /**
                 * Optional table caption.
                 */
                caption?: string | null;
              }

              export namespace CookieTable {
                export interface Body {
                  key: string;

                  value: string;
                }

                export interface Header {
                  key: string;

                  value: string;
                }
              }
            }

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            export interface AdditionalInfo {
              /**
               * Body text for the additional-info block. Supports the rich-text markdown subset
               * used by section descriptions: line breaks, [text](url) links (https:// or
               * relative paths), and **bold**. HTML is stripped.
               */
              body: string;

              /**
               * Heading for the additional-info block.
               */
              title: string;
            }
          }
        }
      }

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      export interface AutoShowDismissConfig {
        /**
         * Pages-viewed threshold when autoShowDismissMode = after_pages.
         */
        pageCount?: number | null;

        /**
         * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
         */
        seconds?: number | null;
      }

      /**
       * Visual options for the modals (layout/position/colors).
       */
      export interface GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        consentModal?: GuiOptions.ConsentModal | null;

        /**
         * Global CSS variable overrides applied to both modals.
         */
        cssVariables?: GuiOptions.CssVariables | null;

        /**
         * Visual options for the per-category preferences modal.
         */
        preferencesModal?: GuiOptions.PreferencesModal | null;
      }

      export namespace GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Which buttons to render in the consent modal and in what arrangement.
           */
          buttonLayout?:
            | 'AcceptAllNecessaryPreferences'
            | 'AcceptAllPreferences'
            | 'AcceptOnly'
            | 'InformationOnly'
            | 'PreferencesOnly'
            | null;

          /**
           * When true, accept and reject buttons share the same visual weight (no
           * primary/secondary).
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Modal layout style (box, bar, cloud, etc.).
           */
          layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

          /**
           * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
           * middle_center).
           */
          position?:
            | 'bottom'
            | 'bottom_center'
            | 'bottom_left'
            | 'bottom_right'
            | 'middle'
            | 'middle_center'
            | 'middle_left'
            | 'middle_right'
            | 'top'
            | 'top_center'
            | 'top_left'
            | 'top_right'
            | null;

          /**
           * Show an X to dismiss the modal without choosing.
           */
          showCloseIcon?: boolean | null;
        }

        /**
         * Global CSS variable overrides applied to both modals.
         */
        export interface CssVariables {
          /**
           * CSS length, e.g. "4px" or "0.25rem".
           */
          buttonBorderRadius?: string | null;

          /**
           * CSS color for the per-category block background in the preferences modal.
           */
          cookieCategoryBlockBg?: string | null;

          /**
           * CSS color for the per-category block background on hover.
           */
          cookieCategoryBlockHoverBg?: string | null;

          /**
           * CSS color for the modal footer background.
           */
          footerBg?: string | null;

          /**
           * CSS color for footer text.
           */
          footerColor?: string | null;

          /**
           * CSS color for footer links.
           */
          footerLinkColor?: string | null;

          /**
           * CSS color for footer links on hover.
           */
          footerLinkHoverColor?: string | null;

          /**
           * CSS color for the modal background.
           */
          modalBg?: string | null;

          /**
           * CSS length for modal corner radius.
           */
          modalBorderRadius?: string | null;

          /**
           * CSS color for the primary button background.
           */
          primaryButtonBg?: string | null;

          /**
           * CSS color for primary button text.
           */
          primaryButtonColor?: string | null;

          /**
           * CSS color for the primary button background on hover.
           */
          primaryButtonHoverBg?: string | null;

          /**
           * CSS color for primary button text on hover.
           */
          primaryButtonHoverColor?: string | null;

          /**
           * CSS color for primary text in the modal body.
           */
          primaryTextColor?: string | null;

          /**
           * CSS color for the secondary button background.
           */
          secondaryButtonBg?: string | null;

          /**
           * CSS color for secondary button text.
           */
          secondaryButtonColor?: string | null;

          /**
           * CSS color for secondary button background on hover.
           */
          secondaryButtonHoverBg?: string | null;

          /**
           * CSS color for secondary button text on hover.
           */
          secondaryButtonHoverColor?: string | null;

          /**
           * CSS color for secondary text in the modal body.
           */
          secondaryTextColor?: string | null;

          /**
           * CSS color for the "on" state of category toggles.
           */
          toggleOnBg?: string | null;
        }

        /**
         * Visual options for the per-category preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Button layout for the preferences modal.
           */
          buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

          /**
           * When true, accept/reject share the same visual weight.
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Preferences modal layout (box, bar, bar_wide).
           */
          layout?: 'bar' | 'bar_wide' | 'box' | null;

          /**
           * Preferences modal anchor (left, right).
           */
          position?: 'left' | 'right' | null;
        }
      }
    }
  }

  export interface Service {
    /**
     * Internal notes shown to admins in the dashboard. Not user-facing.
     */
    internalNotes: string;

    /**
     * Display name for this service in the preferences modal.
     */
    label: string;

    /**
     * Extra category values this service belongs to. Each must match a
     * `categories[].value`.
     */
    additionalCategories?: Array<string> | null;

    /**
     * Primary category value this service belongs to. Must match one of the top-level
     * `categories[].value` entries.
     */
    category?: string | null;

    /**
     * Domains/paths this service matches. Patterns matching the CMP's own scripts
     * (e.g. cdn.oursprivacy.com/cmp-init) are rejected to prevent the CMP blocking
     * itself — use a more specific path like cdn.oursprivacy.com/main.js to block a
     * specific script.
     */
    domainPatterns?: Array<string> | null;
  }
}

export interface ConsentSettingAnalyticsResponse {
  /**
   * One entry per time bucket (hour, day, week, or month, depending on
   * `granularity`) covering the full window — empty windows are zero-filled so
   * callers can render contiguous time series without gap-handling logic.
   */
  items: Array<ConsentSettingAnalyticsResponse.Item>;

  totals: ConsentSettingAnalyticsResponse.Totals;
}

export namespace ConsentSettingAnalyticsResponse {
  export interface Item {
    bannerViews: number;

    closeIconClicks: number;

    dateTime: string;

    explicitOptIns: number;

    explicitOptOuts: number;

    optInRate: number;

    optOutRate: number;

    partialPeriod: boolean;

    periodFrom: string;

    periodTo: string;

    percentageChangeBannerViews?: number | null;

    percentageChangeCloseIconClicks?: number | null;

    percentageChangeExplicitOptIns?: number | null;

    percentageChangeExplicitOptOuts?: number | null;

    previousBannerViews?: number | null;

    previousCloseIconClicks?: number | null;

    previousExplicitOptIns?: number | null;

    previousExplicitOptOuts?: number | null;

    previousOptInRate?: number | null;

    previousOptOutRate?: number | null;
  }

  export interface Totals {
    bannerViews: number;

    closeIconClicks: number;

    explicitOptIns: number;

    explicitOptOuts: number;

    optInRate: number;

    optOutRate: number;
  }
}

export interface ConsentSettingAnalyticsMonthlyResponse {
  items: Array<ConsentSettingAnalyticsMonthlyResponse.Item>;
}

export namespace ConsentSettingAnalyticsMonthlyResponse {
  export interface Item {
    bannerViews: number;

    closeIconClicks: number;

    dateTime: string;

    explicitOptIns: number;

    explicitOptOuts: number;

    optInRate: number;

    optOutRate: number;

    partialPeriod: boolean;

    periodFrom: string;

    periodTo: string;
  }
}

export interface ConsentSettingAnalyticsCapabilitiesResponse {
  expiresAt: string;

  intervals: Array<ConsentSettingAnalyticsCapabilitiesResponse.Interval>;

  policyVersion: string;
}

export namespace ConsentSettingAnalyticsCapabilitiesResponse {
  export interface Interval {
    comparisonSupported: boolean;

    granularity: 'DAILY' | 'HOURLY' | 'MONTHLY' | 'WEEKLY';

    maxIncludedDays: number;
  }
}

export interface ConsentSettingPageAnalysisResponse {
  /**
   * Pages ranked by opt-outs descending, then page path ascending.
   */
  entities: Array<ConsentSettingPageAnalysisResponse.Entity>;

  pagination: ConsentSettingPageAnalysisResponse.Pagination;
}

export namespace ConsentSettingPageAnalysisResponse {
  export interface Entity {
    bannerViews: number;

    closeIconClicks: number;

    optOutRate: number;

    optOuts: number;

    page: string;
  }

  export interface Pagination {
    hasMore: boolean;

    nextCursor?: string | null;
  }
}

export interface ConsentSettingAnalyticsByRegionResponse {
  /**
   * Per-region totals for the window, ranked by banner views (descending). Visitors
   * whose region cannot be resolved (e.g. bot traffic, IP geo failure) are bucketed
   * under the literal `Unknown`, so the per-region counts always sum to the global
   * totals.
   */
  regions: Array<ConsentSettingAnalyticsByRegionResponse.Region>;
}

export namespace ConsentSettingAnalyticsByRegionResponse {
  export interface Region {
    bannerViews: number;

    closeIconClicks: number;

    explicitOptIns: number;

    explicitOptOuts: number;

    optInRate: number;

    optOutRate: number;

    regionName: string;
  }
}

export interface ConsentSettingReplaceParams {
  /**
   * Top-level consent categories. Server re-stamps `priority` to 0..N.
   */
  categories: Array<ConsentSettingReplaceParams.Category>;

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  default: ConsentSettingReplaceParams.Default;

  /**
   * Human-readable name shown in the dashboard.
   */
  name: string;

  /**
   * Per-region rule overrides. Each `regionCode` must be unique across rules and
   * must not appear in any other rule's `additionalRegions`.
   */
  regions: Array<ConsentSettingReplaceParams.Region>;

  /**
   * Per-service entries powering "show vendors" and category-aware blocking. Empty
   * array clears the list.
   */
  services: Array<ConsentSettingReplaceParams.Service>;

  /**
   * Enabled requires at least one allowed domain. Disabled may have none.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the cookie that stores consent state. Pass null to clear (defaults to
   * "op_consent").
   */
  consentCookieName?: string | null;

  /**
   * Custom CDN domain for serving the CMP script. Pass null to clear.
   */
  customDomain?: string | null;

  /**
   * Cookie/localStorage key for the visitor (device) ID. Must exactly match the web
   * SDK's cookie_names.device_id (default "ours_device_id"). Pass null to clear.
   */
  deviceIdCookieName?: string | null;

  /**
   * Revision counter. Bump to re-prompt users who already consented.
   */
  revision?: number | null;

  /**
   * CSS class names that opt scripts out of consent blocking. Each must be a single
   * class token.
   */
  skipBlockingClassNames?: Array<string> | null;

  /**
   * Pixel of the WebSource this CMP is wired into. Pass null to clear the link.
   */
  webSDKToken?: string | null;

  /**
   * Domains where this CMP may run. Enabled requires at least one allowed domain;
   * omitting, null, or [] fails validation when status is Enabled. Disabled may have
   * none.
   */
  whitelistDomains?: Array<string> | null;
}

export namespace ConsentSettingReplaceParams {
  export interface Category {
    /**
     * Human-readable label shown next to the toggle in the preferences modal.
     */
    label: string;

    /**
     * Sort key. Lower numbers render first. Server re-stamps to 0..N on write — send
     * any integer, gaps and duplicates are ironed out.
     */
    priority: number;

    /**
     * Stable identifier referenced by services and translation sections.
     * Conventionally lowercase (e.g. "necessary", "analytics", "advertising").
     */
    value: string;
  }

  /**
   * Default rule used when the user is not in any region listed in `regions[]`.
   */
  export interface Default {
    /**
     * Per-category default config for this rule. Every category defined in the
     * top-level `categories[].value` should have an entry here.
     */
    categories: Array<Default.Category>;

    /**
     * BCP 47 default language for this rule. Must have a matching entry in
     * `translations`. Examples: "en", "en-US", "es", "de".
     */
    language: string;

    /**
     * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
     * default until user rejects (CCPA style).
     */
    mode: 'opt_in' | 'opt_out';

    /**
     * All UI copy, keyed by language. Must include an entry whose `language` matches
     * the rule's `language` field.
     */
    translations: Array<Default.Translation>;

    /**
     * When true, scripts not classified by services[] are blocked until the user opts
     * in.
     */
    autoblockUnknown?: boolean | null;

    /**
     * When true, the consent modal auto-opens on page load.
     */
    autoShow?: boolean | null;

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    autoShowDismissConfig?: Default.AutoShowDismissConfig | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: Default.GuiOptions | null;

    /**
     * When true, the modal is suppressed for known bot user agents.
     */
    hideFromBots?: boolean | null;

    /**
     * When true, the per-service list (services[]) is rendered inside the preferences
     * modal.
     */
    showVendorsInPreferences?: boolean | null;
  }

  export namespace Default {
    export interface Category {
      /**
       * Category value (matches `categories[].value`) this entry configures.
       */
      key: string;

      value: Category.Value;
    }

    export namespace Category {
      export interface Value {
        /**
         * Whether this category is on by default before the user interacts.
         */
        enabled: boolean;

        /**
         * When true, this category defaults off if the browser sends Sec-GPC: 1.
         */
        autoDisableOnGPC?: boolean | null;

        /**
         * When true, the user cannot toggle this category in the preferences modal.
         */
        readOnly?: boolean | null;

        /**
         * When true, the page reloads after this category is toggled so newly-allowed
         * scripts can run.
         */
        reloadPage?: boolean | null;
      }
    }

    export interface Translation {
      /**
       * BCP 47 language tag identifying which translation this entry provides. Examples:
       * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
       */
      language: string;

      value: Translation.Value;
    }

    export namespace Translation {
      export interface Value {
        /**
         * Translated copy for the initial consent modal.
         */
        consentModal?: Value.ConsentModal | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: Value.PreferencesModal | null;
      }

      export namespace Value {
        /**
         * Translated copy for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Label for the "accept all" button.
           */
          acceptAllBtn: string;

          /**
           * Body text shown in the consent modal.
           */
          description: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the button that opens the preferences modal.
           */
          showPreferencesBtn: string;

          /**
           * Heading shown at the top of the consent modal.
           */
          title: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel?: string | null;

          /**
           * Optional footer HTML/text shown below the body.
           */
          footer?: string | null;

          /**
           * Optional text shown when the browser is sending Sec-GPC: 1.
           */
          gpcNotification?: string | null;

          /**
           * Link label for the privacy policy (defaults to "Privacy Policy").
           */
          privacyPolicyLabel?: string | null;

          /**
           * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
           * (/legal/privacy) so one config can run across multiple domains. javascript:,
           * data:, and vbscript: schemes are rejected.
           */
          privacyPolicyUrl?: string | null;

          /**
           * Optional message shown when the consent revision has bumped (re-prompt copy).
           */
          revisionMessage?: string | null;

          /**
           * Link label for terms of service (defaults to "Terms of Service").
           */
          termsOfServiceLabel?: string | null;

          /**
           * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
           * relative path only.
           */
          termsOfServiceUrl?: string | null;
        }

        /**
         * Translated copy for the preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Label for the "accept all" button in the preferences modal.
           */
          acceptAllBtn: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the "save my choices" button.
           */
          savePreferencesBtn: string;

          /**
           * Per-category sections plus a leading general section. The server backfills
           * sections for each defined category if absent.
           */
          sections: Array<PreferencesModal.Section>;

          /**
           * Heading for the preferences modal.
           */
          title: string;

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          additionalInfo?: PreferencesModal.AdditionalInfo | null;

          /**
           * Pluralizable label for the "N services" counter (e.g. "Service|Services").
           */
          serviceCounterLabel?: string | null;
        }

        export namespace PreferencesModal {
          export interface Section {
            /**
             * Body text for this preferences-modal section.
             */
            description: string;

            /**
             * Heading for this preferences-modal section.
             */
            title: string;

            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            cookieTable?: Section.CookieTable | null;

            /**
             * Category value this section configures. Use null/omit for the introductory
             * section that applies to no specific category.
             */
            linkedCategory?: string | null;
          }

          export namespace Section {
            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            export interface CookieTable {
              /**
               * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
               * purpose).
               */
              body: Array<CookieTable.Body>;

              /**
               * Header cells. Same {key,value} shape as rows.
               */
              headers: Array<CookieTable.Header>;

              /**
               * Optional table caption.
               */
              caption?: string | null;
            }

            export namespace CookieTable {
              export interface Body {
                key: string;

                value: string;
              }

              export interface Header {
                key: string;

                value: string;
              }
            }
          }

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          export interface AdditionalInfo {
            /**
             * Body text for the additional-info block. Supports the rich-text markdown subset
             * used by section descriptions: line breaks, [text](url) links (https:// or
             * relative paths), and **bold**. HTML is stripped.
             */
            body: string;

            /**
             * Heading for the additional-info block.
             */
            title: string;
          }
        }
      }
    }

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    export interface AutoShowDismissConfig {
      /**
       * Pages-viewed threshold when autoShowDismissMode = after_pages.
       */
      pageCount?: number | null;

      /**
       * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
       */
      seconds?: number | null;
    }

    /**
     * Visual options for the modals (layout/position/colors).
     */
    export interface GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      consentModal?: GuiOptions.ConsentModal | null;

      /**
       * Global CSS variable overrides applied to both modals.
       */
      cssVariables?: GuiOptions.CssVariables | null;

      /**
       * Visual options for the per-category preferences modal.
       */
      preferencesModal?: GuiOptions.PreferencesModal | null;
    }

    export namespace GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      export interface ConsentModal {
        /**
         * Which buttons to render in the consent modal and in what arrangement.
         */
        buttonLayout?:
          | 'AcceptAllNecessaryPreferences'
          | 'AcceptAllPreferences'
          | 'AcceptOnly'
          | 'InformationOnly'
          | 'PreferencesOnly'
          | null;

        /**
         * When true, accept and reject buttons share the same visual weight (no
         * primary/secondary).
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Modal layout style (box, bar, cloud, etc.).
         */
        layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

        /**
         * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
         * middle_center).
         */
        position?:
          | 'bottom'
          | 'bottom_center'
          | 'bottom_left'
          | 'bottom_right'
          | 'middle'
          | 'middle_center'
          | 'middle_left'
          | 'middle_right'
          | 'top'
          | 'top_center'
          | 'top_left'
          | 'top_right'
          | null;

        /**
         * Show an X to dismiss the modal without choosing.
         */
        showCloseIcon?: boolean | null;
      }

      /**
       * Global CSS variable overrides applied to both modals.
       */
      export interface CssVariables {
        /**
         * CSS length, e.g. "4px" or "0.25rem".
         */
        buttonBorderRadius?: string | null;

        /**
         * CSS color for the per-category block background in the preferences modal.
         */
        cookieCategoryBlockBg?: string | null;

        /**
         * CSS color for the per-category block background on hover.
         */
        cookieCategoryBlockHoverBg?: string | null;

        /**
         * CSS color for the modal footer background.
         */
        footerBg?: string | null;

        /**
         * CSS color for footer text.
         */
        footerColor?: string | null;

        /**
         * CSS color for footer links.
         */
        footerLinkColor?: string | null;

        /**
         * CSS color for footer links on hover.
         */
        footerLinkHoverColor?: string | null;

        /**
         * CSS color for the modal background.
         */
        modalBg?: string | null;

        /**
         * CSS length for modal corner radius.
         */
        modalBorderRadius?: string | null;

        /**
         * CSS color for the primary button background.
         */
        primaryButtonBg?: string | null;

        /**
         * CSS color for primary button text.
         */
        primaryButtonColor?: string | null;

        /**
         * CSS color for the primary button background on hover.
         */
        primaryButtonHoverBg?: string | null;

        /**
         * CSS color for primary button text on hover.
         */
        primaryButtonHoverColor?: string | null;

        /**
         * CSS color for primary text in the modal body.
         */
        primaryTextColor?: string | null;

        /**
         * CSS color for the secondary button background.
         */
        secondaryButtonBg?: string | null;

        /**
         * CSS color for secondary button text.
         */
        secondaryButtonColor?: string | null;

        /**
         * CSS color for secondary button background on hover.
         */
        secondaryButtonHoverBg?: string | null;

        /**
         * CSS color for secondary button text on hover.
         */
        secondaryButtonHoverColor?: string | null;

        /**
         * CSS color for secondary text in the modal body.
         */
        secondaryTextColor?: string | null;

        /**
         * CSS color for the "on" state of category toggles.
         */
        toggleOnBg?: string | null;
      }

      /**
       * Visual options for the per-category preferences modal.
       */
      export interface PreferencesModal {
        /**
         * Button layout for the preferences modal.
         */
        buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

        /**
         * When true, accept/reject share the same visual weight.
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Preferences modal layout (box, bar, bar_wide).
         */
        layout?: 'bar' | 'bar_wide' | 'box' | null;

        /**
         * Preferences modal anchor (left, right).
         */
        position?: 'left' | 'right' | null;
      }
    }
  }

  export interface Region {
    /**
     * Region this rule applies to. Use ISO 3166-1 alpha-2 country code ("US", "DE",
     * "BR") or country-subdivision code ("US-CA", "GB-ENG", "CA-ON"). Each region code
     * may appear in only one rule across `regions[]`.
     */
    regionCode: string;

    rule: Region.Rule;

    /**
     * Other region codes that should reuse this rule. Same code-format rules as
     * `regionCode`. Cannot include `regionCode` itself, cannot duplicate, cannot
     * overlap with another rule's regions.
     */
    additionalRegions?: Array<string> | null;

    /**
     * Optional label for this override group, e.g. "CCPA States". Shown in the
     * dashboard instead of the region codes. Pass null to clear it and fall back to
     * the codes.
     */
    name?: string | null;
  }

  export namespace Region {
    export interface Rule {
      /**
       * Per-category default config for this rule. Every category defined in the
       * top-level `categories[].value` should have an entry here.
       */
      categories: Array<Rule.Category>;

      /**
       * BCP 47 default language for this rule. Must have a matching entry in
       * `translations`. Examples: "en", "en-US", "es", "de".
       */
      language: string;

      /**
       * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
       * default until user rejects (CCPA style).
       */
      mode: 'opt_in' | 'opt_out';

      /**
       * All UI copy, keyed by language. Must include an entry whose `language` matches
       * the rule's `language` field.
       */
      translations: Array<Rule.Translation>;

      /**
       * When true, scripts not classified by services[] are blocked until the user opts
       * in.
       */
      autoblockUnknown?: boolean | null;

      /**
       * When true, the consent modal auto-opens on page load.
       */
      autoShow?: boolean | null;

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      autoShowDismissConfig?: Rule.AutoShowDismissConfig | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: Rule.GuiOptions | null;

      /**
       * When true, the modal is suppressed for known bot user agents.
       */
      hideFromBots?: boolean | null;

      /**
       * When true, the per-service list (services[]) is rendered inside the preferences
       * modal.
       */
      showVendorsInPreferences?: boolean | null;
    }

    export namespace Rule {
      export interface Category {
        /**
         * Category value (matches `categories[].value`) this entry configures.
         */
        key: string;

        value: Category.Value;
      }

      export namespace Category {
        export interface Value {
          /**
           * Whether this category is on by default before the user interacts.
           */
          enabled: boolean;

          /**
           * When true, this category defaults off if the browser sends Sec-GPC: 1.
           */
          autoDisableOnGPC?: boolean | null;

          /**
           * When true, the user cannot toggle this category in the preferences modal.
           */
          readOnly?: boolean | null;

          /**
           * When true, the page reloads after this category is toggled so newly-allowed
           * scripts can run.
           */
          reloadPage?: boolean | null;
        }
      }

      export interface Translation {
        /**
         * BCP 47 language tag identifying which translation this entry provides. Examples:
         * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
         */
        language: string;

        value: Translation.Value;
      }

      export namespace Translation {
        export interface Value {
          /**
           * Translated copy for the initial consent modal.
           */
          consentModal?: Value.ConsentModal | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: Value.PreferencesModal | null;
        }

        export namespace Value {
          /**
           * Translated copy for the initial consent modal.
           */
          export interface ConsentModal {
            /**
             * Label for the "accept all" button.
             */
            acceptAllBtn: string;

            /**
             * Body text shown in the consent modal.
             */
            description: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the button that opens the preferences modal.
             */
            showPreferencesBtn: string;

            /**
             * Heading shown at the top of the consent modal.
             */
            title: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel?: string | null;

            /**
             * Optional footer HTML/text shown below the body.
             */
            footer?: string | null;

            /**
             * Optional text shown when the browser is sending Sec-GPC: 1.
             */
            gpcNotification?: string | null;

            /**
             * Link label for the privacy policy (defaults to "Privacy Policy").
             */
            privacyPolicyLabel?: string | null;

            /**
             * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
             * (/legal/privacy) so one config can run across multiple domains. javascript:,
             * data:, and vbscript: schemes are rejected.
             */
            privacyPolicyUrl?: string | null;

            /**
             * Optional message shown when the consent revision has bumped (re-prompt copy).
             */
            revisionMessage?: string | null;

            /**
             * Link label for terms of service (defaults to "Terms of Service").
             */
            termsOfServiceLabel?: string | null;

            /**
             * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
             * relative path only.
             */
            termsOfServiceUrl?: string | null;
          }

          /**
           * Translated copy for the preferences modal.
           */
          export interface PreferencesModal {
            /**
             * Label for the "accept all" button in the preferences modal.
             */
            acceptAllBtn: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the "save my choices" button.
             */
            savePreferencesBtn: string;

            /**
             * Per-category sections plus a leading general section. The server backfills
             * sections for each defined category if absent.
             */
            sections: Array<PreferencesModal.Section>;

            /**
             * Heading for the preferences modal.
             */
            title: string;

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            additionalInfo?: PreferencesModal.AdditionalInfo | null;

            /**
             * Pluralizable label for the "N services" counter (e.g. "Service|Services").
             */
            serviceCounterLabel?: string | null;
          }

          export namespace PreferencesModal {
            export interface Section {
              /**
               * Body text for this preferences-modal section.
               */
              description: string;

              /**
               * Heading for this preferences-modal section.
               */
              title: string;

              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              cookieTable?: Section.CookieTable | null;

              /**
               * Category value this section configures. Use null/omit for the introductory
               * section that applies to no specific category.
               */
              linkedCategory?: string | null;
            }

            export namespace Section {
              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              export interface CookieTable {
                /**
                 * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
                 * purpose).
                 */
                body: Array<CookieTable.Body>;

                /**
                 * Header cells. Same {key,value} shape as rows.
                 */
                headers: Array<CookieTable.Header>;

                /**
                 * Optional table caption.
                 */
                caption?: string | null;
              }

              export namespace CookieTable {
                export interface Body {
                  key: string;

                  value: string;
                }

                export interface Header {
                  key: string;

                  value: string;
                }
              }
            }

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            export interface AdditionalInfo {
              /**
               * Body text for the additional-info block. Supports the rich-text markdown subset
               * used by section descriptions: line breaks, [text](url) links (https:// or
               * relative paths), and **bold**. HTML is stripped.
               */
              body: string;

              /**
               * Heading for the additional-info block.
               */
              title: string;
            }
          }
        }
      }

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      export interface AutoShowDismissConfig {
        /**
         * Pages-viewed threshold when autoShowDismissMode = after_pages.
         */
        pageCount?: number | null;

        /**
         * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
         */
        seconds?: number | null;
      }

      /**
       * Visual options for the modals (layout/position/colors).
       */
      export interface GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        consentModal?: GuiOptions.ConsentModal | null;

        /**
         * Global CSS variable overrides applied to both modals.
         */
        cssVariables?: GuiOptions.CssVariables | null;

        /**
         * Visual options for the per-category preferences modal.
         */
        preferencesModal?: GuiOptions.PreferencesModal | null;
      }

      export namespace GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Which buttons to render in the consent modal and in what arrangement.
           */
          buttonLayout?:
            | 'AcceptAllNecessaryPreferences'
            | 'AcceptAllPreferences'
            | 'AcceptOnly'
            | 'InformationOnly'
            | 'PreferencesOnly'
            | null;

          /**
           * When true, accept and reject buttons share the same visual weight (no
           * primary/secondary).
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Modal layout style (box, bar, cloud, etc.).
           */
          layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

          /**
           * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
           * middle_center).
           */
          position?:
            | 'bottom'
            | 'bottom_center'
            | 'bottom_left'
            | 'bottom_right'
            | 'middle'
            | 'middle_center'
            | 'middle_left'
            | 'middle_right'
            | 'top'
            | 'top_center'
            | 'top_left'
            | 'top_right'
            | null;

          /**
           * Show an X to dismiss the modal without choosing.
           */
          showCloseIcon?: boolean | null;
        }

        /**
         * Global CSS variable overrides applied to both modals.
         */
        export interface CssVariables {
          /**
           * CSS length, e.g. "4px" or "0.25rem".
           */
          buttonBorderRadius?: string | null;

          /**
           * CSS color for the per-category block background in the preferences modal.
           */
          cookieCategoryBlockBg?: string | null;

          /**
           * CSS color for the per-category block background on hover.
           */
          cookieCategoryBlockHoverBg?: string | null;

          /**
           * CSS color for the modal footer background.
           */
          footerBg?: string | null;

          /**
           * CSS color for footer text.
           */
          footerColor?: string | null;

          /**
           * CSS color for footer links.
           */
          footerLinkColor?: string | null;

          /**
           * CSS color for footer links on hover.
           */
          footerLinkHoverColor?: string | null;

          /**
           * CSS color for the modal background.
           */
          modalBg?: string | null;

          /**
           * CSS length for modal corner radius.
           */
          modalBorderRadius?: string | null;

          /**
           * CSS color for the primary button background.
           */
          primaryButtonBg?: string | null;

          /**
           * CSS color for primary button text.
           */
          primaryButtonColor?: string | null;

          /**
           * CSS color for the primary button background on hover.
           */
          primaryButtonHoverBg?: string | null;

          /**
           * CSS color for primary button text on hover.
           */
          primaryButtonHoverColor?: string | null;

          /**
           * CSS color for primary text in the modal body.
           */
          primaryTextColor?: string | null;

          /**
           * CSS color for the secondary button background.
           */
          secondaryButtonBg?: string | null;

          /**
           * CSS color for secondary button text.
           */
          secondaryButtonColor?: string | null;

          /**
           * CSS color for secondary button background on hover.
           */
          secondaryButtonHoverBg?: string | null;

          /**
           * CSS color for secondary button text on hover.
           */
          secondaryButtonHoverColor?: string | null;

          /**
           * CSS color for secondary text in the modal body.
           */
          secondaryTextColor?: string | null;

          /**
           * CSS color for the "on" state of category toggles.
           */
          toggleOnBg?: string | null;
        }

        /**
         * Visual options for the per-category preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Button layout for the preferences modal.
           */
          buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

          /**
           * When true, accept/reject share the same visual weight.
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Preferences modal layout (box, bar, bar_wide).
           */
          layout?: 'bar' | 'bar_wide' | 'box' | null;

          /**
           * Preferences modal anchor (left, right).
           */
          position?: 'left' | 'right' | null;
        }
      }
    }
  }

  export interface Service {
    /**
     * Internal notes shown to admins in the dashboard. Not user-facing.
     */
    internalNotes: string;

    /**
     * Display name for this service in the preferences modal.
     */
    label: string;

    /**
     * Extra category values this service belongs to. Each must match a
     * `categories[].value`.
     */
    additionalCategories?: Array<string> | null;

    /**
     * Primary category value this service belongs to. Must match one of the top-level
     * `categories[].value` entries.
     */
    category?: string | null;

    /**
     * Domains/paths this service matches. Patterns matching the CMP's own scripts
     * (e.g. cdn.oursprivacy.com/cmp-init) are rejected to prevent the CMP blocking
     * itself — use a more specific path like cdn.oursprivacy.com/main.js to block a
     * specific script.
     */
    domainPatterns?: Array<string> | null;
  }
}

export interface ConsentSettingUpdateParams {
  /**
   * Replace the entire categories list. Omit to leave existing categories untouched.
   */
  categories?: Array<ConsentSettingUpdateParams.Category>;

  /**
   * Set or clear the consent cookie name.
   */
  consentCookieName?: string | null;

  /**
   * Set or clear the custom CDN domain.
   */
  customDomain?: string | null;

  /**
   * Replace the default rule wholesale. Omit to leave it untouched.
   */
  default?: ConsentSettingUpdateParams.Default;

  /**
   * Cookie/localStorage key for the visitor (device) ID. Must exactly match the web
   * SDK's cookie_names.device_id (default "ours_device_id"). Pass null to clear.
   */
  deviceIdCookieName?: string | null;

  /**
   * Rename the consent settings record.
   */
  name?: string;

  /**
   * Replace the entire regions list. Omit to leave it untouched. To change one
   * region, send the full regions array with that region's rule modified.
   */
  regions?: Array<ConsentSettingUpdateParams.Region>;

  /**
   * Bump the revision counter to re-prompt users.
   */
  revision?: number | null;

  /**
   * Replace the entire services list. Omit to leave existing services untouched.
   */
  services?: Array<ConsentSettingUpdateParams.Service>;

  /**
   * Replace the skipBlockingClassNames list. Pass null/[] to clear.
   */
  skipBlockingClassNames?: Array<string> | null;

  /**
   * Set Enabled or Disabled. Enabling requires at least one allowed domain, either
   * already saved or sent with this request.
   */
  status?: 'Disabled' | 'Enabled';

  /**
   * Set or clear the WebSource pixel link. A non-null token must be a valid
   * WebSource of yours.
   */
  webSDKToken?: string | null;

  /**
   * Replace the allowed domains when sent. Omit to preserve saved domains. Pass null
   * or [] to clear only when the resulting status is Disabled.
   */
  whitelistDomains?: Array<string> | null;
}

export namespace ConsentSettingUpdateParams {
  export interface Category {
    /**
     * Human-readable label shown next to the toggle in the preferences modal.
     */
    label: string;

    /**
     * Sort key. Lower numbers render first. Server re-stamps to 0..N on write — send
     * any integer, gaps and duplicates are ironed out.
     */
    priority: number;

    /**
     * Stable identifier referenced by services and translation sections.
     * Conventionally lowercase (e.g. "necessary", "analytics", "advertising").
     */
    value: string;
  }

  /**
   * Replace the default rule wholesale. Omit to leave it untouched.
   */
  export interface Default {
    /**
     * Per-category default config for this rule. Every category defined in the
     * top-level `categories[].value` should have an entry here.
     */
    categories: Array<Default.Category>;

    /**
     * BCP 47 default language for this rule. Must have a matching entry in
     * `translations`. Examples: "en", "en-US", "es", "de".
     */
    language: string;

    /**
     * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
     * default until user rejects (CCPA style).
     */
    mode: 'opt_in' | 'opt_out';

    /**
     * All UI copy, keyed by language. Must include an entry whose `language` matches
     * the rule's `language` field.
     */
    translations: Array<Default.Translation>;

    /**
     * When true, scripts not classified by services[] are blocked until the user opts
     * in.
     */
    autoblockUnknown?: boolean | null;

    /**
     * When true, the consent modal auto-opens on page load.
     */
    autoShow?: boolean | null;

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    autoShowDismissConfig?: Default.AutoShowDismissConfig | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: Default.GuiOptions | null;

    /**
     * When true, the modal is suppressed for known bot user agents.
     */
    hideFromBots?: boolean | null;

    /**
     * When true, the per-service list (services[]) is rendered inside the preferences
     * modal.
     */
    showVendorsInPreferences?: boolean | null;
  }

  export namespace Default {
    export interface Category {
      /**
       * Category value (matches `categories[].value`) this entry configures.
       */
      key: string;

      value: Category.Value;
    }

    export namespace Category {
      export interface Value {
        /**
         * Whether this category is on by default before the user interacts.
         */
        enabled: boolean;

        /**
         * When true, this category defaults off if the browser sends Sec-GPC: 1.
         */
        autoDisableOnGPC?: boolean | null;

        /**
         * When true, the user cannot toggle this category in the preferences modal.
         */
        readOnly?: boolean | null;

        /**
         * When true, the page reloads after this category is toggled so newly-allowed
         * scripts can run.
         */
        reloadPage?: boolean | null;
      }
    }

    export interface Translation {
      /**
       * BCP 47 language tag identifying which translation this entry provides. Examples:
       * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
       */
      language: string;

      value: Translation.Value;
    }

    export namespace Translation {
      export interface Value {
        /**
         * Translated copy for the initial consent modal.
         */
        consentModal?: Value.ConsentModal | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: Value.PreferencesModal | null;
      }

      export namespace Value {
        /**
         * Translated copy for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Label for the "accept all" button.
           */
          acceptAllBtn: string;

          /**
           * Body text shown in the consent modal.
           */
          description: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the button that opens the preferences modal.
           */
          showPreferencesBtn: string;

          /**
           * Heading shown at the top of the consent modal.
           */
          title: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel?: string | null;

          /**
           * Optional footer HTML/text shown below the body.
           */
          footer?: string | null;

          /**
           * Optional text shown when the browser is sending Sec-GPC: 1.
           */
          gpcNotification?: string | null;

          /**
           * Link label for the privacy policy (defaults to "Privacy Policy").
           */
          privacyPolicyLabel?: string | null;

          /**
           * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
           * (/legal/privacy) so one config can run across multiple domains. javascript:,
           * data:, and vbscript: schemes are rejected.
           */
          privacyPolicyUrl?: string | null;

          /**
           * Optional message shown when the consent revision has bumped (re-prompt copy).
           */
          revisionMessage?: string | null;

          /**
           * Link label for terms of service (defaults to "Terms of Service").
           */
          termsOfServiceLabel?: string | null;

          /**
           * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
           * relative path only.
           */
          termsOfServiceUrl?: string | null;
        }

        /**
         * Translated copy for the preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Label for the "accept all" button in the preferences modal.
           */
          acceptAllBtn: string;

          /**
           * Accessibility label for the close (X) icon.
           */
          closeIconLabel: string;

          /**
           * Label for the "reject all" / "necessary only" button.
           */
          rejectAllBtn: string;

          /**
           * Label for the "save my choices" button.
           */
          savePreferencesBtn: string;

          /**
           * Per-category sections plus a leading general section. The server backfills
           * sections for each defined category if absent.
           */
          sections: Array<PreferencesModal.Section>;

          /**
           * Heading for the preferences modal.
           */
          title: string;

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          additionalInfo?: PreferencesModal.AdditionalInfo | null;

          /**
           * Pluralizable label for the "N services" counter (e.g. "Service|Services").
           */
          serviceCounterLabel?: string | null;
        }

        export namespace PreferencesModal {
          export interface Section {
            /**
             * Body text for this preferences-modal section.
             */
            description: string;

            /**
             * Heading for this preferences-modal section.
             */
            title: string;

            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            cookieTable?: Section.CookieTable | null;

            /**
             * Category value this section configures. Use null/omit for the introductory
             * section that applies to no specific category.
             */
            linkedCategory?: string | null;
          }

          export namespace Section {
            /**
             * Optional disclosure table listing cookies/services in this section.
             */
            export interface CookieTable {
              /**
               * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
               * purpose).
               */
              body: Array<CookieTable.Body>;

              /**
               * Header cells. Same {key,value} shape as rows.
               */
              headers: Array<CookieTable.Header>;

              /**
               * Optional table caption.
               */
              caption?: string | null;
            }

            export namespace CookieTable {
              export interface Body {
                key: string;

                value: string;
              }

              export interface Header {
                key: string;

                value: string;
              }
            }
          }

          /**
           * Optional collapsible info block rendered after the category sections. Renders
           * only when both title and body are non-empty. Use it for long-form text unrelated
           * to any specific category (e.g. a third-party advertisers disclosure).
           */
          export interface AdditionalInfo {
            /**
             * Body text for the additional-info block. Supports the rich-text markdown subset
             * used by section descriptions: line breaks, [text](url) links (https:// or
             * relative paths), and **bold**. HTML is stripped.
             */
            body: string;

            /**
             * Heading for the additional-info block.
             */
            title: string;
          }
        }
      }
    }

    /**
     * Threshold config for autoShowDismissMode (page count or seconds).
     */
    export interface AutoShowDismissConfig {
      /**
       * Pages-viewed threshold when autoShowDismissMode = after_pages.
       */
      pageCount?: number | null;

      /**
       * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
       */
      seconds?: number | null;
    }

    /**
     * Visual options for the modals (layout/position/colors).
     */
    export interface GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      consentModal?: GuiOptions.ConsentModal | null;

      /**
       * Global CSS variable overrides applied to both modals.
       */
      cssVariables?: GuiOptions.CssVariables | null;

      /**
       * Visual options for the per-category preferences modal.
       */
      preferencesModal?: GuiOptions.PreferencesModal | null;
    }

    export namespace GuiOptions {
      /**
       * Visual options for the initial consent modal.
       */
      export interface ConsentModal {
        /**
         * Which buttons to render in the consent modal and in what arrangement.
         */
        buttonLayout?:
          | 'AcceptAllNecessaryPreferences'
          | 'AcceptAllPreferences'
          | 'AcceptOnly'
          | 'InformationOnly'
          | 'PreferencesOnly'
          | null;

        /**
         * When true, accept and reject buttons share the same visual weight (no
         * primary/secondary).
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Modal layout style (box, bar, cloud, etc.).
         */
        layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

        /**
         * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
         * middle_center).
         */
        position?:
          | 'bottom'
          | 'bottom_center'
          | 'bottom_left'
          | 'bottom_right'
          | 'middle'
          | 'middle_center'
          | 'middle_left'
          | 'middle_right'
          | 'top'
          | 'top_center'
          | 'top_left'
          | 'top_right'
          | null;

        /**
         * Show an X to dismiss the modal without choosing.
         */
        showCloseIcon?: boolean | null;
      }

      /**
       * Global CSS variable overrides applied to both modals.
       */
      export interface CssVariables {
        /**
         * CSS length, e.g. "4px" or "0.25rem".
         */
        buttonBorderRadius?: string | null;

        /**
         * CSS color for the per-category block background in the preferences modal.
         */
        cookieCategoryBlockBg?: string | null;

        /**
         * CSS color for the per-category block background on hover.
         */
        cookieCategoryBlockHoverBg?: string | null;

        /**
         * CSS color for the modal footer background.
         */
        footerBg?: string | null;

        /**
         * CSS color for footer text.
         */
        footerColor?: string | null;

        /**
         * CSS color for footer links.
         */
        footerLinkColor?: string | null;

        /**
         * CSS color for footer links on hover.
         */
        footerLinkHoverColor?: string | null;

        /**
         * CSS color for the modal background.
         */
        modalBg?: string | null;

        /**
         * CSS length for modal corner radius.
         */
        modalBorderRadius?: string | null;

        /**
         * CSS color for the primary button background.
         */
        primaryButtonBg?: string | null;

        /**
         * CSS color for primary button text.
         */
        primaryButtonColor?: string | null;

        /**
         * CSS color for the primary button background on hover.
         */
        primaryButtonHoverBg?: string | null;

        /**
         * CSS color for primary button text on hover.
         */
        primaryButtonHoverColor?: string | null;

        /**
         * CSS color for primary text in the modal body.
         */
        primaryTextColor?: string | null;

        /**
         * CSS color for the secondary button background.
         */
        secondaryButtonBg?: string | null;

        /**
         * CSS color for secondary button text.
         */
        secondaryButtonColor?: string | null;

        /**
         * CSS color for secondary button background on hover.
         */
        secondaryButtonHoverBg?: string | null;

        /**
         * CSS color for secondary button text on hover.
         */
        secondaryButtonHoverColor?: string | null;

        /**
         * CSS color for secondary text in the modal body.
         */
        secondaryTextColor?: string | null;

        /**
         * CSS color for the "on" state of category toggles.
         */
        toggleOnBg?: string | null;
      }

      /**
       * Visual options for the per-category preferences modal.
       */
      export interface PreferencesModal {
        /**
         * Button layout for the preferences modal.
         */
        buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

        /**
         * When true, accept/reject share the same visual weight.
         */
        equalWeightButtons?: boolean | null;

        /**
         * When true, swap accept/reject button order.
         */
        flipButtons?: boolean | null;

        /**
         * Preferences modal layout (box, bar, bar_wide).
         */
        layout?: 'bar' | 'bar_wide' | 'box' | null;

        /**
         * Preferences modal anchor (left, right).
         */
        position?: 'left' | 'right' | null;
      }
    }
  }

  export interface Region {
    /**
     * Region this rule applies to. Use ISO 3166-1 alpha-2 country code ("US", "DE",
     * "BR") or country-subdivision code ("US-CA", "GB-ENG", "CA-ON"). Each region code
     * may appear in only one rule across `regions[]`.
     */
    regionCode: string;

    rule: Region.Rule;

    /**
     * Other region codes that should reuse this rule. Same code-format rules as
     * `regionCode`. Cannot include `regionCode` itself, cannot duplicate, cannot
     * overlap with another rule's regions.
     */
    additionalRegions?: Array<string> | null;

    /**
     * Optional label for this override group, e.g. "CCPA States". Shown in the
     * dashboard instead of the region codes. Pass null to clear it and fall back to
     * the codes.
     */
    name?: string | null;
  }

  export namespace Region {
    export interface Rule {
      /**
       * Per-category default config for this rule. Every category defined in the
       * top-level `categories[].value` should have an entry here.
       */
      categories: Array<Rule.Category>;

      /**
       * BCP 47 default language for this rule. Must have a matching entry in
       * `translations`. Examples: "en", "en-US", "es", "de".
       */
      language: string;

      /**
       * opt_in: scripts blocked until user accepts (GDPR style). opt_out: scripts run by
       * default until user rejects (CCPA style).
       */
      mode: 'opt_in' | 'opt_out';

      /**
       * All UI copy, keyed by language. Must include an entry whose `language` matches
       * the rule's `language` field.
       */
      translations: Array<Rule.Translation>;

      /**
       * When true, scripts not classified by services[] are blocked until the user opts
       * in.
       */
      autoblockUnknown?: boolean | null;

      /**
       * When true, the consent modal auto-opens on page load.
       */
      autoShow?: boolean | null;

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      autoShowDismissConfig?: Rule.AutoShowDismissConfig | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: 'after_pages' | 'after_seconds' | 'never' | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: Rule.GuiOptions | null;

      /**
       * When true, the modal is suppressed for known bot user agents.
       */
      hideFromBots?: boolean | null;

      /**
       * When true, the per-service list (services[]) is rendered inside the preferences
       * modal.
       */
      showVendorsInPreferences?: boolean | null;
    }

    export namespace Rule {
      export interface Category {
        /**
         * Category value (matches `categories[].value`) this entry configures.
         */
        key: string;

        value: Category.Value;
      }

      export namespace Category {
        export interface Value {
          /**
           * Whether this category is on by default before the user interacts.
           */
          enabled: boolean;

          /**
           * When true, this category defaults off if the browser sends Sec-GPC: 1.
           */
          autoDisableOnGPC?: boolean | null;

          /**
           * When true, the user cannot toggle this category in the preferences modal.
           */
          readOnly?: boolean | null;

          /**
           * When true, the page reloads after this category is toggled so newly-allowed
           * scripts can run.
           */
          reloadPage?: boolean | null;
        }
      }

      export interface Translation {
        /**
         * BCP 47 language tag identifying which translation this entry provides. Examples:
         * "en", "en-US", "es", "fr-CA". The default rule's `language` must appear here.
         */
        language: string;

        value: Translation.Value;
      }

      export namespace Translation {
        export interface Value {
          /**
           * Translated copy for the initial consent modal.
           */
          consentModal?: Value.ConsentModal | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: Value.PreferencesModal | null;
        }

        export namespace Value {
          /**
           * Translated copy for the initial consent modal.
           */
          export interface ConsentModal {
            /**
             * Label for the "accept all" button.
             */
            acceptAllBtn: string;

            /**
             * Body text shown in the consent modal.
             */
            description: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the button that opens the preferences modal.
             */
            showPreferencesBtn: string;

            /**
             * Heading shown at the top of the consent modal.
             */
            title: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel?: string | null;

            /**
             * Optional footer HTML/text shown below the body.
             */
            footer?: string | null;

            /**
             * Optional text shown when the browser is sending Sec-GPC: 1.
             */
            gpcNotification?: string | null;

            /**
             * Link label for the privacy policy (defaults to "Privacy Policy").
             */
            privacyPolicyLabel?: string | null;

            /**
             * Privacy policy link. Accepts an absolute URL (https://...) or a relative path
             * (/legal/privacy) so one config can run across multiple domains. javascript:,
             * data:, and vbscript: schemes are rejected.
             */
            privacyPolicyUrl?: string | null;

            /**
             * Optional message shown when the consent revision has bumped (re-prompt copy).
             */
            revisionMessage?: string | null;

            /**
             * Link label for terms of service (defaults to "Terms of Service").
             */
            termsOfServiceLabel?: string | null;

            /**
             * Terms of service link. Same scheme rules as privacyPolicyUrl: absolute or
             * relative path only.
             */
            termsOfServiceUrl?: string | null;
          }

          /**
           * Translated copy for the preferences modal.
           */
          export interface PreferencesModal {
            /**
             * Label for the "accept all" button in the preferences modal.
             */
            acceptAllBtn: string;

            /**
             * Accessibility label for the close (X) icon.
             */
            closeIconLabel: string;

            /**
             * Label for the "reject all" / "necessary only" button.
             */
            rejectAllBtn: string;

            /**
             * Label for the "save my choices" button.
             */
            savePreferencesBtn: string;

            /**
             * Per-category sections plus a leading general section. The server backfills
             * sections for each defined category if absent.
             */
            sections: Array<PreferencesModal.Section>;

            /**
             * Heading for the preferences modal.
             */
            title: string;

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            additionalInfo?: PreferencesModal.AdditionalInfo | null;

            /**
             * Pluralizable label for the "N services" counter (e.g. "Service|Services").
             */
            serviceCounterLabel?: string | null;
          }

          export namespace PreferencesModal {
            export interface Section {
              /**
               * Body text for this preferences-modal section.
               */
              description: string;

              /**
               * Heading for this preferences-modal section.
               */
              title: string;

              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              cookieTable?: Section.CookieTable | null;

              /**
               * Category value this section configures. Use null/omit for the introductory
               * section that applies to no specific category.
               */
              linkedCategory?: string | null;
            }

            export namespace Section {
              /**
               * Optional disclosure table listing cookies/services in this section.
               */
              export interface CookieTable {
                /**
                 * Rows of the cookie table — each row is a {key,value} pair (e.g. cookie name →
                 * purpose).
                 */
                body: Array<CookieTable.Body>;

                /**
                 * Header cells. Same {key,value} shape as rows.
                 */
                headers: Array<CookieTable.Header>;

                /**
                 * Optional table caption.
                 */
                caption?: string | null;
              }

              export namespace CookieTable {
                export interface Body {
                  key: string;

                  value: string;
                }

                export interface Header {
                  key: string;

                  value: string;
                }
              }
            }

            /**
             * Optional collapsible info block rendered after the category sections. Renders
             * only when both title and body are non-empty. Use it for long-form text unrelated
             * to any specific category (e.g. a third-party advertisers disclosure).
             */
            export interface AdditionalInfo {
              /**
               * Body text for the additional-info block. Supports the rich-text markdown subset
               * used by section descriptions: line breaks, [text](url) links (https:// or
               * relative paths), and **bold**. HTML is stripped.
               */
              body: string;

              /**
               * Heading for the additional-info block.
               */
              title: string;
            }
          }
        }
      }

      /**
       * Threshold config for autoShowDismissMode (page count or seconds).
       */
      export interface AutoShowDismissConfig {
        /**
         * Pages-viewed threshold when autoShowDismissMode = after_pages.
         */
        pageCount?: number | null;

        /**
         * Seconds-on-page threshold when autoShowDismissMode = after_seconds.
         */
        seconds?: number | null;
      }

      /**
       * Visual options for the modals (layout/position/colors).
       */
      export interface GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        consentModal?: GuiOptions.ConsentModal | null;

        /**
         * Global CSS variable overrides applied to both modals.
         */
        cssVariables?: GuiOptions.CssVariables | null;

        /**
         * Visual options for the per-category preferences modal.
         */
        preferencesModal?: GuiOptions.PreferencesModal | null;
      }

      export namespace GuiOptions {
        /**
         * Visual options for the initial consent modal.
         */
        export interface ConsentModal {
          /**
           * Which buttons to render in the consent modal and in what arrangement.
           */
          buttonLayout?:
            | 'AcceptAllNecessaryPreferences'
            | 'AcceptAllPreferences'
            | 'AcceptOnly'
            | 'InformationOnly'
            | 'PreferencesOnly'
            | null;

          /**
           * When true, accept and reject buttons share the same visual weight (no
           * primary/secondary).
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Modal layout style (box, bar, cloud, etc.).
           */
          layout?: 'bar' | 'bar_inline' | 'box' | 'box_inline' | 'box_wide' | 'cloud' | 'cloud_inline' | null;

          /**
           * Where the modal anchors on the viewport (e.g. bottom_left, top_right,
           * middle_center).
           */
          position?:
            | 'bottom'
            | 'bottom_center'
            | 'bottom_left'
            | 'bottom_right'
            | 'middle'
            | 'middle_center'
            | 'middle_left'
            | 'middle_right'
            | 'top'
            | 'top_center'
            | 'top_left'
            | 'top_right'
            | null;

          /**
           * Show an X to dismiss the modal without choosing.
           */
          showCloseIcon?: boolean | null;
        }

        /**
         * Global CSS variable overrides applied to both modals.
         */
        export interface CssVariables {
          /**
           * CSS length, e.g. "4px" or "0.25rem".
           */
          buttonBorderRadius?: string | null;

          /**
           * CSS color for the per-category block background in the preferences modal.
           */
          cookieCategoryBlockBg?: string | null;

          /**
           * CSS color for the per-category block background on hover.
           */
          cookieCategoryBlockHoverBg?: string | null;

          /**
           * CSS color for the modal footer background.
           */
          footerBg?: string | null;

          /**
           * CSS color for footer text.
           */
          footerColor?: string | null;

          /**
           * CSS color for footer links.
           */
          footerLinkColor?: string | null;

          /**
           * CSS color for footer links on hover.
           */
          footerLinkHoverColor?: string | null;

          /**
           * CSS color for the modal background.
           */
          modalBg?: string | null;

          /**
           * CSS length for modal corner radius.
           */
          modalBorderRadius?: string | null;

          /**
           * CSS color for the primary button background.
           */
          primaryButtonBg?: string | null;

          /**
           * CSS color for primary button text.
           */
          primaryButtonColor?: string | null;

          /**
           * CSS color for the primary button background on hover.
           */
          primaryButtonHoverBg?: string | null;

          /**
           * CSS color for primary button text on hover.
           */
          primaryButtonHoverColor?: string | null;

          /**
           * CSS color for primary text in the modal body.
           */
          primaryTextColor?: string | null;

          /**
           * CSS color for the secondary button background.
           */
          secondaryButtonBg?: string | null;

          /**
           * CSS color for secondary button text.
           */
          secondaryButtonColor?: string | null;

          /**
           * CSS color for secondary button background on hover.
           */
          secondaryButtonHoverBg?: string | null;

          /**
           * CSS color for secondary button text on hover.
           */
          secondaryButtonHoverColor?: string | null;

          /**
           * CSS color for secondary text in the modal body.
           */
          secondaryTextColor?: string | null;

          /**
           * CSS color for the "on" state of category toggles.
           */
          toggleOnBg?: string | null;
        }

        /**
         * Visual options for the per-category preferences modal.
         */
        export interface PreferencesModal {
          /**
           * Button layout for the preferences modal.
           */
          buttonLayout?: 'AcceptAllRejectAllSave' | 'AcceptAllSave' | null;

          /**
           * When true, accept/reject share the same visual weight.
           */
          equalWeightButtons?: boolean | null;

          /**
           * When true, swap accept/reject button order.
           */
          flipButtons?: boolean | null;

          /**
           * Preferences modal layout (box, bar, bar_wide).
           */
          layout?: 'bar' | 'bar_wide' | 'box' | null;

          /**
           * Preferences modal anchor (left, right).
           */
          position?: 'left' | 'right' | null;
        }
      }
    }
  }

  export interface Service {
    /**
     * Internal notes shown to admins in the dashboard. Not user-facing.
     */
    internalNotes: string;

    /**
     * Display name for this service in the preferences modal.
     */
    label: string;

    /**
     * Extra category values this service belongs to. Each must match a
     * `categories[].value`.
     */
    additionalCategories?: Array<string> | null;

    /**
     * Primary category value this service belongs to. Must match one of the top-level
     * `categories[].value` entries.
     */
    category?: string | null;

    /**
     * Domains/paths this service matches. Patterns matching the CMP's own scripts
     * (e.g. cdn.oursprivacy.com/cmp-init) are rejected to prevent the CMP blocking
     * itself — use a more specific path like cdn.oursprivacy.com/main.js to block a
     * specific script.
     */
    domainPatterns?: Array<string> | null;
  }
}

export interface ConsentSettingAnalyticsParams {
  /**
   * Inclusive lower bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Count both selected dates: at most 180 days for `DAILY`,
   * 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Count both selected dates: at most 180 days for `DAILY`,
   * 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`.
   */
  to: string;

  /**
   * Supported for DAILY and HOURLY. When `true`, each bucket also returns the
   * matching bucket from the immediately preceding window of equal length (in
   * `previous*` and `percentageChange*` fields). Defaults to `false`.
   */
  compareWithPreviousPeriod?: boolean;

  /**
   * Optional custom comparison-window lower bound, as a UTC calendar day in
   * `YYYY-MM-DD` format. Provide together with `comparisonTo`; the window between
   * them must be the same length as `from`–`to` (a mismatch returns `400`). When
   * omitted (with `compareWithPreviousPeriod=true`), the immediately preceding
   * equal-length period is used.
   */
  comparisonFrom?: string;

  /**
   * Optional custom comparison-window upper bound, as a UTC calendar day in
   * `YYYY-MM-DD` format. Provide together with `comparisonFrom`; the window must
   * match the `from`–`to` length. Ignored unless both comparison bounds are
   * supplied.
   */
  comparisonTo?: string;

  /**
   * JSON-encoded versioned analytics filter. Uses the shared analytics catalog
   * property IDs and operators, including event, session, and custom properties.
   */
  filter?: string;

  /**
   * Reporting interval: DAILY (default), WEEKLY (UTC weeks starting Monday), MONTHLY
   * (UTC calendar months), or HOURLY. Included-day limits: at most 180 days for
   * `DAILY`, 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`. Breakdown
   * reports aggregate the entire selected range.
   */
  granularity?: 'DAILY' | 'HOURLY' | 'MONTHLY' | 'WEEKLY';
}

export interface ConsentSettingAnalyticsMonthlyParams {
  /**
   * Inclusive lower bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Count both selected dates: at most 180 days for `DAILY`,
   * 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Count both selected dates: at most 180 days for `DAILY`,
   * 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`.
   */
  to: string;

  /**
   * JSON-encoded versioned analytics filter. Uses the shared analytics catalog
   * property IDs and operators, including event, session, and custom properties.
   */
  filter?: string;
}

export interface ConsentSettingAnalyticsCapabilitiesParams {
  kind?: 'PAGES' | 'SUMMARY' | 'TRENDS';
}

export interface ConsentSettingPageAnalysisParams {
  /**
   * Inclusive lower bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Count both selected dates: at most 180 days for `DAILY`,
   * 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Count both selected dates: at most 180 days for `DAILY`,
   * 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`.
   */
  to: string;

  /**
   * Opaque cursor from pagination.nextCursor. Omit for the first page.
   */
  cursor?: string;

  /**
   * JSON-encoded versioned analytics filter. Uses the shared analytics catalog
   * property IDs and operators, including event, session, and custom properties.
   */
  filter?: string;

  /**
   * Reporting interval: DAILY (default), WEEKLY (UTC weeks starting Monday), MONTHLY
   * (UTC calendar months), or HOURLY. Included-day limits: at most 180 days for
   * `DAILY`, 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`. Breakdown
   * reports aggregate the entire selected range.
   */
  granularity?: 'DAILY' | 'HOURLY' | 'MONTHLY' | 'WEEKLY';

  /**
   * Maximum number of pages to return. Defaults to 50; clamped to 1–200.
   */
  limit?: number | null;

  /**
   * Case-sensitive substring match against the page path.
   */
  search?: string;
}

export interface ConsentSettingAnalyticsByRegionParams {
  /**
   * Inclusive lower bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Count both selected dates: at most 180 days for `DAILY`,
   * 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Count both selected dates: at most 180 days for `DAILY`,
   * 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`.
   */
  to: string;

  /**
   * JSON-encoded versioned analytics filter. Uses the shared analytics catalog
   * property IDs and operators, including event, session, and custom properties.
   */
  filter?: string;

  /**
   * Reporting interval: DAILY (default), WEEKLY (UTC weeks starting Monday), MONTHLY
   * (UTC calendar months), or HOURLY. Included-day limits: at most 180 days for
   * `DAILY`, 365 for `WEEKLY`, 365 for `MONTHLY`, or 14 for `HOURLY`. Breakdown
   * reports aggregate the entire selected range.
   */
  granularity?: 'DAILY' | 'HOURLY' | 'MONTHLY' | 'WEEKLY';
}

export declare namespace ConsentSettings {
  export {
    type ConsentSettingListResponse as ConsentSettingListResponse,
    type ConsentSettingCreateResponse as ConsentSettingCreateResponse,
    type ConsentSettingRetrieveResponse as ConsentSettingRetrieveResponse,
    type ConsentSettingReplaceResponse as ConsentSettingReplaceResponse,
    type ConsentSettingUpdateResponse as ConsentSettingUpdateResponse,
    type ConsentSettingDeleteResponse as ConsentSettingDeleteResponse,
    type ConsentSettingAnalyticsResponse as ConsentSettingAnalyticsResponse,
    type ConsentSettingAnalyticsMonthlyResponse as ConsentSettingAnalyticsMonthlyResponse,
    type ConsentSettingAnalyticsCapabilitiesResponse as ConsentSettingAnalyticsCapabilitiesResponse,
    type ConsentSettingPageAnalysisResponse as ConsentSettingPageAnalysisResponse,
    type ConsentSettingAnalyticsByRegionResponse as ConsentSettingAnalyticsByRegionResponse,
    type ConsentSettingReplaceParams as ConsentSettingReplaceParams,
    type ConsentSettingUpdateParams as ConsentSettingUpdateParams,
    type ConsentSettingAnalyticsParams as ConsentSettingAnalyticsParams,
    type ConsentSettingAnalyticsMonthlyParams as ConsentSettingAnalyticsMonthlyParams,
    type ConsentSettingAnalyticsCapabilitiesParams as ConsentSettingAnalyticsCapabilitiesParams,
    type ConsentSettingPageAnalysisParams as ConsentSettingPageAnalysisParams,
    type ConsentSettingAnalyticsByRegionParams as ConsentSettingAnalyticsByRegionParams,
  };
}
