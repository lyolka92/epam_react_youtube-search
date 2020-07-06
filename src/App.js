import React from 'react';
import videos from "./videos";
import Search from "./components/Search";
import Slider from "./components/Slider";
import './App.css';

function App() {
    const searchParams = {
        keyword: '',
        nextPageToken: null,
    };

    return (
    <div className="App">
        <header className="App__header">
            <Search searchParams={searchParams}/>
        </header>
        <main>
            <Slider
                videos = {videos}
            />
        </main>
        <footer className="App__footer">
            <p>Made with <span role="img" aria-label="love">💜</span> by <a href="mailto:oserovao@ya.ru">Olga Serova</a></p>
        </footer>
    </div>
    );
}

export default App;
