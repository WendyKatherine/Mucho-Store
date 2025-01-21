import { useState } from 'react';

const useDecals = () => {
  const [decals, setDecals] = useState([]);

  const addDecal = (imageUrl, positionConfig) => {
    setDecals((prev) => [
      ...prev,
      { imageUrl, ...positionConfig }, // Añade un decal con su configuración
    ]);
  };

  const updateDecal = (index, newConfig) => {
    setDecals((prev) =>
      prev.map((decal, i) => (i === index ? { ...decal, ...newConfig } : decal))
    );
  };

  const removeDecal = (index) => {
    setDecals((prev) => prev.filter((_, i) => i !== index));
  };

  return { decals, addDecal, updateDecal, removeDecal };
};

export default useDecals;
