import React from 'react';
import './KindredSlider.css';

const images = [
  { src: "images/life_1.png", type: "large", offset: "top" },
  { src: "images/life_2.png", type: "medium", offset: "overlap" },
  { src: "images/life_3.png", type: "small", offset: "bottom" },
  { src: "images/life_4.png", type: "large", offset: "middle" },
];

// Duplicate for seamless loop
const displayImages = [...images, ...images];

export default function KindredSlider() {
  return (
    <section className="kindred-section">
      {/* Center Text Overlay */}
      <div className="instagram-overlay">
        <h3>#ATFYOFFICIAL</h3>
      </div>

      <div className="kindred-marquee-wrapper">
        <div className="kindred-marquee-content">
          {displayImages.map((img, index) => (
            <div 
              key={index} 
              className={`kindred-img-card ${img.type} ${img.offset}`}
            >
              <div className="img-inner">
                <img src={img.src} alt={`Fashion ${index + 1}`} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
