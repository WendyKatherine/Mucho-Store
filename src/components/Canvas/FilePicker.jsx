import React from "react";
import CustomButton from "./CustomButton";

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="file-picker">
      <div className="flex-1 flex flex-col">
        <input
          key={file?.name || 'default-key'}
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file ? `File: ${file.name}` : `No file selected`}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="filled"
          title="Apply"
          handleClick={readFile}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
