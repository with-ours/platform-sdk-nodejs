// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ConsentSettings extends APIResource {
  /**
   * List all consent settings. Requires scope: consentSettings:list
   */
  list(options?: RequestOptions): APIPromise<ConsentSettingListResponse> {
    return this._client.get('/rest/v1/consent-settings', options);
  }

  /**
   * Create a new consent settings record. POST takes no request body — the server
   * initializes the record with defaults (Disabled status, opt-out default rule,
   * English translations, necessary/analytics/advertising categories, no regions, no
   * whitelisted domains). Configure the record afterward with PATCH (partial update)
   * or PUT (full replacement). Returns the same shape as GET so you can read the
   * server-assigned `id`, default rule, and categories without a follow-up fetch.
   * Requires scope: consentSettings:create
   */
  create(options?: RequestOptions): APIPromise<ConsentSettingCreateResponse> {
    return this._client.post('/rest/v1/consent-settings', options);
  }

  /**
   * Find a single consent setting by ID. Requires scope: consentSettings:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ConsentSettingRetrieveResponse | null> {
    return this._client.get(path`/rest/v1/consent-settings/${id}`, options);
  }

  /**
   * Replace a consent setting. Send the full ConsentSettingsInput body — omitted
   * optional fields are reset. Use PATCH for partial updates. Requires scope:
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
   * Partially update a consent setting. Send only the fields you want to change —
   * every field is optional and unspecified fields are preserved. List-valued fields
   * (services, categories, regions) are replaced wholesale when sent. Requires
   * scope: consentSettings:update
   */
  update(
    id: string,
    body: ConsentSettingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ConsentSettingUpdateResponse> {
    return this._client.patch(path`/rest/v1/consent-settings/${id}`, { body, ...options });
  }

  /**
   * Delete a consent setting. Requires scope: consentSettings:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<ConsentSettingDeleteResponse> {
    return this._client.delete(path`/rest/v1/consent-settings/${id}`, options);
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
     * Enabled means the CMP serves on whitelisted domains; Disabled means it does not.
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
     * Allowlist of domains where this CMP configuration may run. Used at runtime to
     * derive the broadest matching base domain so consent can persist across matching
     * subdomains.
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
      autoShowDismissConfig?: unknown | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: string | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: unknown | null;

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
          consentModal?: unknown | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: unknown | null;
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
        autoShowDismissConfig?: unknown | null;

        /**
         * How the modal is treated as dismissed (never, after_pages, after_seconds).
         */
        autoShowDismissMode?: string | null;

        /**
         * When true, the rest of the page is locked behind a backdrop until the user
         * chooses.
         */
        disablePageInteraction?: boolean | null;

        /**
         * Visual options for the modals (layout/position/colors).
         */
        guiOptions?: unknown | null;

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
            consentModal?: unknown | null;

            /**
             * Translated copy for the preferences modal.
             */
            preferencesModal?: unknown | null;
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
   * Enabled means the CMP serves on whitelisted domains; Disabled means it does not.
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
   * Allowlist of domains where this CMP configuration may run. Used at runtime to
   * derive the broadest matching base domain so consent can persist across matching
   * subdomains.
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
    autoShowDismissConfig?: unknown | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: string | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: unknown | null;

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
        consentModal?: unknown | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: unknown | null;
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
      autoShowDismissConfig?: unknown | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: string | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: unknown | null;

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
          consentModal?: unknown | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: unknown | null;
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
   * Enabled means the CMP serves on whitelisted domains; Disabled means it does not.
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
   * Allowlist of domains where this CMP configuration may run. Used at runtime to
   * derive the broadest matching base domain so consent can persist across matching
   * subdomains.
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
    autoShowDismissConfig?: unknown | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: string | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: unknown | null;

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
        consentModal?: unknown | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: unknown | null;
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
      autoShowDismissConfig?: unknown | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: string | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: unknown | null;

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
          consentModal?: unknown | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: unknown | null;
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
   * Enabled means the CMP serves on whitelisted domains; Disabled means it does not.
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
   * Allowlist of domains where this CMP configuration may run. Used at runtime to
   * derive the broadest matching base domain so consent can persist across matching
   * subdomains.
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
    autoShowDismissConfig?: unknown | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: string | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: unknown | null;

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
        consentModal?: unknown | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: unknown | null;
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
      autoShowDismissConfig?: unknown | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: string | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: unknown | null;

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
          consentModal?: unknown | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: unknown | null;
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
   * Enabled means the CMP serves on whitelisted domains; Disabled means it does not.
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
   * Allowlist of domains where this CMP configuration may run. Used at runtime to
   * derive the broadest matching base domain so consent can persist across matching
   * subdomains.
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
    autoShowDismissConfig?: unknown | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: string | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: unknown | null;

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
        consentModal?: unknown | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: unknown | null;
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
      autoShowDismissConfig?: unknown | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: string | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: unknown | null;

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
          consentModal?: unknown | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: unknown | null;
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
   * Enabled means the CMP serves on whitelisted domains; Disabled means it does not.
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
   * Allowlist of domains where this CMP configuration may run. Used at runtime to
   * derive the broadest matching base domain so consent can persist across matching
   * subdomains.
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
    autoShowDismissConfig?: unknown | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: string | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: unknown | null;

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
        consentModal?: unknown | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: unknown | null;
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
      autoShowDismissConfig?: unknown | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: string | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: unknown | null;

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
          consentModal?: unknown | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: unknown | null;
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
   * Enabled to serve the CMP, Disabled to take it offline.
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
   * Allowlist of domains where this CMP runs. Pass null/[] to clear.
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
    autoShowDismissConfig?: unknown | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: string | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: unknown | null;

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
        consentModal?: unknown | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: unknown | null;
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
      autoShowDismissConfig?: unknown | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: string | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: unknown | null;

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
          consentModal?: unknown | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: unknown | null;
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
   * Toggle Enabled/Disabled without re-sending the rest of the config.
   */
  status?: 'Disabled' | 'Enabled';

  /**
   * Set or clear the WebSource pixel link. A non-null token must be a valid
   * WebSource of yours.
   */
  webSDKToken?: string | null;

  /**
   * Replace the allowlist. Pass null/[] to clear.
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
    autoShowDismissConfig?: unknown | null;

    /**
     * How the modal is treated as dismissed (never, after_pages, after_seconds).
     */
    autoShowDismissMode?: string | null;

    /**
     * When true, the rest of the page is locked behind a backdrop until the user
     * chooses.
     */
    disablePageInteraction?: boolean | null;

    /**
     * Visual options for the modals (layout/position/colors).
     */
    guiOptions?: unknown | null;

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
        consentModal?: unknown | null;

        /**
         * Translated copy for the preferences modal.
         */
        preferencesModal?: unknown | null;
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
      autoShowDismissConfig?: unknown | null;

      /**
       * How the modal is treated as dismissed (never, after_pages, after_seconds).
       */
      autoShowDismissMode?: string | null;

      /**
       * When true, the rest of the page is locked behind a backdrop until the user
       * chooses.
       */
      disablePageInteraction?: boolean | null;

      /**
       * Visual options for the modals (layout/position/colors).
       */
      guiOptions?: unknown | null;

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
          consentModal?: unknown | null;

          /**
           * Translated copy for the preferences modal.
           */
          preferencesModal?: unknown | null;
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

export declare namespace ConsentSettings {
  export {
    type ConsentSettingListResponse as ConsentSettingListResponse,
    type ConsentSettingCreateResponse as ConsentSettingCreateResponse,
    type ConsentSettingRetrieveResponse as ConsentSettingRetrieveResponse,
    type ConsentSettingReplaceResponse as ConsentSettingReplaceResponse,
    type ConsentSettingUpdateResponse as ConsentSettingUpdateResponse,
    type ConsentSettingDeleteResponse as ConsentSettingDeleteResponse,
    type ConsentSettingReplaceParams as ConsentSettingReplaceParams,
    type ConsentSettingUpdateParams as ConsentSettingUpdateParams,
  };
}
