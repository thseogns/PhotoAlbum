/**
 * @format
 * @jsxImportSource @emotion/react
 */

import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddAlbum from "./components/AddAlbum";
import AlbumList from "./components/album/AlbumList";

function App() {
  return (
    <div className="App">
      <AddAlbum />
      <AlbumList />
      <Routes>
        <Route path="/" element></Route>
        <Route path="/2"></Route>
      </Routes>
    </div>
  );
}

export default App;
