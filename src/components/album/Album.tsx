/** @format */

import React from "react";
import { v4 as uuidv4 } from "uuid"; //아이디를 생성해서 저장하기
import AlbumBox from "./AlbumBox";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
// import { uploadAlbumImage } from "../../features/albumNameSlice";

const Album = ({ albumName }: { albumName: string }) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [image, setImage] = React.useState("");

  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      // 업로드 된 file
      const file = event.target.files[0];
      setSelectedFile(file);
      //이름생성하기
    }
  };

  const handleUpload = async () => {
    const name = uuidv4();
    if (selectedFile === null) return;
    const uploadImageName = `${name}-${selectedFile.name}`; //같은 이미지저장을 위한 랜덤네임 지정
    const albumRef = ref(storage, `${albumName}/${uploadImageName}`);
    const uploadTask = uploadBytes(albumRef, selectedFile);

    uploadTask.then((res) =>
      getDownloadURL(res.ref).then((downloadUrl) => {
        console.log(downloadUrl);
        //url가져옴
        setImageUrl(downloadUrl);

        // dispatch(uploadAlbumImage(downloadUrl));
        setImage(downloadUrl);
      })
    );
  };

  return (
    <>
      <div>앨범이름 : {albumName}</div>
      <AlbumBox />
      <label>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>업로드</button>
      </label>
    </>
  );
};

export default Album;
