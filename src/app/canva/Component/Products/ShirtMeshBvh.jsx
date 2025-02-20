import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import state from '@/store/index';
import FilePicker from "@/components/Canvas/FilePicker";
import * as THREE from "three";

const ShirtMeshBvh = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF("/shirt_baked.glb");
    const shirtMeshRef = useRef();
    const { TextureLoader } = THREE;

    // Estado para manejar los parches con imágenes diferentes
    const [patches, setPatches] = useState([
        { id: 1, position: [-0.15, 0.1, 0.2], rotation: [0, 0, 0], scale: 0.1, fileUrl: "/up2.png" },
        { id: 2, position: [0, 0.1, 0.2], rotation: [0, 0, 0], scale: 0.09, fileUrl: "/threejs.png" },
    ]);

    // Cargar texturas de forma reactiva usando useLoader
    const textures = patches.map((patch) => useLoader(TextureLoader, patch.fileUrl));

    // Función para actualizar la imagen del parche
    const handleFileUpload = (id, file) => {
        if (file) {
            const url = URL.createObjectURL(file);
            setPatches((prev) =>
                prev.map((patch) =>
                    patch.id === id ? { ...patch, fileUrl: url } : patch
                )
            );
        }
        console.log(`File uploaded for patch ${id}:`, file);
    };

    useFrame((index, delta) => {
        if (materials.lambert1) {
            easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
        }
    });

    const stateString = JSON.stringify(snap);

    return (
        <>
            <group key={stateString} ref={shirtMeshRef}>
                {/* Modelo 3D de la camiseta */}
                {nodes?.T_Shirt_male?.geometry && (
                    <mesh ref={shirtMeshRef} geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} />
                )}

                {/* Renderizar parches en ubicaciones específicas */}
                {patches.map((patch, index) => (
                    <mesh 
                        key={patch.id}
                        position={patch.position}
                        rotation={patch.rotation}
                    >
                        <planeGeometry args={[patch.scale, patch.scale]} />
                        {textures[index] && (
                            <meshStandardMaterial map={textures[index]} transparent={true} />
                        )}
                    </mesh>
                ))}
            </group>

            {/* Interfaz de carga de archivos */}
            {patches.map((patch) => (
                <Html key={patch.id} position={patch.position}>
                    <div className="modal-backdrop" style={{ position: "absolute" }}>
                        <FilePicker key={patch.id} file={null} setFile={(file) => handleFileUpload(patch.id, file)} />
                    </div>
                </Html>
            ))}
        </>
    );
};

export default ShirtMeshBvh;