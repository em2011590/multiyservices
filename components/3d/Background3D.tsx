'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false });
const Globe = dynamic(() => import('@/components/3d/Globe'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false });

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black z-0" />
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
          {/* @ts-ignore */}
          <ambientLight intensity={0.6} />
          {/* @ts-ignore */}
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          {/* @ts-ignore */}
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <Suspense fallback={null}>
            <Globe />
            <ParticleField />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
}
