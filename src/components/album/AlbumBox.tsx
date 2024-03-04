/** @format */

import React from "react";

const ImageBox = ({ albums }: { albums: string[] }) => {
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
