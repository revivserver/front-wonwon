import Image from "next/image";
import moment from 'moment';

const Review = ({ review }) => {
  const reviewInfo = review.attributes;
  const createDate = moment(reviewInfo.createdAt);

  const daysDiff = moment().diff(createDate, 'days');
  let presenteCreateDate = null;
  if (daysDiff < 90) {
    presenteCreateDate = createDate.fromNow();
  } else {
    presenteCreateDate = createDate.format('ll');
  }

  const images = reviewInfo.images ? reviewInfo.images.data : null;
  const reviewTags = reviewInfo.review_tag_links
    ? reviewInfo.review_tag_links.data.map((tagLinks) => {
        return tagLinks.attributes.review_tag.data.attributes;
      })
    : null;
  return (
    <div className="review">
      <p className="text-base font-normal text-brown-default font-kanit">
        Username {reviewInfo.username}
      </p>
      {presenteCreateDate ? (
        <p className="text-xs font-medium text-secondary-content text-brown-mid font-kanit">
          {presenteCreateDate}
        </p>
      ) : null}

      {images ? (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: 'auto',
            flexWrap: 'wrap'
            // overflow: 'auto',
            // flexWrap: 'nowrap'
          }}
        >
          {images.map((image, index) => {
            return (
              <div
                key={index}
                style={{
                  // flex: '0 0 auto',
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                  marginRight: '5px',
                  marginBottom: '5px'
                }}
              >
                <Image
                  key={index}
                  alt="/"
                  src={image.attributes.url}
                  layout="fill"
                />
              </div>
            );
          })}
        </div>
      ) : null}
      {reviewTags ? (
        <div className="flex flex-row flex-wrap">
          {reviewTags.map((tag, index) => {
            return (
              <p
                className="mr-3 mt-3 p-1 border-[1px] border-primary-content rounded text-brown-mid text-base font-kanit font-normal"
                key={index}
              >
                {tag.name}
              </p>
            );
          })}
        </div>
      ) : null}
      <p className="text-base font-normal text-normal text-brown-default font-kanit">
        {reviewInfo.review}
      </p>
    </div>
  );
};
export default Review;
