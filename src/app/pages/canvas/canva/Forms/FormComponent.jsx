import React, { useState } from 'react'
import Image from 'next/image';

import { FilePicker } from '@/components/Canvas';
import decalPositions from '@/app/pages/canvas/canva/Config/decalPositions';
import techniques from '@/app/pages/canvas/canva/Config/techniques';

import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const FormComponent = ({ onSubmit, selectedArea }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [file, setFile] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [technique, setTechnique] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
    const [rotationDecal, setRotationDecal] = useState(0);


    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const setSelectedTechnique = () => {
      onSubmit({idTecnique});
    }

    const handleSubmit = () => {
        if (file) {
            onSubmit({ file });
        }
    };

    const handleSaveChanges = () => {
      onSubmit({ file, imageSize, rotationDecal });
      setCurrentStep(3); // Si quieres avanzar al siguiente paso.
    };

  return (
    <div className="form-container">
      {/* Paso 1: Selección de Imagen */}
      {currentStep === 1 && (
        <div position={decalPositions[selectedArea]?.position || [0, 0, 0]}>
          <h3 className="text-xs font-bold mb-4">Step 1: Upload Image</h3>
            <FilePicker
                file={file}
                setFile={setFile}
                 readFile={handleSubmit}
            />
            <div className='wrap-next-button'>
              <button 
              className="next-button"
              onClick={nextStep}
              disabled={!file}
              >
                Next <MdNavigateNext size={15} />
              </button>
            </div>
        </div>
      )}
      {/* Paso de edición de imagen */}
      {currentStep === 2 && (
        <div>
          <h3 className="text-sm font-bold mb-4">Step 2: Configure Image</h3>
          
          {/* Controles de tamaño */}
          <div className="flex items-center mb-4">
            <label className="text-xs font-bold mr-2">Width:</label>
            <input
              type="range"
              min={50}
              max={100}
              value={imageSize.width||imageSize.height}
              onChange={(e) => {
                const newWidth = parseInt(e.target.value);
                const newHeight = parseInt(e.target.value);
                setImageSize((prev) => ({ ...prev, width: newWidth, height: newHeight }));
                onSubmit({ ...file, imageSize: { ...imageSize, width: newWidth, height: newHeight }, rotationDecal }); // Callback para reflejar cambios en tiempo real
              }}
            />
            <span className="ml-2">{imageSize.width}%</span>
          </div>
          {/* Controles de rotación */}
          <div className="flex items-center mb-4">
            <label className="text-xs font-bold mr-2">Rotation:</label>
            <input
              type="range"
              min={-180}
              max={180}
              value={rotationDecal}
              onChange={(e) => {
                const newRotation = parseInt(e.target.value);
                if (!isNaN(newRotation)) {
                  setRotationDecal(newRotation);
                  onSubmit({ ...file, imageSize, rotationDecal: newRotation });
                }
              }}
              className="w-full"
            />
            <span className="ml-2">{rotationDecal}°</span>
          </div>

          {/* Botón para guardar los cambios */}
          <button
            className="px-4 py-2 bg-blue-500 text-black rounded"
            onClick={() => {
              if (file && imageSize.width && imageSize.height) {
                console.log('Save Changes clicked');
                onSubmit({ file, imageSize, rotationDecal });
                setCurrentStep(3); // Avanzar al siguiente paso si todo está bien.
              } else {
                console.error('Valores faltantes o incorrectos');
              }
            }}
          >
            Save Changes
          </button>
        </div>
      )}
      {/* Paso 3: Choose technique */}
      {currentStep === 3 && (
        <div>
        <div>
          <h3 className="text-sm font-bold mb-4">Step 3: Choose technique</h3>
          <div className="grid grid-cols-2 gap-4">
            {techniques.map((technique) => (
              <label
                key={technique.idTecnique}
                htmlFor={technique.idTecnique}
                className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
                  selectedOption === technique.idTecnique ? 'border-blue-500' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  id={technique.idTecnique}
                  name="image-radio"
                  value={technique.nameTecnique}
                  className="hidden"
                  onChange={() => setSelectedOption(technique.idTecnique)}
                />
                <Image
                  src={technique.imageTecnique}
                  alt={technique.nameTecnique}
                  width={100}
                  height={100}
                  className="object-cover"
                />
                <div
                  className={`p-[5px] text-center text-xs ${
                    selectedOption === technique.idTecnique ? 'bg-blue-500 text-success' : 'bg-gray-200'
                  }`}
                >
                  {technique.nameTecnique}
                </div>
              </label>
            ))}
          </div>
          <div className="mt-4 flex flex-row flex-wrap justify-center items-center gap-5">
            <button className="px-4 py-2 next-button" onClick={prevStep}>
              <IoIosArrowBack size={10} /> Back
            </button>
            <button
              className="px-4 py-2 next-button"
              disabled={!selectedOption}
              onClick={nextStep}
            >
              Next <MdNavigateNext size={15} />
            </button>
          </div>
        </div>
      </div>
      
      )}

      {/* Paso 3: Selección de Técnica */}
      {currentStep === 4 && (
        <div>
          <h3 className="text-sm font-bold mb-4">Sumary</h3>
          
          <div className="mt-4 flex flex-row flex-wrap justify-center items-center">
            <button className="px-4 py-2 bg-gray-500 rounded mr-2" onClick={prevStep}>
              Atrás
            </button>
            <button className="px-4 py-2 bg-green-500 rounded" disabled={!technique} onClick={handleSubmit}>
              Finalizar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormComponent