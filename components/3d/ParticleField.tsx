'use client';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 300;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const colorTheme = new THREE.Color('#00f5ff');

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      colorTheme.setHSL(Math.random() * 0.1 + 0.5, 1.0, 0.5);
      col[i * 3] = colorTheme.r;
      col[i * 3 + 1] = colorTheme.g;
      col[i * 3 + 2] = colorTheme.b;
    }
    return [pos, col];
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

export default ParticleField;
