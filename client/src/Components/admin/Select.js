import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { allCategories } from '../../redux/actions/categoryActions';

const SelectField = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const { categories } = category;
  useEffect(() => {
    dispatch(allCategories());
  }, []);

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log('search:', val);
  }
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {categories &&
        categories.map((category) => (
          <Option key={category._id} value={category._id}>{category.name}</Option>
        ))}
    </Select>
  );
};

export default SelectField;
