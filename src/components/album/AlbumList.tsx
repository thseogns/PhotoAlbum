/** @format */

import { Link, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, remove, get } from "firebase/database";
import { fetchAlbumName } from "../../features/albumNameSlice";

const AlbumList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const albumNames = useSelector(
    (state: RootState) => state.albumName.albumNames
  );
  const navigate = useNavigate();

  const albums = useSelector((state: RootState) => state.albumName.loading);
  //삭제기능
  const albumDeleteHandler = async (name: string) => {
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

  return (
    <div>
      {albumNames.map((albumName) => (
        <div key={albumName}>
          <label>
            <Link to={`${albumName}`}>{albumName}</Link>
            <button onClick={albumDeleteHandler.bind(null, albumName)}>
              삭제!
            </button>

            {/*
          bind를 사용해서 함수호출을 줄이자*/}
          </label>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
