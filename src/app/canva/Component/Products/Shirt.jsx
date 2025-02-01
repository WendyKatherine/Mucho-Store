import React, { useRef, useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { easing } from 'maath';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { Decal, useGLTF, Html, OrbitControls, VertexNormalsHelper } from '@react-three/drei';
import state from '@/store/index';
import useDecalManager from '@/app/canva/hooks/useDecalManager';
import decalPositions from '@/app/canva/Config/decalPositions';
import FormComponent from '@/app/canva/Component/Forms/FormComponent';
import { IoMdCloseCircle } from "react-icons/io";
import RenderDecalGuides from '@/app/canva/hooks/RenderDecalGuides';

extend({ Decal });

const Shirt = ({rotation}) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const { decals, addDecal, updateDecalImage } = useDecalManager();
  const shirtMeshRef = useRef();
  const [selectedArea, setSelectedArea] = useState(null); // Estado para manejar el área seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal
  const [selectedDecalId, setSelectedDecalId] = useState(null);

  const handleFileUpload = (areaKey, file) => {
    const positionConfig = decalPositions[areaKey];
    if (!positionConfig || !file || !nodes?.T_Shirt_male?.geometry) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      if (positionConfig) {
        addDecal(imageUrl, { ...positionConfig, id: areaKey }, nodes.T_Shirt_male.geometry);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClickGuide = (areaKey) => {
    setSelectedArea(areaKey);
    setSelectedDecalId(areaKey);
    setIsModalOpen(true);
  };

  useFrame((state, delta) => {
    if (materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
     if (shirtMeshRef.current) {
      shirtMeshRef.current.rotation.x = rotation.x;
      shirtMeshRef.current.rotation.y = rotation.y;
    }
  });

  const stateString = JSON.stringify(snap);

  return (
    <>
    {/* <ModelWithHelper /> */}
      {/* <OrbitControls
        minPolarAngle={Math.PI / 2.5} // Ángulo mínimo
        maxPolarAngle={Math.PI / 1.5} // Ángulo máximo
        enableZoom={true} // Permitir zoom
        enablePan={false} // Desactivar paneo
      /> */}
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
            {decals.map((decal) => (
              decal.texture && (
                <Decal
                  key={decal.id}
                  position={decal.positionConfig.position}
                  scale={decal.positionConfig.scale}
                  rotation={decal.positionConfig.rotation}
                  map={decal.texture}
                  anisotropy={16}
                  depthTest={true}
                  depthWrite={false}
                  polygonOffset={true}
                  polygonOffsetFactor={-10}
                />
              )
            ))}
            
          </mesh>
        )}
          
          <RenderDecalGuides onClickGuide={handleClickGuide} decals={decals} />
      </group>
      
      {/* Modal para FilePicker */}
      {isModalOpen && selectedDecalId && (
        <Html position={decalPositions[selectedArea]?.position}>
          <div className="modal-backdrop" style={{ position: "absolute" }}>
            <div className="modal-content">
              <button
                  className="absolute right-5 top-5"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedDecalId(null);
                  }}
                >
                <IoMdCloseCircle size={25} />
              </button>
              <h3 className="text-sm font-bold mb-4">
                Select a file for {selectedArea}
              </h3>
              <FormComponent
                  onSubmit={(data) => {
                    handleFileUpload(selectedArea, data.file);
                  }}
                  selectedArea={selectedArea}
                  decalId={selectedDecalId}
                  updateDecalImage={updateDecalImage}
              />
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

export default Shirt;