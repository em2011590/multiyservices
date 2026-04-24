'use client';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
  id: string;
  type: string;
  label: string;
}

interface Edge {
  source: string;
  target: string;
}

interface ASTGraphProps {
  nodes: Node[];
  edges: Edge[];
}

export const ASTGraph: React.FC<ASTGraphProps> = ({ nodes, edges }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Simple layout logic for mock AST
  const nodePositions = useMemo(() => {
    const posMap = new Map<string, THREE.Vector3>();
    nodes.forEach((node, idx) => {
      posMap.set(node.id, new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ));
    });
    return posMap;
  }, [nodes]);

  const getColor = (type: string) => {
    switch (type) {
      case 'Function': return '#00f5ff';
      case 'Variable': return '#f59e0b';
      case 'Class': return '#8b5cf6';
      case 'Import': return '#39ff14';
      default: return '#ffffff';
    }
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map(node => {
        const pos = nodePositions.get(node.id)!;
        return (
          <Sphere key={node.id} args={[0.3, 16, 16]} position={pos}>
            <meshStandardMaterial color={getColor(node.type)} roughness={0.1} metalness={0.8} />
          </Sphere>
        );
      })}
      {edges.map((edge, idx) => {
        const src = nodePositions.get(edge.source);
        const tgt = nodePositions.get(edge.target);
        if (!src || !tgt) return null;
        return (
          <Line
            key={idx}
            points={[src, tgt]}
            color="#ffffff"
            lineWidth={2}
          />
        );
      })}
    </group>
  );
};

export default ASTGraph;
