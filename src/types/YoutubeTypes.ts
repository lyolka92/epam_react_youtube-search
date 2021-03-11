import { Video } from "./VideoStore";

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
  data?: {
    nextPageToken: string;
    keyword: string;
    items: Video[];
  };
  error?: string;
};
