import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

const DropzoneContainer = styled.div`
  border: 2px dashed #ffffff;
  border-radius: 20px;
  padding: clamp(20px, 5vw, 40px);
  text-align: center;
  cursor: pointer;
  width: 100%;
  max-width: min(90vw, 500px);
  margin: 20px auto;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(5px);
  margin-top: 0px;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    border-color: #ff6f61;
  }
  
  &:active {
    transform: scale(0.98);
  }

  p {
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    color: white;
    margin: 0;
    opacity: 0.9;
    line-height: 1.5;
  }

  /* Adjust styling based on drag state */
  ${({ $isDragActive }) => $isDragActive && `
    border-color: #ff6f61;
    background: rgba(255, 255, 255, 0.2);
  `}
  
  @media (max-width: 768px) {
    padding: 30px 10px 30px 0px ;
    margin-top: 0px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 10px 20px 0px ;
    margin-top: 0px;
  }
`;

const FileUploader = ({ onUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles);
      }
    },
    multiple: true
  });

  return (
    <DropzoneContainer {...getRootProps()} $isDragActive={isDragActive}>
    <input {...getInputProps()} />
    <p>
      {isDragActive
        ? "Drop your files here..."
        : "Drag & drop multiple files here, or click to select files"}
    </p>
  </DropzoneContainer>
  );
};

export default FileUploader;