import React, { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import config from '@/config/index';

import {
  faCircleArrowLeft,
  faCircleArrowRight
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShopImage = ({ shop_images }) => {
  if (!shop_images || shop_images.length <= 0) {
    return null;
  }

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

  const shopImageLoader = useMemo(() => {
    const baseUrl = config.apiBaseUrl.substring(
      0,
      config.apiBaseUrl.length - 1
    );

    return () => baseUrl + shop_images[currentIndex].formats.small.url;
  }, [currentIndex]);

  return (
    <div ref={slideRef} className="relative mx-4 select-none ">
      <div className="flex justify-center p-4 aspect-w-16 aspect-h-9 ">
        <Image
          loader={shopImageLoader}
          src="shop_image.jpg"
          className="rounded-[15px]"
          alt="shop image"
          width={450}
          height={300}
          style={{ objectFit: 'cover', width: '450px', height: '300px' }}
        />
      </div>

      <div className="absolute flex items-center justify-between w-full px-5 transform -translate-y-1/2 top-1/2">
        <button onClick={handleOnPrevClick}>
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            // TODO: wait feedback from Wai
            // Without border
            // className="text-green-default drop-shadow-lg"
            // With border
            className="text-green-default border-2 rounded-xl border-brown-default bg-brown-default"
          />
        </button>
        <button onClick={handleOnNextClick}>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            // className="text-green-default drop-shadow-lg"
            className="text-green-default border-2 rounded-xl border-brown-default bg-brown-default"
          />
        </button>
      </div>
    </div>
  );
};

export default ShopImage;
