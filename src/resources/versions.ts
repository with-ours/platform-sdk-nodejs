// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Versions extends APIResource {
  /**
   * List versions for this account, newest first. Supports cursor pagination and
   * filtering by `isPublished`, `nameContains`, and `notesContains`. Combine filters
   * with AND semantics. Requires scope: version:list
   */
  list(
    query: VersionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VersionListResponsesCursor, VersionListResponse> {
    return this._client.getAPIList('/rest/v1/versions', Cursor<VersionListResponse>, { query, ...options });
  }

  /**
   * Publish the current draft of non-experiment entities (destinations, mappings,
   * experiment settings, governance rules, etc.) as a new version. Newly created or
   * modified DRAFT experiments and experiment variants are NOT shipped here — call
   * `POST /rest/v1/experiments/{id}/start` instead, which atomically publishes the
   * experiment and its variants by default (`publishAfterStart: true`). Returns the
   * full Version on success. Returns HTTP 409 with the reason in the response
   * `error` field when there are no draft changes to publish, when another publish
   * is already in flight, or when the action otherwise conflicts with current state.
   * To re-publish an existing version, use POST /rest/v1/versions/{id}/publish
   * instead.
   *
   * Supports cherry-picking via the `include*` body fields. Each `include*` field is
   * an entity-id allowlist for one collection — omit (or send `[]`) to include every
   * draft change in that collection, or send a non-empty array to whitelist only
   * those ids. Unlisted collections inherit wholesale from the latest published
   * version. Requires scope: version:publish
   */
  create(body: VersionCreateParams, options?: RequestOptions): APIPromise<VersionCreateResponse> {
    return this._client.post('/rest/v1/versions', { body, ...options });
  }

  /**
   * Find a single version by ID. Requires scope: version:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<VersionRetrieveResponse> {
    return this._client.get(path`/rest/v1/versions/${id}`, options);
  }

  /**
   * Partially update a version. Only the fields you send are changed. Requires
   * scope: version:update
   */
  update(id: string, body: VersionUpdateParams, options?: RequestOptions): APIPromise<VersionUpdateResponse> {
    return this._client.patch(path`/rest/v1/versions/${id}`, { body, ...options });
  }

  /**
   * Re-publish an existing (previously created) version by ID. Use this to roll back
   * to an older snapshot. Returns 409 if the version is already published, was
   * created more than 45 days ago, or another publish is already in flight. To
   * create-and-publish from current draft state, use POST /rest/v1/versions instead.
   * Requires scope: version:publish
   */
  publish(id: string, options?: RequestOptions): APIPromise<VersionPublishResponse> {
    return this._client.post(path`/rest/v1/versions/${id}/publish`, options);
  }

  /**
   * Retrieve the full JSON snapshot captured by a version — every entity
   * (destinations, sources, mappings, consent settings, etc.) as it existed when
   * this version was published. Sensitive fields (API keys, tokens, secrets) are
   * redacted. Useful for IaC export, audit, and backup workflows. Requires scope:
   * version:find
   */
  snapshot(id: string, options?: RequestOptions): APIPromise<VersionSnapshotResponse> {
    return this._client.get(path`/rest/v1/versions/${id}/snapshot`, options);
  }

  /**
   * Compare two versions of the account configuration. Returns
   * added/removed/modified entities grouped by collection, plus a total `count`.
   *
   * Draft experiments and experiment variants do NOT appear in any diff — only
   * experiments that are already running (or paused/completed) snapshot into
   * versions. Use the experiment lifecycle endpoints (`/start`, `/stop`, etc.) to
   * ship experiment changes; use these diff endpoints only for non-experiment
   * entities (destinations, mappings, experiment settings, governance rules, etc.).
   *
   * - `GET /rest/v1/versions/draft/diff` — compare the current draft of
   *   non-experiment entities against the latest published version. Use this to
   *   preview what would be included in a `POST /rest/v1/versions` call. (`draft` is
   *   a literal path segment — there is no version with that ID; it identifies the
   *   comparison target.)
   * - `GET /rest/v1/versions/{id}/diff` — compare that specific version against the
   *   latest published version.
   * - `GET /rest/v1/versions/{id}/diff?against={otherId}` — compare two specific
   *   versions. `otherId` may also be `draft` to diff a published snapshot against
   *   the live draft state. Requires scope: version:find
   */
  diff(
    id: 'draft' | (string & {}),
    query: VersionDiffParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VersionDiffResponse> {
    return this._client.get(path`/rest/v1/versions/${id}/diff`, { query, ...options });
  }

  /**
   * Revert one or more pending draft changes back to the latest published version
   * (the "abandon a change" action). Send a body listing the entities to revert;
   * each is handled independently — a modified entity is restored to its published
   * values, a deleted entity is recreated, and a newly-added entity is discarded. An
   * entity that already matches the published version is left untouched and is not
   * counted (a no-op). An entity present in neither the draft nor the published
   * version is reported in `notFoundCount`. `remainingChanges` is the total number
   * of pending draft changes left after this call, which may stay above zero when
   * other unreverted changes remain.
   *
   * The `experiments` and `experimentVariants` collections are not supported here —
   * use the experiment lifecycle endpoints (`/start`, `/stop`) for those — but
   * `experimentSettings` is supported. To discard every pending change at once, use
   * `POST /rest/v1/versions/draft/abandon`. (`draft` is a literal path segment
   * identifying the live draft as the target.) Requires scope: version:publish
   */
  revert(
    id: 'draft',
    body: VersionRevertParams,
    options?: RequestOptions,
  ): APIPromise<VersionRevertResponse> {
    return this._client.post(path`/rest/v1/versions/${id}/revert`, { body, ...options });
  }

  /**
   * Abandon ALL pending draft changes, resetting every supported entity collection
   * back to the latest published version. Running experiments and experiment
   * variants are not affected (ship those via the experiment lifecycle endpoints),
   * but experiment settings are reset. Returns HTTP 409 when there is no published
   * version to revert to, or when another publish or abandon is already in flight.
   * To revert only specific changes, use `POST /rest/v1/versions/draft/revert`.
   * (`draft` is a literal path segment identifying the live draft as the target.)
   * Requires scope: version:publish
   */
  abandon(id: 'draft', options?: RequestOptions): APIPromise<VersionAbandonResponse> {
    return this._client.post(path`/rest/v1/versions/${id}/abandon`, options);
  }
}

export type VersionListResponsesCursor = Cursor<VersionListResponse>;

export interface VersionListResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  /**
   * When this version was most recently published. NOT cleared when a newer version
   * is published — `publishedAt` reflects the most recent successful publish of this
   * row, regardless of whether `isPublished` is currently true. Use `isPublished` to
   * determine the current live version.
   */
  publishedAt?: string | null;
}

export interface VersionCreateResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  /**
   * When this version was most recently published. NOT cleared when a newer version
   * is published — `publishedAt` reflects the most recent successful publish of this
   * row, regardless of whether `isPublished` is currently true. Use `isPublished` to
   * determine the current live version.
   */
  publishedAt?: string | null;
}

export interface VersionRetrieveResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  /**
   * When this version was most recently published. NOT cleared when a newer version
   * is published — `publishedAt` reflects the most recent successful publish of this
   * row, regardless of whether `isPublished` is currently true. Use `isPublished` to
   * determine the current live version.
   */
  publishedAt?: string | null;
}

export interface VersionUpdateResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  /**
   * When this version was most recently published. NOT cleared when a newer version
   * is published — `publishedAt` reflects the most recent successful publish of this
   * row, regardless of whether `isPublished` is currently true. Use `isPublished` to
   * determine the current live version.
   */
  publishedAt?: string | null;
}

export interface VersionPublishResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

  notes?: string | null;

  /**
   * When this version was most recently published. NOT cleared when a newer version
   * is published — `publishedAt` reflects the most recent successful publish of this
   * row, regardless of whether `isPublished` is currently true. Use `isPublished` to
   * determine the current live version.
   */
  publishedAt?: string | null;
}

export interface VersionSnapshotResponse {
  id: string;

  /**
   * The full entity snapshot captured by this version. Keys are entity collection
   * names (destinations, sources, allowedEvents, mappings, consentSettings,
   * replaySettings, globalDispatchCenters, etc.) and values are arrays of the
   * entities as they existed at publish time. Sensitive fields (API keys, tokens,
   * secrets) are redacted. Returns null when the version snapshot has been pruned.
   */
  jsonContent: { [key: string]: unknown };

  versionNumber: number;
}

export interface VersionDiffResponse {
  /**
   * Total number of differences across all entity collections. Equals the sum of
   * `added + removed + modified` across every collection in `differences`.
   */
  count: number;

  differences: VersionDiffResponse.Differences;
}

export namespace VersionDiffResponse {
  export interface Differences {
    allowedEvents: Differences.AllowedEvents;

    consentSettings: Differences.ConsentSettings;

    dataGovernanceEvents: Differences.DataGovernanceEvents;

    dataGovernanceRules: Differences.DataGovernanceRules;

    destinations: Differences.Destinations;

    experiments: Differences.Experiments;

    experimentSettings: Differences.ExperimentSettings;

    experimentVariants: Differences.ExperimentVariants;

    externalAllowedEventData: Differences.ExternalAllowedEventData;

    globalDispatchCenters: Differences.GlobalDispatchCenters;

    mappings: Differences.Mappings;

    replaySettings: Differences.ReplaySettings;

    sources: Differences.Sources;

    tagManagers: Differences.TagManagers;

    tagManagerTags: Differences.TagManagerTags;

    tagManagerTriggers: Differences.TagManagerTriggers;

    tagManagerVariables: Differences.TagManagerVariables;
  }

  export namespace Differences {
    export interface AllowedEvents {
      added: Array<AllowedEvents.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<AllowedEvents.Modified>;

      removed: Array<AllowedEvents.Removed>;
    }

    export namespace AllowedEvents {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface ConsentSettings {
      added: Array<ConsentSettings.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<ConsentSettings.Modified>;

      removed: Array<ConsentSettings.Removed>;
    }

    export namespace ConsentSettings {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface DataGovernanceEvents {
      added: Array<DataGovernanceEvents.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<DataGovernanceEvents.Modified>;

      removed: Array<DataGovernanceEvents.Removed>;
    }

    export namespace DataGovernanceEvents {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface DataGovernanceRules {
      added: Array<DataGovernanceRules.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<DataGovernanceRules.Modified>;

      removed: Array<DataGovernanceRules.Removed>;
    }

    export namespace DataGovernanceRules {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface Destinations {
      added: Array<Destinations.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<Destinations.Modified>;

      removed: Array<Destinations.Removed>;
    }

    export namespace Destinations {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface Experiments {
      added: Array<Experiments.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<Experiments.Modified>;

      removed: Array<Experiments.Removed>;
    }

    export namespace Experiments {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface ExperimentSettings {
      added: Array<ExperimentSettings.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<ExperimentSettings.Modified>;

      removed: Array<ExperimentSettings.Removed>;
    }

    export namespace ExperimentSettings {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface ExperimentVariants {
      added: Array<ExperimentVariants.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<ExperimentVariants.Modified>;

      removed: Array<ExperimentVariants.Removed>;
    }

    export namespace ExperimentVariants {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface ExternalAllowedEventData {
      added: Array<ExternalAllowedEventData.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<ExternalAllowedEventData.Modified>;

      removed: Array<ExternalAllowedEventData.Removed>;
    }

    export namespace ExternalAllowedEventData {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface GlobalDispatchCenters {
      added: Array<GlobalDispatchCenters.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<GlobalDispatchCenters.Modified>;

      removed: Array<GlobalDispatchCenters.Removed>;
    }

    export namespace GlobalDispatchCenters {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface Mappings {
      added: Array<Mappings.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<Mappings.Modified>;

      removed: Array<Mappings.Removed>;
    }

    export namespace Mappings {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface ReplaySettings {
      added: Array<ReplaySettings.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<ReplaySettings.Modified>;

      removed: Array<ReplaySettings.Removed>;
    }

    export namespace ReplaySettings {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface Sources {
      added: Array<Sources.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<Sources.Modified>;

      removed: Array<Sources.Removed>;
    }

    export namespace Sources {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface TagManagers {
      added: Array<TagManagers.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<TagManagers.Modified>;

      removed: Array<TagManagers.Removed>;
    }

    export namespace TagManagers {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface TagManagerTags {
      added: Array<TagManagerTags.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<TagManagerTags.Modified>;

      removed: Array<TagManagerTags.Removed>;
    }

    export namespace TagManagerTags {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface TagManagerTriggers {
      added: Array<TagManagerTriggers.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<TagManagerTriggers.Modified>;

      removed: Array<TagManagerTriggers.Removed>;
    }

    export namespace TagManagerTriggers {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }

    export interface TagManagerVariables {
      added: Array<TagManagerVariables.Added>;

      /**
       * Entities present in both snapshots but with at least one field changed. `old` is
       * the snapshot of the entity in the baseline (latest published); `new` is the
       * snapshot in the comparison target (the draft).
       */
      modified: Array<TagManagerVariables.Modified>;

      removed: Array<TagManagerVariables.Removed>;
    }

    export namespace TagManagerVariables {
      export interface Added {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }

        export interface Old {
          id: string;

          /**
           * Human-readable label for the entity at the snapshot it was captured in. For most
           * collections this is the entity's `name` field; for `allowedEvents` it is a
           * computed summary of the event's key fields. Two `modified` items can therefore
           * have identical `old.name` and `new.name` even though their underlying records
           * differ — the change is in fields not surfaced by the summary. Use the `id` to
           * fetch full detail.
           */
          name?: string | null;

          /**
           * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
           * modifications when the only change is priority reordering — this lets clients
           * de-emphasize them in change-review UI. `null` for every other diff item.
           */
          summary?: string | null;

          /**
           * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
           * `tagManagerVariables`. `null` for every other collection.
           */
          tagManagerId?: string | null;

          /**
           * Entity subtype when the collection has one — for `sources` it matches the
           * source's `type` field, letting clients distinguish kinds of source. `null` for
           * collections without a subtype.
           */
          type?: string | null;
        }
      }

      export interface Removed {
        id: string;

        /**
         * Human-readable label for the entity at the snapshot it was captured in. For most
         * collections this is the entity's `name` field; for `allowedEvents` it is a
         * computed summary of the event's key fields. Two `modified` items can therefore
         * have identical `old.name` and `new.name` even though their underlying records
         * differ — the change is in fields not surfaced by the summary. Use the `id` to
         * fetch full detail.
         */
        name?: string | null;

        /**
         * Optional change-classifier. Currently set to `'Reordered'` on `mappings`
         * modifications when the only change is priority reordering — this lets clients
         * de-emphasize them in change-review UI. `null` for every other diff item.
         */
        summary?: string | null;

        /**
         * Parent tag-manager id for `tagManagerTags`, `tagManagerTriggers`, and
         * `tagManagerVariables`. `null` for every other collection.
         */
        tagManagerId?: string | null;

        /**
         * Entity subtype when the collection has one — for `sources` it matches the
         * source's `type` field, letting clients distinguish kinds of source. `null` for
         * collections without a subtype.
         */
        type?: string | null;
      }
    }
  }
}

export interface VersionRevertResponse {
  /**
   * Newly-added draft entities that were deleted.
   */
  discardedCount: number;

  /**
   * Requested entities present in neither the draft nor the latest published
   * version.
   */
  notFoundCount: number;

  /**
   * Total pending draft changes remaining after this operation.
   */
  remainingChanges: number;

  /**
   * Entities recreated because they had been deleted from the draft.
   */
  restoredCount: number;

  /**
   * Entities overwritten back to their published values.
   */
  revertedCount: number;
}

export interface VersionAbandonResponse {
  /**
   * Newly-added draft entities that were deleted.
   */
  discardedCount: number;

  /**
   * Requested entities present in neither the draft nor the latest published
   * version.
   */
  notFoundCount: number;

  /**
   * Total pending draft changes remaining after this operation.
   */
  remainingChanges: number;

  /**
   * Entities recreated because they had been deleted from the draft.
   */
  restoredCount: number;

  /**
   * Entities overwritten back to their published values.
   */
  revertedCount: number;
}

export interface VersionListParams extends CursorParams {
  /**
   * Filter to only published or unpublished versions.
   */
  isPublished?: 'true' | 'false';

  /**
   * Case-insensitive substring match on the version name.
   */
  nameContains?: string;

  /**
   * Case-insensitive substring match on the version notes.
   */
  notesContains?: string;
}

export interface VersionCreateParams {
  /**
   * Cherry-pick: allowed event ids (slug-like strings) to include from the draft.
   * Omit or send `[]` to include all draft changes in this collection.
   */
  includeAllowedEvents?: Array<string> | null;

  /**
   * Cherry-pick: consent settings ids to include from the draft. Omit or send `[]`
   * to include all draft changes in this collection.
   */
  includeConsentSettings?: Array<string> | null;

  /**
   * Cherry-pick: data governance event UUIDs to include from the draft. Omit or send
   * `[]` to include all draft changes in this collection.
   */
  includeDataGovernanceEvents?: Array<string> | null;

  /**
   * Cherry-pick: data governance rule UUIDs to include from the draft. Omit or send
   * `[]` to include all draft changes in this collection.
   */
  includeDataGovernanceRules?: Array<string> | null;

  /**
   * Cherry-pick: destination UUIDs to include from the draft. Omit or send `[]` to
   * include all draft changes in this collection.
   */
  includeDestinations?: Array<string> | null;

  /**
   * Cherry-pick: experiment UUIDs to include from the draft. Omit or send `[]` to
   * include all draft changes in this collection.
   */
  includeExperiments?: Array<string> | null;

  /**
   * Cherry-pick: experiment settings UUIDs to include from the draft. Omit or send
   * `[]` to include all draft changes in this collection.
   */
  includeExperimentSettings?: Array<string> | null;

  /**
   * Cherry-pick: experiment variant UUIDs to include from the draft. Omit or send
   * `[]` to include all draft changes in this collection.
   */
  includeExperimentVariants?: Array<string> | null;

  /**
   * Cherry-pick: external allowed event data ids to include from the draft. Omit or
   * send `[]` to include all draft changes in this collection.
   */
  includeExternalAllowedEventData?: Array<string> | null;

  /**
   * Cherry-pick: global dispatch center ids to include from the draft. Omit or send
   * `[]` to include all draft changes in this collection.
   */
  includeGlobalDispatchCenters?: Array<string> | null;

  /**
   * Cherry-pick: mapping ids to include from the draft. Omit or send `[]` to include
   * all draft changes in this collection.
   */
  includeMappings?: Array<string> | null;

  /**
   * Cherry-pick: replay settings ids to include from the draft. Omit or send `[]` to
   * include all draft changes in this collection.
   */
  includeReplaySettings?: Array<string> | null;

  /**
   * Cherry-pick: source UUIDs to include from the draft. Omit or send `[]` to
   * include all draft changes in this collection.
   */
  includeSources?: Array<string> | null;

  /**
   * Cherry-pick: tag manager tag UUIDs to include from the draft. Omit or send `[]`
   * to include all draft changes in this collection.
   */
  includeTagManagerTags?: Array<string> | null;

  /**
   * Cherry-pick: tag manager trigger UUIDs to include from the draft. Omit or send
   * `[]` to include all draft changes in this collection.
   */
  includeTagManagerTriggers?: Array<string> | null;

  /**
   * Cherry-pick: tag manager variable UUIDs to include from the draft. Omit or send
   * `[]` to include all draft changes in this collection.
   */
  includeTagManagerVariables?: Array<string> | null;

  name?: string | null;

  notes?: string | null;
}

export interface VersionUpdateParams {
  name?: string | null;

  notes?: string | null;
}

export interface VersionDiffParams {
  /**
   * Baseline version id to compare the path version against. Omit for the latest
   * published version. Pass a version UUID to compute a version-vs-version diff.
   */
  against?: string;
}

export interface VersionRevertParams {
  /**
   * Draft entities to revert back to the latest published version. Each entry is
   * processed independently: a modified entity is restored to its published values,
   * a deleted entity is recreated, and a newly-added entity is discarded. Pass a
   * single entry to revert one change.
   */
  entities: Array<VersionRevertParams.Entity>;
}

export namespace VersionRevertParams {
  export interface Entity {
    /**
     * Id of the draft entity to revert.
     */
    id: string;

    /**
     * Entity collection the id belongs to. `experiments` and `experimentVariants` are
     * not supported — use the experiment lifecycle endpoints for those — but
     * `experimentSettings` is.
     */
    collection:
      | 'allowedEvents'
      | 'consentSettings'
      | 'dataGovernanceEvents'
      | 'dataGovernanceRules'
      | 'destinations'
      | 'experimentSettings'
      | 'externalAllowedEventData'
      | 'globalDispatchCenters'
      | 'mappings'
      | 'replaySettings'
      | 'sources'
      | 'tagManagerTags'
      | 'tagManagerTriggers'
      | 'tagManagerVariables'
      | 'tagManagers';
  }
}

export declare namespace Versions {
  export {
    type VersionListResponse as VersionListResponse,
    type VersionCreateResponse as VersionCreateResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionUpdateResponse as VersionUpdateResponse,
    type VersionPublishResponse as VersionPublishResponse,
    type VersionSnapshotResponse as VersionSnapshotResponse,
    type VersionDiffResponse as VersionDiffResponse,
    type VersionRevertResponse as VersionRevertResponse,
    type VersionAbandonResponse as VersionAbandonResponse,
    type VersionListResponsesCursor as VersionListResponsesCursor,
    type VersionListParams as VersionListParams,
    type VersionCreateParams as VersionCreateParams,
    type VersionUpdateParams as VersionUpdateParams,
    type VersionDiffParams as VersionDiffParams,
    type VersionRevertParams as VersionRevertParams,
  };
}
