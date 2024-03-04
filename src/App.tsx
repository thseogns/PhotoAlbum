/**
 * @format
 * @jsxImportSource @emotion/react
 */

import React from "react";
import "./App.css";
import type { RootState } from "./app/store";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AddAlbum from "./components/AddAlbum";
import AlbumList from "./components/album/AlbumList";
import Album from "./components/album/Album";
import HomePage from "./components/HomePage";

function App() {
  const albumNames = useSelector(
    (state: RootState) => state.albumName.albumNames
  );
  const isLoading = useSelector((state: RootState) => state.albumName.loading);

  //실험

  return (
    <div className="App">
      <AddAlbum />
      <AlbumList />

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
