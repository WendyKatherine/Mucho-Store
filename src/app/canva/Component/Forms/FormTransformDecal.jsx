import React from 'react'

const FormTransformDecal = () => {

    const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
    const [rotationDecal, setRotationDecal] = useState(0);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const handleSaveChanges = () => {
        const newWidth = Math.min(Math.max(imageSize.width / 100, 0), 1); // Escala máxima limitada a 1
        const newHeight = newWidth;
        const newRotation = Math.min(Math.max(rotationDecal, -90), 90);
      
        const scale = [newWidth, newHeight, 1];
        const rotation = [0, 0, THREE.MathUtils.degToRad(newRotation)];
      
        if (decalId) {
          onSubmit({ scale, rotation, decalId });
        } else {
          console.error("Falta decalId para guardar los cambios");
        }
      };

  return (
    <div>
        <div>
          <h3 className="text-sm font-bold mb-4">Step 2: Configure Image</h3>
          <div className="flex items-center mb-4">
          <label className="text-xs font-bold mr-2">Width:</label>
          <input
            type="range"
            min={0.1} // Escala mínima (10%)
            max={1} // Escala máxima (100%)
            step={0.01} // Incremento del slider
            value={imageSize.width / 100} // Normalizamos el valor al rango 0-1
            onChange={(e) => {
              const newWidth = Math.min(Math.max(parseFloat(e.target.value), 0.1), 1); // Limitar entre 10% y 100%
              const newHeight = newWidth; // Mantener proporción

              setImageSize({ width: newWidth * 100, height: newHeight * 100 }); // Escala vuelve al rango 0-100

              if (decalId) {
                onSubmit({
                  scale: [newWidth, newHeight, 1], // Escala normalizada
                  rotation: [0, 0, THREE.MathUtils.degToRad(rotationDecal)], // Mantén la rotación actual
                  decalId,
                });
              }
            }}
            className="w-full"
          />
          <span className="ml-2">{(imageSize.width / 100).toFixed(2)} (escala)</span>
        </div>

          {/* Controles de rotación */}
          <div className="flex items-center mb-4">
            <label className="text-xs font-bold mr-2">Rotation:</label>
            <input
              type="range"
              min={-90} // Rotación mínima (-90°)
              max={90} // Rotación máxima (90°)
              value={rotationDecal}
              onChange={(e) => {
                const newRotation = Math.min(Math.max(parseInt(e.target.value), -90), 90); // Limitar entre -90 y 90
                setRotationDecal(newRotation);

                if (decalId) {
                  onSubmit({
                    scale: [imageSize.width / 100, imageSize.height / 100, 1],
                    rotation: [0, 0, THREE.MathUtils.degToRad(newRotation)], // Asegura que sea un array con 3 valores
                    decalId,
                  });
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
                // onSubmit({ file, imageSize, rotationDecal });
                handleSaveChanges()
                setCurrentStep(3); // Avanzar al siguiente paso si todo está bien.
              } else {
                console.error('Valores faltantes o incorrectos');
              }
            }}
          >
            Save Changes
          </button>
        </div>
    </div>
    
  )
}

export default FormTransformDecal