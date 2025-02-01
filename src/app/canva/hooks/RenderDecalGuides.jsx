import React from 'react';
import decalPositions from '@/app/canva/Config/decalPositions';
import { useTexture, Decal } from '@react-three/drei';

const RenderDecalGuides = ({ onClickGuide, decals }) => {
  const defaultIconTexture = useTexture("/up2.svg");

  return (
    <>
      {Object.entries(decalPositions).map(([key, positionConfig]) => {

        const hasDecal = decals.some((decal) => decal.id === key);

        // if (hasDecal) return null;

        return (
            <group key={key}>
            <mesh
                position={positionConfig.position}
                onClick={() => onClickGuide(key)}
            >
                <planeGeometry args={[0.05, 0.05]} />
                <meshBasicMaterial transparent />
            {!hasDecal && (
                <Decal
                position={[0, 0, 0]} // Posición relativa al mesh
                rotation={positionConfig.rotation} // Rotación del decal
                scale={[0.05, 0.05, 0.05]} // Escala del decal
                map={defaultIconTexture} // Textura de la imagen
                polygonOffset // Evita z-fighting
                polygonOffsetFactor={-10} // Ajusta según sea necesario
                />
            )}
            </mesh>
        </group>
        )
      })}
    </>
  );
};

export default RenderDecalGuides;