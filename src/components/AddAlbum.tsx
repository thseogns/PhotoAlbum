/** @format */

import React from "react";

import { useDispatch } from "react-redux";
import { albumName } from "../features/albumNameSlice";
const AddAlbum = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState<string>("");
  //실시간으로 할 필요가 없다. 그러니 서브밋에서 보내자.
  const submitAlbumHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(albumName);
    setInputValue(" ");
    if (inputValue === " ") return; // 공백이면 추가하지 않는다.
    dispatch(albumName(inputValue));
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
