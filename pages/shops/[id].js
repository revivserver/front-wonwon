import _ from 'lodash';
import React, { useState, useMemo } from 'react';
import shopService from '@/services/shop';
import reviewTagService from '@/services/reviewTag';
import Modal from '@/components/modal/modal';
import ContactModal from '@/components/modal/ContactModal';
import Review from '@/components/review';
import OpeTimeDetail from '@/components/detail/OpeTimeDetail';
import PageLayout from '@/components/PageLayout';
// import MapDetail from '@/components/MapDetail';

import Contact from '@/components/shopDetail/contact';
import ShopImage from '@/components/shopDetail/shopImage';

import {
  faClock,
  faWallet,
  faMoneyBillTransfer
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShopPresenter = ({ shop, reviews, reviewTags }) => {
  const [modal, setModal] = useState(false);
  const [additionContactModal, setAdditionContactModal] = useState(false);
  const [clickedContactIcon, setClickedContactIcon] = useState('');

  const { id } = shop;
  const {
    name,
    address_detail,
    province,
    district,
    sub_district,
    landmark,
    latitude,
    longitude,
    shop_images,
    shop_repair_tag_links,
    contacts,
    payments,
    google_map_url,
    notes
  } = shop.attributes;

  const condition =
    notes && notes?.length > 0
      ? notes[0].condition
        ? notes[0].condition
        : ''
      : '';
  const phones = contacts.phone?.length > 0 ? contacts.phone : null;

  const additionalContact = useMemo(() => {
    let res = {};
    if (clickedContactIcon === 'instagram') {
      res.data = contacts.instagram?.length > 0 ? contacts.instagram : null;
    } else if (clickedContactIcon === 'line') {
      res.data = contacts.line?.length > 0 ? contacts.line : null;
    } else {
      res.data = contacts.facebook?.length > 0 ? contacts.facebook : null;
    }
    res.name = clickedContactIcon;
    return res;
  }, [contacts, clickedContactIcon]);

  const onReview = () => {
    setModal(true);
  };
  const modalClick = (open) => {
    setModal(open);
    if (!open) {
      // FIXME: get updated reviews
    }
  };
  const location_detail = `${address_detail} ${sub_district} ${district} ${province}`;
  // const isLocationExists = (lat, lon) => {
  //   return lat !== 0 && lon !== 0;
  // };
  const isGooglemapExists = (url) => {
    return url;
  };

  return (
    <PageLayout>
      <div className="w-full py-4 ">
        <p className="mx-4 text-2xl font-medium text-brick font-kanit">
          {name}
        </p>
        <ShopImage shop_images={shop_images.data} />
        <div className="flex mx-4 mb-2 space-x-2 ">
          {phones && phones.length > 0 ? (
            <a
              href={`tel:${phones[0]}`}
              className="flex justify-center h-12 text-base border-2 rounded-full grow placeholder-brown-light border-brown-light focus:outline-none focus:border-brown-default text-brown-default btn btn-outline bg-green-default font-kanit"
            >
              <button disabled={!phones}>โทรหาร้าน</button>
            </a>
          ) : (
            <div className="flex justify-center h-12 text-base border-2 rounded-full grow placeholder-brown-light border-brown-light focus:outline-none focus:border-brown-default text-brown-default btn btn-outline bg-green-disabled font-kanit">
              <button disabled={true}>โทรหาร้าน</button>
            </div>
          )}
          <a
            href={google_map_url}
            disabled={!isGooglemapExists(google_map_url)}
            className="flex justify-center h-12 text-base border-2 border-solid rounded-full grow border-green-default focus:outline-none focus:border-brown-default text-brown-default bg-butter-default font-kanit"
          >
            <button>เปิดแผนที่</button>
          </a>
        </div>
        {/* <div className="mx-4">
          {isLocationExists(latitude, longitude) ? (
            <MapDetail lat={latitude} lng={longitude} />
          ) : null}
        </div> */}
        <div className="p-1 mx-5 mt-1 text-xs font-medium text-center rounded-lg drop-shadow-md bg-butter-light text-brown-default font-kanit">
          <p>{location_detail}</p>
          <p>{landmark}</p>
        </div>
        <div className="rounded-lg bg-butter-light drop-shadow-md">
          <div className="grid gap-6 px-10 py-6 my-3 divide-y card divide-dashed divide-butter-dark">
            <div className="flex">
              <FontAwesomeIcon icon={faClock} className="mr-2 fa-xl" />
              <OpeTimeDetail ope={shop.attributes.shop_operating_times.data} />
            </div>
            <div className="pt-4">
              <p className="text-xs font-bold text-brown-default font-kanit">
                บริการซ่อมที่เชี่ยวชาญ
              </p>
              <div className="flex flex-row flex-wrap">
                {shop_repair_tag_links
                  ? shop_repair_tag_links.data.map(
                      (shop_repair_tag_link, index) => {
                        const name =
                          shop_repair_tag_link.attributes.repair_tag.data
                            .attributes.name;
                        return (
                          <div
                            key={index}
                            className="mr-3 mt-3 p-1 border-[1px] border-primary-content rounded text-brown-mid text-base font-kanit font-normal"
                          >
                            {name}
                          </div>
                        );
                      }
                    )
                  : null}
              </div>
            </div>
            <Contact
              contact={contacts}
              onIconClick={(clickedIcon) => {
                setAdditionContactModal(true);
                setClickedContactIcon(clickedIcon);
              }}
            />
            <div className="pt-4">
              <p className="text-xs font-bold text-brown-default font-kanit">
                วิธีจ่ายค่าบริการ
              </p>
              <div className="flex justify-around p-4 mt-2">
                {payments.payments.map((payment, index) => {
                  if (payment === 'cash') {
                    return (
                      <FontAwesomeIcon key={index} icon={faWallet} size="xl" />
                    );
                  } else if (payment === 'online') {
                    return (
                      <FontAwesomeIcon
                        key={index}
                        icon={faMoneyBillTransfer}
                        size="xl"
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className="pt-4">
              <p className="text-xs font-bold text-brown-default font-kanit">
                เงื่อนไขการบริการ
              </p>
              <div className="p-1 mt-1 text-xs text-left  bg-butter-light text-brown-default font-kanit">
                <div dangerouslySetInnerHTML={{ __html: condition }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full mt-4 ">
          <div className="font-medium font-kanit">
            รีวิวของคุณ ช่วยให้ทุกคนรู้จักช่างซ่อมใกล้บ้านได้
          </div>
        </div>
        <div className="flex justify-center w-full px-3 mt-4">
          <button
            onClick={onReview}
            className="w-full h-12 text-base font-normal rounded-full btn btn-primary bg-green-default text-brown-default font-kanit"
          >
            รีวิวร้าน
          </button>
        </div>
        <br />
        <div className="p-4 mt-3">
          <p className="text-xs font-bold text-secondary-content text-brown-mid font-kanit">
            รีวิวจากผู้ใช้งาน
          </p>
          <div className="divide-y divide-dashed divide-primary">
            {_.orderBy(
              reviews,
              [(review) => review.attributes.createdAt],
              ['desc']
            ).map((review, index) => (
              <div key={index} className="pt-4 pb-4">
                <Review review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {modal && (
        <Modal shopId={id} reviewTags={reviewTags} setModal={modalClick} />
      )}
      {additionContactModal ? (
        <ContactModal
          contact={additionalContact}
          onClose={() => {
            setAdditionContactModal(false);
            setClickedContactIcon('');
          }}
        />
      ) : null}
    </PageLayout>
  );
};

const Page = ({ shop, reviews, reviewTags }) => {
  return (
    <>
      <ShopPresenter shop={shop} reviews={reviews} reviewTags={reviewTags} />
    </>
  );
};

Page.getInitialProps = async (context) => {
  const shopId = context.query.id;
  const shopResp = shopService.GetByID(shopId);
  const reviewsResp = shopService.GetReviewsByShopID(shopId);
  const reviewTagsResp = reviewTagService.GetAll();
  const [shop, reviews, reviewTags] = await Promise.all([
    shopResp,
    reviewsResp,
    reviewTagsResp
  ]);

  return {
    shop,
    reviews,
    reviewTags
  };
};

export default Page;
