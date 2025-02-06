// src/Card.js
import React from "react";
import TiltedCard from "./components/TiltedCard";
import { Link } from 'react-router-dom';
import "./App.css";

function Card() {
  return (
    <div className="app-container">
      <h1>Interactive Tilted Card</h1>
      <TiltedCard
        imageSrc="https://iili.io/2DnDkgt.jpg"
        altText="Spiderman"
        captionText="Spiderman"
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
            Spiderman
          </p>
        }
      />
      {/* Back to Home Link */}
      <p style={{ marginTop: '20px' }}>
        Go back to{' '}
        <Link to="/" style={{ color: '#ff6f61', textDecoration: 'underline' }}>
          Home
        </Link>
      </p>
    </div>
  );
}

export default Card;