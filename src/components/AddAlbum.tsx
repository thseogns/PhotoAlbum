/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchAlbumName } from "../features/albumSlice";
import { getDatabase, ref, set, child, get } from "firebase/database";
const AddAlbum = () => {
  const [inputValue, setInputValue] = React.useState<string>(" ");
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
    const hasSpecialCharacters = /[.#$/[\]]/.test(inputValue);

    if (hasSpecialCharacters) {
      alert(
        "앨범 이름에는 다음과같은 특수 문자를 사용할 수 없습니다.( /[.#$/[]]/)"
      );
      return;
    }
    if (inputValue === " ") return; // 공백이면 추가하지 않는다.

    const snapshot = await get(child(albumRef, inputValue));

    if (!snapshot.exists()) {
      // 중복된 값이 없으면 추가
      set(ref(db, "albums/" + inputValue), "");
      // 앨범 추가가 완료된 후에 앨범 목록을 다시 가져옴
      // albumNameRander(); 디스패치 한번더
      dispatch(fetchAlbumName());
    } else {
      return alert("이미존재하는 앨범이름입니다.");
    }
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
    });
  };

  return (
    <form onSubmit={submitAlbumHandler}>
      <label>
        <div>앨범이름 추가</div>
        <input
          type="text"
          placeholder="앨범추가하기"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit">추가하기</button>
    </form>
  );
};

export default AddAlbum;
