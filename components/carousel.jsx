import React, { useState, useEffect } from "react";

const Carousel = ({ images, direction }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex + (direction === "left" ? -1 : 1);
        if (nextIndex < 0) {
          return images.length - 1;
        } else if (nextIndex >= images.length) {
          return 0;
        } else {
          return nextIndex;
        }
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, [images, direction]);

  const renderItems = () => {
    return images.map((image, index) => (
      <a href={image} key={index} target="_blank" rel="noopener noreferrer">
        <div
          style={{
            backgroundImage: `url(${image})`,
            height: "300px",
            maxWidth: "400px",
            width: "100%",
            backgroundSize: "cover",
            borderRadius: "25px",
            backgroundPosition: "center",
            display: "inline-block",
            margin: "0 10px",
            transform: `translateX(${
              direction === "left" ? activeIndex * 410 : -activeIndex * 410
            }px)`,
            transition: "transform 1s ease-in-out",
          }}
        />
      </a>
    ));
  };

  return <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{renderItems()}</div>;
};

export default Carousel;
