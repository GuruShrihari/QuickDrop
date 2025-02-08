import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import styled, { keyframes } from 'styled-components';
import FileUploader from './components/FileUploader';
import BlurText from "./components/BlurText";
import Aurora from "./components/Aurora";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: "Poppins", sans-serif;
  color: white;
  padding: 20px;
  text-align: center;
`;

const HeroSection = styled.div`
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-in-out;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  
  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const FileList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FileCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(5px);
  animation: ${fadeIn} 0.5s ease-in-out;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    font-size: 1rem;
    margin: 0 0 10px 0;
    word-break: break-word;
  }
  
  p {
    font-size: 0.9rem;
    margin: 5px 0;
    opacity: 0.8;
  }
  @media (max-width: 768px) {
      margin-right: 30px;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background-color: #ff3b2f;
    transform: scale(1.05);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CopyLinkButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: 15px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const AuroraWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const BackButton = styled(Button)`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;
  padding: 8px 16px;
  z-index: 10;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 20px;
  }
`;

const QRCodeContainer = styled.div`
  margin: 30px auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease-in-out;
  animation: ${fadeIn} 1s ease-in-out;
  max-width: 90%;
  width: 400px;
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    margin: 20px auto;
  }
`;

const QRCodeWrapper = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  margin: 20px auto;
  width: fit-content;
  
  canvas {
    max-width: 100%;
    height: auto;
  }
`;

const LinkInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  margin: 10px 0;
  font-size: 0.9rem;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #ff6f61;
  }
`;

const Blur = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Concert+One&display=swap");
  font-family: "Concert One", cursive;
  font-weight: 400;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) { 
    font-size: 0.9rem;  
  }
`;

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [ngrokUrl, setNgrokUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const linkInputRef = useRef(null);
  const navigate = useNavigate();

  const handleUpload = async (files) => {
    setIsLoading(true);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('https://98cf-2405-201-e003-11a6-55c4-b694-f0cc-bcde.ngrok-free.app/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setUploadedFiles(response.data.files);
      setNgrokUrl('https://98cf-2405-201-e003-11a6-55c4-b694-f0cc-bcde.ngrok-free.app' + response.data.zipUrl);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(ngrokUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <Container>
      <AuroraWrapper>
        <Aurora colorStops={["#ff0066", "#4c00ff", "#00d9ff"]} speed={0.5} amplitude={1.0} />
      </AuroraWrapper>

      <BackButton onClick={() => navigate('/')}>← Back to Home</BackButton>

      <HeroSection>
        <h1>⚡QuickDrop</h1>
        <Blur>
          <BlurText
            text="Upload multiple files and share them with a single link."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </Blur>
        <FileUploader onUpload={handleUpload} multiple={true} />
      </HeroSection>

      

      {isLoading && <Stack spacing={2}>
      {/* Text Skeleton with Custom Color and Font Size */}
      <Skeleton 
        variant="text" 
        sx={{ fontSize: '1.5rem', bgcolor: 'rgba(255, 255, 255, 0.3)', borderRadius: '8px' }} 
      />

      {/* Circular Skeleton (already rounded) */}
      <Skeleton 
        variant="circular" 
        width={50} 
        height={50} 
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)' }} 
      />

      {/* Rectangular Skeleton with Rounded Corners */}
      <Skeleton 
        variant="rectangular" 
        width={350} 
        height={80} 
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)', borderRadius: '12px' }} 
      />

      {/* Rounded Skeleton with More Curved Corners */}
      <Skeleton 
        variant="rounded" 
        width={350} 
        height={80} 
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)', borderRadius: '16px' }} 
      />
    </Stack>}

      {uploadedFiles.length > 0 && (
        <>
          <FileList>
            {uploadedFiles.map((file, index) => (
              <FileCard key={index}>
                <h3>{file.name}</h3>
                <p>{formatFileSize(file.size)}</p>
                <p>{file.type}</p>
              </FileCard>
            ))}
          </FileList>

          <QRCodeContainer>
            <p>Files uploaded successfully!</p>
            <QRCodeWrapper>
              <QRCodeCanvas value={ngrokUrl} size={200} />
            </QRCodeWrapper>
            <p style={{ marginTop: '10px', opacity: 0.8 }}>
              Scan the QR code or copy the link below to download all files
            </p>
            <LinkInput
              ref={linkInputRef}
              type="text"
              value={ngrokUrl}
              readOnly
            />
            <CopyLinkButton onClick={handleCopyLink}>
              {copySuccess ? 'Link Copied!' : 'Copy Download Link'}
            </CopyLinkButton>
          </QRCodeContainer>
        </>
      )}
    </Container>
  );
};

export default App;