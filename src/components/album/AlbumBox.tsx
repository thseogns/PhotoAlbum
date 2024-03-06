/** @format */

import React from "react";
import { RootState } from "../../app/store";

import { useSelector } from "react-redux";
const ImageBox = ({ albums }: { albums: string[] }) => {
  const isloading = useSelector((state: RootState) => state.albumName.loading);

  if (isloading) return <div>로딩중 입니다...</div>;

  return (
    <div>
      <div>앨범 이미지</div>
      {albums &&
        albums.map((albumImage, index) => (
          <div key={index}>
            <img alt={albumImage} src={albumImage} />
          </div>
        ))}
    </div>
  );
};

export default ImageBox;
