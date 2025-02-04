import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import styled from 'styled-components';
import FileUploader from './components/FileUploader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f9;
  font-family: Arial, sans-serif;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const App = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [ngrokUrl, setNgrokUrl] = useState('');

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log('Backend Response:', response.data); // Debugging log

      setFileUrl(response.data.fileUrl);
      setNgrokUrl('https://3b83-2405-201-e003-11a6-60ed-9d0a-ccb-3634.ngrok-free.app' + response.data.fileUrl); // Replace with your ngrok URL
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Container>
      <h1>Share Files Directly</h1>
      <FileUploader onUpload={handleUpload} />
      {fileUrl && (
        <>
          <p>File uploaded successfully!</p>
          <QRCodeCanvas value={ngrokUrl} size={200} />
          <p>Scan the QR code to access the file.</p>
          <a href={ngrokUrl} target="_blank" rel="noopener noreferrer">
            <Button>Open File</Button>
          </a>
        </>
      )}
    </Container>
  );
};

export default App;