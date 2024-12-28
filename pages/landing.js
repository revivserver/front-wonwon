import Image from 'next/image';
// import Link from 'next/link';
import Landing_img from '@/public/landing-img.png';
import wonwon_icon from '@/public/wonwon_icon.svg';
import Head from 'next/head';

const LandingPage = ({}) => {
  const url = `/shops`;
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };
  return (
    <div>
      <Head>
        <title>WonWon by Reviv</title>
        <meta
          name="description"
          content="Repair-Lifestyle platform in Thailand"
          key="desc"
        />
        <meta property="og:title" content="WonWon by Reviv" />
        <meta
          property="og:description"
          content="The 1st Repair-Lifestyle platform in Thailand that connects consumers with local repair shops."
        />
        <meta property="og:image" content="/OG.png" />
        <link rel="shortcut icon" href="/favicon.jpg" />
      </Head>
      <div className="w-full h-full ">
        <div className="text-center">
          <div className="flex flex-col items-center w-full ">
            <Image
              alt="logo"
              src={wonwon_icon}
              width={200}
              height={120}
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(78%) sepia(11%) saturate(4156%) hue-rotate(13deg) brightness(105%) contrast(72%)',

                maxWidth: '100%',
                height: 'auto'
              }}
            />
            <Image
              alt="description"
              src={Landing_img}
              width={210}
              height={210}
              style={{
                maxWidth: '100%',
                height: 'auto'
              }}
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-4 text-xs font-normal text-brown-default font-kanit mb-28">
            {/* <p className="text-xl font-medium text-center ">WonWon</p> */}
            <p className="mt-2 text-base font-normal ">
              {/* รวมร้านซ่อมใกล้บ้านคุณ <br />
              สนับสนุนสังคมแห่งการซ่อมแซมที่ไม่รู้จบ */}
              แพลตฟอร์มรวบรวมร้าน (ช่าง) ซ่อมเสื้อผ้า <br />
              จากทั่วกรุงเทพให้คุณได้ค้นพบร้าน local ใหม่ๆ <br />
              ละแวกใกล้คุณ เลือกร้านที่ตรงใจได้ตามระยะทาง, <br />
              บริการ และรีวิวจากเพื่อนๆในคอมมูนิตี้ <br />
              ไม่ว่าจะตัดขาหรือซ่อมรูขาด ร้านใกล้บ้าน
              <br />
              หรือใกล้ที่ทำงานก็หาได้ที่ Repair Market
            </p>
            {/* <p className="mt-4 text-xl font-medium ">ฟีเจอร์ตอนนี้:</p> */}
            {/* <ul className="flex flex-col items-center mt-2 text-base font-normal list-disc ">
              <li className=" w-fit">
                ค้นหาร้านซ่อมเสื้อ ร้านซ่อมนาฬิกา <br />
                กระเป๋า รองเท้า คอมพิวเตอร์ <br />
                เครื่องใช้ไฟฟ้า ในกรุงเทพฯ 
                // แพลตฟอร์มรวบรวมร้าน (ช่าง)
              </li>
              <li className=" w-fit">รีวิวร้านให้ทุกคนรู้จัก</li>
            </ul> */}
          </div>
          <div className="flex no-wrap h-8 mt-4 mb-2 space-x-2 text-xs font-medium">
            <select
              // value={selectedMainCategory}
              onChange={(e) => {
                const mainSelectedCategory = parseInt(e.target.value);
                setSelectedMainCategory(e.target.value);
                // const tagIds =
                //   mapMainCatToRepairTags[parseInt(mainSelectedCategory)];
                setSelectedTags(tagIds);
                handleTagsChange(tagIds);
              }}
              className="w-full text-center border-2 rounded-full cursor-pointer grow border-brown-light focus:border-brown-default text-brown-mid bg-butter-default font-kanit"
            >
              <option value={''} className="bg-butter-default">
                เลือกประเภทการซ่อม
              </option>
              {/* {mainCategoryList.map((category) => { */}
              {/* return (
                  <option
                    key={category.id}
                    value={category.id}
                    className="bg-butter-default"
                  >
                    {category.attributes.name}
                  </option>
                );
              })} */}
            </select>
          </div>
          <div className="flex justify-center mt-3">
            <a href={url}>
              <button
                type="button"
                className=" h-12 rounded-full w-80 btn btn-primary bg-green-default text-brown-default font-kanit"
              >
                เริ่มใช้งาน
              </button>
            </a>
          </div>
          <div className="flex justify-center mt-3 pb-3">
            <button
              onClick={() =>
                openInNewTab(
                  'https://revivcommunity.org/wonwon-future-features/'
                )
              }
              className=" bg-brown-mid h-12 rounded-lg w-80 text-butter-light font-kanit"
            >
              ติดตามฟีเจอร์ใหม่ๆ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
