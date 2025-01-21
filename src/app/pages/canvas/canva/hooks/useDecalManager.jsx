import * as THREE from 'three';
import { useState } from 'react';

const useDecalManager = () => {
  const [decals, setDecals] = useState([]);

  const addDecal = (imageUrl, positionConfig) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        setDecals((prev) => [
          ...prev,
          { imageUrl, positionConfig, texture },
        ]);
      },
      undefined,
      (error) => {
        console.error('Error al cargar la textura:', error);
      }
    );
  };

  return { decals, addDecal };
};

export default useDecalManager;
