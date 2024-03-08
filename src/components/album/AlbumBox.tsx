/** @format */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { gridColonm3 } from "../../emotion/grid";
const ImageBox = ({
  albumName,
  albums,
}: {
  albumName: string;
  albums: string[];
}) => {
  const isloading = useSelector((state: RootState) => state.albumName.loading);

  //Emotion Style
  const albumCover = css`
    width: 90%;
    margin: auto;
  `;
  const album = css`
    width: 90%;
    margin: auto;
    gap: 10px;
  `;
  const albumImageCover = css`
    border: 1px solid #aaaaaa;
    border-radius: 10px;
    overflow: hidden;
  `;
  const albumImageStyle = css`
    width: 100%;
    height: 100%;
  `;
  if (isloading) return <div css={albumCover}>로딩중 입니다...</div>;
  return (
    <div css={albumCover}>
      <div css={[gridColonm3, album]}>
        {albums &&
          albums.map((albumImage, index) => (
            <div key={index} css={albumImageCover}>
              <img alt={albumImage} src={albumImage} css={albumImageStyle} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageBox;
