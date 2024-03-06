/** @format */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import AddAlbum from "./AddAlbum";
import AlbumList from "../album/AlbumList";
import { Link } from "react-router-dom";
import { flexBetween } from "../../emotion/flex";

const Header = () => {
  //Emotion Style
  const stickyTop = css`
    padding: 0 5%;
    position: sticky;
    top: 0;
    left: 0;
    background-color: white;
  `;

  return (
    <div css={[stickyTop, flexBetween]}>
      <div>
        <AddAlbum />
        <AlbumList />
      </div>
      <div>
        <Link to="/">홈으로</Link>
      </div>
    </div>
  );
};

export default Header;
