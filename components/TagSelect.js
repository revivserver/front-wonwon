import _ from 'lodash';
import { useState, useMemo, useEffect } from 'react';
import Modal from '@/components/common/Modal';

const TagModalContent = ({
  repairTagList,
  selectedTags,
  handleTagSelect,
  onSelectAll
}) => {
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    if (!selectedTags || selectedTags.length == 0) {
      setSelectAll(false);
    } else if (repairTagList.length == selectedTags.length) {
      setSelectAll(true);
    }
  }, [selectedTags]);

  const onClick = (e) => {
    setSelectAll(false);
    handleTagSelect(e.target.checked, e.target.value);
  };
  return (
    <div>
      {repairTagList.map((tag, index) => {
        return (
          <div key={index} className="flex items-center mt-3">
            <input
              id={`tag-checkbox-${index}`}
              type="checkbox"
              value={tag.documentId}
              onChange={onClick}
              checked={selectedTags.indexOf(tag.documentId) > -1}
              className="mr-4 accent-green-default w-4 h-4 border-2 rounded-sm"
            />
            <label
              htmlFor={`tag-checkbox-${index}`}
              className="mr-4 text-base font-medium toppings-list-item text-brown-default font-kanit"
            >
              {tag.name}
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
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(100);
  const handleDistanceChange = (event) => {
    setSelectedDistance(event.target.value);
  };

  // FIXME: default search is not sync to selectedTags
  useEffect(() => {
    // default tags
    const defaultMainCategory = repairTags.find((tag) => !tag.main_category_id);
    if (defaultMainCategory) {
      const defaultTagDocumentIds = repairTags
        .filter((tag) => tag.main_category_id == defaultMainCategory.documentId)
        .map((tag) => tag.documentId);

      setSelectedMainCategory(defaultMainCategory.documentId);
      setSelectedTags[defaultTagDocumentIds];
    }
  }, []);

  const mainCategoryList = useMemo(() => {
    if (!repairTags) return [];
    return repairTags.filter((tag) => {
      return !tag.main_category_id;
    });
  }, [repairTags]);

  const mapMainCatToRepairTags = useMemo(() => {
    if (!repairTags) return {};
    const mapCategories = {};
    mainCategoryList.forEach((mainCategory) => {
      const filteredTagIds = repairTags
        .filter((tag) => tag.main_category_id == mainCategory.documentId)
        .map((tag) => tag.documentId);
      mapCategories[mainCategory.documentId] = filteredTagIds;
    });
    return mapCategories;
  }, [mainCategoryList]);

  const repairTagList = useMemo(() => {
    if (!selectedMainCategory || !repairTags) return [];
    const tagIds = mapMainCatToRepairTags[selectedMainCategory];

    return tagIds.map((documentId) => {
      return _.find(repairTags, (repairTag) => {
        return repairTag.documentId == documentId;
      });
    });
  }, [selectedMainCategory, repairTags]);

  console.log('selectedTags', selectedMainCategory);
  const [openSubCategoriesModal, setOpenSubCategoriesModal] = useState(false);

  return (
    <>
      <div className="flex no-wrap h-8 mt-4 mb-2 space-x-2 text-xs font-medium">
        <select
          value={selectedMainCategory}
          onChange={(e) => {
            const mainSelectedCategory = e.target.value;
            setSelectedMainCategory(e.target.value);
            const tagIds = mapMainCatToRepairTags[mainSelectedCategory];
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
                key={category.documentId}
                value={category.documentId}
                className="bg-butter-default"
              >
                {category.name}
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
                  const allTagIds = repairTagList.map((ele) => ele.documentId);
                  handleTagsChange(allTagIds);
                } else {
                  handleTagsChange(newTag);
                }
              }}
              onSelectAll={(selectAll) => {
                const allTagIds = repairTagList.map((ele) => ele.documentId);
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
                    const allTagIds = repairTagList.map(
                      (ele) => ele.documentId
                    );
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
