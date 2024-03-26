/** @format */
/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchAlbumName } from "../../features/albumSlice";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { flex, flexColumn } from "../../emotion/flex";
const AddAlbum = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const db = getDatabase();
  const albumRef = ref(db, "albums");
  //실행시 시작
  React.useEffect(() => {
    dispatch(fetchAlbumName());
  }, []);

  const submitAlbumHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue("");
    const trimInputValue = inputValue.trim();
    const hasSpecialCharacters = /[.#$/[\]]/.test(inputValue);

    if (hasSpecialCharacters) {
      alert(
        "앨범 이름에는 다음과같은 특수 문자를 사용할 수 없습니다.( /[.#$/[]]/)"
      );
      return;
    }
    if (trimInputValue === "") return alert("공백은 추가할 수 없습니다."); // 공백이면 추가하지 않는다.

    const snapshot = await get(child(albumRef, trimInputValue));

    if (!snapshot.exists()) {
      // 중복된 값이 없으면 추가
      set(ref(db, "albums/" + trimInputValue), "");
      // 앨범 추가가 완료된 후에 앨범 목록을 다시 가져옴
      // albumNameRander(); 디스패치 한번더
      dispatch(fetchAlbumName());
    } else {
      return alert("이미존재하는 앨범이름입니다.");
    }
  };
  //styles
  const addAlbumCover = css`
    margin-bottom: 15px;
  `;
  const albumTitle = css`
    margin: 25px 0;
    color: #8049ff;
    text-shadow: 0 0 2px #bebcbced;
  `;
  const addAlbumInput = css`
    background-color: #bebebeed;
    border: none;
    height: 30px;
    width: 500px;
    border-radius: 5px 0 0 5px;
    padding-left: 13px;
    outline: none;

    ::placeholder {
      color: #777777;
    }
    @media (max-width: 520px) {
      width: 250px;
    }
  `;
  const addAlbumButton = css`
    width: 30px;
    height: 30px;
    border: 1px solid #eeee;
    border-radius: 0 5px 5px 0;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  `;
  return (
    <div css={addAlbumCover}>
      <h1 css={albumTitle}>PhotoAlbum</h1>
      <form css={[flex]} onSubmit={submitAlbumHandler}>
        <label>
          <input
            css={addAlbumInput}
            type="text"
            placeholder="앨범이름을 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button css={addAlbumButton} type="submit">
          +
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;
