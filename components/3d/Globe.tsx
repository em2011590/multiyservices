'use client';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

export const Globe: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer interactive shell */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.15} />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} transparent opacity={0.7} />
      </mesh>
      
      {/* Surrounding geometry */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
         <TorusKnot args={[3.5, 0.1, 64, 8]} scale={0.5}>
            <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.5} wireframe />
         </TorusKnot>
      </Float>
    </group>
  );
};

export default Globe;
