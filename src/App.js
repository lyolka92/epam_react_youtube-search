import React, {useState} from 'react';
import videos from "./videos";
import Search from "./components/Search";
import Slider from "./components/Slider";
import './App.css';

function App() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [nextPageToken, setNextPageToken] = useState('');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage, setVideosPerPage] = useState(() => getVideosPerPage());

    function getVideosPerPage() {
        const screenWidth = window.innerWidth;
        switch (true) {
            case screenWidth >= 1280:
                return 4;
            case screenWidth >= 910:
                return 3;
            case screenWidth >= 610:
                return 2;
            default:
                return 1;
        }
    }

    return (
    <div className="App">
        <header className="App__header">
            <Search searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} nextPageToken={nextPageToken} setNextPageToken={setNextPageToken} setLoading={setLoading} setVideos={setVideos}/>
        </header>
        <main>
            <Slider videos = {videos} loading = {loading}/>
        </main>
        <footer className="App__footer">
            <p>Made with <span role="img" aria-label="love">💜</span> by <a href="mailto:oserovao@ya.ru">Olga Serova</a></p>
        </footer>
    </div>
    );
}

export default App;
