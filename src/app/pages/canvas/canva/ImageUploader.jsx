import React from 'react';

const ImageUploader = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      onUpload(fileURL); // Llama a la función para añadir el decal
    }
  };

  return (
    <div>
    <h4>File</h4>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUploader;
