const SearchBox = ({ searchText, updateSearch, onSearch }) => {
  return (
    <div className="flex justify-center w-full px-6 mt-6">
      <form className="grow">
        <label className="relative block ">
          <input
            className="w-full py-2 pl-3 pr-10 text-sm font-normal border-b-2 rounded-sm placeholder-brown-light bg-butter-light drop-shadow-md border-brown-light focus:outline-none focus:border-brown-default text-brown-default font-kanit"
            placeholder="ใส่ชื่อร้าน ชื่อย่าน หรือที่อยู่สำหรับค้นหา"
            value={searchText}
            onChange={(e) => updateSearch(e.target.value)}
            type="text"
          />

          <span
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-brown-light"
            onClick={onSearch}
          >
            <svg
              className="w-5 h-5 fill-black"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
            </svg>
          </span>
        </label>
      </form>
    </div>
  );
};

export default SearchBox;
