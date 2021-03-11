import React from "react";
import { Search } from "./components/Search/Search";
import { Slider } from "./components/Slider/Slider";
import { Footer } from "./components/Footer/Footer";
import "./App.css";

export const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app__header">
        <Search />
      </header>
      <main>
        <Slider />
      </main>
      <footer className="app__footer">
        <Footer />
      </footer>
    </div>
  );
};
