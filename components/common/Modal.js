const Modal = ({
  textHeader = null,
  content,
  textFooterButton,
  onSubmit,
  onCancel
}) => {
  return (
    <div
      tabindex="-1"
      aria-hidden="true"
      class="flex !m-0 fixed top-0 right-0 left-0 z-50 justify-center items-end w-full h-full  bg-opacity-75 backdrop-blur-lg"
    >
      {/* <!-- Modal content --> */}
      <div class="relative bg-butter-default rounded-t-[24px] shadow-md  px-10 pt-8 w-full">
        {/* <!-- Modal header --> */}
        <div class="pb-2 flex items-center justify-between border-b rounded-t border-dashed border-butter-dark">
          <h3 class="text-xl text-brown-mid font-kanit">{textHeader}</h3>
          <button
            type="button"
            onClick={onCancel}
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        {/* <!-- Modal body --> */}
        <div class="py-4 text-brown-default font-kanit">{content}</div>
        {/* <!-- Modal footer --> */}
        <div class="flex justify-center pt-4 pb-8">
          <button
            type="button"
            onClick={onSubmit}
            className="h-12 text-base font-normal rounded-full w-80 btn btn-primary bg-green-default text-brown-default font-kanit"
          >
            {textFooterButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
