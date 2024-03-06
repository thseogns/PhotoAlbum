/** @format */

/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const HomePage = () => {
  const homeStyle = css`
    width: 90%;
    margin: auto;
  `;
  return <div css={homeStyle}>홈페이지 입니다.</div>;
};

export default HomePage;
