import React, { useEffect, useState } from "react";

const GeneralImageUpload = ({
  heading,
  image,
  setImage,
  name,
  errors,
  register,
  defaultImage,
  setValue,
}) => {
  const [singleFile, setSingleFile] = useState(null);

  useEffect(() => {
    if (image) {
      const url =
        typeof image === "string" ? image : URL.createObjectURL(image);
      setSingleFile(url);
    } else {
      setSingleFile(defaultImage);
    }
  }, [image, defaultImage]);

  const uploadSingleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setSingleFile(url);
      setValue(name, file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setSingleFile(null);
    setValue(name, null);
  };

  return (
    <>
      <div className="container">
        <h1 className="mb-3 text-lg">{heading}</h1>
        <div className="form-group multi-preview">
          <div className="grid grid-cols-1 sm:grid-cols-4">
            {singleFile && (
              <div className="w-full">
                <div className="img-block bg-gray relative">
                  <img className="img-fluid2" src={singleFile} alt="Preview" />
                  <span
                    className="remove_img absolute top-0 right-0 w-7 h-7 rounded-full text-white flex justify-center items-center cursor-pointer bg-themeBtn-0"
                    onClick={removeImage}
                  >
                    X
                  </span>
                </div>
              </div>
            )}

            {!singleFile && (
              <div className="col-md-2">
                <div className="form-group">
                  <div className="upload-btn-wrapper flex justify-center items-center">
                    <button className="image-btn !text-4xl"> + </button>
                    <input
                      type="file"
                      ref={register(name)}
                      name={name}
                      onChange={uploadSingleFile}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {errors && errors[name] && (
          <p className="text-tiny text-danger pl-3 mt-1">
            {errors[name].message}
          </p>
        )}
      </div>
    </>
  );
};

export default GeneralImageUpload;
