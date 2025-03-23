import React from 'react';

const TagReviews = ({ reviewTags, handleTagClicked }) => {
  const checkValue = (e) => {
    handleTagClicked(parseInt(e.target.value), e.target.checked);
  };

  return (
    <ul className="reviewTag-list flex flex-row flex-wrap">
      {reviewTags.map((tag, index) => {
        return (
          <div
            key={index}
            className={`mr-3 mt-3 px-1 border-[1px] border-primary-content rounded ${
              tag.selected ? 'text-brown-mid' : 'text-brown-light'
            } text-base font-kanit font-normal flex flex-row flex-wrap`}
          >
            <button value={tag.id} checked={tag.selected} onClick={checkValue}>
              {tag.name}
            </button>
          </div>
        );
      })}
    </ul>
  );
};

export default TagReviews;
