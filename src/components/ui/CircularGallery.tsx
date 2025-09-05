"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  radius?: number;
  centerImageSize?: number;
  itemSize?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({
  items,
  radius = 200,
  centerImageSize = 120,
  itemSize = 80,
  autoRotate = true,
  rotationSpeed = 30000
}) => {
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoRotate && !isHovered) {
      intervalRef.current = setInterval(() => {
        setRotation(prev => prev + 360 / items.length);
      }, rotationSpeed / items.length);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRotate, isHovered, items.length, rotationSpeed]);

  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setRotation((-360 / items.length) * index);
  };

  return (
    <div 
      className="circular-gallery-container"
      style={{ 
        position: 'relative',
        width: `${(radius + itemSize) * 2}px`,
        height: `${(radius + itemSize) * 2}px`,
        margin: '0 auto',
        padding: '20px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Center Image */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${centerImageSize}px`,
          height: `${centerImageSize}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid #fff',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
          transition: 'all 0.3s ease'
        }}
      >
        <Image
          src={selectedItem.src}
          alt={selectedItem.alt}
          width={centerImageSize}
          height={centerImageSize}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Circular Items */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
        }}
      >
        {items.map((item, index) => {
          const angle = (360 / items.length) * index;
          const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
          const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                width: `${itemSize}px`,
                height: `${itemSize}px`,
                borderRadius: '50%',
                overflow: 'hidden',
                cursor: 'pointer',
                border: selectedItem.id === item.id ? '3px solid #4f46e5' : '2px solid #fff',
                boxShadow: selectedItem.id === item.id 
                  ? '0 0 20px rgba(79, 70, 229, 0.4)' 
                  : '0 4px 16px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                zIndex: selectedItem.id === item.id ? 5 : 1,
              }}
              onClick={() => handleItemClick(item, index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotation}deg) scale(1.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotation}deg) scale(1)`;
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={itemSize}
                height={itemSize}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Title Display */}
      {selectedItem.title && (
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: '#333',
            fontSize: '18px',
            fontWeight: '600',
            opacity: 0.9,
            transition: 'all 0.3s ease'
          }}
        >
          {selectedItem.title}
        </div>
      )}

      {/* Navigation Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          justifyContent: 'center'
        }}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item, index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: selectedItem.id === item.id ? '#4f46e5' : '#ddd',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: selectedItem.id === item.id ? 1 : 0.6
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CircularGallery;