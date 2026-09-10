// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class VideoChannels extends APIResource {
  /**
   * List video channels for the account, sorted by name. Supports cursor pagination
   * via `limit` and `cursor`; the limit clamp is 1000 so a single request can return
   * the full set. Entries omit `resolvedValues` — fetch a channel by id for its video
   * count and embed output. Requires scope: videoChannel:list
   */
  list(
    query: VideoChannelListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VideoChannelListResponsesCursor, VideoChannelListResponse> {
    return this._client.getAPIList('/rest/v1/video-channels', Cursor<VideoChannelListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create a video channel. Only `name` is accepted here; set branding and publish it
   * with PATCH, and add videos with `POST /rest/v1/video-channels/{id}/media`. New
   * channels start unpublished, so the page is not reachable until you send
   * `isPublished: true`. Requires scope: videoChannel:create
   */
  create(body: VideoChannelCreateParams, options?: RequestOptions): APIPromise<VideoChannelCreateResponse> {
    return this._client.post('/rest/v1/video-channels', { body, ...options });
  }

  /**
   * Fetch a channel with its branding, publish state, video count, shareable page
   * URL, and paste-ready embed code. Requires scope: videoChannel:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<VideoChannelRetrieveResponse> {
    return this._client.get(path`/rest/v1/video-channels/${id}`, options);
  }

  /**
   * Partially update a channel. Only fields included in the body change; send `null`
   * to clear a nullable field. Sending `isPublished: true` makes the channel page
   * reachable and renders it from the current videos and branding; `false` takes it
   * offline. `logoMediaId` must reference an image in your media library. Requires
   * scope: videoChannel:update
   */
  update(
    id: string,
    body: VideoChannelUpdateParams,
    options?: RequestOptions,
  ): APIPromise<VideoChannelUpdateResponse> {
    return this._client.patch(path`/rest/v1/video-channels/${id}`, { body, ...options });
  }

  /**
   * Delete a channel and take its page offline. The videos it listed are not deleted
   * — only their membership in this channel. Requires scope: videoChannel:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<VideoChannelDeleteResponse> {
    return this._client.delete(path`/rest/v1/video-channels/${id}`, options);
  }

  /**
   * List the videos in a channel, ordered by their position on the page. Not
   * paginated: a channel holds a bounded set of videos, so the full ordered list is
   * always returned. Videos whose media no longer resolves are omitted rather than
   * returned as broken entries. Requires scope: videoChannel:find
   */
  media(id: string, options?: RequestOptions): APIPromise<VideoChannelMediaResponse> {
    return this._client.get(path`/rest/v1/video-channels/${id}/media`, options);
  }

  /**
   * Add a video to a channel. Omit `position` to append it to the end. A video can
   * belong to several channels, so adding it here does not remove it from any other.
   * Calling this again for a video already in the channel updates its position
   * instead of adding a duplicate, and keeps its current slot when `position` is
   * omitted. The returned `id` is a composite membership key, not a UUID. Requires
   * scope: videoChannel:update
   */
  assignMedia(
    id: string,
    body: VideoChannelAssignMediaParams,
    options?: RequestOptions,
  ): APIPromise<VideoChannelAssignMediaResponse> {
    return this._client.post(path`/rest/v1/video-channels/${id}/media`, { body, ...options });
  }

  /**
   * Remove one video from a channel, identified by the `mediaId` query parameter. The
   * video itself is not deleted and stays in any other channel it belongs to.
   * Idempotent — removing a video that is not in the channel succeeds and returns the
   * channel unchanged. Requires scope: videoChannel:update
   */
  removeMedia(
    id: string,
    query: VideoChannelRemoveMediaParams,
    options?: RequestOptions,
  ): APIPromise<VideoChannelRemoveMediaResponse> {
    return this._client.delete(path`/rest/v1/video-channels/${id}/media`, { query, ...options });
  }

  /**
   * Set the display order of a channel’s videos. Send every video id currently in the
   * channel in the order you want them shown — index 0 appears first. A partial list,
   * or an id that is not in the channel, returns 400 so a caller working from a stale
   * view learns it is out of date instead of getting a partial write. Requires scope:
   * videoChannel:update
   */
  reorder(
    id: string,
    body: VideoChannelReorderParams,
    options?: RequestOptions,
  ): APIPromise<VideoChannelReorderResponse> {
    return this._client.post(path`/rest/v1/video-channels/${id}/reorder`, { body, ...options });
  }
}

export type VideoChannelListResponsesCursor = Cursor<VideoChannelListResponse>;

export interface VideoChannelListResponse {
  id: string;

  accountId: string;

  name: string;

  brandColor?: string | null;

  createdAt?: string | null;

  description?: string | null;

  footerText?: string | null;

  isPublished?: boolean | null;

  logoMediaId?: string | null;

  updatedAt?: string | null;
}

export interface VideoChannelCreateResponse {
  id: string;

  accountId: string;

  name: string;

  brandColor?: string | null;

  createdAt?: string | null;

  description?: string | null;

  footerText?: string | null;

  isPublished?: boolean | null;

  logoMediaId?: string | null;

  updatedAt?: string | null;
}

export interface VideoChannelRetrieveResponse {
  id: string;

  accountId: string;

  name: string;

  brandColor?: string | null;

  createdAt?: string | null;

  description?: string | null;

  footerText?: string | null;

  isPublished?: boolean | null;

  logoMediaId?: string | null;

  resolvedValues?: unknown | null;

  updatedAt?: string | null;
}

export interface VideoChannelUpdateResponse {
  id: string;

  accountId: string;

  name: string;

  brandColor?: string | null;

  createdAt?: string | null;

  description?: string | null;

  footerText?: string | null;

  isPublished?: boolean | null;

  logoMediaId?: string | null;

  resolvedValues?: unknown | null;

  updatedAt?: string | null;
}

export interface VideoChannelDeleteResponse {
  id: string;

  deleted: true;
}

export interface VideoChannelMediaResponse {
  entities: Array<VideoChannelMediaResponse.Entity>;
}

export namespace VideoChannelMediaResponse {
  export interface Entity {
    id: string;

    accountId: string;

    createdAt: string;

    type: 'Video';

    captionsUpdatedAt?: string | null;

    captionsUpdatedByName?: string | null;

    description?: string | null;

    duration?: number | null;

    hasVideoUpload?: boolean | null;

    height?: number | null;

    name?: string | null;

    updatedAt?: string | null;

    width?: number | null;
  }
}

export interface VideoChannelAssignMediaResponse {
  id: string;

  accountId: string;

  mediaId: string;

  channelId?: string | null;

  createdAt?: string | null;

  position?: number | null;

  updatedAt?: string | null;
}

export interface VideoChannelRemoveMediaResponse {
  id: string;

  accountId: string;

  name: string;

  brandColor?: string | null;

  createdAt?: string | null;

  description?: string | null;

  footerText?: string | null;

  isPublished?: boolean | null;

  logoMediaId?: string | null;

  resolvedValues?: unknown | null;

  updatedAt?: string | null;
}

export interface VideoChannelReorderResponse {
  id: string;

  accountId: string;

  name: string;

  brandColor?: string | null;

  createdAt?: string | null;

  description?: string | null;

  footerText?: string | null;

  isPublished?: boolean | null;

  logoMediaId?: string | null;

  resolvedValues?: unknown | null;

  updatedAt?: string | null;
}

export interface VideoChannelListParams extends CursorParams {}

export interface VideoChannelCreateParams {
  /**
   * Channel name. Case-insensitively unique within the account.
   */
  name: string;
}

export interface VideoChannelUpdateParams {
  /**
   * Accent color used on the channel page. Any CSS color string.
   */
  brandColor?: string | null;

  description?: string | null;

  footerText?: string | null;

  /**
   * Whether the channel page is publicly reachable. Publishing renders the page from
   * the current videos and branding; unpublishing takes it offline.
   */
  isPublished?: boolean | null;

  /**
   * Id of an image in your media library to show as the channel logo. Must be an
   * image; send `null` to clear it.
   */
  logoMediaId?: string | null;

  /**
   * New channel name. Must stay case-insensitively unique within the account.
   */
  name?: string | null;
}

export interface VideoChannelAssignMediaParams {
  /**
   * Id of the video to add to the channel. Must be a video, not an image.
   */
  mediaId: string;

  /**
   * Zero-based slot in the channel order. Omit to append to the end; omitting it on a
   * video that is already in the channel keeps its current slot.
   */
  position?: number;
}

export interface VideoChannelRemoveMediaParams {
  /**
   * Id of the video to remove from this channel.
   */
  mediaId: string;
}

export interface VideoChannelReorderParams {
  /**
   * Every video id currently in the channel, in the order you want them shown.
   * Partial lists and ids that are not in the channel are rejected.
   */
  mediaIds: Array<string>;
}

export declare namespace VideoChannels {
  export {
    type VideoChannelListResponse as VideoChannelListResponse,
    type VideoChannelCreateResponse as VideoChannelCreateResponse,
    type VideoChannelRetrieveResponse as VideoChannelRetrieveResponse,
    type VideoChannelUpdateResponse as VideoChannelUpdateResponse,
    type VideoChannelDeleteResponse as VideoChannelDeleteResponse,
    type VideoChannelMediaResponse as VideoChannelMediaResponse,
    type VideoChannelAssignMediaResponse as VideoChannelAssignMediaResponse,
    type VideoChannelRemoveMediaResponse as VideoChannelRemoveMediaResponse,
    type VideoChannelReorderResponse as VideoChannelReorderResponse,
    type VideoChannelListResponsesCursor as VideoChannelListResponsesCursor,
    type VideoChannelListParams as VideoChannelListParams,
    type VideoChannelCreateParams as VideoChannelCreateParams,
    type VideoChannelUpdateParams as VideoChannelUpdateParams,
    type VideoChannelAssignMediaParams as VideoChannelAssignMediaParams,
    type VideoChannelRemoveMediaParams as VideoChannelRemoveMediaParams,
    type VideoChannelReorderParams as VideoChannelReorderParams,
  };
}
