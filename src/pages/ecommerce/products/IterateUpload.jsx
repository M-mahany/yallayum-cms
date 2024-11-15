import React, { useState, useEffect } from "react";

const IterateUpload = ({ heading, isSingle = false, images, setImages }) => {
  const [singleFile, setSingleFile] = useState([]);

  useEffect(() => {
    if (images && images.length > 0) {
      const urls = images.map((image) => URL.createObjectURL(image));
      setSingleFile(urls);
    }
  }, [images]);

  const uploadSingleFiles = (e) => {
    const files = Array.from(e.target.files);

    if (isSingle && images.length > 0) {
      alert("You can upload only one image.");
      return;
    }

    const updatedImages = [...images, ...files];
    setImages(updatedImages);

    const urls = files.map((file) => URL.createObjectURL(file));
    setSingleFile((prevFiles) => [...prevFiles, ...urls]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newFiles = [...singleFile];
    newFiles.splice(index, 1);
    setSingleFile(newFiles);
  };

  return (
    <>
      <form>
        <div className="container">
          <h1 className="mb-3 text-lg">{heading}</h1>
          <div className="form-group multi-preview">
            <div className="grid grid-cols-1 sm:grid-cols-4">
              {singleFile.map((url, index) => (
                <div key={index} className="w-full">
                  <div className="img-block bg-gray relative">
                    <img className="img-fluid2" src={url} alt={`Preview ${index}`} />
                    <span
                      className="remove_img absolute top-0 right-0 w-7 h-7 rounded-full text-white flex justify-center items-center cursor-pointer bg-themeBtn-0"
                      onClick={() => removeImage(index)}
                    >
                      X
                    </span>
                  </div>
                </div>
              ))}

              {!isSingle || (isSingle && singleFile.length === 0) ? (
                <div className="col-md-2">
                  <div className="form-group">
                    <div className="upload-btn-wrapper flex justify-center items-center">
                      <button className="image-btn !text-4xl"> + </button>
                      <input
                        type="file"
                        name="myfile"
                        onChange={uploadSingleFiles}
                        multiple
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default IterateUpload;