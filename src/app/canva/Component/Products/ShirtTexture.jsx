  import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, useTexture, Html } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { easing } from 'maath';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import state from '@/store/index';
import FilePicker from '@/components/Canvas/FilePicker';
import * as THREE from 'three';

const ShirtTexture = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const shirtMeshRef = useRef();
  const logoMeshRef = useRef();
  const raycaster = new THREE.Raycaster();
  const { camera, scene } = useThree();

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [logoPosition, setLogoPosition] = useState([0, 0.3, 0.1]);
  const [logoNormal, setLogoNormal] = useState([0, 0, 1]);

  // Convertir el archivo a una URL y limpiar al desmontar
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url); // Limpia la memoria al desmontar
    }
  }, [file]);
  
  const texture = useTexture(fileUrl ? fileUrl : '/up2.png');


   // Configurar la textura para que no se repita ni se distorsione
   useEffect(() => {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16; // Mejora la calidad de la textura
    texture.needsUpdate = true;
  }, [texture]);

  // Controles de Leva para ajustar la imagen
  const { scale, offsetX, offsetY } = useControls({
    scale: { value: 0.2, min: 0.05, max: 0.5, step: 0.01 },
    offsetX: { value: 0, min: -0.3, max: 0.3, step: 0.01 },
    offsetY: { value: 0, min: -0.3, max: 0.3, step: 0.01 },
  });

  // Posicionar el logo con Raycasting
  useEffect(() => {
    if (!shirtMeshRef.current) return;

    const shirtMesh = shirtMeshRef.current;
    const rayOrigin = new THREE.Vector3(0, 0.3, 1); // Punto de disparo del rayo
    const rayDirection = new THREE.Vector3(0, 0, -1); // Dirección hacia la camiseta

    raycaster.set(rayOrigin, rayDirection);
    const intersects = raycaster.intersectObject(shirtMesh, true);

    if (intersects.length > 0) {
      const { point, face } = intersects[0];
      setLogoPosition([point.x + offsetX, point.y + offsetY, point.z + 1]); // Ajuste pequeño en Z
      setLogoNormal([face.normal.x, face.normal.y, face.normal.z]);
    }
  }, [offsetX, offsetY]);

  const handleSubmit = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  useFrame((state, delta) => {
    if (materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  // // Aplicar ajustes a la textura
  // useEffect(() => {
  //   texture.offset.set(offset.x, offset.y);
  //   texture.rotation = rotation;
  //   texture.repeat.set(2 / scale, 2 / scale); // Escala la textura sin repetirla
  //   texture.needsUpdate = true;
  // }, [offset, rotation, scale, texture]);

  // Función para manejar el arrastre con el mouse
  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaX = event.movementX / window.innerWidth;
      const deltaY = -event.movementY / window.innerHeight;

      // Actualizar los valores de offset
      setOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    }
  };

  // Eventos de mouse para arrastrar
  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

    const stateString = JSON.stringify(snap);

  return (
    <>
      <group key={stateString} ref={shirtMeshRef}>
        {nodes?.T_Shirt_male?.geometry && (
          <mesh material={materials.lambert1} ref={shirtMeshRef} geometry={nodes.T_Shirt_male.geometry}>
            {/* <meshStandardMaterial map={texture ? texture : null} /> */}
          </mesh>
        )}
        {/* Logo aplicado como un "parche" */}
        {fileUrl && (
          <mesh
            ref={logoMeshRef}
            position={logoPosition} // Posición ajustable
            lookAt={new THREE.Vector3(...logoNormal)} // Rotación ajustable
          >
            <planeGeometry args={[scale, scale]} /> {/* Tamaño ajustable */}
            <meshStandardMaterial
              map={texture}
              transparent={true}
              side={THREE.DoubleSide} // Permite que se vea bien en ambos lados
            />
          </mesh>
        )}
      </group>
      <Html>
        <FilePicker
          file={file}
          setFile={setFile}
          readFile={handleSubmit}
        />
      </Html>
    </>
  );
};

export default ShirtTexture;