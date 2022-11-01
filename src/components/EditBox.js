import React from "react";
import "./EditBox.css";

import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import {
  AiOutlineColumnWidth,
  AiOutlineVerticalAlignMiddle,
} from "react-icons/ai";

const EditBox = ({
  brightness,
  setBrightness,
  setSaturation,
  saturation,
  inversion,
  setInversion,
  grayscale,
  setGrayscale,
  filterName,
  setFilterName,
  rotate,
  setRotate,
  flipUp,
  flipSide,
  setFlipSide,
  setFlipUp,
}) => {
  const onFilterClick = (e) => {
    document.querySelector(".active").classList.remove("active");
    setFilterName(e.target.textContent);
    if (filterName === "Brightness") {
    }
    // setFilterValue(e.target.textContent);
    e.target.classList.add("active");
  };

  const onRotateImageLeft = (e) => {
    setRotate(rotate + 90);
  };
  const onRotateImageRight = (e) => {
    setRotate(rotate - 90);
  };
  const onImageFlip = (e) => {
    // setRotate(rotate - 90);
    if (flipSide === 1) {
      setFlipSide(-1);
    } else {
      setFlipSide(1);
    }
  };
  const onImageFlipUp = (e) => {
    if (flipUp === 1) {
      setFlipUp(-1);
    } else {
      setFlipUp(1);
    }
  };

  return (
    <div className="editBox">
      <h2>Filter</h2>
      <div className="filters">
        <div className="filterBtn active" onClick={onFilterClick}>
          Brightness
        </div>
        <div className="filterBtn" onClick={onFilterClick}>
          Saturation
        </div>
      </div>
      <div className="filters">
        <div className="filterBtn" aria-disabled onClick={onFilterClick}>
          Inversion
        </div>
        <div className="filterBtn" onClick={onFilterClick}>
          Grayscale
        </div>
      </div>
      <section className="controller">
        <div className="dataDisplay">
          <label htmlFor="">{filterName}</label>
          {filterName === "Brightness" ? <p>{brightness}</p> : null}
          {filterName === "Saturation" ? <p>{saturation}</p> : null}
          {filterName === "Inversion" ? <p>{inversion}</p> : null}
          {filterName === "Grayscale" ? <p>{grayscale}</p> : null}
        </div>
        {filterName === "Brightness" ? (
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
        ) : null}
        {filterName === "Saturation" ? (
          <input
            type="range"
            min="0"
            max="200"
            value={saturation}
            onChange={(e) => setSaturation(e.target.value)}
          />
        ) : null}
        {filterName === "Inversion" ? (
          <input
            type="range"
            min="0"
            max="100"
            value={inversion}
            onChange={(e) => setInversion(e.target.value)}
          />
        ) : null}
        {filterName === "Grayscale" ? (
          <input
            type="range"
            min="0"
            max="100"
            value={grayscale}
            onChange={(e) => setGrayscale(e.target.value)}
          />
        ) : null}
      </section>

      <section className="rotateFlip">
        <div onClick={onRotateImageLeft}>
          <BiRotateLeft />
        </div>
        <div onClick={onRotateImageRight}>
          <BiRotateRight />
        </div>
        <div onClick={onImageFlip}>
          <AiOutlineColumnWidth />
        </div>
        <div onClick={onImageFlipUp}>
          <AiOutlineVerticalAlignMiddle />
        </div>
      </section>
    </div>
  );
};

export default EditBox;
