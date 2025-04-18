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
              width={150}
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
          {/* <div className="flex flex-col items-center justify-center mt-4 text-xs font-normal text-brown-default font-kanit mb-16"> */}
          <div className="flex flex-col items-center justify-center mt-4 text-xs font-normal text-brown-default font-kanit mb-4">
            <p className="text-xl font-medium text-center ">WonWon</p>
            <p className="mt-2 text-base font-normal ">
              รวมร้านซ่อมเสื้อผ้า นาฬิกา กระเป๋า <br />
              รองเท้า คอมพิวเตอร์ เครื่องใช้ไฟฟ้า ใกล้บ้านคุณ <br />
              สนับสนุนสังคมแห่งการซ่อมแซมที่ไม่รู้จบ <br />
            </p>
            <p className="mt-4 text-xl font-medium ">ฟีเจอร์ตอนนี้:</p>
            <ul className="flex flex-col items-center mt-2 text-base font-normal list-disc ">
              <li className=" w-fit">ค้นหาร้านซ่อม</li>
              <li className=" w-fit">รีวิวร้านให้ทุกคนรู้จัก</li>
            </ul>
          </div>
          {/* <div className="flex justify-center mt-3">
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
              className="px-2 py-1 rounded-full w-80 btn btn-primary bg-butter-default text-brown-mid font-kanit border-2  border-brown-light text-sm"
            >
              <option value={''} className="bg-butter-default">
                เลือกประเภทการซ่อม
              </option>
              {mainCategoryList.map((category) => {
                return (
                  <option
                    key={category.id}
                    value={category.id}
                    className="bg-butter-default"
                  >
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div> */}
          <div className="flex justify-center mt-3">
            <a href={url}>
              <button
                type="button"
                className=" h-12 rounded-full w-80 btn btn-primary bg-green-default text-brown-default font-kanit"
              >
                เริ่มเลย
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
