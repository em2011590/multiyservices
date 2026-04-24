import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      directionalLight: any;
      spotLight: any;
      mesh: any;
      group: any;
      bufferGeometry: any;
      meshBasicMaterial: any;
      meshPhongMaterial: any;
      meshStandardMaterial: any;
      shaderMaterial: any;
      canvas: any;
    }
  }
}

export {};
