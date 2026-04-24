'use client';
import React, { Suspense } from 'react';
import LoginContent from '../login-content';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <LoginContent />
    </Suspense>
  );
}
