import { Video } from "../types/Video";

const apiUrl = "https://www.googleapis.com/youtube/v3/";
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export async function getVideosByKeyword(
  searchRequest: string,
  pageToken?: string
) {
  let videos;

  const pageTokenQuery = pageToken ? `&pageToken=${pageToken}` : "";
  const url = `${apiUrl}search?$key=${apiKey}&type=video&part=snippet&maxResults=15&q=${searchRequest}${pageTokenQuery}`;

  const response = await fetch(url);

  if (response.ok) {
    videos = await response.json();
  } else {
    console.log(`HTTP Error in getVideosByKeyword: ${response.status}`);
  }

  const videosWithStats = await getVideosStats(videos.items);

  return {
    nextPageToken: videos.nextPageToken,
    keyword: searchRequest,
    items: mapVideosInfo(videosWithStats.items),
  };
}

async function getVideosStats(videos: any[]) {
  const videoIds = videos.map((video) => video.id.videoId);
  const [videoStats] = await Promise.all([getVideoStatsById(videoIds)]);
  return videoStats;
}

async function getVideoStatsById(videoId: any[]) {
  const url = `${apiUrl}videos?$key=${apiKey}&id=${videoId}&part=snippet,statistics`;
  const response = await fetch(url);
  let videoStats;

  if (response.ok) {
    videoStats = await response.json();
  } else {
    console.log(`HTTP Error in getVideoStatsById: ${response.status}`);
  }

  return videoStats;
}

interface youTubeVideoWithStats {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    channelTitle: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
}

function mapVideosInfo(videos: youTubeVideoWithStats[]) {
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

    const result: Video = {
      title,
      author,
      uploadDate,
      description,
      imgUrl,
      id,
      videoUrl,
      viewCount,
    };

    return result;
  });
}
