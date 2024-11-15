import React from "react";
import { InfinitySpin, LineWave, MutatingDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className=" flex justify-center items-center w-full h-[50vh]">
      <InfinitySpin
        visible={true}
        width="200"
        color="#164A8C"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
