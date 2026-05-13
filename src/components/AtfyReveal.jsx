import React, { useState, useRef } from 'react';
import './AtfyReveal.css';

const atfyCollections = [
  { id: 1, title: 'Outerwear', icon: '🧥', count: 24, img: 'images/outerwear.png' },
  { id: 2, title: 'T-Shirts', icon: '👕', count: 86, img: 'images/hangers.png' },
  { id: 3, title: 'Accessories', icon: '🎒', count: 42, img: 'images/hero_accessory.png' },
  { id: 4, title: 'Footwear', icon: '👟', count: 31, img: 'images/life_4.png' },
  { id: 5, title: 'New Drops', icon: '🔥', count: 12, img: 'images/new_drops.png' },
];

function AtfyItem({ item }) {
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
      className="atfy-item"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="#products" className="atfy-link">
        <span className="atfy-icon">{item.icon}</span>
        <span className="atfy-title">{item.title}</span>
        <span className="atfy-count">({item.count})</span>
      </a>
      
      <img 
        src={item.img} 
        alt={item.title} 
        className="atfy-reveal-img"
        style={{
          left: isHovered ? `${mousePos.x}px` : '50%',
          top: isHovered ? `${mousePos.y}px` : '50%',
          opacity: isHovered ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 0.8})`,
        }}
      />
    </div>
  );
}

export default function AtfyReveal() {
  return (
    <section className="atfy-reveal-section">
      <div className="atfy-reveal-container">
        <p className="atfy-subtitle">The Atfy Collections</p>
        <div className="atfy-reveal-list">
          {atfyCollections.map(item => (
            <AtfyItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
