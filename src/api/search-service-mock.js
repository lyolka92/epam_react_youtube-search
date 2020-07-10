import {mockData} from "../videos";

export async function getVideosByKeyword(searchRequest, pageToken) {
    const searchResult = await new Promise(resolve => {
        resolve(mockData);
    });
    const videos = mapVideosInfo(searchResult.items);

    return {
        nextPageToken: searchResult.nextPageToken,
        keyword: searchRequest,
        items: videos,
    };
}

function mapVideosInfo(videos) {
    return videos.map((video) => {
        const {
            title, channelTitle: author, publishedAt: uploadDate, description,
        } = video.snippet;
        const imgUrl = video.snippet?.thumbnails?.high?.url;
        const { id: videoId } = video;

        return {
            title,
            author,
            uploadDate,
            description,
            imgUrl,
            id: videoId.toString(),
            videoUrl: `https://youtu.be/${videoId}`,
        };
    });
}