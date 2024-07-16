import { useState } from 'react';
import shopService from '@/services/shop';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterTagModal = ({
  repairTags,
  updateRepairTags,
  updateShops,
  searchText,
  convertArrayToText,
  setFilter
}) => {
  const [checkedRepairTags, setCheckedRepairTags] = useState(repairTags);
  const getRepairTag = async () => {
    const checkedRepairTagResp = shopService.GetShopsBySearch(
      searchText,
      convertArrayToText(checkedRepairTags)
    );
    const [repairTagShops] = await Promise.all([checkedRepairTagResp]);
    updateShops(repairTagShops);
  };

  const onSubmit = () => {
    getRepairTag();
    updateRepairTags(checkedRepairTags);
    setFilter(false);
  };

  const onCancel = () => {
    setFilter(false);
  };

  const handleChange = (e) => {
    const update = checkedRepairTags.map((repairTag) => {
      if (parseInt(e.target.value) === repairTag.id) {
        return { ...repairTag, checked: e.target.checked };
      }
      return { ...repairTag };
    });
    setCheckedRepairTags(update);
  };

  return (
    <div
      className="relative z-10 w-full"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 transition-opacity bg-opacity-75 backdrop-blur-lg"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-full">
          <div className="relative overflow-hidden text-left bg-butter-default rounded-t-[24px] shadow-md w-full">
            <div className="flex items-start px-10 pt-8">
              <div className="ml-4 divide-y divide-butter-dark card divide-dashed grow ">
                <div className="flex">
                  <h3
                    className="mb-2 text-xs font-medium leading-6 text-brown-mid font-kanit"
                    id="modal-title"
                  >
                    เลือกบริการซ่อม
                  </h3>
                  <div className="grow"></div>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="xl"
                    onClick={onCancel}
                    className="flex cursor-pointer "
                  />
                </div>
                <h1
                  className="py-4 text-base font-medium leading-6 text-brown-default font-kanit"
                  id="modal-title"
                >
                  เลือกบริการซ่อมได้มากกว่า 1 อย่าง
                </h1>
                {checkedRepairTags.map((repairTag, index) => {
                  return (
                    <label key={index}>
                      <div className="mb-4 text-base font-medium toppings-list-item text-brown-default font-kanit">
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={repairTag.attributes.name}
                          checked={repairTag.checked}
                          className="mr-4 accent-green-default"
                          value={repairTag.id}
                          onChange={handleChange}
                        />
                        {repairTag.attributes.name}
                        {repairTag.checked}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center w-full pt-4 pb-8">
              <button
                type="button"
                onClick={onSubmit}
                className="h-12 text-base font-normal rounded-full w-80 btn btn-primary bg-green-default text-brown-default font-kanit"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTagModal;
