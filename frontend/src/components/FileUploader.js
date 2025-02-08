  import React from 'react';
  import { useDropzone } from 'react-dropzone';
  import styled, { keyframes } from 'styled-components';

  // Keyframes for animations
  const pulse = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  `;

  const DropzoneContainer = styled.div`
    border: 2px dashed #ffffff;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    animation: ${pulse} 2s infinite;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    p {
      font-size: 1.1rem;
      color: white;
      margin: 0;
      opacity: 0.9;
      @media (max-width: 768px) {
        font-size: 1rem;
      }

      @media (max-width: 480px) {
        font-size: 0.9rem;
      }
    }
      
      @media (max-width: 480px) {
        padding: 20px;
        width: 300px;
      }
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