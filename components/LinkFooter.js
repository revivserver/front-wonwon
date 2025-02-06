import Image from "next/image";
import doc from '@/public/document.svg';
import message from '@/public/message.svg';
import mark from '@/public/mark.svg';
import location from '@/public/location.svg';

const LinkFooter = () => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div style={{ position: 'sticky', bottom: '0', 'zIndex?': '5' }}>
      <div className="flex p-2 space-x-2 text-[12px] text-butter-light font-kanit">
        <div
          onClick={() =>
            openInNewTab(
              'https://docs.google.com/forms/d/e/1FAIpQLScIEoSedtD3w-cvMDp6U4h_pe2aIUpWaE4tpf14maPhZUTlRQ/viewform'
            )
          }
          className=" cursor-pointer bg-[#835020] h-[48px] rounded-lg w-2/4 justify-between items-center flex p-2"
        >
          <Image
            alt="logo"
            src={doc}
            fit="true"
            className="w-9"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(78%) sepia(11%) saturate(4156%) hue-rotate(13deg) brightness(105%) contrast(72%)',

              maxWidth: "100%",
              height: "auto"
            }} />
          <p>แนะนำ-ติชม</p>
          <Image
            alt="logo"
            src={message}
            fit="true"
            className="w-9"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(78%) sepia(11%) saturate(4156%) hue-rotate(13deg) brightness(105%) contrast(72%)',

              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
        <div
          onClick={() =>
            openInNewTab(
              'https://docs.google.com/forms/d/e/1FAIpQLSczUWK8jXi3uzpWBx0gEUOGMyiDVselmt_qwEeB0enRfUT6dQ/viewform'
            )
          }
          className=" cursor-pointer bg-[#835020] h-[48px] rounded-lg w-2/4 justify-between items-center flex p-2"
        >
          <Image
            alt="logo"
            src={mark}
            fit="true"
            className="w-9"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(78%) sepia(11%) saturate(4156%) hue-rotate(13deg) brightness(105%) contrast(72%)',

              maxWidth: "100%",
              height: "auto"
            }} />
          <div className="flex flex-col items-center justify-between">
            <p>บอกต่อ</p>
            <p>ร้านซ่อมแถวบ้าน</p>
          </div>
          <Image
            alt="logo"
            src={location}
            fit="true"
            className="w-9"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(78%) sepia(11%) saturate(4156%) hue-rotate(13deg) brightness(105%) contrast(72%)',

              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
      </div>
    </div>
  );
};

export default LinkFooter;
