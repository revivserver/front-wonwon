import _ from 'lodash';
import { useState, useMemo } from 'react';
import Modal from '@/components/common/Modal';

const TagModalContent = ({
  repairTagList,
  selectedTags,
  handleTagSelect,
  onSelectAll
}) => {
  const [selectAll, setSelectAll] = useState(false);

  // example data
  // repairTagList = [
  //   {
  //     id: 1,
  //     attributes: {
  //       name: 'เปลี่ยนซิป',
  //       main_category_id: 10,
  //       createdAt: '2023-07-18T05:44:49.673Z',
  //       updatedAt: '2023-07-18T05:44:49.670Z'
  //     }
  //   }
  // ];

  const onClick = (e) => {
    setSelectAll(false);
    handleTagSelect(e.target.checked, parseInt(e.target.value));
  };
  return (
    <div>
      {repairTagList.map((tag, index) => {
        return (
          <div key={index} className="flex items-center mt-3">
            <input
              id={`tag-checkbox-${index}`}
              type="checkbox"
              value={tag.id}
              onChange={onClick}
              checked={selectedTags.indexOf(tag.id) > -1}
              className="mr-4 accent-green-default w-4 h-4 border-2 rounded-sm"
            />
            <label
              htmlFor={`tag-checkbox-${index}`}
              className="mr-4 text-base font-medium toppings-list-item text-brown-default font-kanit"
            >
              {tag.attributes.name}
            </label>
          </div>
        );
      })}
      <div className="mt-3 pt-4 text-brown-default font-kanit border-t border-dashed border-butter-dark">
        <input
          type="checkbox"
          className="mr-4 accent-green-default w-4 h-4 border-2 rounded-sm"
          onChange={() => {
            onSelectAll(!selectAll);
            setSelectAll(!selectAll);
          }}
          checked={selectAll}
        />
        เลือกทั้งหมด
      </div>
    </div>
  );
};

const TagSelect = ({ repairTags, handleTagsChange, search }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState(10);
  const [selectedTags, setSelectedTags] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [selectedDistance, setSelectedDistance] = useState(100);
  const handleDistanceChange = (event) => {
    setSelectedDistance(event.target.value);
  };

  // FIXME: default search is not sync to selectedTags

  const mainCategoryList = useMemo(() => {
    if (!repairTags) return [];
    return repairTags.filter((tag) => {
      return !tag.attributes.main_category_id;
    });
  }, [repairTags]);

  const mapMainCatToRepairTags = useMemo(() => {
    const mapCategories = {};
    mainCategoryList.forEach((mainCategory) => {
      const filteredTagIds = repairTags
        .filter((tag) => tag.attributes.main_category_id == mainCategory.id)
        .map((tag) => tag.id);
      mapCategories[mainCategory.id] = filteredTagIds;
    });
    return mapCategories;
  }, [mainCategoryList]);

  const repairTagList = useMemo(() => {
    if (!selectedMainCategory || !repairTags) return [];
    const tagIds = mapMainCatToRepairTags[parseInt(selectedMainCategory)];
    return tagIds.map((id) => {
      return _.find(repairTags, (repairTag) => {
        return repairTag.id == id;
      });
    });
  }, [selectedMainCategory, repairTags]);

  const [openSubCategoriesModal, setOpenSubCategoriesModal] = useState(false);

  return (
    <>
      <div className="flex no-wrap h-8 mt-4 mb-2 space-x-2 text-xs font-medium">
        <select
          value={selectedMainCategory}
          onChange={(e) => {
            const mainSelectedCategory = parseInt(e.target.value);
            setSelectedMainCategory(e.target.value);
            const tagIds =
              mapMainCatToRepairTags[parseInt(mainSelectedCategory)];
            setSelectedTags(tagIds);
            handleTagsChange(tagIds);
          }}
          className="w-full text-center border-2 rounded-full cursor-pointer grow border-brown-light focus:border-brown-default text-brown-mid bg-butter-default font-kanit"
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
                {category.attributes.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex no-wrap h-8 my-2 space-x-4 text-xs font-medium ">
        <button className="w-full text-center border-2 border-solid rounded-full grow border-brown-light focus:outline-none focus:border-brown-default text-brown-default font-kanit disabled:bg-brown-light">
          <div className="flex justify-center font-kanit text-brown-mid ">
            <select
              value={selectedDistance}
              onChange={handleDistanceChange}
              className="bg-butter-default"
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
        </button>

        <button
          disabled={selectedMainCategory === ''}
          onClick={() => setOpenSubCategoriesModal(true)}
          className="w-full text-center border-2 border-solid rounded-full grow border-brown-light focus:outline-none focus:border-brown-default text-brown-default font-kanit disabled:bg-brown-light"
        >
          <div className="flex justify-center font-kanit text-brown-mid">
            {selectedTags && selectedTags.length > 0 ? (
              <span className="p-1 w-6 h-6 relative bg-brown-light rounded-full justify-center items-center text-[14px] text-butter-default text-center">
                {selectedTags.length}
              </span>
            ) : null}
            <div className="p-1">ปรับรูปแบบการซ่อม</div>
          </div>
        </button>
      </div>
      {openSubCategoriesModal ? (
        <Modal
          textHeader={'ปรับรูปแบบการซ่อม'}
          content={
            <TagModalContent
              repairTagList={repairTagList}
              selectedTags={selectedTags}
              handleTagSelect={(checked, tagId) => {
                let newTag = [...selectedTags];
                if (checked) {
                  newTag.push(tagId);
                } else {
                  newTag = selectedTags.filter((id) => id != tagId);
                }
                setSelectedTags(newTag);
                if (newTag.length === 0) {
                  const allTagIds = repairTagList.map((ele) => ele.id);
                  handleTagsChange(allTagIds);
                } else {
                  handleTagsChange(newTag);
                }
              }}
              onSelectAll={(selectAll) => {
                const allTagIds = repairTagList.map((ele) => ele.id);
                if (selectAll) {
                  setSelectedTags(allTagIds);
                  handleTagsChange(allTagIds);
                } else {
                  setSelectedTags([]);
                  handleTagsChange(allTagIds);
                }
              }}
            />
          }
          onCancel={() => {
            setOpenSubCategoriesModal(false);
          }}
          footer={
            <div className="flex justify-center pt-4 pb-8">
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => {
                    search();
                    setOpenSubCategoriesModal(false);
                  }}
                  className="h-12 text-base font-normal rounded-full w-80 btn btn-primary bg-green-default text-brown-default font-kanit"
                >
                  บันทึก
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTags([]);
                    const allTagIds = repairTagList.map((ele) => ele.id);
                    handleTagsChange(allTagIds);
                  }}
                  className="mt-3 border-2 border-solid border-green-default  h-12 text-base font-normal rounded-full w-80 btn btn-primary bg-butter-default text-brown-default font-kanit"
                >
                  ล้างข้อมูล
                </button>
              </div>
            </div>
          }
        />
      ) : null}
    </>
  );
};

export default TagSelect;
