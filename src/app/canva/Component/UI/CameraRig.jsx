import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "@/store/index";

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Configurar posición inicial de la cámara
    let targetPosition = [0, 0, 2]; // Vista frontal
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // Posicionar la cámara en el eje X e Y, fija en Z
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
