/** @format */

import React from "react";

const ImageBox = ({
  album,
}: {
  album: { albumName: string; alt: string; imageUrl: string };
}) => {
  return (
    <div>
      <div>앨범 이미지</div>
      {album && <img alt={album.alt} src={album.imageUrl} />}
    </div>
  );
};

export default ImageBox;
