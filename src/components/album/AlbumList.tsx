/** @format */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, remove, get } from "firebase/database";
import { fetchAlbumName } from "../../features/albumSlice";
import { flex, flexCenter } from "../../emotion/flex";
import { display } from "../../features/displaySlice";
const AlbumList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const albumNames = useSelector(
    (state: RootState) => state.albumName.albumNames
  );
  const displayName = useSelector((state: RootState) => state.display.display);
  //클릭한 버튼 색 변환
  const displayHandler = (name: string) => {
    dispatch(display(name));
  };
  //삭제기능

  const albumDeleteHandler = async (name: string) => {
    const result = window.confirm("앨범을 삭제하시겠습니까?");
    if (result) {
      alert("앨범이 삭제되었습니다.");
    } else {
      alert("삭제를 취소했습니다.");
      return;
    }
    //나중에 만들자
    const db = getDatabase();
    try {
      // 앨범 이름에 해당하는 데이터베이스 항목 삭제
      await remove(ref(db, `albums/${name}`));
      console.log(`앨범 "${name}" 삭제됨`);

      //한번더 새로고침
      dispatch(fetchAlbumName());
    } catch (error: any) {
      console.error("앨범 삭제 중 오류 발생:", error.message);
    }
    navigate("/");
  };

  //Emotion Style
  const albumList = css`
    gap: 15px;
  `;
  const albumButtonCover = css`
    margin: 10px 0;
    padding: 8px 18px;
    border-radius: 50px;
  `;
  const noneClcikAlbumButtonCover = css`
    border: 1px solid #fdededec;

    &:hover {
      background-color: #ffd0d0eb;
      color: #9e9d9d;
    }
  `;
  const clickAlbumButtonCover = css`
    background-color: #ff9595eb;
    color: white;
  `;

  const albumButton = css`
    padding: 10px;
  `;

  const deleteButton = css`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    padding: 15px;
    background-color: #ffebeb;
    cursor: pointer;
  `;

  return (
    <div css={[flex, albumList]}>
      {albumNames.map((albumName) => (
        <Link
          to={`${albumName}`}
          key={albumName}
          css={
            albumName === displayName
              ? [clickAlbumButtonCover, albumButtonCover]
              : [noneClcikAlbumButtonCover, albumButtonCover]
          }
          onClick={() => displayHandler(albumName)}
        >
          <div css={flex}>
            <div css={albumButton}>{albumName}</div>
            <div css={[flexCenter]}>
              <button
                css={[deleteButton, flexCenter]}
                onClick={albumDeleteHandler.bind(null, albumName)}
              >
                x
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AlbumList;
