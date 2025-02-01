import * as THREE from 'three';
import { useState } from 'react';

const updateDecalTransform = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [decals, setDecals] = useState([]);

    const adjustDecalRotation = (position, geometry) => {
        // Encuentra la normal más cercana al punto
        const normal = new THREE.Vector3();
        const closestVertex = new THREE.Vector3();
        let closestDistance = Infinity;
      
        geometry.attributes.position.array.forEach((_, i) => {
          const vertex = new THREE.Vector3(
            geometry.attributes.position.getX(i),
            geometry.attributes.position.getY(i),
            geometry.attributes.position.getZ(i)
          );
      
          const distance = vertex.distanceTo(new THREE.Vector3(...position));
          if (distance < closestDistance) {
            closestDistance = distance;
            closestVertex.copy(vertex);
            normal.set(
              geometry.attributes.normal.getX(i),
              geometry.attributes.normal.getY(i),
              geometry.attributes.normal.getZ(i)
            );
          }
        });
      
        // Ajustar la rotación del decal
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.normalize());
        const euler = new THREE.Euler();
        euler.setFromQuaternion(quaternion);
      
        return [euler.x, euler.y, euler.z];
      };

    const updateDecalTransform = (id, { scale, rotation }) => {
        setDecals((prev) => {
          return prev.map((decal) => {
            if (decal.id === id) {
              // Evitar duplicaciones en la misma posición
              const isDuplicate = decals.some(
                (d) =>
                  d.id !== id &&
                  d.positionConfig.position === decal.positionConfig.position
              );
              if (isDuplicate) {
                console.warn("Decal duplicado evitado");
                return decal;
              }
      
              // Limitar la escala y rotación
              const limitedScale = [
                Math.min(Math.max(scale[0], 0), 1), // Escala limitada
                Math.min(Math.max(scale[1], 0), 1),
                scale[2],
              ];
              const limitedRotation = [
                rotation[0],
                rotation[1],
                Math.min(Math.max(rotation[2], -Math.PI / 2), Math.PI / 2), // Rotación entre -90° y 90°
              ];
      
              return {
                ...decal,
                positionConfig: {
                  ...decal.positionConfig,
                  scale: limitedScale,
                  rotation: limitedRotation,
                },
              };
            }
            return decal;
          });
        });
      };

  return (
    updateDecalTransform, adjustDecalRotation
  )
}

export default updateDecalTransform