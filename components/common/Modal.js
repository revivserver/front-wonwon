const Modal = ({ textHeader = null, content, onCancel, footer }) => {
  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="flex !m-0 fixed top-0 right-0 left-0 z-50 justify-center items-end w-full h-full  bg-opacity-75 backdrop-blur-lg"
    >
      {/* <!-- Modal content --> */}
      <div className="relative bg-butter-default rounded-t-[24px] shadow-md  px-10 pt-8 w-full">
        {/* <!-- Modal header --> */}

        <div className="pb-2 flex items-center justify-between border-b rounded-t border-dashed border-butter-dark">
          <h3 className="text-xl text-brown-mid font-kanit">{textHeader}</h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* <!-- Modal body --> */}
        <div className="py-4 text-brown-default font-kanit">{content}</div>
        {/* <!-- Modal footer --> */}
        {footer}
      </div>
    </div>
  );
};

export default Modal;
