// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AllowedEventsAPI from './allowed-events';
import {
  AllowedEventCreateParams,
  AllowedEventCreateResponse,
  AllowedEventDeleteResponse,
  AllowedEventListResponse,
  AllowedEventRetrieveResponse,
  AllowedEvents,
} from './allowed-events';
import * as ConsentSettingsAPI from './consent-settings';
import {
  ConsentSettingCreateParams,
  ConsentSettingCreateResponse,
  ConsentSettingDeleteResponse,
  ConsentSettingListResponse,
  ConsentSettingRetrieveResponse,
  ConsentSettingUpdateParams,
  ConsentSettingUpdateResponse,
  ConsentSettings,
} from './consent-settings';
import * as DestinationsAPI from './destinations';
import {
  DestinationCreateParams,
  DestinationCreateResponse,
  DestinationDeleteResponse,
  DestinationListResponse,
  DestinationRetrieveResponse,
  DestinationUpdateParams,
  DestinationUpdateResponse,
  Destinations,
} from './destinations';
import * as GlobalDispatchCentersAPI from './global-dispatch-centers';
import {
  GlobalDispatchCenterCreateParams,
  GlobalDispatchCenterCreateResponse,
  GlobalDispatchCenterDeleteResponse,
  GlobalDispatchCenterListResponse,
  GlobalDispatchCenterRetrieveResponse,
  GlobalDispatchCenterUpdateParams,
  GlobalDispatchCenterUpdateResponse,
  GlobalDispatchCenters,
} from './global-dispatch-centers';
import * as ReplaySettingsAPI from './replay-settings';
import {
  ReplaySettingCreateParams,
  ReplaySettingCreateResponse,
  ReplaySettingDeleteResponse,
  ReplaySettingListResponse,
  ReplaySettingRetrieveResponse,
  ReplaySettingUpdateParams,
  ReplaySettingUpdateResponse,
  ReplaySettings,
} from './replay-settings';
import * as SourcesAPI from './sources';
import {
  SourceCreateParams,
  SourceCreateResponse,
  SourceDeleteResponse,
  SourceListResponse,
  SourceRetrieveResponse,
  SourceUpdateParams,
  SourceUpdateResponse,
  Sources,
} from './sources';
import * as VersionsAPI from './versions';
import {
  VersionCreateParams,
  VersionCreateResponse,
  VersionListResponse,
  VersionRetrieveResponse,
  VersionUpdateParams,
  VersionUpdateResponse,
  Versions,
} from './versions';

export class V1 extends APIResource {
  destinations: DestinationsAPI.Destinations = new DestinationsAPI.Destinations(this._client);
  sources: SourcesAPI.Sources = new SourcesAPI.Sources(this._client);
  allowedEvents: AllowedEventsAPI.AllowedEvents = new AllowedEventsAPI.AllowedEvents(this._client);
  consentSettings: ConsentSettingsAPI.ConsentSettings = new ConsentSettingsAPI.ConsentSettings(this._client);
  globalDispatchCenters: GlobalDispatchCentersAPI.GlobalDispatchCenters =
    new GlobalDispatchCentersAPI.GlobalDispatchCenters(this._client);
  replaySettings: ReplaySettingsAPI.ReplaySettings = new ReplaySettingsAPI.ReplaySettings(this._client);
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);
}

V1.Destinations = Destinations;
V1.Sources = Sources;
V1.AllowedEvents = AllowedEvents;
V1.ConsentSettings = ConsentSettings;
V1.GlobalDispatchCenters = GlobalDispatchCenters;
V1.ReplaySettings = ReplaySettings;
V1.Versions = Versions;

export declare namespace V1 {
  export {
    Destinations as Destinations,
    type DestinationCreateResponse as DestinationCreateResponse,
    type DestinationRetrieveResponse as DestinationRetrieveResponse,
    type DestinationUpdateResponse as DestinationUpdateResponse,
    type DestinationListResponse as DestinationListResponse,
    type DestinationDeleteResponse as DestinationDeleteResponse,
    type DestinationCreateParams as DestinationCreateParams,
    type DestinationUpdateParams as DestinationUpdateParams,
  };

  export {
    Sources as Sources,
    type SourceCreateResponse as SourceCreateResponse,
    type SourceRetrieveResponse as SourceRetrieveResponse,
    type SourceUpdateResponse as SourceUpdateResponse,
    type SourceListResponse as SourceListResponse,
    type SourceDeleteResponse as SourceDeleteResponse,
    type SourceCreateParams as SourceCreateParams,
    type SourceUpdateParams as SourceUpdateParams,
  };

  export {
    AllowedEvents as AllowedEvents,
    type AllowedEventCreateResponse as AllowedEventCreateResponse,
    type AllowedEventRetrieveResponse as AllowedEventRetrieveResponse,
    type AllowedEventListResponse as AllowedEventListResponse,
    type AllowedEventDeleteResponse as AllowedEventDeleteResponse,
    type AllowedEventCreateParams as AllowedEventCreateParams,
  };

  export {
    ConsentSettings as ConsentSettings,
    type ConsentSettingCreateResponse as ConsentSettingCreateResponse,
    type ConsentSettingRetrieveResponse as ConsentSettingRetrieveResponse,
    type ConsentSettingUpdateResponse as ConsentSettingUpdateResponse,
    type ConsentSettingListResponse as ConsentSettingListResponse,
    type ConsentSettingDeleteResponse as ConsentSettingDeleteResponse,
    type ConsentSettingCreateParams as ConsentSettingCreateParams,
    type ConsentSettingUpdateParams as ConsentSettingUpdateParams,
  };

  export {
    GlobalDispatchCenters as GlobalDispatchCenters,
    type GlobalDispatchCenterCreateResponse as GlobalDispatchCenterCreateResponse,
    type GlobalDispatchCenterRetrieveResponse as GlobalDispatchCenterRetrieveResponse,
    type GlobalDispatchCenterUpdateResponse as GlobalDispatchCenterUpdateResponse,
    type GlobalDispatchCenterListResponse as GlobalDispatchCenterListResponse,
    type GlobalDispatchCenterDeleteResponse as GlobalDispatchCenterDeleteResponse,
    type GlobalDispatchCenterCreateParams as GlobalDispatchCenterCreateParams,
    type GlobalDispatchCenterUpdateParams as GlobalDispatchCenterUpdateParams,
  };

  export {
    ReplaySettings as ReplaySettings,
    type ReplaySettingCreateResponse as ReplaySettingCreateResponse,
    type ReplaySettingRetrieveResponse as ReplaySettingRetrieveResponse,
    type ReplaySettingUpdateResponse as ReplaySettingUpdateResponse,
    type ReplaySettingListResponse as ReplaySettingListResponse,
    type ReplaySettingDeleteResponse as ReplaySettingDeleteResponse,
    type ReplaySettingCreateParams as ReplaySettingCreateParams,
    type ReplaySettingUpdateParams as ReplaySettingUpdateParams,
  };

  export {
    Versions as Versions,
    type VersionCreateResponse as VersionCreateResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionUpdateResponse as VersionUpdateResponse,
    type VersionListResponse as VersionListResponse,
    type VersionCreateParams as VersionCreateParams,
    type VersionUpdateParams as VersionUpdateParams,
  };
}
