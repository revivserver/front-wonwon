import React, { useState, useRef } from 'react';
import Image from "next/image";

import {
  faCircleArrowLeft,
  faCircleArrowRight
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShopImage = ({ shop_images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const handleOnNextClick = () => {
    const count = (currentIndex + 1) % shop_images.length;
    setCurrentIndex(count);
    slideRef.current.classList.add('fade-anim');
  };
  const handleOnPrevClick = () => {
    const imagesLength = shop_images.length;
    const count = (currentIndex + imagesLength - 1) % imagesLength;
    setCurrentIndex(count);
    slideRef.current.classList.add('fade-anim');
  };
  if (!shop_images || shop_images.length <= 0) {
    return null;
  }
  return (
    <div ref={slideRef} className="relative mx-4 select-none ">
      <div className="flex justify-center p-4 aspect-w-16 aspect-h-9 ">
        <Image
          src={shop_images[currentIndex].attributes.url}
          className="rounded-[15px]"
          alt="shop image"
          width={450}
          height={300}
          style={{objectFit: "cover", width: '450px', height: '300px'}}
        />
      </div>

      <div className="absolute flex items-center justify-between w-full px-5 transform -translate-y-1/2 top-1/2">
        <button
          className="p-1 text-white transition bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-100"
          onClick={handleOnPrevClick}
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </button>
        <button
          className="p-1 text-white transition bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-100"
          onClick={handleOnNextClick}
        >
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ShopImage;
