/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchAlbumName } from "../features/albumNameSlice";
// import { albumName } from "../features/albumNameSlice";
import { getDatabase, ref, set, child, get } from "firebase/database";
const AddAlbum = () => {
  const [inputValue, setInputValue] = React.useState<string>(" ");
  const dispatch = useDispatch<AppDispatch>();
  const db = getDatabase();
  const albumRef = ref(db, "albums");

  // const albumNameRander = async () => {
  //   const albumNameSnapshot = await get(albumRef);
  //   const keys: string[] = [];
  //   albumNameSnapshot.forEach((childSnapshot) => {
  //     const key = childSnapshot.key;
  //     keys.push(key);
  //   });
  //   // dispatch(albumName(keys));
  // };
  React.useEffect(() => {
    dispatch(fetchAlbumName());
  }, []);

  //실시간으로 할 필요가 없다. 그러니 서브밋에서 보내자.
  const submitAlbumHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue("");
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

      console.log("키 값:", key);
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
