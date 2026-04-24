'use client';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ServiceIcon3DProps {
  type: 'code' | 'search' | 'api' | 'convert' | 'chat';
}

export const ServiceIcon3D: React.FC<ServiceIcon3DProps> = ({ type }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });

  let Geometry, color;
  
  switch (type) {
    case 'code':
      Geometry = <boxGeometry args={[1.5, 1.5, 1.5]} />;
      color = "#00f5ff";
      break;
    case 'search':
      Geometry = <torusGeometry args={[1, 0.4, 16, 64]} />;
      color = "#8b5cf6";
      break;
    case 'api':
      Geometry = <octahedronGeometry args={[1.5, 0]} />;
      color = "#39ff14";
      break;
    case 'convert':
      Geometry = <dodecahedronGeometry args={[1.2, 0]} />;
      color = "#f59e0b";
      break;
    case 'chat':
    default:
      Geometry = <sphereGeometry args={[1.2, 32, 32]} />;
      color = "#ec4899";
      break;
  }

  return (
    <mesh ref={meshRef}>
      {Geometry}
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
};

export default ServiceIcon3D;
