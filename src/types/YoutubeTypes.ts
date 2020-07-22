import { Video } from "./Video";

export type YouTubeVideo = {
  id: {
    videoId: string;
  };
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
};

export type YouTubeVideoWithStats = {
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
};

export type YouTubeSearchResult = {
  nextPageToken: string;
  keyword: string;
  items: Video[];
};
