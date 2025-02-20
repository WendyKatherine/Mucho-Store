'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '@/store/index';
import { Canvas } from '@react-three/fiber';
import { extend } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';

import Shirt from './Products/Shirt';
import CameraRig from './UI/CameraRig';
import Backdrop from './UI/Backdrop';
import { CustomButton } from '@/components/Canvas';

import { BsArrowLeft, BsArrowRight, BsArrowUp, BsArrowDown } from "react-icons/bs";
import { slideAnimation } from '@/config/motion';
import useDecalManager from '@/app/canva/hooks/useDecalManager';
//import ShirtTexture from '@/app/canva/Component/Products/ShirtTexture';
//import ShirtMeshBvh from './Products/ShirtMeshBvh';

import { Html } from '@react-three/drei';

extend({  });

const CanvaLayout = () => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const snap = useSnapshot(state);
    const { decals, addDecal, updateDecalImage } = useDecalManager();

    // Funciones para rotar el modelo
    const rotateLeft = () => setRotation((prev) => ({ ...prev, y: prev.y - Math.PI / 2 }));
    const rotateRight = () => setRotation((prev) => ({ ...prev, y: prev.y + Math.PI / 2 }));
    const rotateUp = () => setRotation((prev) => ({ ...prev, x: prev.x - Math.PI / 2 }));
    const rotateDown = () => setRotation((prev) => ({ ...prev, x: prev.x + Math.PI / 2 }));

    return (
        <div className='h-[700px] w-[700px] z-50'>
            <Canvas
                shadows
                camera={{ position: [0, 0, 0], fov: 20 }}
                gl={{ preserveDrawingBuffer: true }}
                className='w-full max-w-full h-full transition-all ease-in'
            >
                <ambientLight intensity={0.5} />
                <Environment preset='city' />
                <CameraRig >
                    <Backdrop />
                    <Center>
                        <Shirt rotation={rotation} />
                    </Center>
                </CameraRig>
            </Canvas>
            <AnimatePresence>
                    <motion.div
                        key="custom"
                        {...slideAnimation('up')}
                    >
                    <div className='canva-control px-10'>
                        <CustomButton type="filled" title="Rotate Left" handleClick={rotateLeft}>
                            <BsArrowLeft size={24}/>
                        </CustomButton>
                        <CustomButton type="filled" title="Rotate Up" handleClick={rotateUp}>
                            <BsArrowUp size={24} />
                        </CustomButton>
                        <CustomButton type="filled" title="Rotate Down" handleClick={rotateDown}>
                            <BsArrowDown size={24} />
                        </CustomButton>
                        <CustomButton type="filled" title="Rotate Right" handleClick={rotateRight}>
                            <BsArrowRight size={24} />
                        </CustomButton>
                    </div>

                    </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default CanvaLayout