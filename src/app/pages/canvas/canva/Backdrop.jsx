import React, { useRef } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={120}
      alphaTest={0.01} // Mayor transparencia en las sombras
      scale={12} // Área amplia de sombras
      resolution={1024}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, -0.25, -0.1]} // Ajusta posición de las sombras
    >
      {/* Luz principal */}
      <RandomizedLight 
        amount={3} 
        radius={6}
        intensity={0.6} // Reduce intensidad para sombras suaves
        ambient={0.5} // Aumenta luz ambiental para fondo claro
        position={[5, 5, -5]} // Luz lateral
      />
      {/* Luz secundaria */}
      <RandomizedLight 
        amount={3} 
        radius={8}
        intensity={0.4} // Luz secundaria más tenue
        ambient={0.7} // Luz ambiental adicional
        position={[-5, 5, -5]} // Luz desde el otro lado
      />
      {/* Luz adicional desde arriba */}
      <RandomizedLight 
        amount={2} 
        radius={10}
        intensity={0.3} // Luz tenue desde arriba
        ambient={0.8} // Alta ambientación para fondo blanco
        position={[0, 8, 0]} // Luz cenital
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
