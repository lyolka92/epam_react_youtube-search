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
  let searchResult;

  const pageTokenQuery = pageToken ? `&pageToken=${pageToken}` : "";
  const url = `${apiUrl}search?$key=${apiKey}&type=video&part=snippet&maxResults=15&q=${searchRequest}${pageTokenQuery}`;

  const response = await fetch(url);

  if (response.ok) {
    searchResult = await response.json();
  } else {
    console.log(`HTTP Error in getVideosByKeyword: ${response.status}`);
  }

  const videosWithStats = await getVideosStats(searchResult.items);

  return {
    nextPageToken: searchResult.nextPageToken,
    keyword: searchRequest,
    items: videosWithStats,
  };
};

const getVideosStats = async (videos: YouTubeVideo[]): Promise<Video[]> => {
  const videoIds = videos.map((video) => video.id.videoId);

  const url = `${apiUrl}videos?$key=${apiKey}&id=${videoIds}&part=snippet,statistics`;
  const response = await fetch(url);
  let videoStats;

  if (response.ok) {
    videoStats = await response.json();
  } else {
    console.log(`HTTP Error in getVideoStatsById: ${response.status}`);
  }

  return mapVideosInfo(videoStats.items);
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
