import React from 'react';
import Search from './components/Search/Search';
import Slider from './components/Slider/Slider';
import {Footer} from "./components/Footer/Footer";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <Search />
      </header>
      <main>
        <Slider />
      </main>
      <footer className="App__footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
