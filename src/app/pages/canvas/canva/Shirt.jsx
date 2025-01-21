import React, { useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import { easing } from 'maath';
import { useFrame, extend } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, Html, OrbitControls } from '@react-three/drei';

import state from '@/store/index';
import useDecalManager from '@/app/pages/canvas/canva/hooks/useDecalManager';
import decalPositions from '@/app/pages/canvas/canva/Config/decalPositions';
import { FilePicker } from '@/components/Canvas';
import FormComponent from '@/app/pages/canvas/canva/Forms/FormComponent';
import { IoMdCloseCircle } from "react-icons/io";
import { three } from 'maath';

extend({ Decal });

const Shirt = ({rotation}) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const { decals, addDecal } = useDecalManager();

  const shirtMeshRef = useRef();
  const [file, setFile] = useState(null); // Estado para manejar el archivo seleccionado
  const [selectedArea, setSelectedArea] = useState(null); // Estado para manejar el área seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
  const [rotationDecal, setRotationDecal] = useState(0);

  useFrame((state, delta) => {
    if (materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }

     // Aplicar rotación recibida como prop
     if (shirtMeshRef.current) {
      shirtMeshRef.current.rotation.x = rotation.x;
      shirtMeshRef.current.rotation.y = rotation.y;
    }
  });

  const stateString = JSON.stringify(snap);

  const handleFileUpload = (type, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const imageUrl = reader.result;
        const positionConfig = decalPositions[type];

        if (positionConfig) {
            addDecal(imageUrl, positionConfig);
            console.log(positionConfig)
        }
    };
    reader.readAsDataURL(file);

};

const handleModalClose = () => setIsModalOpen(false);

  const renderGuides = () =>
    Object.keys(decalPositions).map((key, index) => {
      const position = decalPositions[key].position;
      return (
        <mesh
          key={index}
          position={position}
          onClick={() => {
            setSelectedArea(key); // Actualiza el área seleccionada
            setIsModalOpen(true); // Abre el modal
          }}
        >
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshBasicMaterial color="red" />
        </mesh>
      );
    });
    

  return (
    <>
      {/* <OrbitControls enablePan={false} enableZoom={false} /> */}
       <group key={stateString} ref={shirtMeshRef}>
        {nodes?.T_Shirt_male?.geometry && (
          <mesh
            ref={shirtMeshRef}
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lambert1}
            castShadow
            material-roughness={1}
            dispose={null}
          >
            {decals.map((decal, index) => (
              decal.texture && (
                <Decal
                  key={index}
                  position={decal.positionConfig.position}
                  rotation={[0, 0, isNaN(rotationDecal) ? 0 : rotationDecal]}
                  scale={[
                    decal.positionConfig.scale[0] * ((imageSize?.width || 100) / 100),
                    decal.positionConfig.scale[1] * ((imageSize?.height || 100) / 100),
                    1,
                  ]}
                  map={decal.texture}
                  anisotropy={16}
                  depthTest={false}
                  depthWrite={true}
                />
              )
            ))}
          </mesh>
        )}
        {renderGuides()}
      </group>
      {/* Modal para FilePicker */}
      {isModalOpen && selectedArea && (
        <Html position={decalPositions[selectedArea].position}>
          <div className="modal-backdrop" style={{ position: "absolute" }}>
            <div className="modal-content">
              <button
                  className="absolute right-5 top-5"
                  onClick={() => setIsModalOpen(false)}
                >
                <IoMdCloseCircle size={25} />
              </button>
              <h3 className="text-sm font-bold mb-4">
                Select a file for {selectedArea}
              </h3>
              <FormComponent
                  onSubmit={(data) => {
                    handleFileUpload(selectedArea, data.file);
                    setImageSize(data.imageSize);
                    setRotationDecal(data.rotationDecal);
                  }}
                  selectedArea={selectedArea}
              />
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

export default Shirt;