'use client'
import React from 'react';
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '@/store/index';
import threejs from '../../../../../public/threejs.png';

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '@/config/motion';

import { CustomButton }  from '@/components/Canvas';


const HomeCanva = () => {
    const snap = useSnapshot(state);

    return (
        <>
            <div className='p-8'>
                <AnimatePresence>
                    {snap.intro && (
                        <motion.section className='home' {...slideAnimation('left')}>
                            <motion.header {...slideAnimation("down")}>
                                <Image src={ threejs } alt="logo" className='w-8 h-8 object-contain' />
                            </motion.header>
                            <motion.div className='home-content' {...headContentAnimation}>
                                <motion.div {...headTextAnimation}>
                                    <h1 className='text-[5rem] font-bold leading-normal'>
                                        LET&lsquo;S <br /> DO IT.
                                    </h1>
                                </motion.div>
                                <motion.div 
                                    {...headContainerAnimation}
                                    className="flex flex-col gap-5"
                                >
                                    <p className="max-w-md font-normal text-gray-600 text-base">
                                    Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
                                    </p>
                                    <CustomButton
                                        type="filled"
                                        title="Customize It"
                                        handleClick={() => state.intro = false}
                                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                                    />
                                </motion.div>
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>
            
        </>
    )
}

export default HomeCanva