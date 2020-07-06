const apiUrl = 'https://www.googleapis.com/youtube/v3/';
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export async function getVideosByKeyword(searchRequest, pageToken) {
  let videos;

  const pageTokenQuery = pageToken ? `&pageToken=${pageToken}` : '';
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
    items: mapVideosInfo(videosWithStats),
  };
}

async function getVideosStats(videos) {
  const videoIds = videos.map((video) => video.id.videoId);
  const [videoStats] = await Promise.all([getVideoStatsById(videoIds)]);
  return videoStats;
}

async function getVideoStatsById(videoId) {
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

function mapVideosInfo(videos) {
  return videos.items.map((video) => {
    const {
      title, channelTitle: author, publishedAt: uploadDate, description,
    } = video.snippet;
    const imgUrl = video.snippet?.thumbnails?.high?.url;
    const { id: videoId, statistics: { viewCount } } = video;

    return {
      title,
      author,
      uploadDate,
      description,
      imgUrl,
      id: videoId,
      videoUrl: `https://youtu.be/${videoId}`,
      viewCount,
    };
  });
}
