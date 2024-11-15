import React, { useState, useRef } from "react";

const UploadVideo = ({ setVideo , videoUrl }) => {
  const inputRef = useRef();
  const [source, setSource] = useState(videoUrl);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideo(file);
      const url = URL.createObjectURL(file);
      setSource(url);
    }
  };

  const handleChoose = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleRemove = () => {
    setSource(null);
    inputRef.current.value = "";
  };

 
  return (
    <div className="video-input">
      <input
        ref={inputRef}
        className="video-input__input"
        type="file"
        onChange={handleFileChange}
        accept=".mp4,.mov,.avi"
      />
      {!source && (
        <button className="video-input__choose-btn" onClick={handleChoose}>
          Choose Video
        </button>
      )}
      {source && (
        <div className="video-input__preview ">
          <video
            className="video-input__video"
            width="300"
            height="300"
            controls
            src={source}
          />
          <div className="flex justify-center items-center">
            <button className="video-input__remove-btn" onClick={handleRemove}>
              Remove
            </button>
            <button className="video-input__change-btn" onClick={handleChoose}>
              Change Video
            </button>
          </div>
        </div>
      )}
      <div className="video-input__footer">
        {source ? " " : "No video selected"}
      </div>
    </div>
  );
};

export default UploadVideo;
