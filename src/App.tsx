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
import axios from "axios";
function App() {
  const [data, setData] = React.useState("");

  const albumNames = useSelector(
    (state: RootState) => state.albumName.albumNames
  );

  const fatch = axios
    .get("https://photoalbumdb-default-rtdb.firebaseio.com/name.json")
    .then((res) => setData(res.data))
    .catch((error) => error);
  console.log(data);

  return (
    <div className="App">
      <AddAlbum />
      <AlbumList albumNames={albumNames} />
      <Routes>
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
