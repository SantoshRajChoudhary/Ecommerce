import React from 'react';
import './KindredSlider.css';

const images = [
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000", type: "large", offset: "top" },
  { src: "https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?q=80&w=1000", type: "medium", offset: "overlap" },
  { src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000", type: "small", offset: "bottom" },
  { src: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000", type: "large", offset: "middle" },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000", type: "medium", offset: "top" },
];

// Duplicate for seamless loop
const displayImages = [...images, ...images];

export default function KindredSlider() {
  return (
    <section className="kindred-section">
      {/* Center Text Overlay */}
      <div className="instagram-overlay">
        <h3>#PALMANGELSOFFICIAL</h3>
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
