import React, { useEffect, useState } from "react";
import "./Box.css";
import EditBox from "./EditBox";
import ImageBox from "./ImageBox";
const Box = () => {
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [inversion, setInversion] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [filterName, setFilterName] = useState("Brightness");
  const [rotate, setRotate] = useState(0);
  const [flipSide, setFlipSide] = useState(1);
  const [flipUp, setFlipUp] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState("./image-placeholder.svg");

  const [isDownloading, setIsDownloading] = useState(false);
  useEffect(() => {
    if (selectedImage !== null) {
      setImageSrc(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const onRest = () => {
    console.log("Reset clicked");
    setBrightness(100);
    setSaturation(100);
    setInversion(0);
    setGrayscale(0);
    document.querySelector(".active").classList.remove("active");
    document.querySelector(".filterBtn").classList.add("active");
    setFilterName("Brightness");
    setRotate(0);
    setFlipSide(1);
    setFlipUp(1);
  };

  const onChooseImg = () => {
    document.getElementById("imageUpload").click();
    onRest();
  };

  const onSaveImg = () => {
    setIsDownloading(true);

    const previewImg = document.querySelector(".displayImage");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    console.log(previewImg.naturalHeight);
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
      ctx.rotate((rotate * Math.PI) / 180);
    }
    ctx.scale(flipSide, flipUp);

    ctx.drawImage(
      previewImg,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <>
      {selectedImage == null ? <div className="overlay"></div> : null}
      <div className="box">
        <div className="container">
          <h1>Easy Image Editor</h1>
          <div className="editor">
            <EditBox
              setFilterName={setFilterName}
              filterName={filterName}
              setGrayscale={setGrayscale}
              grayscale={grayscale}
              setInversion={setInversion}
              inversion={inversion}
              saturation={saturation}
              setSaturation={setSaturation}
              setBrightness={setBrightness}
              brightness={brightness}
              rotate={rotate}
              setRotate={setRotate}
              flipUp={flipUp}
              setFlipUp={setFlipUp}
              flipSide={flipSide}
              setFlipSide={setFlipSide}
              selectedImage={selectedImage}
            />
            <ImageBox
              brightness={brightness}
              saturation={saturation}
              inversion={inversion}
              grayscale={grayscale}
              rotate={rotate}
              setRotate={setRotate}
              flipSide={flipSide}
              flipUp={flipUp}
              imageSrc={imageSrc}
            />
          </div>
          <div className="buttons">
            <div className="resetBtn btn" onClick={() => onRest()}>
              Reset Filters
            </div>
            <div className="groupBtn">
              <input
                type="file"
                name="filename"
                id="imageUpload"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                hidden
              />
              <div className="btn chooseImg" onClick={onChooseImg}>
                Choose Image
              </div>
              <div className="btn saveImg" onClick={onSaveImg}>
                {isDownloading ? "Downloading..." : "Save Image"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Box;
