import React from "react";
import "./ImageBox.css";

const ImageBox = ({
  brightness,
  saturation,
  inversion,
  grayscale,
  rotate,
  flipUp,
  flipSide,
  imageSrc,
}) => {
  console.log(imageSrc);
  return (
    <div className="imageBox">
      <div className="image">
        <img
          src={imageSrc}
          style={{
            filter: ` brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`,
            transform: `rotate(${rotate}deg) scaleX(${flipSide}) scaleY(${flipUp})`,
          }}
          className="displayImage"
          alt="not found"
        />
      </div>
    </div>
  );
};

export default ImageBox;
