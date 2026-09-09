// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Videos extends APIResource {
  /**
   * List videos for the account, newest first. Supports cursor pagination and an
   * optional case-insensitive title filter. Requires scope: media:list
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const videoListResponse of client.videos.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: VideoListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VideoListResponsesCursor, VideoListResponse> {
    return this._client.getAPIList('/rest/v1/videos', Cursor<VideoListResponse>, { query, ...options });
  }

  /**
   * Create a video record and return a temporary upload target for the original MP4
   * or WebM file. Upload the file directly using the returned URL and matching
   * content type, then poll the video to observe processing progress. Requires
   * scope: media:create
   *
   * @example
   * ```ts
   * const video = await client.videos.create({
   *   mimeType: 'MP4',
   * });
   * ```
   */
  create(body: VideoCreateParams, options?: RequestOptions): APIPromise<VideoCreateResponse> {
    return this._client.post('/rest/v1/videos', { body, ...options });
  }

  /**
   * Fetch a video and its current playback asset availability. The processed video,
   * poster, and transcript are prepared asynchronously after upload. Requires scope:
   * media:find
   *
   * @example
   * ```ts
   * const video = await client.videos.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<VideoRetrieveResponse> {
    return this._client.get(path`/rest/v1/videos/${id}`, options);
  }

  /**
   * Partially update video metadata. Only fields included in the body change; send
   * `null` to clear a nullable field. Requires scope: media:update
   *
   * @example
   * ```ts
   * const video = await client.videos.update('id');
   * ```
   */
  update(id: string, body: VideoUpdateParams, options?: RequestOptions): APIPromise<VideoUpdateResponse> {
    return this._client.patch(path`/rest/v1/videos/${id}`, { body, ...options });
  }

  /**
   * Delete a video and its related assets. Requires scope: media:delete
   *
   * @example
   * ```ts
   * const video = await client.videos.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<VideoDeleteResponse> {
    return this._client.delete(path`/rest/v1/videos/${id}`, options);
  }

  /**
   * Return a temporary upload target for replacing this video’s original MP4 or WebM
   * source. Upload the file directly using the returned URL and matching content
   * type, then poll the video to observe processing progress. Requires scope:
   * media:update
   *
   * @example
   * ```ts
   * const response = await client.videos.upload('id', {
   *   mimeType: 'MP4',
   * });
   * ```
   */
  upload(id: string, body: VideoUploadParams, options?: RequestOptions): APIPromise<VideoUploadResponse> {
    return this._client.post(path`/rest/v1/videos/${id}/upload`, { body, ...options });
  }

  /**
   * Read the current WebVTT transcript. Transcript text is available wherever the
   * video is embedded, so do not include PHI or other confidential information.
   * Requires scope: media:find
   *
   * @example
   * ```ts
   * const response = await client.videos.transcript('id');
   * ```
   */
  transcript(id: string, options?: RequestOptions): APIPromise<VideoTranscriptResponse> {
    return this._client.get(path`/rest/v1/videos/${id}/transcript`, options);
  }

  /**
   * Replace the transcript with VTT or SRT text. SRT is normalized to WebVTT.
   * Transcript text is available wherever the video is embedded, so do not include
   * PHI or other confidential information. Requires scope: media:update
   *
   * @example
   * ```ts
   * const response = await client.videos.updateTranscript(
   *   'id',
   *   { content: 'x', format: 'SRT' },
   * );
   * ```
   */
  updateTranscript(
    id: string,
    body: VideoUpdateTranscriptParams,
    options?: RequestOptions,
  ): APIPromise<VideoUpdateTranscriptResponse> {
    return this._client.put(path`/rest/v1/videos/${id}/transcript`, { body, ...options });
  }

  /**
   * Return per-video starts, unique viewers, completion rate, and average watch time
   * for a date window. This derived report uses `limit` and `offset` pagination;
   * `total` is the number of rows returned through the current offset, not a total
   * match count. Requires scope: report:video-analytics
   *
   * @example
   * ```ts
   * const response = await client.videos.analytics({
   *   from: '7321-69-10',
   *   to: '7321-69-10',
   * });
   * ```
   */
  analytics(query: VideoAnalyticsParams, options?: RequestOptions): APIPromise<VideoAnalyticsResponse> {
    return this._client.get('/rest/v1/videos/analytics', { query, ...options });
  }

  /**
   * Return daily or hourly starts, unique viewers, completions, and completion rate
   * for one video. Daily windows support up to 90 days; hourly windows support up to
   * 14 days. Requires scope: report:video-analytics
   *
   * @example
   * ```ts
   * const response = await client.videos.analyticsTimeseries(
   *   'id',
   *   { from: '7321-69-10', to: '7321-69-10' },
   * );
   * ```
   */
  analyticsTimeseries(
    id: string,
    query: VideoAnalyticsTimeseriesParams,
    options?: RequestOptions,
  ): APIPromise<VideoAnalyticsTimeseriesResponse> {
    return this._client.get(path`/rest/v1/videos/${id}/analytics`, { query, ...options });
  }
}

export type VideoListResponsesCursor = Cursor<VideoListResponse>;

export interface VideoListResponse {
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

export interface VideoCreateResponse {
  id: string;

  accountId: string;

  createdAt: string;

  type: 'Video';

  upload: VideoCreateResponse.Upload;

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

export namespace VideoCreateResponse {
  export interface Upload {
    mimeType: 'MP4' | 'WEBM';

    url: string;
  }
}

export interface VideoRetrieveResponse {
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

  resolvedValues?: VideoRetrieveResponse.ResolvedValues | null;

  updatedAt?: string | null;

  width?: number | null;
}

export namespace VideoRetrieveResponse {
  export interface ResolvedValues {
    posterUrl: string;

    videoUrl: string;

    mediaConvertJob?: ResolvedValues.MediaConvertJob | null;

    videoStatus?: ResolvedValues.VideoStatus | null;

    vttUrl?: string | null;
  }

  export namespace ResolvedValues {
    export interface MediaConvertJob {
      percentComplete?: number | null;

      status?: string | null;
    }

    export interface VideoStatus {
      outputExists?: boolean | null;

      outputIsCurrent?: boolean | null;

      posterExists?: boolean | null;

      transcriptionExists?: boolean | null;
    }
  }
}

export interface VideoUpdateResponse {
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

export interface VideoDeleteResponse {
  id: string;

  deleted: true;
}

export interface VideoUploadResponse {
  mimeType: 'MP4' | 'WEBM';

  url: string;
}

export interface VideoTranscriptResponse {
  content?: string | null;
}

export interface VideoUpdateTranscriptResponse {
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

export interface VideoAnalyticsResponse {
  hasMore: boolean;

  items: Array<VideoAnalyticsResponse.Item>;

  total: number;
}

export namespace VideoAnalyticsResponse {
  export interface Item {
    avgVideoDurationSeconds: number;

    avgWatchTimeSeconds: number;

    completionRate: number;

    uniqueViewers: number;

    videoStarts: number;

    videoTitle: string;

    videoId?: string | null;

    videoUrl?: string | null;
  }
}

export interface VideoAnalyticsTimeseriesResponse {
  items: Array<VideoAnalyticsTimeseriesResponse.Item>;
}

export namespace VideoAnalyticsTimeseriesResponse {
  export interface Item {
    completionRate: number;

    completions: number;

    dateTime: string;

    uniqueViewers: number;

    videoStarts: number;
  }
}

export interface VideoListParams extends CursorParams {
  /**
   * Case-insensitive substring match on the video title.
   */
  nameContains?: string;
}

export interface VideoCreateParams {
  /**
   * Content type for the original video upload: `MP4` or `WEBM`.
   */
  mimeType: 'MP4' | 'WEBM';

  description?: string | null;

  /**
   * Video title. Defaults to `New Video` when omitted.
   */
  name?: string | null;
}

export interface VideoUpdateParams {
  description?: string | null;

  duration?: number | null;

  hasVideoUpload?: boolean | null;

  height?: number | null;

  name?: string | null;

  width?: number | null;
}

export interface VideoUploadParams {
  /**
   * Content type for the replacement original video: `MP4` or `WEBM`.
   */
  mimeType: 'MP4' | 'WEBM';
}

export interface VideoUpdateTranscriptParams {
  /**
   * Transcript text, limited to 1 MB.
   */
  content: string;

  /**
   * Transcript source format. SRT content is normalized to WebVTT before it is
   * saved.
   */
  format: 'SRT' | 'VTT';
}

export interface VideoAnalyticsParams {
  /**
   * Inclusive UTC start day in `YYYY-MM-DD` format.
   */
  from: string;

  /**
   * Inclusive UTC end day in `YYYY-MM-DD` format.
   */
  to: string;

  /**
   * Maximum number of video rows to return. Defaults to 50.
   */
  limit?: number;

  /**
   * Zero-based row offset. This report is an intentional offset-pagination
   * exception.
   */
  offset?: number | null;
}

export interface VideoAnalyticsTimeseriesParams {
  /**
   * Inclusive UTC start day in `YYYY-MM-DD` format.
   */
  from: string;

  /**
   * Inclusive UTC end day in `YYYY-MM-DD` format.
   */
  to: string;

  /**
   * Bucket size. Defaults to `DAILY`; `HOURLY` supports windows of up to 14 days.
   */
  granularity?: 'DAILY' | 'HOURLY';
}

export declare namespace Videos {
  export {
    type VideoListResponse as VideoListResponse,
    type VideoCreateResponse as VideoCreateResponse,
    type VideoRetrieveResponse as VideoRetrieveResponse,
    type VideoUpdateResponse as VideoUpdateResponse,
    type VideoDeleteResponse as VideoDeleteResponse,
    type VideoUploadResponse as VideoUploadResponse,
    type VideoTranscriptResponse as VideoTranscriptResponse,
    type VideoUpdateTranscriptResponse as VideoUpdateTranscriptResponse,
    type VideoAnalyticsResponse as VideoAnalyticsResponse,
    type VideoAnalyticsTimeseriesResponse as VideoAnalyticsTimeseriesResponse,
    type VideoListResponsesCursor as VideoListResponsesCursor,
    type VideoListParams as VideoListParams,
    type VideoCreateParams as VideoCreateParams,
    type VideoUpdateParams as VideoUpdateParams,
    type VideoUploadParams as VideoUploadParams,
    type VideoUpdateTranscriptParams as VideoUpdateTranscriptParams,
    type VideoAnalyticsParams as VideoAnalyticsParams,
    type VideoAnalyticsTimeseriesParams as VideoAnalyticsTimeseriesParams,
  };
}
