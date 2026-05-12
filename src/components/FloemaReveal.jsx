import React, { useState, useRef } from 'react';
import './FloemaReveal.css';

const collections = [
  { id: 1, title: 'Urban', icon: '🏢', count: 50, img: 'https://images.unsplash.com/photo-1449156001533-cb39c7314cc5?w=600' },
  { id: 2, title: 'Nature', icon: '🌿', count: 38, img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600' },
  { id: 3, title: 'Golf', icon: '⛳', count: 62, img: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600' },
  { id: 4, title: 'Archive', icon: '📁', count: 124, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600' },
];

function FloemaItem({ item }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={itemRef}
      className="floema-item"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="#" className="floema-link">
        <span className="floema-icon">{item.icon}</span>
        <span className="floema-title">{item.title}</span>
        <span className="floema-count">({item.count})</span>
      </a>
      
      <img 
        src={item.img} 
        alt={item.title} 
        className="floema-reveal-img"
        style={{
          left: isHovered ? `${mousePos.x}px` : '50%',
          top: isHovered ? `${mousePos.y}px` : '50%',
          opacity: isHovered ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.8})`,
        }}
      />
    </div>
  );
}

export default function FloemaReveal() {
  return (
    <section className="floema-section">
      <div className="floema-container">
        <p className="floema-subtitle">The Collections</p>
        <div className="floema-list">
          {collections.map(item => (
            <FloemaItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
