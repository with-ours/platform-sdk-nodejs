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
   * Publish the current draft (i.e. all unpublished entity changes) as a new
   * version. Returns the full Version on success. Returns HTTP 409 with the reason
   * in the response `error` field when there are no draft changes to publish, when
   * another publish is already in flight, or when the action otherwise conflicts
   * with current state. To re-publish an existing version, use POST
   * /rest/v1/versions/{id}/publish instead. Requires scope: version:publish
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
   * Compare the current draft (all unpublished entity changes) against the latest
   * published version. Returns added/removed/modified entities grouped by
   * collection, plus a total `count`. Use this to preview what would be included in
   * a `POST /rest/v1/versions` call. The path segment `draft` is a literal — there
   * is no version with that ID; it identifies the comparison target. Requires scope:
   * version:find
   */
  diff(id: 'draft', options?: RequestOptions): APIPromise<VersionDiffResponse> {
    return this._client.get(path`/rest/v1/versions/${id}/diff`, options);
  }
}

export type VersionListResponsesCursor = Cursor<VersionListResponse>;

export interface VersionListResponse {
  id: string;

  createdAt: string;

  isPublished: boolean;

  versionNumber: number;

  name?: string | null;

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

    tagManagerTags: Differences.TagManagerTags;

    tagManagerTriggers: Differences.TagManagerTriggers;

    tagManagerVariables: Differences.TagManagerVariables;
  }

  export namespace Differences {
    export interface AllowedEvents {
      added: Array<AllowedEvents.Added>;

      modified: Array<AllowedEvents.Modified>;

      removed: Array<AllowedEvents.Removed>;
    }

    export namespace AllowedEvents {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface ConsentSettings {
      added: Array<ConsentSettings.Added>;

      modified: Array<ConsentSettings.Modified>;

      removed: Array<ConsentSettings.Removed>;
    }

    export namespace ConsentSettings {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface DataGovernanceEvents {
      added: Array<DataGovernanceEvents.Added>;

      modified: Array<DataGovernanceEvents.Modified>;

      removed: Array<DataGovernanceEvents.Removed>;
    }

    export namespace DataGovernanceEvents {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface DataGovernanceRules {
      added: Array<DataGovernanceRules.Added>;

      modified: Array<DataGovernanceRules.Modified>;

      removed: Array<DataGovernanceRules.Removed>;
    }

    export namespace DataGovernanceRules {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface Destinations {
      added: Array<Destinations.Added>;

      modified: Array<Destinations.Modified>;

      removed: Array<Destinations.Removed>;
    }

    export namespace Destinations {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface Experiments {
      added: Array<Experiments.Added>;

      modified: Array<Experiments.Modified>;

      removed: Array<Experiments.Removed>;
    }

    export namespace Experiments {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface ExperimentSettings {
      added: Array<ExperimentSettings.Added>;

      modified: Array<ExperimentSettings.Modified>;

      removed: Array<ExperimentSettings.Removed>;
    }

    export namespace ExperimentSettings {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface ExperimentVariants {
      added: Array<ExperimentVariants.Added>;

      modified: Array<ExperimentVariants.Modified>;

      removed: Array<ExperimentVariants.Removed>;
    }

    export namespace ExperimentVariants {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface ExternalAllowedEventData {
      added: Array<ExternalAllowedEventData.Added>;

      modified: Array<ExternalAllowedEventData.Modified>;

      removed: Array<ExternalAllowedEventData.Removed>;
    }

    export namespace ExternalAllowedEventData {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface GlobalDispatchCenters {
      added: Array<GlobalDispatchCenters.Added>;

      modified: Array<GlobalDispatchCenters.Modified>;

      removed: Array<GlobalDispatchCenters.Removed>;
    }

    export namespace GlobalDispatchCenters {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface Mappings {
      added: Array<Mappings.Added>;

      modified: Array<Mappings.Modified>;

      removed: Array<Mappings.Removed>;
    }

    export namespace Mappings {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface ReplaySettings {
      added: Array<ReplaySettings.Added>;

      modified: Array<ReplaySettings.Modified>;

      removed: Array<ReplaySettings.Removed>;
    }

    export namespace ReplaySettings {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface Sources {
      added: Array<Sources.Added>;

      modified: Array<Sources.Modified>;

      removed: Array<Sources.Removed>;
    }

    export namespace Sources {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface TagManagerTags {
      added: Array<TagManagerTags.Added>;

      modified: Array<TagManagerTags.Modified>;

      removed: Array<TagManagerTags.Removed>;
    }

    export namespace TagManagerTags {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface TagManagerTriggers {
      added: Array<TagManagerTriggers.Added>;

      modified: Array<TagManagerTriggers.Modified>;

      removed: Array<TagManagerTriggers.Removed>;
    }

    export namespace TagManagerTriggers {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }

    export interface TagManagerVariables {
      added: Array<TagManagerVariables.Added>;

      modified: Array<TagManagerVariables.Modified>;

      removed: Array<TagManagerVariables.Removed>;
    }

    export namespace TagManagerVariables {
      export interface Added {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }

      export interface Modified {
        new: Modified.New;

        old: Modified.Old;
      }

      export namespace Modified {
        export interface New {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }

        export interface Old {
          id: string;

          name?: string | null;

          summary?: string | null;

          tagManagerId?: string | null;
        }
      }

      export interface Removed {
        id: string;

        name?: string | null;

        summary?: string | null;

        tagManagerId?: string | null;
      }
    }
  }
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
  includeAllowedEvents?: Array<string> | null;

  includeConsentSettings?: Array<string> | null;

  includeDestinations?: Array<string> | null;

  includeExternalAllowedEventData?: Array<string> | null;

  includeGlobalDispatchCenters?: Array<string> | null;

  includeMappings?: Array<string> | null;

  includeReplaySettings?: Array<string> | null;

  includeSources?: Array<string> | null;

  includeTagManagerTags?: Array<string> | null;

  includeTagManagerTriggers?: Array<string> | null;

  includeTagManagerVariables?: Array<string> | null;

  name?: string | null;

  notes?: string | null;
}

export interface VersionUpdateParams {
  name?: string | null;

  notes?: string | null;
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
    type VersionListResponsesCursor as VersionListResponsesCursor,
    type VersionListParams as VersionListParams,
    type VersionCreateParams as VersionCreateParams,
    type VersionUpdateParams as VersionUpdateParams,
  };
}
