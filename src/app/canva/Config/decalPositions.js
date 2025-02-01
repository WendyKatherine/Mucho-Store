const decalPositions = {
  cuello: {
    position: [0, 0.04, 0.12],
    scale: [0.1, 0.1, 0.1], // Escala inicial por defecto
    dynamicScale: [1, 1, 1], // Nueva escala dinámica que puede modificarse
    rotation: [0, 0, 0],
    side: 'front',
  },
  mangaIzquierda: {
    position: [-0.21, 0.04, 0.01],
    scale: [0.07, 0.07, 0.07],
    dynamicScale: [1, 1, 1],
    rotation: [0, 0, 0],
    side: 'front',
  },
  mangaDerecha: {
    position: [0.21, 0.04, 0.02],
    scale: [0.07, 0.07, 0.07],
    dynamicScale: [1, 1, 1],
    rotation: [0, 0, 0],
    side: 'front',
  },
  espaldaAbajo: {
    position: [0, 0.15, -0.12],
    scale: [0.1, 0.1, 0.1],
    dynamicScale: [1, 1, 1],
    rotation: [0, 0, 0],
    side: 'back',
  },
  mangaIzquierdaAtras: {
    position: [-0.21, 0.04, -0.8],
    scale: [0.05, 0.05, 0.05],
    dynamicScale: [1, 1, 1],
    rotation: [0, 0, 0],
    side: 'back',
  },
};

export default decalPositions;
