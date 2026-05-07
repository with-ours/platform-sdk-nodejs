# AllowedEvents

Types:

- <code><a href="./src/resources/allowed-events.ts">AllowedEventListResponse</a></code>
- <code><a href="./src/resources/allowed-events.ts">AllowedEventCreateResponse</a></code>
- <code><a href="./src/resources/allowed-events.ts">AllowedEventRetrieveResponse</a></code>
- <code><a href="./src/resources/allowed-events.ts">AllowedEventDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/allowed-events">client.allowedEvents.<a href="./src/resources/allowed-events.ts">list</a>() -> AllowedEventListResponse</code>
- <code title="post /rest/v1/allowed-events">client.allowedEvents.<a href="./src/resources/allowed-events.ts">create</a>({ ...params }) -> AllowedEventCreateResponse</code>
- <code title="get /rest/v1/allowed-events/{id}">client.allowedEvents.<a href="./src/resources/allowed-events.ts">retrieve</a>(id) -> AllowedEventRetrieveResponse</code>
- <code title="delete /rest/v1/allowed-events/{id}">client.allowedEvents.<a href="./src/resources/allowed-events.ts">delete</a>(id) -> AllowedEventDeleteResponse</code>

# ConsentSettings

Types:

- <code><a href="./src/resources/consent-settings.ts">ConsentSettingListResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingCreateResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingRetrieveResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingReplaceResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingUpdateResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/consent-settings">client.consentSettings.<a href="./src/resources/consent-settings.ts">list</a>() -> ConsentSettingListResponse</code>
- <code title="post /rest/v1/consent-settings">client.consentSettings.<a href="./src/resources/consent-settings.ts">create</a>() -> ConsentSettingCreateResponse</code>
- <code title="get /rest/v1/consent-settings/{id}">client.consentSettings.<a href="./src/resources/consent-settings.ts">retrieve</a>(id) -> ConsentSettingRetrieveResponse | null</code>
- <code title="put /rest/v1/consent-settings/{id}">client.consentSettings.<a href="./src/resources/consent-settings.ts">replace</a>(id, { ...params }) -> ConsentSettingReplaceResponse</code>
- <code title="patch /rest/v1/consent-settings/{id}">client.consentSettings.<a href="./src/resources/consent-settings.ts">update</a>(id, { ...params }) -> ConsentSettingUpdateResponse</code>
- <code title="delete /rest/v1/consent-settings/{id}">client.consentSettings.<a href="./src/resources/consent-settings.ts">delete</a>(id) -> ConsentSettingDeleteResponse</code>

# Destinations

Types:

- <code><a href="./src/resources/destinations.ts">DestinationListResponse</a></code>
- <code><a href="./src/resources/destinations.ts">DestinationCreateResponse</a></code>
- <code><a href="./src/resources/destinations.ts">DestinationRetrieveResponse</a></code>
- <code><a href="./src/resources/destinations.ts">DestinationUpdateResponse</a></code>
- <code><a href="./src/resources/destinations.ts">DestinationDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/destinations">client.destinations.<a href="./src/resources/destinations.ts">list</a>() -> DestinationListResponse</code>
- <code title="post /rest/v1/destinations">client.destinations.<a href="./src/resources/destinations.ts">create</a>({ ...params }) -> DestinationCreateResponse</code>
- <code title="get /rest/v1/destinations/{id}">client.destinations.<a href="./src/resources/destinations.ts">retrieve</a>(id) -> DestinationRetrieveResponse</code>
- <code title="patch /rest/v1/destinations/{id}">client.destinations.<a href="./src/resources/destinations.ts">update</a>(id, { ...params }) -> DestinationUpdateResponse</code>
- <code title="delete /rest/v1/destinations/{id}">client.destinations.<a href="./src/resources/destinations.ts">delete</a>(id) -> DestinationDeleteResponse</code>

# ExperimentSettings

Types:

- <code><a href="./src/resources/experiment-settings.ts">ExperimentSettingListResponse</a></code>
- <code><a href="./src/resources/experiment-settings.ts">ExperimentSettingCreateResponse</a></code>
- <code><a href="./src/resources/experiment-settings.ts">ExperimentSettingRetrieveResponse</a></code>
- <code><a href="./src/resources/experiment-settings.ts">ExperimentSettingUpdateResponse</a></code>
- <code><a href="./src/resources/experiment-settings.ts">ExperimentSettingDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/experiment-settings">client.experimentSettings.<a href="./src/resources/experiment-settings.ts">list</a>() -> ExperimentSettingListResponse</code>
- <code title="post /rest/v1/experiment-settings">client.experimentSettings.<a href="./src/resources/experiment-settings.ts">create</a>({ ...params }) -> ExperimentSettingCreateResponse</code>
- <code title="get /rest/v1/experiment-settings/{id}">client.experimentSettings.<a href="./src/resources/experiment-settings.ts">retrieve</a>(id) -> ExperimentSettingRetrieveResponse</code>
- <code title="patch /rest/v1/experiment-settings/{id}">client.experimentSettings.<a href="./src/resources/experiment-settings.ts">update</a>(id, { ...params }) -> ExperimentSettingUpdateResponse</code>
- <code title="delete /rest/v1/experiment-settings/{id}">client.experimentSettings.<a href="./src/resources/experiment-settings.ts">delete</a>(id) -> ExperimentSettingDeleteResponse</code>

# ExperimentVariants

Types:

- <code><a href="./src/resources/experiment-variants.ts">ExperimentVariantListResponse</a></code>
- <code><a href="./src/resources/experiment-variants.ts">ExperimentVariantCreateResponse</a></code>
- <code><a href="./src/resources/experiment-variants.ts">ExperimentVariantRetrieveResponse</a></code>
- <code><a href="./src/resources/experiment-variants.ts">ExperimentVariantUpdateResponse</a></code>
- <code><a href="./src/resources/experiment-variants.ts">ExperimentVariantDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/experiment-variants">client.experimentVariants.<a href="./src/resources/experiment-variants.ts">list</a>({ ...params }) -> ExperimentVariantListResponsesCursor</code>
- <code title="post /rest/v1/experiment-variants">client.experimentVariants.<a href="./src/resources/experiment-variants.ts">create</a>({ ...params }) -> ExperimentVariantCreateResponse</code>
- <code title="get /rest/v1/experiment-variants/{id}">client.experimentVariants.<a href="./src/resources/experiment-variants.ts">retrieve</a>(id) -> ExperimentVariantRetrieveResponse</code>
- <code title="patch /rest/v1/experiment-variants/{id}">client.experimentVariants.<a href="./src/resources/experiment-variants.ts">update</a>(id, { ...params }) -> ExperimentVariantUpdateResponse</code>
- <code title="delete /rest/v1/experiment-variants/{id}">client.experimentVariants.<a href="./src/resources/experiment-variants.ts">delete</a>(id) -> ExperimentVariantDeleteResponse</code>

# Experiments

Types:

- <code><a href="./src/resources/experiments.ts">ExperimentListResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentCreateResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentRetrieveResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentUpdateResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentDeleteResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentStartResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentStopResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentPauseResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentResumeResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentResultsResponse</a></code>
- <code><a href="./src/resources/experiments.ts">ExperimentResultsTimeSeriesResponse</a></code>

Methods:

- <code title="get /rest/v1/experiments">client.experiments.<a href="./src/resources/experiments.ts">list</a>({ ...params }) -> ExperimentListResponsesCursor</code>
- <code title="post /rest/v1/experiments">client.experiments.<a href="./src/resources/experiments.ts">create</a>({ ...params }) -> ExperimentCreateResponse</code>
- <code title="get /rest/v1/experiments/{id}">client.experiments.<a href="./src/resources/experiments.ts">retrieve</a>(id) -> ExperimentRetrieveResponse</code>
- <code title="patch /rest/v1/experiments/{id}">client.experiments.<a href="./src/resources/experiments.ts">update</a>(id, { ...params }) -> ExperimentUpdateResponse</code>
- <code title="delete /rest/v1/experiments/{id}">client.experiments.<a href="./src/resources/experiments.ts">delete</a>(id) -> ExperimentDeleteResponse</code>
- <code title="post /rest/v1/experiments/{id}/start">client.experiments.<a href="./src/resources/experiments.ts">start</a>(id, { ...params }) -> ExperimentStartResponse</code>
- <code title="post /rest/v1/experiments/{id}/stop">client.experiments.<a href="./src/resources/experiments.ts">stop</a>(id, { ...params }) -> ExperimentStopResponse</code>
- <code title="post /rest/v1/experiments/{id}/pause">client.experiments.<a href="./src/resources/experiments.ts">pause</a>(id, { ...params }) -> ExperimentPauseResponse</code>
- <code title="post /rest/v1/experiments/{id}/resume">client.experiments.<a href="./src/resources/experiments.ts">resume</a>(id, { ...params }) -> ExperimentResumeResponse</code>
- <code title="get /rest/v1/experiments/{id}/results">client.experiments.<a href="./src/resources/experiments.ts">results</a>(id, { ...params }) -> ExperimentResultsResponse</code>
- <code title="get /rest/v1/experiments/{id}/results-time-series">client.experiments.<a href="./src/resources/experiments.ts">resultsTimeSeries</a>(id, { ...params }) -> ExperimentResultsTimeSeriesResponse</code>

# GlobalDispatchCenters

Types:

- <code><a href="./src/resources/global-dispatch-centers.ts">GlobalDispatchCenterListResponse</a></code>
- <code><a href="./src/resources/global-dispatch-centers.ts">GlobalDispatchCenterCreateResponse</a></code>
- <code><a href="./src/resources/global-dispatch-centers.ts">GlobalDispatchCenterRetrieveResponse</a></code>
- <code><a href="./src/resources/global-dispatch-centers.ts">GlobalDispatchCenterUpdateResponse</a></code>
- <code><a href="./src/resources/global-dispatch-centers.ts">GlobalDispatchCenterDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/global-dispatch-centers">client.globalDispatchCenters.<a href="./src/resources/global-dispatch-centers.ts">list</a>({ ...params }) -> GlobalDispatchCenterListResponsesCursor</code>
- <code title="post /rest/v1/global-dispatch-centers">client.globalDispatchCenters.<a href="./src/resources/global-dispatch-centers.ts">create</a>({ ...params }) -> GlobalDispatchCenterCreateResponse</code>
- <code title="get /rest/v1/global-dispatch-centers/{id}">client.globalDispatchCenters.<a href="./src/resources/global-dispatch-centers.ts">retrieve</a>(id) -> GlobalDispatchCenterRetrieveResponse | null</code>
- <code title="patch /rest/v1/global-dispatch-centers/{id}">client.globalDispatchCenters.<a href="./src/resources/global-dispatch-centers.ts">update</a>(id, { ...params }) -> GlobalDispatchCenterUpdateResponse</code>
- <code title="delete /rest/v1/global-dispatch-centers/{id}">client.globalDispatchCenters.<a href="./src/resources/global-dispatch-centers.ts">delete</a>(id) -> GlobalDispatchCenterDeleteResponse</code>

# Mappings

Types:

- <code><a href="./src/resources/mappings.ts">MappingListResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingCreateResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingRetrieveResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingUpdateResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/mappings">client.mappings.<a href="./src/resources/mappings.ts">list</a>({ ...params }) -> MappingListResponsesCursor</code>
- <code title="post /rest/v1/mappings">client.mappings.<a href="./src/resources/mappings.ts">create</a>({ ...params }) -> MappingCreateResponse</code>
- <code title="get /rest/v1/mappings/{id}">client.mappings.<a href="./src/resources/mappings.ts">retrieve</a>(id) -> MappingRetrieveResponse</code>
- <code title="patch /rest/v1/mappings/{id}">client.mappings.<a href="./src/resources/mappings.ts">update</a>(id, { ...params }) -> MappingUpdateResponse</code>
- <code title="delete /rest/v1/mappings/{id}">client.mappings.<a href="./src/resources/mappings.ts">delete</a>(id) -> MappingDeleteResponse</code>

# ReplaySettings

Types:

- <code><a href="./src/resources/replay-settings.ts">ReplaySettingListResponse</a></code>
- <code><a href="./src/resources/replay-settings.ts">ReplaySettingCreateResponse</a></code>
- <code><a href="./src/resources/replay-settings.ts">ReplaySettingRetrieveResponse</a></code>
- <code><a href="./src/resources/replay-settings.ts">ReplaySettingUpdateResponse</a></code>
- <code><a href="./src/resources/replay-settings.ts">ReplaySettingDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/replay-settings">client.replaySettings.<a href="./src/resources/replay-settings.ts">list</a>({ ...params }) -> ReplaySettingListResponsesCursor</code>
- <code title="post /rest/v1/replay-settings">client.replaySettings.<a href="./src/resources/replay-settings.ts">create</a>({ ...params }) -> ReplaySettingCreateResponse</code>
- <code title="get /rest/v1/replay-settings/{id}">client.replaySettings.<a href="./src/resources/replay-settings.ts">retrieve</a>(id) -> ReplaySettingRetrieveResponse | null</code>
- <code title="patch /rest/v1/replay-settings/{id}">client.replaySettings.<a href="./src/resources/replay-settings.ts">update</a>(id, { ...params }) -> ReplaySettingUpdateResponse</code>
- <code title="delete /rest/v1/replay-settings/{id}">client.replaySettings.<a href="./src/resources/replay-settings.ts">delete</a>(id) -> ReplaySettingDeleteResponse</code>

# Sources

Types:

- <code><a href="./src/resources/sources.ts">SourceListResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceCreateResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceRetrieveResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceUpdateResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceDeleteResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceTokensResponse</a></code>

Methods:

- <code title="get /rest/v1/sources">client.sources.<a href="./src/resources/sources.ts">list</a>() -> SourceListResponse</code>
- <code title="post /rest/v1/sources">client.sources.<a href="./src/resources/sources.ts">create</a>({ ...params }) -> SourceCreateResponse</code>
- <code title="get /rest/v1/sources/{id}">client.sources.<a href="./src/resources/sources.ts">retrieve</a>(id) -> SourceRetrieveResponse</code>
- <code title="patch /rest/v1/sources/{id}">client.sources.<a href="./src/resources/sources.ts">update</a>(id, { ...params }) -> SourceUpdateResponse</code>
- <code title="delete /rest/v1/sources/{id}">client.sources.<a href="./src/resources/sources.ts">delete</a>(id) -> SourceDeleteResponse</code>
- <code title="get /rest/v1/sources/{id}/tokens">client.sources.<a href="./src/resources/sources.ts">tokens</a>(id) -> SourceTokensResponse</code>

# Versions

Types:

- <code><a href="./src/resources/versions.ts">VersionListResponse</a></code>
- <code><a href="./src/resources/versions.ts">VersionCreateResponse</a></code>
- <code><a href="./src/resources/versions.ts">VersionRetrieveResponse</a></code>
- <code><a href="./src/resources/versions.ts">VersionUpdateResponse</a></code>
- <code><a href="./src/resources/versions.ts">VersionPublishResponse</a></code>
- <code><a href="./src/resources/versions.ts">VersionSnapshotResponse</a></code>
- <code><a href="./src/resources/versions.ts">VersionDiffResponse</a></code>

Methods:

- <code title="get /rest/v1/versions">client.versions.<a href="./src/resources/versions.ts">list</a>({ ...params }) -> VersionListResponsesCursor</code>
- <code title="post /rest/v1/versions">client.versions.<a href="./src/resources/versions.ts">create</a>({ ...params }) -> VersionCreateResponse</code>
- <code title="get /rest/v1/versions/{id}">client.versions.<a href="./src/resources/versions.ts">retrieve</a>(id) -> VersionRetrieveResponse</code>
- <code title="patch /rest/v1/versions/{id}">client.versions.<a href="./src/resources/versions.ts">update</a>(id, { ...params }) -> VersionUpdateResponse</code>
- <code title="post /rest/v1/versions/{id}/publish">client.versions.<a href="./src/resources/versions.ts">publish</a>(id) -> VersionPublishResponse</code>
- <code title="get /rest/v1/versions/{id}/snapshot">client.versions.<a href="./src/resources/versions.ts">snapshot</a>(id) -> VersionSnapshotResponse</code>
- <code title="get /rest/v1/versions/{id}/diff">client.versions.<a href="./src/resources/versions.ts">diff</a>(id) -> VersionDiffResponse</code>
