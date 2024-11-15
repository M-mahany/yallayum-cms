import React from "react";

const ImageUpload = ({ handleImageChange, preview, previousImage }) => {
  const allow = preview || previousImage;
  const noPreiview = !preview && !previousImage;
  return (
    <>
      <div className="relative  w-full   flex items-center justify-center">
        <label
          title="Click to upload"
          htmlFor="button2"
          className="cursor-pointer flex items-center gap-4 px-6   before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
        >
          <div className="w-max relative">
            {allow && (
              <img
                className="max-w-[300px] w-full py-4"
                src={preview || previousImage}
                alt="Preview"
                width="512"
                height="512"
              />
            )}
            {noPreiview && (
              <img
                className="w-12 py-3"
                src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                alt="file upload icon"
                width="512"
                height="512"
              />
            )}
          </div>
          <div className="relative">
            <span className="block text-base py-3 font-semibold relative text-blue-900 group-hover:text-blue-500">
              {preview ? "upload another image" : "Upload an image"}
            </span>
          </div>
        </label>
        <input
          className="hidden"
          type="file"
          name="image"
          id="button2"
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};

export default ImageUpload;
