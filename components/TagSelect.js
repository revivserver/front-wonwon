import { useState, useMemo } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@/components/common/Modal';

const TagModalContent = ({ repairTagList, selectedTags, handleTagSelect }) => {
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
    </div>
  );
};

const TagSelect = ({ repairTags, handleTagsChange, search }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const mainCategoryList = useMemo(() => {
    if (!repairTags) return [];
    return repairTags.filter((tag) => {
      return !tag.attributes.main_category_id;
    });
  }, [repairTags]);

  const repairTagList = useMemo(() => {
    if (!selectedMainCategory || !repairTags) return [];
    return repairTags.filter((tag) => {
      if (!tag.attributes.main_category_id) return false;
      return tag.attributes.main_category_id === parseInt(selectedMainCategory);
    });
  }, [selectedMainCategory, repairTags]);

  const [openSubCategoriesModal, setOpenSubCategoriesModal] = useState(false);

  return (
    <>
      <select
        value={selectedMainCategory}
        onChange={(e) => {
          const mainSelectedCategory = parseInt(e.target.value);
          setSelectedMainCategory(e.target.value);
          setSelectedTags([]);
          handleTagsChange([mainSelectedCategory]);
        }}
        className="w-full text-center border-2 rounded-full cursor-pointer grow border-brown-light focus:border-brown-default text-brown-default bg-butter-default font-kanit"
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
      <button
        disabled={selectedMainCategory === ''}
        onClick={() => setOpenSubCategoriesModal(true)}
        className="w-full text-center border-2 border-solid rounded-full grow border-brown-light focus:outline-none focus:border-brown-default text-brown-default font-kanit disabled:bg-brown-light"
      >
        <div className="flex justify-center font-kanit">
          {selectedTags.length > 0 ? (
            <span className="p-1 w-6 h-6 relative bg-brown-light rounded-full bg-brown-light justify-center items-center text-[14px] text-butter-default text-center">
              {selectedTags.length}
            </span>
          ) : null}
          <div className="p-1">เลือกบริการซ่อม</div>
        </div>
      </button>
      {openSubCategoriesModal ? (
        <Modal
          textHeader={'เลือกบริการซ่อม'}
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
                handleTagsChange(newTag);
              }}
            />
          }
          textFooterButton={'ค้นหา'}
          onSubmit={() => {
            search();
            setOpenSubCategoriesModal(false);
          }}
          onCancel={() => {
            setOpenSubCategoriesModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default TagSelect;
