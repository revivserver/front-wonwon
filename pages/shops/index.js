import { useState, useEffect } from 'react';
import shopService from '@/services/shop';
import repairTagService from '@/services/repairTag';
import SearchBox from '@/components/SearchBox';
import OpeTimeList from '@/components/list/OpeTimeList';
import PageLayout from '@/components/PageLayout';
import LinkFooter from '@/components/LinkFooter';

import TagSelect from '@/components/TagSelect';
import MapList from '@/components/MapList';
import { useGeolocated } from 'react-geolocated';
import { getDistance } from 'geolib';
import StarRating from '@/components/review/StarRating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const ReviewSummary = ({ reviews }) => {
  const reviewScores = reviews.data.map((review) => {
    return review.attributes.score;
  });
  const numReviewers = reviews.data.length;

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

  const getSearchData = async () => {
    const searchResp = shopService.GetShopsBySearch(inputText, searchTags);
    const searchShops = await searchResp;
    searchShops.sort((a, b) =>
      calculateDistance(a.attributes.latitude, a.attributes.longitude) >
      calculateDistance(b.attributes.latitude, b.attributes.longitude)
        ? 1
        : -1
    );

    setTempShops(searchShops);
  };

  useEffect(() => {
    getSearchData();
  }, [searchTags]);

  const [selectedDistance, setSelectedDistance] = useState(100);
  const handleDistanceChange = (event) => {
    setSelectedDistance(event.target.value);
  };

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
        <div className="flex no-wrap h-8 px-6 my-4 space-x-2 text-xs font-medium ">
          <TagSelect
            repairTags={repairTags}
            handleTagsChange={(searchTagIds) => {
              setSearchTags(searchTagIds);
            }}
            search={() => {
              getSearchData();
            }}
          />
        </div>
        <div className="flex h-8 px-6 my-4 space-x-2 text-xs font-medium ">
          <select
            value={selectedDistance}
            onChange={handleDistanceChange}
            className="text-center border-2 rounded-full cursor-pointer grow border-brown-light focus:border-brown-default text-brown-default bg-butter-default font-kanit"
          >
            <option value="100" className="bg-butter-default">
              ห่างจากฉัน
            </option>
            <option value="2" className=" bg-butter-default">
              2 กม
            </option>
            <option value="5" className=" bg-butter-default">
              5 กม
            </option>
            <option value="10" className=" bg-butter-default">
              10 กม
            </option>
            <option value="15" className=" bg-butter-default">
              15 กม
            </option>
          </select>
        </div>
        <MapList initialLocation={currentLoacaiton()} shops={tempShops} />
        <div className="my-4 text-xs font-medium text-brick font-kanit">
          เจอ {tempShops.length} ร้าน
        </div>
        {tempShops ? (
          <div className="space-y-2 flex-column">
            {tempShops.map((shop) => {
              const id = shop.id;
              const url = `/shops/${id}`;
              const distance = calculateDistance(
                shop.attributes.latitude,
                shop.attributes.longitude
              );
              const opeTime = OpeTimeList(
                shop.attributes.shop_operating_times.data
              );
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
                      {shop.attributes.name}
                    </div>
                    <div
                      className={`text-xs ${
                        OpeFlag ? 'text-brown-mid' : 'text-brown-light'
                      } font-thin font-kanit`}
                    >
                      <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                      ห่างจากฉัน {distance} กม
                    </div>
                    <div
                      className={`text-base ${
                        OpeFlag ? 'text-brown-default' : 'text-brown-light'
                      } font-normal font-kanit`}
                    >
                      <div>
                        {shop.attributes.address_detail}{' '}
                        {shop.attributes.sub_district}{' '}
                        {shop.attributes.district}
                      </div>
                    </div>
                    {opeTime ? (
                      <div
                        className={`text-base ${
                          OpeFlag ? 'text-brown-default' : 'text-brown-light'
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
                      {shop.attributes.reviews ? (
                        <ReviewSummary reviews={shop.attributes.reviews} />
                      ) : null}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        ) : null}
        <LinkFooter />
      </div>
    </PageLayout>
  );
};

ShopsPage.getInitialProps = async () => {
  const shopResp = shopService.getAllShops();
  const repairResp = repairTagService.getAllRepairTag();
  const [shops, repairTags] = await Promise.all([shopResp, repairResp]);
  return { shops, repairTags };
};

export default ShopsPage;
