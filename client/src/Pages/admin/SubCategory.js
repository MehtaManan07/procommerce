import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Components/core/DashboardLayout';
import { toast } from 'react-toastify';
import DisplayCard from '../../Components/admin/DisplayCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  allSubCategories,
  deleteSubCategory,
} from '../../redux/actions/categoryActions';
import { DeleteOutlined } from '@ant-design/icons';
import MyModal from '../../Components/admin/NewCategoryModal';
import UpdateModal from '../../Components/admin/UpdateCategoryModal';
import LocalSearch from '../../Components/admin/LocalSearch';

const SubCategory = () => {
  const [keyword, setKeyword] = useState('');
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const { subcategories } = category;

  const deleteC = async (category) => {
    const a = window.confirm(`Are you sure? This cannot be undone`);
    if (!a) {
      return;
    }
    await dispatch(deleteSubCategory(category.id, toast));
  };
  const searcResults = (query) => (c) => c.name.toLowerCase().includes(query);

  useEffect(() => {
    dispatch(allSubCategories(toast));
  }, []);

  return (
    <DashboardLayout admin>
      <div className="row mb-3">
        <DisplayCard
          number={subcategories.length}
          duration={2.0}
          title1="Total Categories"
          color="#d9d9d9"
        />
        <DisplayCard
          number={subcategories.length}
          duration={2.5}
          title1="Total Sub Categories"
          color="#ffe58f"
        />
        <DisplayCard
          number={subcategories.length}
          duration={3}
          title1="Total Products"
          color="#ff4d4f"
        />
      </div>
      <br />
      <div className="row mb-4">
        <MyModal sub />
      </div>
      <div className="row ml-2">
        <div className="float-left form-group">
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>

      <div className="table-responsive">
        {subcategories.length > 0 && (
          <table className="table table-striped table-bordered text-center table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Parent category</th>
                <th scope="col">Total Products</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.filter(searcResults(keyword)).map((category, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>  
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td> {category.parent.name}</td>
                  <td> 25</td>
                  <td className="justify-content-around d-flex">
                    <UpdateModal sub category={category} />
                    <DeleteOutlined
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => deleteC(category)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SubCategory;
