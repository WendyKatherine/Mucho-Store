const decalPositions = {
  cuello: {
    id: 1,
    name: 'Neck',
    position: [0, 0.04, 0.12],
    scale: [0.1, 0.1, 0.1], 
    dynamicScale: [1, 1, 1],
    rotation: [0, 0, 0],
    side: 'front',
  },
  mangaIzquierda: {
    id: 2,
    name: 'Left sleeve',
    position: [-0.21, 0.04, 0.01],
    scale: [0.07, 0.07, 0.07],
    dynamicScale: [1, 1, 1],
    rotation: [0, 0, 0],
    side: 'front',
  },
  mangaDerecha: {
    id: 3,
    name: 'Right sleeve',
    position: [0.21, 0.04, 0.02],
    scale: [0.07, 0.07, 0.07],
    dynamicScale: [1, 1, 1],
    rotation: [0, 0, 0],
    side: 'front',
  },
  espaldaAbajo: {
    id: 4,
    name: 'Low back',
    position: [0, 0.15, -0.11],
    scale: [0.1, 0.1, 0.1],
    dynamicScale: [1, 1, 1],
    rotation: [0, Math.PI, 0],
    side: 'back',
  },
  mangaIzquierdaAtras: {
    id: 5,
    name: 'Left Sleeve Back',
    position: [-0.21, 0.04, -0.07],
    scale: [0.05, 0.05, 0.05],
    dynamicScale: [1, 1, 1],
    rotation: [0, Math.PI, 0],
    side: 'back',
  },
};

export default decalPositions;
