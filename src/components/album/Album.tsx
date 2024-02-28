/** @format */

import React from "react";
import { v4 as uuidv4 } from "uuid"; //아이디를 생성해서 저장하기
import ImageBox from "./ImageBox";
import type { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { updateImage } from "../../features/albumNameSlice";
const Album = ({ albumName }: { albumName: string }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [albums, setAlbums] = React.useState("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      //널값이 아닐때만 작동
      const file = event.target.files[0];
      setSelectedFile(file);
      //이름생성하기
      const name = uuidv4();
      const uniqueFileName = `${name}-${file.name}`; //같은 이미지저장을 위한 랜덤네임 지정
      console.log(uniqueFileName);

      //업로드 시간 날짜 정하기.

      const year = String(new Date().getFullYear()).padStart(2, "0"); // 년
      const month = String(new Date().getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 해줌)
      const day = String(new Date().getDate()).padStart(2, "0"); // 일
      const hour = String(new Date().getHours()).padStart(2, "0"); // 시
      const minute = String(new Date().getMinutes()).padStart(2, "0"); // 분
      const second = String(new Date().getSeconds()).padStart(2, "0"); // 초
      const isDate = `${year}-${month}-${day} T${hour}:${minute}:${second}`;

      // 객체를 만들어서 업데이트 해주자. 저장날짜시간, 이름, 앨범이름
      const updateAlbum = {
        alt: name,
        image: { imgName: uniqueFileName, date: isDate },
      };
      dispatch(updateImage(updateAlbum));
    }
  };

  const handleUpload = () => {
    // 이미지 업로드를 처리
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // formData를 이용하여 서버로 이미지를 전송하거나
      // 다른 이미지 처리 로직을 수행할 수 있습니다.
    } else {
      // 이미지가 선택되지 않았을 때의 처리
      console.log("이미지를 선택하세요.");
    }
  };
  return (
    <>
      <div>앨범이름 : {albumName}</div>
      <ImageBox selectedFile={selectedFile} />
      <label>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>업로드</button>
      </label>
    </>
  );
};

export default Album;
