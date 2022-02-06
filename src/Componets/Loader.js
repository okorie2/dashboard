import React from "react";
import { RevolvingDot } from "react-loader-spinner";

function Loader(props) {
  return (
    <div className="loader">
      <RevolvingDot type="TailSpin" color="black" height={100} width={100} />
    </div>
  );
}

export default Loader;
