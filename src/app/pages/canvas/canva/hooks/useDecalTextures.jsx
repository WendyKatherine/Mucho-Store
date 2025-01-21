import { useState, useEffect } from 'react';
import { useTexture } from '@react-three/drei';

const useDecalTextures = (imageUrls) => {
  const [textures, setTextures] = useState([]);

  useEffect(() => {
    const loadedTextures = imageUrls.map((url) => useTexture(url));
    setTextures(loadedTextures);
  }, [imageUrls]);

  return textures;
};

export default useDecalTextures;
