import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import useDecalManager from '../../hooks/useDecalManager';
import state from '@/store/index';
import decalPositions from '@/app/canva/Config/decalPositions';

const ControlPanel = ({ onSubmit, data = [], decalId }) => {
  const snap = useSnapshot(state);
  const { decals, addDecal, updateDecalImage } = useDecalManager();
  const [selectedDecal, setSelectedDecal] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = (decalId) => {
    if (!file || !(file instanceof Blob)) {
      console.error("Archivo inválido, no se puede subir:", file);
      return;
    }
    state.setFile(decalId, file);  // 📌 Guardamos el archivo en el estado global
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-lg">
      <h2 className="text-lg font-bold mb-4">Selected features</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-1 py-1">Patch Name</th>
            <th className="border border-gray-300 px-1 py-1">Ubication</th>
            <th className="border border-gray-300 px-1 py-1">File name</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(decalPositions).map(([key, decal]) => (
            <tr key={key}>
              <td className="border border-gray-300 px-2 py-1">{decal.name}</td>
              <td className="border border-gray-300 px-2 py-1">{decal.side}</td>
              <td className="border border-gray-300 px-2 py-1">
                  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ControlPanel;