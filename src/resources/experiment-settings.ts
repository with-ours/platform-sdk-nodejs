// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ExperimentSettings extends APIResource {
  /**
   * List experiment settings records for the account. Use the returned `id` as
   * `experimentSettingsId` when creating an experiment. Requires API-key scope or
   * current OAuth user permission: experimentSettings:list
   *
   * @example
   * ```ts
   * const experimentSettings =
   *   await client.experimentSettings.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ExperimentSettingListResponse> {
    return this._client.get('/rest/v1/experiment-settings', options);
  }

  /**
   * Create the account-level experimentation bootstrap record. Most accounts should
   * only ever have one. Requires API-key scope or current OAuth user permission:
   * experimentSettings:create
   *
   * @example
   * ```ts
   * const experimentSetting =
   *   await client.experimentSettings.create();
   * ```
   */
  create(
    body: ExperimentSettingCreateParams,
    options?: RequestOptions,
  ): APIPromise<ExperimentSettingCreateResponse> {
    return this._client.post('/rest/v1/experiment-settings', { body, ...options });
  }

  /**
   * Find an experiment settings record by ID, including its cookie name, public
   * pixel token, and domain allowlist. Discover the ID with GET
   * /rest/v1/experiment-settings. Returns 404 when the record is unavailable to this
   * account; returns 403 when Experimentation is disabled for an otherwise
   * authorized record. Requires API-key scope or current OAuth user permission:
   * experimentSettings:find
   *
   * @example
   * ```ts
   * const experimentSetting =
   *   await client.experimentSettings.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ExperimentSettingRetrieveResponse> {
    return this._client.get(path`/rest/v1/experiment-settings/${id}`, options);
  }

  /**
   * Partially update an experiment settings. Only the fields you send are changed.
   * Requires API-key scope or current OAuth user permission:
   * experimentSettings:update
   *
   * @example
   * ```ts
   * const experimentSetting =
   *   await client.experimentSettings.update('id');
   * ```
   */
  update(
    id: string,
    body: ExperimentSettingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ExperimentSettingUpdateResponse> {
    return this._client.patch(path`/rest/v1/experiment-settings/${id}`, { body, ...options });
  }

  /**
   * Delete the experimentation bootstrap record. This also deletes child
   * experiments, variants, and personalization properties owned by it. Requires
   * API-key scope or current OAuth user permission: experimentSettings:delete
   *
   * @example
   * ```ts
   * const experimentSetting =
   *   await client.experimentSettings.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<ExperimentSettingDeleteResponse> {
    return this._client.delete(path`/rest/v1/experiment-settings/${id}`, options);
  }
}

export interface ExperimentSettingListResponse {
  /**
   * Experiment settings records available to the current account. Use the `id` from
   * this response as `experimentSettingsId` when creating an experiment. Most
   * accounts have a single record; this list is not paginated.
   */
  entities: Array<ExperimentSettingListResponse.Entity>;
}

export namespace ExperimentSettingListResponse {
  export interface Entity {
    /**
     * Unique identifier for the account-level experiment settings record.
     */
    id: string;

    /**
     * Account that owns this experiment settings record.
     */
    accountId: string;

    /**
     * ISO 8601 timestamp when this settings record was created.
     */
    createdAt: string;

    /**
     * Human-readable name for this experimentation configuration.
     */
    name: string;

    /**
     * Public pixel token used by the experiments runtime. Use the settings id, rather
     * than this token, when creating an experiment.
     */
    pixel: string;

    /**
     * Cookie name used to persist sticky variant assignments in the browser.
     */
    cookieName?: string | null;

    /**
     * User who created this settings record.
     */
    createdByUserId?: string | null;

    /**
     * ISO 8601 timestamp when this settings record was last updated.
     */
    updatedAt?: string | null;

    /**
     * User who last updated this settings record.
     */
    updatedByUserId?: string | null;

    /**
     * Limits which domains can load your experiments. When set, experiments using this
     * settings record are only served on these domains; the SDK refuses to load
     * anywhere else and your experiments never run on those hosts. Separate from
     * source whitelistDomains, which limits which domains can send events to the CDP.
     */
    whitelistDomains?: Array<string> | null;
  }
}

export interface ExperimentSettingCreateResponse {
  /**
   * Unique identifier for the account-level experiment settings record.
   */
  id: string;

  /**
   * Account that owns this experiment settings record.
   */
  accountId: string;

  /**
   * ISO 8601 timestamp when this settings record was created.
   */
  createdAt: string;

  /**
   * Human-readable name for this experimentation configuration.
   */
  name: string;

  /**
   * Public pixel token used by the experiments runtime. Use the settings id, rather
   * than this token, when creating an experiment.
   */
  pixel: string;

  /**
   * Cookie name used to persist sticky variant assignments in the browser.
   */
  cookieName?: string | null;

  /**
   * User who created this settings record.
   */
  createdByUserId?: string | null;

  /**
   * ISO 8601 timestamp when this settings record was last updated.
   */
  updatedAt?: string | null;

  /**
   * User who last updated this settings record.
   */
  updatedByUserId?: string | null;

  /**
   * Limits which domains can load your experiments. When set, experiments using this
   * settings record are only served on these domains; the SDK refuses to load
   * anywhere else and your experiments never run on those hosts. Separate from
   * source whitelistDomains, which limits which domains can send events to the CDP.
   */
  whitelistDomains?: Array<string> | null;
}

export interface ExperimentSettingRetrieveResponse {
  /**
   * Unique identifier for the account-level experiment settings record.
   */
  id: string;

  /**
   * Account that owns this experiment settings record.
   */
  accountId: string;

  /**
   * ISO 8601 timestamp when this settings record was created.
   */
  createdAt: string;

  /**
   * Human-readable name for this experimentation configuration.
   */
  name: string;

  /**
   * Public pixel token used by the experiments runtime. Use the settings id, rather
   * than this token, when creating an experiment.
   */
  pixel: string;

  /**
   * Cookie name used to persist sticky variant assignments in the browser.
   */
  cookieName?: string | null;

  /**
   * User who created this settings record.
   */
  createdByUserId?: string | null;

  /**
   * ISO 8601 timestamp when this settings record was last updated.
   */
  updatedAt?: string | null;

  /**
   * User who last updated this settings record.
   */
  updatedByUserId?: string | null;

  /**
   * Limits which domains can load your experiments. When set, experiments using this
   * settings record are only served on these domains; the SDK refuses to load
   * anywhere else and your experiments never run on those hosts. Separate from
   * source whitelistDomains, which limits which domains can send events to the CDP.
   */
  whitelistDomains?: Array<string> | null;
}

export interface ExperimentSettingUpdateResponse {
  /**
   * Unique identifier for the account-level experiment settings record.
   */
  id: string;

  /**
   * Account that owns this experiment settings record.
   */
  accountId: string;

  /**
   * ISO 8601 timestamp when this settings record was created.
   */
  createdAt: string;

  /**
   * Human-readable name for this experimentation configuration.
   */
  name: string;

  /**
   * Public pixel token used by the experiments runtime. Use the settings id, rather
   * than this token, when creating an experiment.
   */
  pixel: string;

  /**
   * Cookie name used to persist sticky variant assignments in the browser.
   */
  cookieName?: string | null;

  /**
   * User who created this settings record.
   */
  createdByUserId?: string | null;

  /**
   * ISO 8601 timestamp when this settings record was last updated.
   */
  updatedAt?: string | null;

  /**
   * User who last updated this settings record.
   */
  updatedByUserId?: string | null;

  /**
   * Limits which domains can load your experiments. When set, experiments using this
   * settings record are only served on these domains; the SDK refuses to load
   * anywhere else and your experiments never run on those hosts. Separate from
   * source whitelistDomains, which limits which domains can send events to the CDP.
   */
  whitelistDomains?: Array<string> | null;
}

export interface ExperimentSettingDeleteResponse {
  /**
   * Unique identifier for the account-level experiment settings record.
   */
  id: string;

  /**
   * Account that owns this experiment settings record.
   */
  accountId: string;

  /**
   * ISO 8601 timestamp when this settings record was created.
   */
  createdAt: string;

  /**
   * Human-readable name for this experimentation configuration.
   */
  name: string;

  /**
   * Public pixel token used by the experiments runtime. Use the settings id, rather
   * than this token, when creating an experiment.
   */
  pixel: string;

  /**
   * Cookie name used to persist sticky variant assignments in the browser.
   */
  cookieName?: string | null;

  /**
   * User who created this settings record.
   */
  createdByUserId?: string | null;

  /**
   * ISO 8601 timestamp when this settings record was last updated.
   */
  updatedAt?: string | null;

  /**
   * User who last updated this settings record.
   */
  updatedByUserId?: string | null;

  /**
   * Limits which domains can load your experiments. When set, experiments using this
   * settings record are only served on these domains; the SDK refuses to load
   * anywhere else and your experiments never run on those hosts. Separate from
   * source whitelistDomains, which limits which domains can send events to the CDP.
   */
  whitelistDomains?: Array<string> | null;
}

export interface ExperimentSettingCreateParams {
  /**
   * Cookie name used to persist sticky variant assignments in the browser. Defaults
   * to `_cord_exp` when omitted on create.
   */
  cookieName?: string | null;

  /**
   * Human-readable name for this experimentation configuration. Defaults to
   * `Experiment Settings` when omitted on create.
   */
  name?: string | null;

  /**
   * Limits which domains can load your experiments. When set, experiments using this
   * settings record are only served on these domains; the SDK refuses to load
   * anywhere else and your experiments never run on those hosts. Separate from
   * source `whitelistDomains`, which limits which domains can send events to the
   * CDP.
   */
  whitelistDomains?: Array<string> | null;
}

export interface ExperimentSettingUpdateParams {
  /**
   * Cookie name used to persist sticky variant assignments in the browser. Defaults
   * to `_cord_exp` when omitted on create.
   */
  cookieName?: string | null;

  /**
   * Human-readable name for this experimentation configuration. Defaults to
   * `Experiment Settings` when omitted on create.
   */
  name?: string | null;

  /**
   * Limits which domains can load your experiments. When set, experiments using this
   * settings record are only served on these domains; the SDK refuses to load
   * anywhere else and your experiments never run on those hosts. Separate from
   * source `whitelistDomains`, which limits which domains can send events to the
   * CDP.
   */
  whitelistDomains?: Array<string> | null;
}

export declare namespace ExperimentSettings {
  export {
    type ExperimentSettingListResponse as ExperimentSettingListResponse,
    type ExperimentSettingCreateResponse as ExperimentSettingCreateResponse,
    type ExperimentSettingRetrieveResponse as ExperimentSettingRetrieveResponse,
    type ExperimentSettingUpdateResponse as ExperimentSettingUpdateResponse,
    type ExperimentSettingDeleteResponse as ExperimentSettingDeleteResponse,
    type ExperimentSettingCreateParams as ExperimentSettingCreateParams,
    type ExperimentSettingUpdateParams as ExperimentSettingUpdateParams,
  };
}
