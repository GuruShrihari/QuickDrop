import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import styled, { keyframes } from 'styled-components';
import FileUploader from './components/FileUploader';
import BlurText from "./components/BlurText";

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  font-family: 'Poppins', sans-serif;
  color: white;
  padding: 0px;
  text-align: center;
  position: relative;
`;

const HeroSection = styled.div`
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-in-out;
  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 20px;

    @media (max-width: 432px) {
      font-size: 1rem;
    }
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
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  &:hover {
    background-color: #ff3b2f;
    transform: scale(1.05);
    animation: ${pulse} 0.5s ease-in-out;
  }
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;
  padding: 8px 16px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const QRCodeContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  animation: ${fadeIn} 1s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Blur = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Concert+One&display=swap");
  font-family: "Concert One", cursive;
  font-weight: 400;
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

const App = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [ngrokUrl, setNgrokUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://2bfc-152-52-100-226.ngrok-free.app/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFileUrl(response.data.fileUrl);
      setNgrokUrl('https://2bfc-152-52-100-226.ngrok-free.app' + response.data.fileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {/* Back Button */}
      <BackButton onClick={() => navigate('/')}>← Back to Home</BackButton>

      {/* Hero Section */}
      <HeroSection>
        <h1>⚡QuickDrop</h1>
        <Blur>
          <BlurText
            text="Share files instantly with a simple drag-and-drop."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </Blur>
        {/* <p>Share files instantly with a simple drag-and-drop.</p> */}
        <Button onClick={() => document.querySelector('input[type="file"]').click()}>
          Get Started
        </Button>
      </HeroSection>

      {/* File Uploader */}
      <FileUploader onUpload={handleUpload} />

      {/* Loading Spinner */}
      {isLoading && <p>Loading...</p>}

      {/* QR Code Display */}
      {fileUrl && (
        <QRCodeContainer>
          <p>File uploaded successfully!</p>
          <QRCodeCanvas value={ngrokUrl} size={200} />
          <p style={{ marginTop: '10px', opacity: 0.8 }}>Scan the QR code to access the file.</p>
          <a href={ngrokUrl} target="_blank" rel="noopener noreferrer">
            <Button>Open File</Button>
          </a>
        </QRCodeContainer>
      )}
    </Container>
  );
};

export default App;
