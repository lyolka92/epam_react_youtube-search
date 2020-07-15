export interface StoreInterface {
  searchParams?: {
    keyword?: string;
    nextPageToken?: string;
  };
  sliderParams: {
    videosPerPage: number;
    currentPageNumber: number;
    lastAvailablePage: number;
  };
  isLoading?: boolean;
  videos?: Video[];
}

export interface Video {
  author: string;
  description: string;
  id: string;
  imgUrl: URL;
  title: string;
  uploadDate: Date;
  videoUrl: URL;
  viewCount: number;
}
