import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allCategories } from '../../redux/actions/categoryActions';

const SelectField = ({ setCategory }) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const { categories } = category;
  useEffect(() => {
    dispatch(allCategories());
  }, []);

  return (
    <div className="form-group  mt-2">
      <select
        required
        name="Parent Category"
        onChange={(e) => setCategory(e.target.value)}
        className="custom-select form-control"
      >
        <option value='none'>Parent Category</option>
        {categories &&
          categories.map((category) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectField;
