/** @format */

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; //아이디를 생성해서 저장하기
import AlbumBox from "./AlbumBox";

//파이어베이스
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  push,
  ref as databaseRef,
  set,
  child,
} from "firebase/database";
import { storage } from "../../app/firebase/firebase";
//redux toolkit
import { RootState, AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbumImage, fetchAlbumName } from "../../features/albumNameSlice";

const Album = ({ albumName }: { albumName: string }) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const albums = useSelector((state: RootState) => state.albumName.albumImages);
  const dispatch = useDispatch<AppDispatch>();
  const db = getDatabase();

  useEffect(() => {
    dispatch(fetchAlbumImage(albumName));
  }, [albumName]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      // 업로드 된 file
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    const name = uuidv4();
    if (selectedFile === null) return;
    const uploadImageName = `${name}-${selectedFile.name}`; //같은 이미지저장을 위한 랜덤네임 지정
    const albumRef = storageRef(storage, `${albumName}/${uploadImageName}`); //스토리지에 저장
    const uploadTask = uploadBytes(albumRef, selectedFile);

    uploadTask.then((res) =>
      getDownloadURL(res.ref).then((downloadUrl) => {
        //스토리지 url가져옴
        const albumDatabaseRef = databaseRef(db, `albums/${albumName}`);
        const imageUrlsRef = child(albumDatabaseRef, "imageUrl"); // 이미지 URL을 저장할 하위 경로
        const newImageUrlRef = push(imageUrlsRef); // 새로운 이미지 URL을 추가할 레퍼런스 생성
        set(newImageUrlRef, downloadUrl); // 새로운 이미지 URL 저장

        dispatch(fetchAlbumImage(albumName)); //업로드시 한번더 받아오기
        dispatch(fetchAlbumName());
      })
    );
  };

  return (
    <>
      <div>앨범이름 : {albumName}</div>
      <AlbumBox albums={albums} />
      <label>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>업로드</button>
      </label>
    </>
  );
};

export default Album;
