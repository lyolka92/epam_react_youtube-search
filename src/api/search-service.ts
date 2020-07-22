import { Video } from "../types/VideoStore";
import {
  YouTubeSearchResult,
  YouTubeVideo,
  YouTubeVideoWithStats,
} from "../types/YoutubeTypes";

const apiUrl = "https://www.googleapis.com/youtube/v3/";
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export const getVideosByKeyword = async (
  searchRequest: string,
  pageToken?: string
): Promise<YouTubeSearchResult> => {
  const pageTokenQuery = pageToken ? `&pageToken=${pageToken}` : "";
  const url = `${apiUrl}search?$key=${apiKey}&type=video&part=snippet&maxResults=15&q=${searchRequest}${pageTokenQuery}`;

  try {
    debugger;
    const response = await fetch(url);
    const searchResult = await response.json();

    if (response.ok) {
      const videoIds = searchResult.items.map(
        (video: YouTubeVideo) => video.id.videoId
      );
      const url = `${apiUrl}videos?$key=${apiKey}&id=${videoIds}&part=snippet,statistics`;

      const statsResponse = await fetch(url);
      const videoStats = await statsResponse.json();

      if (statsResponse.ok) {
        return {
          data: {
            nextPageToken: searchResult.nextPageToken,
            keyword: searchRequest,
            items: mapVideosInfo(videoStats.items),
          },
        };
      } else {
        return {
          error: videoStats.error.message,
        };
      }
    } else {
      return {
        error: searchResult.error.message,
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const mapVideosInfo = (videos: YouTubeVideoWithStats[]): Video[] => {
  return videos.map((video) => {
    const {
      title,
      channelTitle: author,
      publishedAt,
      description,
    } = video.snippet;
    const {
      id,
      statistics: { viewCount: views },
    } = video;

    const videoUrl = new URL(`https://youtu.be/${id}`);
    const imgUrl = new URL(`${video.snippet?.thumbnails?.high?.url}`);
    const uploadDate = new Date(publishedAt);
    const viewCount = +views;

    return {
      title,
      author,
      uploadDate,
      description,
      imgUrl,
      id,
      videoUrl,
      viewCount,
    };
  });
};
