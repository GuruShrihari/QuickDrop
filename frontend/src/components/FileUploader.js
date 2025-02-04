import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const DropzoneContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  width: 300px;
  margin-bottom: 20px;
  background-color: #fff;
`;

const FileUploader = ({ onUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]); // Pass the first file to the upload handler
      }
    },
  });

  return (
    <DropzoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag & drop a file here, or click to select a file</p>
    </DropzoneContainer>
  );
};

export default FileUploader;