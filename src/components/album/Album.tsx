/** @format */

import React from "react";
import { v4 as uuidv4 } from "uuid"; //아이디를 생성해서 저장하기
import ImageBox from "./ImageBox";

const Album = ({ albumName }: { albumName: string }) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && selectedFile !== null) {
      //널값이 아닐때만 작동
      const file = event.target.files[0];
      setSelectedFile(file);
      const uniqueFileName = `${uuidv4()}-${file.name}`; //같은 이미지저장을 위한 랜덤네임 지정
      console.log(uniqueFileName);
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
