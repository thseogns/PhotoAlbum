/** @format */

import React from "react";

const ImageBox = ({ selectedFile }: { selectedFile: File | null }) => {
  return (
    <div>
      <div>앨범 이미지</div>
      {selectedFile && (
        <img src={URL.createObjectURL(selectedFile)} alt="앨범 이미지" />
      )}
    </div>
  );
};

export default ImageBox;
