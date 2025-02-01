import * as THREE from 'three';
import { useState } from 'react';

const useDecalManager = () => {
  const [decals, setDecals] = useState([]);

  const addOrUpdateDecal = (imageUrl, positionConfig) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (texture) => {
        const id = positionConfig.id || `${Date.now()}`;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        setDecals((prev) => {
          const existingDecalIndex = prev.findIndex((decal) => decal.id === id);
          if (existingDecalIndex !== -1) {
            const updatedDecals = [...prev];
            updatedDecals[existingDecalIndex] = {
              ...prev[existingDecalIndex],
              texture,
              imageUrl,
              positionConfig: {
                ...prev[existingDecalIndex].positionConfig,
                ...positionConfig,
              },
            };
            return updatedDecals;
          } else {
            return [
              ...prev,
              {
                id,
                texture,
                imageUrl,
                positionConfig: {
                  ...positionConfig,
                },
              },
            ];
          }
        });
      },
      undefined,
      (error) => console.error('Error al cargar la textura:', error)
    );
  };
  
  const updateDecalImage = (id, file) => {
    const loader = new THREE.TextureLoader();
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      loader.load(
        imageUrl,
        (texture) => {
          setDecals((prev) =>
            prev.map((decal) =>
              decal.id === id ? { ...decal, imageUrl, texture } : decal
            )
          );
        }
      );
    };
    reader.readAsDataURL(file);
  };

  return { decals, addDecal: addOrUpdateDecal, updateDecalImage };

};

export default useDecalManager;
