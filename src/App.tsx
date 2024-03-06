/**
  @format
 */
import React from "react";
import "./App.css";
import type { RootState } from "./app/store";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Album from "./components/album/Album";
import HomePage from "./components/HomePage";
import Header from "./components/header/Header";

function App() {
  const albumNames = useSelector(
    (state: RootState) => state.albumName.albumNames
  );

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {albumNames &&
          albumNames.map((albumName) => (
            <Route
              key={albumName}
              path={`/${albumName}`}
              element={<Album albumName={albumName} />}
            />
          ))}
      </Routes>
    </div>
  );
}

export default App;
