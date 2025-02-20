import React from "react";
import { useTexture, Decal } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import decalPositions from "@/app/canva/Config/decalPositions";

const RenderDecalGuides = ({ onClickGuide, decals }) => {
  const defaultIconTexture = useTexture("/up2.svg");
  const { nodes } = useGLTF("/shirt_baked.glb"); // Cargar la geometría de la camiseta

  return (
    <>
      {Object.entries(decalPositions).map(([key, positionConfig]) => {
        const hasDecal = decals.some((decal) => decal.id === key);

        return (
          <mesh
            key={key}
            geometry={nodes?.T_Shirt_male?.geometry} // Usar la geometría de la camiseta
            position={positionConfig.position}
            rotation={positionConfig.rotation}
            onClick={() => onClickGuide(key)}
          >
            {!hasDecal && (
              <Decal
                position={[0, 0, 0]} // Se proyecta sobre la geometría de la camiseta
                rotation={positionConfig.rotation}
                scale={positionConfig.scale}
                map={defaultIconTexture}
                polygonOffset
                polygonOffsetFactor={-10}
                depthTest={false}
                depthWrite={false}
              />
            )}
          </mesh>
        );
      })}
    </>
  );
};

export default RenderDecalGuides;
