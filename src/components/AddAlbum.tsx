/** @format */

import React from "react";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateAlbumName } from "../features/albumNameSlice";

const AddAlbum = () => {
  const albumNames = useSelector(
    (state: RootState) => state.albumName.albumNames
  );
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState<string>(" ");
  //실시간으로 할 필요가 없다. 그러니 서브밋에서 보내자.
  const submitAlbumHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updateAlbumName);
    setInputValue(" ");

    if (inputValue === " ") return; // 공백이면 추가하지 않는다.
    // 같은이름은 추가하지 않는다.
    if (albumNames.includes(inputValue)) {
      alert("동일한 앨범이름을 사용할 수 없습니다.");
      return;
    }
    dispatch(updateAlbumName(inputValue));
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
