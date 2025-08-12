"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
// Lightning bolt generator
const generateLightningPath = (startX: number, startY: number, endX: number, endY: number, segments: number = 20) => {
  const points = [];
  const dx = endX - startX;
  const dy = endY - startY;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = startX + dx * t + (Math.random() - 0.5) * 0.3 * (1 - Math.abs(t - 0.5) * 2);
    const y = startY + dy * t + (Math.random() - 0.5) * 0.2 * (1 - Math.abs(t - 0.5) * 2);
    const z = (Math.random() - 0.5) * 0.1;
    points.push(new THREE.Vector3(x, y, z));
  }
  
  return points;
};

// Lightning bolt component
const LightningBolt: React.FC<{ 
  startPos: [number, number, number], 
  endPos: [number, number, number],
  color: string,
  opacity: number 
}> = ({ startPos, endPos, color, opacity }) => {
  const lightningRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  
  const points = useMemo(() => {
    return generateLightningPath(startPos[0], startPos[1], endPos[0], endPos[1]);
  }, [startPos, endPos]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity = opacity * (0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 10));
    }
  });

  return (
    <line>
      <bufferGeometry ref={lightningRef}>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        ref={materialRef}
        color={color} 
        transparent 
        opacity={opacity}
        linewidth={2}
      />
    </line>
  );
};

// Electric particles
const ElectricParticles: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#60a5fa' : '#3b82f6'}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

// Main Three.js scene
const LightningScene: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const lightningBolts = useMemo(() => [
    {
      start: [-3, 2, 0] as [number, number, number],
      end: [-1, -2, 0] as [number, number, number],
      color: isDark ? '#60a5fa' : '#3b82f6',
      opacity: 0.8
    },
    {
      start: [2, 3, -1] as [number, number, number],
      end: [1, -1, 0] as [number, number, number],
      color: isDark ? '#06b6d4' : '#0891b2',
      opacity: 0.6
    },
    {
      start: [0, 1, 1] as [number, number, number],
      end: [3, -3, -1] as [number, number, number],
      color: isDark ? '#8b5cf6' : '#7c3aed',
      opacity: 0.4
    }
  ], [isDark]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <ElectricParticles isDark={isDark} />
      
      {lightningBolts.map((bolt, index) => (
        <LightningBolt
          key={index}
          startPos={bolt.start}
          endPos={bolt.end}
          color={bolt.color}
          opacity={bolt.opacity}
        />
      ))}
    </>
  );
};

// Main component
const LightningBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <LightningScene />
      </Canvas>
    </div>
  );
};

export default LightningBackground;