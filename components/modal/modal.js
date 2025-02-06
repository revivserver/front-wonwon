import React, { useState, useEffect } from 'react';
import Image from "next/image";
import StarRating from '@/components/review/StarRating';
import TextInput from '@/components/review/TextInput';
import TagReviews from '@/components/review/TagReviews';

import ReviewService from '@/services/review';
import { useRouter } from 'next/router';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({ shopId, reviewTags, setModal }) => {
  useEffect(() => {
    const elements = document.querySelectorAll('span.star');
    elements.forEach((star) => {
      star.style.fontSize = '40px';
    });
    return () => {
      elements.forEach((star) => {
        star.style.fontSize = '16px';
      });
    };
  }, []);

  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [username, setName] = useState('');

  const [checkedReviewTags, setCsheckedReviewTags] = useState(
    reviewTags.map((tag) => {
      return { ...tag, selected: false };
    })
  );

  const [createObjectURLs, setCreateObjectURLs] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0].name.split('.')[0];

      setUploadedFileNames([...uploadedFileNames, fileName]);
      setCreateObjectURLs([
        ...createObjectURLs,
        URL.createObjectURL(event.target.files[0])
      ]);
    }
  };

  const handleTagClicked = (tagId, checked) => {
    if (checked == false) {
      checked = true;
    } else {
      checked = false;
    }
    const updated = checkedReviewTags.map((tag) => {
      if (tagId === tag.id) {
        return { ...tag, selected: checked };
      }
      return { ...tag };
    });
    setCsheckedReviewTags(updated);
  };

  const onReview = () => {
    setModal(true);
  };

  const resetState = () => {
    setRating(0);
    setReview('');
    setName('');

    const resetTags = reviewTags.map((tag) => {
      return { ...tag, selected: false };
    });
    setCsheckedReviewTags(resetTags);

    router.reload(window.location.pathname);
  };

  const onSubmit = async () => {
    let fileId = [];
    if (createObjectURLs.length > 0) {
      const myBlobs = await Promise.all(
        createObjectURLs.map(async (createObjectURL) => {
          const myImage = await fetch(createObjectURL);
          return await myImage.blob();
        })
      );

      const formData = new FormData();
      myBlobs.forEach((myBlob, index) => {
        formData.append('files', myBlob, uploadedFileNames[index]);
      });

      formData.append('ref', 'api::review.review');
      formData.append('field', 'images');
      const data = await ReviewService.UploadImageFiles(formData);
      fileId = data.map((d) => d.id);
    }

    const result = await ReviewService.CreateReview({
      data: {
        images: fileId,
        shop: shopId,
        review,
        username,
        score: rating,
        tags: checkedReviewTags
          .filter((tag) => tag.selected)
          .map((tag) => tag.id)
      }
    });

    setModal(false);
    resetState();
  };

  const onCancel = () => {
    setModal(false);
  };

  return <>
    <div
      className="relative z-10 w-full"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 transition-opacity bg-opacity-75 backdrop-blur-lg"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-full">
          <div className="relative overflow-hidden text-left bg-butter-default rounded-t-[24px] shadow-md w-full">
            <div className="px-5 pt-8">
              <div className="flex">
                <h3
                  className="text-xs font-medium leading-6 font-kanit text-brown-mid"
                  id="modal-title"
                >
                  ให้คะแนนและรีวิวร้านนี้
                </h3>
                <div className="grow"></div>
                <FontAwesomeIcon
                  icon={faXmark}
                  size="xl"
                  onClick={onCancel}
                  className="flex cursor-pointer"
                />
              </div>
              <div className="divide-y divide-dashed divide-butter-dark">
                <div className="pb-4 mt-2 text-base font-medium text-brown-default font-kanit">
                  พอใจแค่ไหน ถูกใจเรื่องอะไรบ้าง
                  <div className="mt-2">
                    <StarRating rating={rating} setRating={setRating} />
                  </div>
                  <div className="mt-1">
                    <TagReviews
                      reviewTags={checkedReviewTags}
                      handleTagClicked={handleTagClicked}
                    />
                  </div>
                </div>
                <div className="font-medium x-5 text-brown-mid font-kanit">
                  <TextInput
                    title="ร้านนี้บริการเป็นไง เล่าให้ทุกคนฟังหน่อย"
                    placeholder="เขียนรีวิวให้ร้านนี้"
                    review={review}
                    setReview={setReview}
                  />
                  <TextInput
                    title="ชื่อของคุณ"
                    placeholder="ใส่ชื่อของคุณ"
                    review={username}
                    setReview={setName}
                  />
                </div>
              </div>
              <div>
                {createObjectURLs.map((createObjectURL, index) => {
                  return (
                    <Image
                      key={index}
                      loader={() => createObjectURL}
                      src={uploadedFileNames[index]}
                      alt="Picture of the author"
                      width={100}
                      height={100}
                      style={{
                        maxWidth: "100%",
                        height: "auto"
                      }} />
                  );
                })}
                <div className="pb-3 text-xs font-medium font-kanit text-brown-mid">
                  เพิ่มรูป
                </div>
                <input
                  type="file"
                  name="myImage"
                  onChange={uploadToClient}
                />
              </div>
            </div>
            <div className="flex justify-center w-full px-3 pt-4 pb-8">
              <button
                type="button"
                onClick={onSubmit}
                className="h-12 text-base font-normal rounded-full w-80 btn btn-primary bg-green-default text-brown-default font-kanit"
              >
                ส่งรีวิว
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default Modal;
