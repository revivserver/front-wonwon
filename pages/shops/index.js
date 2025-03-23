import { useState, useEffect } from 'react';
import shopService from '@/services/shop';
import repairTagService from '@/services/repairTag';
import SearchBox from '@/components/SearchBox';
import OpeTimeList from '@/components/list/OpeTimeList';
import PageLayout from '@/components/PageLayout';
import LinkFooter from '@/components/LinkFooter';

import TagSelect from '@/components/TagSelect';
// import MapList from '@/components/MapList';
import { useGeolocated } from 'react-geolocated';
import { getDistance } from 'geolib';
import StarRating from '@/components/review/StarRating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const ReviewSummary = ({ reviews }) => {
  const reviewScores = reviews.map((review) => {
    return review.score;
  });
  const numReviewers = reviews.length;

  const averageScore =
    numReviewers !== 0
      ? reviewScores.reduce((a, b) => a + b) / numReviewers
      : 0;

  const getReviewerNumberText = (numReviewers) => {
    if (numReviewers > 100) return '100+ รีวิว';
    else if (numReviewers > 50) return '50+ รีวิว';
    else if (numReviewers > 10) return '10+ รีวิว';

    return `${numReviewers} รีวิว`;
  };
  return (
    <div className="flex items-center">
      <StarRating rating={averageScore} setRating={() => {}} />
      <div className="ml-4"> {getReviewerNumberText(numReviewers)}</div>
    </div>
  );
};

const ShopsPage = ({ shops, repairTags }) => {
  const [searchTags, setSearchTags] = useState([]);

  const [inputText, changeInputText] = useState('');
  const [tempShops, setTempShops] = useState(shops);

  const [isLoading, setIsLoading] = useState(false);
  const getSearchData = async () => {
    setIsLoading(true);
    const searchResp = shopService.GetShopsBySearch(inputText, searchTags);
    const searchShops = await searchResp;
    searchShops.sort((a, b) =>
      calculateDistance(a.latitude, a.longitude) >
      calculateDistance(b.latitude, b.longitude)
        ? 1
        : -1
    );
    setIsLoading(false);

    setTempShops(searchShops);
  };

  useEffect(() => {
    getSearchData();
  }, [searchTags]);

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  });

  const currentLoacaiton = () => {
    if (coords) return coords;
    // Fix data for testing (@BTS Phyathai)
    return { latitude: 13.793017268140483, longitude: 100.54925081035572 };
  };

  const calculateDistance = (lat, lng) => {
    const diffDistance =
      getDistance(
        {
          latitude: currentLoacaiton().latitude,
          longitude: currentLoacaiton().longitude
        },
        { latitude: lat, longitude: lng }
      ) / 1000;
    return diffDistance;
  };

  return (
    <PageLayout>
      <div className="w-full p-4 ">
        <SearchBox
          searchText={inputText}
          updateSearch={changeInputText}
          onSearch={getSearchData}
        />
        <TagSelect
          repairTags={repairTags}
          handleTagsChange={(searchTagIds) => {
            setSearchTags(searchTagIds);
          }}
          search={() => {
            getSearchData();
          }}
        />
        {/* <MapList initialLocation={currentLoacaiton()} shops={tempShops} /> */}
        {isLoading ? (
          <div className="w-full h-96 flex justify-center text-8xl pt-20">
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
          </div>
        ) : (
          <>
            <div className="mt-6 mb-3 text-xs font-medium text-brick font-kanit">
              ผลการค้นหา {tempShops.length} ร้านซ่อม
            </div>
            {tempShops ? (
              <div className="space-y-2 flex-column">
                {tempShops.map((shop) => {
                  const id = shop.documentId;
                  const url = `/shops/${id}`;
                  const distance = calculateDistance(
                    shop.latitude,
                    shop.longitude
                  );
                  const opeTime = OpeTimeList(shop.shop_operating_times);
                  let OpeFlag = opeTime.includes('เปิดอยู่');
                  return (
                    <div
                      key={id}
                      className="p-4 drop-shadow-md bg-butter-light rounded-3xl grow"
                    >
                      <a href={url}>
                        <div
                          className={`text-xl ${
                            OpeFlag ? 'text-brick' : 'text-brown-light'
                          } font-medium font-kanit`}
                        >
                          {shop.name}
                        </div>
                        <div
                          className={`text-xs ${
                            OpeFlag ? 'text-brown-mid' : 'text-brown-light'
                          } font-thin font-kanit`}
                        >
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="mr-2"
                          />
                          ห่างจากฉัน {distance} กม
                        </div>
                        <div
                          className={`text-base ${
                            OpeFlag ? 'text-brown-default' : 'text-brown-light'
                          } font-normal font-kanit`}
                        >
                          <div>
                            {shop.address_detail} {shop.sub_district}{' '}
                            {shop.district}
                          </div>
                        </div>
                        {opeTime ? (
                          <div
                            className={`text-base ${
                              OpeFlag
                                ? 'text-brown-default'
                                : 'text-brown-light'
                            } font-normal font-kanit`}
                          >
                            <FontAwesomeIcon icon={faClock} className="mr-2" />
                            <span>{opeTime}</span>
                          </div>
                        ) : null}

                        <div
                          className={`text-xs ${
                            OpeFlag ? 'text-brick' : 'text-brown-light'
                          } font-light font-kanit`}
                        >
                          {shop.reviews ? (
                            <ReviewSummary reviews={shop.reviews} />
                          ) : null}
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </>
        )}

        <LinkFooter />
      </div>
    </PageLayout>
  );
};

ShopsPage.getInitialProps = async () => {
  // const shopResp = shopService.getAllShops();
  // const repairResp = repairTagService.getAllRepairTag();
  // const [shops, repairTags] = await Promise.all([shopResp, repairResp]);
  // return { shops, repairTags };

  const repairResp = repairTagService.getAllRepairTag();
  const [repairTags] = await Promise.all([repairResp]);
  const shops = [];
  return { shops, repairTags };
};

export default ShopsPage;
