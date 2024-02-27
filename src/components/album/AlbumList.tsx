/** @format */

import React from "react";
import { Link } from "react-router-dom";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { deleteAlbumName } from "../../features/albumNameSlice";
const AlbumList = () => {
  const albumNames = useSelector(
    (state: RootState) => state.albumName.albumNames
  );
  const dispatch = useDispatch();
  const albumDeleteHandler = (name: string) => {
    const updatedAlbumName = albumNames.filter((item) => item !== name); //일치하지 않는값들만 true를 주어 새로운 배열을 만듦
    dispatch(deleteAlbumName(updatedAlbumName));
  };
  console.log(albumNames);

  return (
    <div>
      {albumNames.map((name) => (
        <label>
          <Link to={name}>{name}</Link>
          <button onClick={albumDeleteHandler.bind(null, name)}>삭제!</button>
          {/*
          bind를 사용해서 함수호출을 줄이자*/}
        </label>
      ))}
    </div>
  );
};

export default AlbumList;
