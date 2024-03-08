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
const AlbumList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const albumNames = useSelector(
    (state: RootState) => state.albumName.albumImages
  );
  const albums = useSelector((state: RootState) => state.albumName.loading);
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
    gap: 10px;
  `;
  const albumButtonCover = css`
    margin: 10px 0;
  `;
  const albumButton = css`
    padding: 10px;
  `;

  const deleteButton = css`
    cursor: pointer;
  `;

  return (
    <div css={[flex, albumList]}>
      {albumNames.map((albumName) => (
        <div key={albumName} css={albumButtonCover}>
          <div css={flex}>
            <Link to={`${albumName}`} css={albumButton}>
              {albumName}
            </Link>
            <div css={[flexCenter]}>
              <button
                css={deleteButton}
                onClick={albumDeleteHandler.bind(null, albumName)}
              >
                x
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
