/** @format */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { gridColonm3 } from "../../emotion/grid";
const ImageBox = ({ albums }: { albums: string[] }) => {
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
    height: 35vh;
    @media (max-width: 520px) {
      height: 14vh;
    }
  `;
  const albumImageStyle = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  return (
    <div css={albumCover}>
      {isloading ? (
        <div css={albumCover}>로딩중 입니다...</div>
      ) : (
        <div css={[gridColonm3, album]}>
          {albums.length ? (
            albums.map((albumImage, index) => (
              <div key={index} css={albumImageCover}>
                <img alt={albumImage} src={albumImage} css={albumImageStyle} />
              </div>
            ))
          ) : (
            <div>사진이 없어요!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageBox;
