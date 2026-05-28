# AllowedEvents

Types:

- <code><a href="./src/resources/allowed-events.ts">AllowedEventListResponse</a></code>
- <code><a href="./src/resources/allowed-events.ts">AllowedEventCreateResponse</a></code>
- <code><a href="./src/resources/allowed-events.ts">AllowedEventRetrieveResponse</a></code>
- <code><a href="./src/resources/allowed-events.ts">AllowedEventUpdateResponse</a></code>
- <code><a href="./src/resources/allowed-events.ts">AllowedEventDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/allowed-events">client.allowedEvents.<a href="./src/resources/allowed-events.ts">list</a>() -> AllowedEventListResponse</code>
- <code title="post /rest/v1/allowed-events">client.allowedEvents.<a href="./src/resources/allowed-events.ts">create</a>({ ...params }) -> AllowedEventCreateResponse</code>
- <code title="get /rest/v1/allowed-events/{id}">client.allowedEvents.<a href="./src/resources/allowed-events.ts">retrieve</a>(id) -> AllowedEventRetrieveResponse</code>
- <code title="patch /rest/v1/allowed-events/{id}">client.allowedEvents.<a href="./src/resources/allowed-events.ts">update</a>(id, { ...params }) -> AllowedEventUpdateResponse</code>
- <code title="delete /rest/v1/allowed-events/{id}">client.allowedEvents.<a href="./src/resources/allowed-events.ts">delete</a>(id) -> AllowedEventDeleteResponse</code>

# ConsentAnalytics

Types:

- <code><a href="./src/resources/consent-analytics.ts">ConsentAnalyticsListResponse</a></code>

Methods:

- <code title="get /rest/v1/consent-analytics">client.consentAnalytics.<a href="./src/resources/consent-analytics.ts">list</a>({ ...params }) -> ConsentAnalyticsListResponse</code>

# ConsentSettings

Types:

- <code><a href="./src/resources/consent-settings.ts">ConsentSettingListResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingCreateResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingRetrieveResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingReplaceResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingUpdateResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingDeleteResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingAnalyticsResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingPageAnalysisResponse</a></code>
- <code><a href="./src/resources/consent-settings.ts">ConsentSettingAnalyticsByRegionResponse</a></code>

Methods:

- <code title="get /rest/v1/consent-settings">client.consentSettings.<a href="./src/resources/consent-settings.ts">list</a>() -> ConsentSettingListResponse</code>
- <code title="post /rest/v1/consent-settings">client.consentSettings.<a href="./src/resources/consent-settings.ts">create</a>() -> ConsentSettingCreateResponse</code>
- <code title="get /rest/v1/consent-settings/{id}">client.consentSettings.<a href="./src/resources/consent-settings.ts">retrieve</a>(id) -> ConsentSettingRetrieveResponse | null</code>
- <code title="put /rest/v1/consent-settings/{id}">client.consentSettings.<a href="./src/resources/consent-settings.ts">replace</a>(id, { ...params }) -> ConsentSettingReplaceResponse</code>
- <code title="patch /rest/v1/consent-settings/{id}">client.consentSettings.<a href="./src/resources/consent-settings.ts">update</a>(id, { ...params }) -> ConsentSettingUpdateResponse</code>
- <code title="delete /rest/v1/consent-settings/{id}">client.consentSettings.<a href="./src/resources/consent-settings.ts">delete</a>(id) -> ConsentSettingDeleteResponse</code>
- <code title="get /rest/v1/consent-settings/{id}/analytics">client.consentSettings.<a href="./src/resources/consent-settings.ts">analytics</a>(id, { ...params }) -> ConsentSettingAnalyticsResponse</code>
- <code title="get /rest/v1/consent-settings/{id}/page-analysis">client.consentSettings.<a href="./src/resources/consent-settings.ts">pageAnalysis</a>(id, { ...params }) -> ConsentSettingPageAnalysisResponse</code>
- <code title="get /rest/v1/consent-settings/{id}/analytics-by-region">client.consentSettings.<a href="./src/resources/consent-settings.ts">analyticsByRegion</a>(id, { ...params }) -> ConsentSettingAnalyticsByRegionResponse</code>

# DataGovernance

Types:

- <code><a href="./src/resources/data-governance.ts">DataGovernanceListResponse</a></code>
- <code><a href="./src/resources/data-governance.ts">DataGovernanceCreateResponse</a></code>
- <code><a href="./src/resources/data-governance.ts">DataGovernanceRetrieveResponse</a></code>
- <code><a href="./src/resources/data-governance.ts">DataGovernanceUpdateResponse</a></code>
- <code><a href="./src/resources/data-governance.ts">DataGovernanceDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/data-governance">client.dataGovernance.<a href="./src/resources/data-governance.ts">list</a>({ ...params }) -> DataGovernanceListResponsesCursor</code>
- <code title="post /rest/v1/data-governance">client.dataGovernance.<a href="./src/resources/data-governance.ts">create</a>({ ...params }) -> DataGovernanceCreateResponse</code>
- <code title="get /rest/v1/data-governance/{id}">client.dataGovernance.<a href="./src/resources/data-governance.ts">retrieve</a>(id) -> DataGovernanceRetrieveResponse | null</code>
- <code title="patch /rest/v1/data-governance/{id}">client.dataGovernance.<a href="./src/resources/data-governance.ts">update</a>(id, { ...params }) -> DataGovernanceUpdateResponse</code>
- <code title="delete /rest/v1/data-governance/{id}">client.dataGovernance.<a href="./src/resources/data-governance.ts">delete</a>(id) -> DataGovernanceDeleteResponse</code>

# DefaultMappings

Types:

- <code><a href="./src/resources/default-mappings.ts">DefaultMappingListResponse</a></code>
- <code><a href="./src/resources/default-mappings.ts">DefaultMappingRetrieveResponse</a></code>
- <code><a href="./src/resources/default-mappings.ts">DefaultMappingReplaceResponse</a></code>

Methods:

- <code title="get /rest/v1/default-mappings">client.defaultMappings.<a href="./src/resources/default-mappings.ts">list</a>() -> DefaultMappingListResponse</code>
- <code title="get /rest/v1/default-mappings/{id}">client.defaultMappings.<a href="./src/resources/default-mappings.ts">retrieve</a>(id) -> DefaultMappingRetrieveResponse</code>
- <code title="put /rest/v1/default-mappings/{id}">client.defaultMappings.<a href="./src/resources/default-mappings.ts">replace</a>(id, { ...params }) -> DefaultMappingReplaceResponse</code>

# Destinations

Types:

- <code><a href="./src/resources/destinations.ts">DestinationListResponse</a></code>
- <code><a href="./src/resources/destinations.ts">DestinationCreateResponse</a></code>
- <code><a href="./src/resources/destinations.ts">DestinationRetrieveResponse</a></code>
- <code><a href="./src/resources/destinations.ts">DestinationUpdateResponse</a></code>
- <code><a href="./src/resources/destinations.ts">DestinationDeleteResponse</a></code>
- <code><a href="./src/resources/destinations.ts">DestinationTypesResponse</a></code>

Methods:

- <code title="get /rest/v1/destinations">client.destinations.<a href="./src/resources/destinations.ts">list</a>({ ...params }) -> DestinationListResponsesCursor</code>
- <code title="post /rest/v1/destinations">client.destinations.<a href="./src/resources/destinations.ts">create</a>({ ...params }) -> DestinationCreateResponse</code>
- <code title="get /rest/v1/destinations/{id}">client.destinations.<a href="./src/resources/destinations.ts">retrieve</a>(id) -> DestinationRetrieveResponse</code>
- <code title="patch /rest/v1/destinations/{id}">client.destinations.<a href="./src/resources/destinations.ts">update</a>(id, { ...params }) -> DestinationUpdateResponse</code>
- <code title="delete /rest/v1/destinations/{id}">client.destinations.<a href="./src/resources/destinations.ts">delete</a>(id) -> DestinationDeleteResponse</code>
- <code title="get /rest/v1/destinations/types">client.destinations.<a href="./src/resources/destinations.ts">types</a>() -> DestinationTypesResponse</code>

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
- <code><a href="./src/resources/experiments.ts">ExperimentSessionReplaysResponse</a></code>

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
- <code title="get /rest/v1/experiments/{id}/session-replays">client.experiments.<a href="./src/resources/experiments.ts">sessionReplays</a>(id, { ...params }) -> ExperimentSessionReplaysResponse</code>

# HeatmapPages

Types:

- <code><a href="./src/resources/heatmap-pages.ts">HeatmapPageListResponse</a></code>
- <code><a href="./src/resources/heatmap-pages.ts">HeatmapPageSummaryResponse</a></code>

Methods:

- <code title="get /rest/v1/heatmap-pages">client.heatmapPages.<a href="./src/resources/heatmap-pages.ts">list</a>({ ...params }) -> HeatmapPageListResponsesCursor</code>
- <code title="get /rest/v1/heatmap-pages/summary">client.heatmapPages.<a href="./src/resources/heatmap-pages.ts">summary</a>({ ...params }) -> HeatmapPageSummaryResponse</code>

# Locations

Types:

- <code><a href="./src/resources/locations.ts">LocationListResponse</a></code>
- <code><a href="./src/resources/locations.ts">LocationCreateResponse</a></code>
- <code><a href="./src/resources/locations.ts">LocationUpdateResponse</a></code>
- <code><a href="./src/resources/locations.ts">LocationEmbedCodeResponse</a></code>

Methods:

- <code title="get /rest/v1/locations">client.locations.<a href="./src/resources/locations.ts">list</a>() -> LocationListResponse</code>
- <code title="post /rest/v1/locations">client.locations.<a href="./src/resources/locations.ts">create</a>({ ...params }) -> LocationCreateResponse</code>
- <code title="patch /rest/v1/locations/{id}">client.locations.<a href="./src/resources/locations.ts">update</a>(id, { ...params }) -> LocationUpdateResponse</code>
- <code title="get /rest/v1/locations/{id}/embed-code">client.locations.<a href="./src/resources/locations.ts">embedCode</a>(id, { ...params }) -> LocationEmbedCodeResponse</code>

# Mappings

Types:

- <code><a href="./src/resources/mappings.ts">MappingListResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingCreateResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingRetrieveResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingUpdateResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingDeleteResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingReorderResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingTemplatesResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingDefaultVariablesResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingCustomVariablesResponse</a></code>
- <code><a href="./src/resources/mappings.ts">MappingModificationsResponse</a></code>

Methods:

- <code title="get /rest/v1/mappings">client.mappings.<a href="./src/resources/mappings.ts">list</a>({ ...params }) -> MappingListResponsesCursor</code>
- <code title="post /rest/v1/mappings">client.mappings.<a href="./src/resources/mappings.ts">create</a>({ ...params }) -> MappingCreateResponse</code>
- <code title="get /rest/v1/mappings/{id}">client.mappings.<a href="./src/resources/mappings.ts">retrieve</a>(id) -> MappingRetrieveResponse</code>
- <code title="patch /rest/v1/mappings/{id}">client.mappings.<a href="./src/resources/mappings.ts">update</a>(id, { ...params }) -> MappingUpdateResponse</code>
- <code title="delete /rest/v1/mappings/{id}">client.mappings.<a href="./src/resources/mappings.ts">delete</a>(id) -> MappingDeleteResponse</code>
- <code title="post /rest/v1/mappings/reorder">client.mappings.<a href="./src/resources/mappings.ts">reorder</a>({ ...params }) -> MappingReorderResponse</code>
- <code title="get /rest/v1/mappings/templates">client.mappings.<a href="./src/resources/mappings.ts">templates</a>({ ...params }) -> MappingTemplatesResponse</code>
- <code title="get /rest/v1/mappings/default-variables">client.mappings.<a href="./src/resources/mappings.ts">defaultVariables</a>() -> MappingDefaultVariablesResponse</code>
- <code title="get /rest/v1/mappings/custom-variables">client.mappings.<a href="./src/resources/mappings.ts">customVariables</a>() -> MappingCustomVariablesResponse</code>
- <code title="get /rest/v1/mappings/modifications">client.mappings.<a href="./src/resources/mappings.ts">modifications</a>() -> MappingModificationsResponse</code>

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

- <code title="get /rest/v1/sources">client.sources.<a href="./src/resources/sources.ts">list</a>({ ...params }) -> SourceListResponsesCursor</code>
- <code title="post /rest/v1/sources">client.sources.<a href="./src/resources/sources.ts">create</a>({ ...params }) -> SourceCreateResponse</code>
- <code title="get /rest/v1/sources/{id}">client.sources.<a href="./src/resources/sources.ts">retrieve</a>(id) -> SourceRetrieveResponse</code>
- <code title="patch /rest/v1/sources/{id}">client.sources.<a href="./src/resources/sources.ts">update</a>(id, { ...params }) -> SourceUpdateResponse</code>
- <code title="delete /rest/v1/sources/{id}">client.sources.<a href="./src/resources/sources.ts">delete</a>(id) -> SourceDeleteResponse</code>
- <code title="get /rest/v1/sources/{id}/tokens">client.sources.<a href="./src/resources/sources.ts">tokens</a>(id) -> SourceTokensResponse</code>

# TagManagers

Types:

- <code><a href="./src/resources/tag-managers.ts">TagManagerListResponse</a></code>
- <code><a href="./src/resources/tag-managers.ts">TagManagerCreateResponse</a></code>
- <code><a href="./src/resources/tag-managers.ts">TagManagerRetrieveResponse</a></code>
- <code><a href="./src/resources/tag-managers.ts">TagManagerUpdateResponse</a></code>
- <code><a href="./src/resources/tag-managers.ts">TagManagerDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/tag-managers">client.tagManagers.<a href="./src/resources/tag-managers.ts">list</a>() -> TagManagerListResponse</code>
- <code title="post /rest/v1/tag-managers">client.tagManagers.<a href="./src/resources/tag-managers.ts">create</a>({ ...params }) -> TagManagerCreateResponse</code>
- <code title="get /rest/v1/tag-managers/{id}">client.tagManagers.<a href="./src/resources/tag-managers.ts">retrieve</a>(id) -> TagManagerRetrieveResponse</code>
- <code title="patch /rest/v1/tag-managers/{id}">client.tagManagers.<a href="./src/resources/tag-managers.ts">update</a>(id, { ...params }) -> TagManagerUpdateResponse</code>
- <code title="delete /rest/v1/tag-managers/{id}">client.tagManagers.<a href="./src/resources/tag-managers.ts">delete</a>(id) -> TagManagerDeleteResponse</code>

# TagManagerTags

Types:

- <code><a href="./src/resources/tag-manager-tags.ts">TagManagerTagListResponse</a></code>
- <code><a href="./src/resources/tag-manager-tags.ts">TagManagerTagCreateResponse</a></code>
- <code><a href="./src/resources/tag-manager-tags.ts">TagManagerTagRetrieveResponse</a></code>
- <code><a href="./src/resources/tag-manager-tags.ts">TagManagerTagUpdateResponse</a></code>
- <code><a href="./src/resources/tag-manager-tags.ts">TagManagerTagDeleteResponse</a></code>
- <code><a href="./src/resources/tag-manager-tags.ts">TagManagerTagTypesResponse</a></code>

Methods:

- <code title="get /rest/v1/tag-manager-tags">client.tagManagerTags.<a href="./src/resources/tag-manager-tags.ts">list</a>({ ...params }) -> TagManagerTagListResponsesCursor</code>
- <code title="post /rest/v1/tag-manager-tags">client.tagManagerTags.<a href="./src/resources/tag-manager-tags.ts">create</a>({ ...params }) -> TagManagerTagCreateResponse</code>
- <code title="get /rest/v1/tag-manager-tags/{id}">client.tagManagerTags.<a href="./src/resources/tag-manager-tags.ts">retrieve</a>(id) -> TagManagerTagRetrieveResponse</code>
- <code title="patch /rest/v1/tag-manager-tags/{id}">client.tagManagerTags.<a href="./src/resources/tag-manager-tags.ts">update</a>(id, { ...params }) -> TagManagerTagUpdateResponse</code>
- <code title="delete /rest/v1/tag-manager-tags/{id}">client.tagManagerTags.<a href="./src/resources/tag-manager-tags.ts">delete</a>(id) -> TagManagerTagDeleteResponse</code>
- <code title="get /rest/v1/tag-manager-tags/types">client.tagManagerTags.<a href="./src/resources/tag-manager-tags.ts">types</a>() -> TagManagerTagTypesResponse</code>

# TagManagerTriggers

Types:

- <code><a href="./src/resources/tag-manager-triggers.ts">TagManagerTriggerListResponse</a></code>
- <code><a href="./src/resources/tag-manager-triggers.ts">TagManagerTriggerCreateResponse</a></code>
- <code><a href="./src/resources/tag-manager-triggers.ts">TagManagerTriggerRetrieveResponse</a></code>
- <code><a href="./src/resources/tag-manager-triggers.ts">TagManagerTriggerUpdateResponse</a></code>
- <code><a href="./src/resources/tag-manager-triggers.ts">TagManagerTriggerDeleteResponse</a></code>
- <code><a href="./src/resources/tag-manager-triggers.ts">TagManagerTriggerTypesResponse</a></code>

Methods:

- <code title="get /rest/v1/tag-manager-triggers">client.tagManagerTriggers.<a href="./src/resources/tag-manager-triggers.ts">list</a>({ ...params }) -> TagManagerTriggerListResponsesCursor</code>
- <code title="post /rest/v1/tag-manager-triggers">client.tagManagerTriggers.<a href="./src/resources/tag-manager-triggers.ts">create</a>({ ...params }) -> TagManagerTriggerCreateResponse</code>
- <code title="get /rest/v1/tag-manager-triggers/{id}">client.tagManagerTriggers.<a href="./src/resources/tag-manager-triggers.ts">retrieve</a>(id) -> TagManagerTriggerRetrieveResponse</code>
- <code title="patch /rest/v1/tag-manager-triggers/{id}">client.tagManagerTriggers.<a href="./src/resources/tag-manager-triggers.ts">update</a>(id, { ...params }) -> TagManagerTriggerUpdateResponse</code>
- <code title="delete /rest/v1/tag-manager-triggers/{id}">client.tagManagerTriggers.<a href="./src/resources/tag-manager-triggers.ts">delete</a>(id) -> TagManagerTriggerDeleteResponse</code>
- <code title="get /rest/v1/tag-manager-triggers/types">client.tagManagerTriggers.<a href="./src/resources/tag-manager-triggers.ts">types</a>() -> TagManagerTriggerTypesResponse</code>

# TagManagerVariables

Types:

- <code><a href="./src/resources/tag-manager-variables.ts">TagManagerVariableListResponse</a></code>
- <code><a href="./src/resources/tag-manager-variables.ts">TagManagerVariableCreateResponse</a></code>
- <code><a href="./src/resources/tag-manager-variables.ts">TagManagerVariableRetrieveResponse</a></code>
- <code><a href="./src/resources/tag-manager-variables.ts">TagManagerVariableUpdateResponse</a></code>
- <code><a href="./src/resources/tag-manager-variables.ts">TagManagerVariableDeleteResponse</a></code>
- <code><a href="./src/resources/tag-manager-variables.ts">TagManagerVariableTypesResponse</a></code>

Methods:

- <code title="get /rest/v1/tag-manager-variables">client.tagManagerVariables.<a href="./src/resources/tag-manager-variables.ts">list</a>({ ...params }) -> TagManagerVariableListResponsesCursor</code>
- <code title="post /rest/v1/tag-manager-variables">client.tagManagerVariables.<a href="./src/resources/tag-manager-variables.ts">create</a>({ ...params }) -> TagManagerVariableCreateResponse</code>
- <code title="get /rest/v1/tag-manager-variables/{id}">client.tagManagerVariables.<a href="./src/resources/tag-manager-variables.ts">retrieve</a>(id) -> TagManagerVariableRetrieveResponse</code>
- <code title="patch /rest/v1/tag-manager-variables/{id}">client.tagManagerVariables.<a href="./src/resources/tag-manager-variables.ts">update</a>(id, { ...params }) -> TagManagerVariableUpdateResponse</code>
- <code title="delete /rest/v1/tag-manager-variables/{id}">client.tagManagerVariables.<a href="./src/resources/tag-manager-variables.ts">delete</a>(id) -> TagManagerVariableDeleteResponse</code>
- <code title="get /rest/v1/tag-manager-variables/types">client.tagManagerVariables.<a href="./src/resources/tag-manager-variables.ts">types</a>() -> TagManagerVariableTypesResponse</code>

# TagManagerFolders

Types:

- <code><a href="./src/resources/tag-manager-folders.ts">TagManagerFolderListResponse</a></code>
- <code><a href="./src/resources/tag-manager-folders.ts">TagManagerFolderCreateResponse</a></code>
- <code><a href="./src/resources/tag-manager-folders.ts">TagManagerFolderRetrieveResponse</a></code>
- <code><a href="./src/resources/tag-manager-folders.ts">TagManagerFolderUpdateResponse</a></code>
- <code><a href="./src/resources/tag-manager-folders.ts">TagManagerFolderDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/tag-manager-folders">client.tagManagerFolders.<a href="./src/resources/tag-manager-folders.ts">list</a>({ ...params }) -> TagManagerFolderListResponsesCursor</code>
- <code title="post /rest/v1/tag-manager-folders">client.tagManagerFolders.<a href="./src/resources/tag-manager-folders.ts">create</a>({ ...params }) -> TagManagerFolderCreateResponse</code>
- <code title="get /rest/v1/tag-manager-folders/{id}">client.tagManagerFolders.<a href="./src/resources/tag-manager-folders.ts">retrieve</a>(id) -> TagManagerFolderRetrieveResponse</code>
- <code title="patch /rest/v1/tag-manager-folders/{id}">client.tagManagerFolders.<a href="./src/resources/tag-manager-folders.ts">update</a>(id, { ...params }) -> TagManagerFolderUpdateResponse</code>
- <code title="delete /rest/v1/tag-manager-folders/{id}">client.tagManagerFolders.<a href="./src/resources/tag-manager-folders.ts">delete</a>(id) -> TagManagerFolderDeleteResponse</code>

# TagManagerAssetFolders

Types:

- <code><a href="./src/resources/tag-manager-asset-folders.ts">TagManagerAssetFolderCreateResponse</a></code>

Methods:

- <code title="post /rest/v1/tag-manager-asset-folders">client.tagManagerAssetFolders.<a href="./src/resources/tag-manager-asset-folders.ts">create</a>({ ...params }) -> TagManagerAssetFolderCreateResponse</code>

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
- <code title="get /rest/v1/versions/{id}/diff">client.versions.<a href="./src/resources/versions.ts">diff</a>(id, { ...params }) -> VersionDiffResponse</code>

# WebScannerRules

Types:

- <code><a href="./src/resources/web-scanner-rules.ts">WebScannerRuleListResponse</a></code>
- <code><a href="./src/resources/web-scanner-rules.ts">WebScannerRuleCreateResponse</a></code>
- <code><a href="./src/resources/web-scanner-rules.ts">WebScannerRuleRetrieveResponse</a></code>
- <code><a href="./src/resources/web-scanner-rules.ts">WebScannerRuleUpdateResponse</a></code>
- <code><a href="./src/resources/web-scanner-rules.ts">WebScannerRuleDeleteResponse</a></code>

Methods:

- <code title="get /rest/v1/web-scanner-rules">client.webScannerRules.<a href="./src/resources/web-scanner-rules.ts">list</a>({ ...params }) -> WebScannerRuleListResponse</code>
- <code title="post /rest/v1/web-scanner-rules">client.webScannerRules.<a href="./src/resources/web-scanner-rules.ts">create</a>({ ...params }) -> WebScannerRuleCreateResponse</code>
- <code title="get /rest/v1/web-scanner-rules/{id}">client.webScannerRules.<a href="./src/resources/web-scanner-rules.ts">retrieve</a>(id) -> WebScannerRuleRetrieveResponse</code>
- <code title="patch /rest/v1/web-scanner-rules/{id}">client.webScannerRules.<a href="./src/resources/web-scanner-rules.ts">update</a>(id, { ...params }) -> WebScannerRuleUpdateResponse</code>
- <code title="delete /rest/v1/web-scanner-rules/{id}">client.webScannerRules.<a href="./src/resources/web-scanner-rules.ts">delete</a>(id) -> WebScannerRuleDeleteResponse</code>

# WebScanners

Types:

- <code><a href="./src/resources/web-scanners.ts">WebScannerListResponse</a></code>
- <code><a href="./src/resources/web-scanners.ts">WebScannerCreateResponse</a></code>
- <code><a href="./src/resources/web-scanners.ts">WebScannerRetrieveResponse</a></code>
- <code><a href="./src/resources/web-scanners.ts">WebScannerUpdateResponse</a></code>
- <code><a href="./src/resources/web-scanners.ts">WebScannerDeleteResponse</a></code>
- <code><a href="./src/resources/web-scanners.ts">WebScannerTriggerResponse</a></code>

Methods:

- <code title="get /rest/v1/web-scanners">client.webScanners.<a href="./src/resources/web-scanners.ts">list</a>() -> WebScannerListResponse</code>
- <code title="post /rest/v1/web-scanners">client.webScanners.<a href="./src/resources/web-scanners.ts">create</a>({ ...params }) -> WebScannerCreateResponse</code>
- <code title="get /rest/v1/web-scanners/{id}">client.webScanners.<a href="./src/resources/web-scanners.ts">retrieve</a>(id) -> WebScannerRetrieveResponse</code>
- <code title="patch /rest/v1/web-scanners/{id}">client.webScanners.<a href="./src/resources/web-scanners.ts">update</a>(id, { ...params }) -> WebScannerUpdateResponse</code>
- <code title="delete /rest/v1/web-scanners/{id}">client.webScanners.<a href="./src/resources/web-scanners.ts">delete</a>(id) -> WebScannerDeleteResponse</code>
- <code title="post /rest/v1/web-scanners/{id}/trigger">client.webScanners.<a href="./src/resources/web-scanners.ts">trigger</a>(id) -> WebScannerTriggerResponse</code>
