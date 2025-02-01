import React, { useState } from 'react'
import Image from 'next/image';
import * as THREE from 'three';

import { FilePicker } from '@/components/Canvas';
import decalPositions from '@/app/canva/Config/decalPositions';
import techniques from '@/app/canva/Config/techniques';

import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const FormComponent = ({ onSubmit, selectedArea }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [file, setFile] = useState(null);
    
    const [technique, setTechnique] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);


    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = () => {
        if (file) {
            onSubmit({ file });
        }
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
      {/* Paso de tecnica */}
      {currentStep === 2 && (
        <div>
        <div>
          <h3 className="text-sm font-bold mb-4">Step 2: Choose technique</h3>
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
      {currentStep === 3 && (
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