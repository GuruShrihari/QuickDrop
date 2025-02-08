import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import TiltedCard from "./components/TiltedCard";
import Button from "./components/Button"; // Import the custom Button component
import BlurText from "./components/BlurText";
import Aurora from "./components/Aurora"; // Import Aurora
import Dock from './components/Dock'; // Import Dock


// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// const pulse = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.05);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;

// Styled Components
const Container = styled.div`
  position: relative;  /* Ensure it acts as a relative container */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden; /* Prevent unwanted scrollbars */
  font-family: "Poppins", sans-serif;
  color: white;
  padding: 20px;
  text-align: center;
  

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const AuroraWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure it stays in the background */
`;

const HeroSection = styled.div`
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-in-out;

  h1 {
    
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.43);

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Blur = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Concert+One&display=swap");
  font-family: "Concert One", cursive;
  font-weight: 400;
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

// const Button = styled.button`
//   padding: 12px 24px;
//   background-color:rgb(0, 0, 0);
//   color: white;
//   border: none;
//   border-radius: 25px;
//   cursor: pointer;
//   font-size: 1rem;
//   font-weight: bold;
//   transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

//   &:hover {
//     background-color:rgb(30, 21, 21);
//     transform: scale(1.05);
//     animation: ${pulse} 0.5s ease-in-out;
//   }
// `;

const FeaturesSection = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
  animation: ${fadeIn} 1.5s ease-in-out;
  margin-bottom: 100px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/app"); // Redirect to the App.js page
  };

  return (
    <Container>
      {/* Aurora Background */}
      <AuroraWrapper>
        <Aurora colorStops={["#ff0066", "#4c00ff", "#00d9ff"]} speed={0.5} amplitude={1.0} />
      </AuroraWrapper>


      {/* Hero Section */}
      <HeroSection>
        <h1>⚡QuickDrop</h1>
        <Blur>
          <BlurText
            text="Share files instantly with a simple drag-and-drop. Fast, secure, and easy to use."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </Blur>
        {/* <p>Share files instantly with a simple drag-and-drop. Fast, secure, and easy to use.</p> */}
        {/* <Button onClick={handleGetStarted}>Get Started</Button> */}
        <ButtonWrapper>
          <Button onClick={handleGetStarted} />
        </ButtonWrapper>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        {/* Tilted Card for Fast Uploads */}
        <TiltedCard
          imageSrc="https://iili.io/2DIE249.gif"
          altText="Fast Uploads"
          captionText="🚀 Fast Uploads"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <p className="tilted-card-demo-text">
              Upload and share files in seconds with our lightning-fast servers.
            </p>
          }
        />

        {/* Tilted Card for Secure Sharing */}
        <TiltedCard
          imageSrc="https://iili.io/2DIaRPn.gif"
          altText="Secure Sharing"
          captionText="🔒 Secure Sharing"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <p className="tilted-card-demo-text">
              Your files are encrypted and securely stored for private sharing.
            </p>
          }
        />

        {/* Tilted Card for QR Code Access */}
        <TiltedCard
          imageSrc="https://iili.io/2Dx8KeS.gif"
          altText="QR Code Access"
          captionText="📱 QR Code Access"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <p className="tilted-card-demo-text">
              Generate QR codes for easy access to your shared files.
            </p>
          }
        />
      </FeaturesSection>
      <Dock collapsible={false} position="bottom" responsive="bottom" />
    </Container>
  );
};

export default Home;
