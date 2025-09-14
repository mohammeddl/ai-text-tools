"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ParticleLoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const ParticleLoadingScreen = ({
  onComplete,
  duration = 4000,
}: ParticleLoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const sceneRef = useRef<THREE.Scene>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const shapeIndexRef = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    
    camera.position.z = 5;

    // Create particle system
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Shape generation functions
    const createSphere = (index: number, radius = 2) => {
      const phi = Math.acos(-1 + (2 * index) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      };
    };

    const createCube = (index: number, size = 2) => {
      const face = Math.floor(index / (particleCount / 6));
      const localIndex = index % (particleCount / 6);
      const sqrt = Math.sqrt(particleCount / 6);
      const u = (localIndex % sqrt) / sqrt - 0.5;
      const v = Math.floor(localIndex / sqrt) / sqrt - 0.5;
      
      switch (face) {
        case 0: return { x: size, y: u * size, z: v * size };
        case 1: return { x: -size, y: u * size, z: v * size };
        case 2: return { x: u * size, y: size, z: v * size };
        case 3: return { x: u * size, y: -size, z: v * size };
        case 4: return { x: u * size, y: v * size, z: size };
        case 5: return { x: u * size, y: v * size, z: -size };
        default: return { x: 0, y: 0, z: 0 };
      }
    };

    const createTorus = (index: number, majorRadius = 2, minorRadius = 0.5) => {
      const majorAngle = (index / particleCount) * Math.PI * 2 * 3;
      const minorAngle = ((index * 17) % particleCount / particleCount) * Math.PI * 2;
      
      const x = (majorRadius + minorRadius * Math.cos(minorAngle)) * Math.cos(majorAngle);
      const y = (majorRadius + minorRadius * Math.cos(minorAngle)) * Math.sin(majorAngle);
      const z = minorRadius * Math.sin(minorAngle);
      
      return { x, y, z };
    };

    const shapes = [createSphere, createCube, createTorus];
    let currentShapeIndex = 0;

    // Initialize positions
    for (let i = 0; i < particleCount; i++) {
      const pos = shapes[currentShapeIndex](i);
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
      
      // Green color variations
      colors[i * 3] = Math.random() * 0.2; // Red
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5; // Green
      colors[i * 3 + 2] = Math.random() * 0.3; // Blue
      
      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mouse;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Mouse interaction
          float mouseDistance = distance(pos.xy, mouse * 5.0);
          pos += normalize(pos) * sin(time + mouseDistance) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float distance = length(center);
          
          if (distance > 0.5) discard;
          
          float alpha = 1.0 - distance * 2.0;
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      if (material.uniforms.mouse) {
        material.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      }
    };

    const handleClick = () => {
      currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
      shapeIndexRef.current = currentShapeIndex;
      
      // Animate to new shape
      const newPositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const pos = shapes[currentShapeIndex](i);
        newPositions[i * 3] = pos.x;
        newPositions[i * 3 + 1] = pos.y;
        newPositions[i * 3 + 2] = pos.z;
      }
      
      // Smooth transition
      const startPositions = geometry.attributes.position.array.slice();
      const duration = 1000;
      const startTime = Date.now();
      
      const animateShape = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
        
        for (let i = 0; i < particleCount * 3; i++) {
          positions[i] = startPositions[i] + (newPositions[i] - startPositions[i]) * easedProgress;
        }
        
        geometry.attributes.position.needsUpdate = true;
        
        if (progress < 1) {
          requestAnimationFrame(animateShape);
        }
      };
      
      animateShape();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      const time = Date.now() * 0.001;
      
      if (material.uniforms.time) {
        material.uniforms.time.value = time;
      }
      
      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.x = time * 0.1;
        particlesRef.current.rotation.y = time * 0.15;
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Complete loading after duration
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
    }, duration);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [isClient, duration, onComplete]);

  if (!isClient) {
    return null;
  }

  return (
    <div ref={containerRef} className={`particle-loader ${isComplete ? 'complete' : ''}`}>
      <canvas ref={canvasRef} className="particle-canvas" />
      
      {/* TextCrafter Animation */}
      <div className="text-container">
        <div className="textcrafter-text">
          <span className="text-letter">T</span>
          <span className="text-letter">e</span>
          <span className="text-letter">x</span>
          <span className="text-letter">t</span>
          <span className="text-letter">C</span>
          <span className="text-letter">r</span>
          <span className="text-letter">a</span>
          <span className="text-letter">f</span>
          <span className="text-letter">t</span>
          <span className="text-letter">e</span>
          <span className="text-letter">r</span>
        </div>
        <div className="loading-text">Loading...</div>
        <div className="click-hint">Click to change shape</div>
      </div>

      <style jsx>{`
        .particle-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(ellipse at center, #111111 0%, #000000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: opacity 1s ease-out, transform 1s ease-out;
        }

        .particle-loader.complete {
          opacity: 0;
          transform: scale(1.1);
        }

        .particle-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .text-container {
          position: relative;
          z-index: 10;
          text-align: center;
          pointer-events: none;
        }

        .textcrafter-text {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 2rem;
          perspective: 1000px;
          display: flex;
          justify-content: center;
          gap: 0.1em;
        }

        .text-letter {
          display: inline-block;
          color: #00ff66;
          text-shadow: 
            0 0 10px #00ff66,
            0 0 20px #00ff66,
            0 0 30px #00ff66;
          animation: letterFloat 3s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .text-letter:nth-child(1) { animation-delay: 0s; }
        .text-letter:nth-child(2) { animation-delay: 0.1s; }
        .text-letter:nth-child(3) { animation-delay: 0.2s; }
        .text-letter:nth-child(4) { animation-delay: 0.3s; }
        .text-letter:nth-child(5) { animation-delay: 0.4s; }
        .text-letter:nth-child(6) { animation-delay: 0.5s; }
        .text-letter:nth-child(7) { animation-delay: 0.6s; }
        .text-letter:nth-child(8) { animation-delay: 0.7s; }
        .text-letter:nth-child(9) { animation-delay: 0.8s; }
        .text-letter:nth-child(10) { animation-delay: 0.9s; }
        .text-letter:nth-child(11) { animation-delay: 1s; }

        .loading-text {
          font-size: 1.5rem;
          color: #00ff66;
          font-weight: 300;
          margin-bottom: 1rem;
          opacity: 0.8;
          animation: pulse 2s ease-in-out infinite;
        }

        .click-hint {
          font-size: 1rem;
          color: rgba(0, 255, 102, 0.6);
          font-weight: 400;
          animation: fadeInOut 3s ease-in-out infinite;
        }

        /* Animations */
        @keyframes letterFloat {
          0%, 100% {
            transform: translateY(0) rotateX(0) rotateY(0);
          }
          25% {
            transform: translateY(-10px) rotateX(15deg) rotateY(5deg);
          }
          50% {
            transform: translateY(-5px) rotateX(-10deg) rotateY(-5deg);
          }
          75% {
            transform: translateY(-15px) rotateX(10deg) rotateY(10deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .textcrafter-text {
            font-size: 3rem;
          }
          
          .loading-text {
            font-size: 1.2rem;
          }
          
          .click-hint {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .textcrafter-text {
            font-size: 2.5rem;
            gap: 0.05em;
          }
          
          .loading-text {
            font-size: 1rem;
          }
          
          .click-hint {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ParticleLoadingScreen;