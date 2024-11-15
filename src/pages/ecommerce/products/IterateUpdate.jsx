import React, { useState, useEffect } from "react";

const IterateUpdate = ({ heading, isSingle = false, initialImages = [], onImagesChange }) => {
  const [images, setImages] = useState(initialImages);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    // Update image previews whenever images change
    updateImagePreviews();
  }, [images]);

  const updateImagePreviews = () => {
    const previews = images.map((image) => {
      // Generate preview URLs using URL.createObjectURL
      if (typeof image === "string") {
        return image; // if image is already a URL, use it as is
      } else if (image instanceof File) {
        return URL.createObjectURL(image); // if image is a File object, create URL
      }
      return null;
    }).filter(url => url !== null);

    setImagePreviews(previews);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (isSingle && files.length > 1) {
      console.log("You can upload only one image.");
      return; // handle single image constraint
    }

    // Update images state with new files
    const updatedImages = isSingle ? [files[0]] : [...images, ...files];
    setImages(updatedImages);

    // Update image previews with newly uploaded file URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prevPreviews => [...prevPreviews, ...urls]);

    // Pass updated images to parent component via callback
    if (typeof onImagesChange === "function") {
      onImagesChange(updatedImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  
    // Pass updated images to parent component via callback
    if (typeof onImagesChange === "function") {
      onImagesChange(newImages);
    }
  };
  

  return (
    <div className="container">
      <h1 className="mb-3 text-lg">{heading}</h1>
      <div className="form-group multi-preview">
        <div className="grid grid-cols-1 sm:grid-cols-4">
          {imagePreviews.map((url, index) => (
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

          {!isSingle || (isSingle && imagePreviews.length === 0) ? (
            <div className="col-md-2">
              <div className="form-group">
                <div className="upload-btn-wrapper flex justify-center items-center">
                  <button className="image-btn !text-4xl"> + </button>
                  <input
                    type="file"
                    name="myfile"
                    onChange={handleImageChange}
                    multiple={!isSingle}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default IterateUpdate;
