import React, { useState, useRef } from 'react';
import './PalmReveal.css';

const palmCollections = [
  { id: 1, title: 'Outerwear', icon: '🧥', count: 24, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600' },
  { id: 2, title: 'T-Shirts', icon: '👕', count: 86, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600' },
  { id: 3, title: 'Accessories', icon: '🎒', count: 42, img: 'https://images.unsplash.com/photo-1544816153-12ad58a1440d?w=600' },
  { id: 4, title: 'Footwear', icon: '👟', count: 31, img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600' },
  { id: 5, title: 'New Drops', icon: '🔥', count: 12, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600' },
];

function PalmItem({ item }) {
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
      className="palm-item"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="#products" className="palm-link">
        <span className="palm-icon">{item.icon}</span>
        <span className="palm-title">{item.title}</span>
        <span className="palm-count">({item.count})</span>
      </a>
      
      <img 
        src={item.img} 
        alt={item.title} 
        className="palm-reveal-img"
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

export default function PalmReveal() {
  return (
    <section className="palm-reveal-section">
      <div className="palm-reveal-container">
        <p className="palm-subtitle">The Palm Collections</p>
        <div className="palm-reveal-list">
          {palmCollections.map(item => (
            <PalmItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
