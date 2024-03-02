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

function App() {
  const albums = useSelector((state: RootState) => state.albumName.images);
  return (
    <div className="App">
      <AddAlbum />
      <AlbumList albums={albums} />
      <Routes>
        {albums &&
          albums.map((album) => (
            <Route
              key={album.albumName}
              path={`/${album.albumName}`}
              element={<Album album={album} />}
            />
          ))}
      </Routes>
    </div>
  );
}

export default App;
