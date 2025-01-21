import React from 'react'
import { useSnapshot } from 'valtio';

import state from '@/store/index.js';
import { getContrastingColor } from '@/config/helpers';

const CustomButton = ({type, title, customStyles, handleClick, children  }) => {
    const snap = useSnapshot(state);

    const generateStyle = (type) => {
        if(type === 'filled') {
            return{
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if(type === "outline") {
            return {
              borderWidth: '1px',
              borderColor: snap.color,
              color: snap.color
            }
        }
    }
  
    return (
        <button
        className={`px-2 py-1.5 flex-1 rounded-md item-control ${customStyles}`}
        style={generateStyle(type)}
        onClick={handleClick}
        >
            {children}
            {title}
        </button>
  )
}

export default CustomButton