import React from 'react';
import { CirclePicker } from 'react-color';
import { useSnapshot } from 'valtio';

import state from '@/store/index';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div>
      <CirclePicker
        color={snap.color}
        width="252px" // Ancho total del picker
        circleSize={40} // Tamaño de los círculos
        circleSpacing={10} // Espaciado entre círculos
        colors={[
          '#ccc',
          '#EFBD4E',
          '#80C670',
          '#726DE8',
          '#353934',
          '#ff8a65',
          '#7098DA',
          '#c19277',
          '#FF96AD',
        ]} // Colores personalizados
        onChange={(color) => (state.color = color.hex)} // Actualizar el color en el estado
      />
    </div>
  );
};

export default ColorPicker;
