import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Components/core/DashboardLayout';
import { toast } from 'react-toastify';
import DisplayCard from '../../Components/admin/DisplayCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  allCategories,
  deleteCategory,
} from '../../redux/actions/categoryActions';
import { DeleteOutlined } from '@ant-design/icons';
import MyModal from '../../Components/admin/NewCategoryModal';
import UpdateModal from '../../Components/admin/UpdateCategoryModal';

const Category = () => {
  const [update, setUpdate] = useState(true)
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const { categories } = category;

  const deleteC = async (category) => {
    const a = window.confirm(`Are you sure? This cannot be undone`);
    if (!a) {
      return;
    }
    await dispatch(deleteCategory(category.slug, toast));
  };

  useEffect(() => {
    dispatch(allCategories(toast));
  }, []);

  return (
    <DashboardLayout admin>
      <div className="row mb-3">
        <DisplayCard
          number={categories.length}
          duration={4.0}
          title1="Total Categories"
          color="#d9d9d9"
        />
        <DisplayCard
          number={categories.length}
          duration={4.5}
          title1="Best selling"
          color="#ffe58f"
        />
        <DisplayCard
          number={categories.length}
          duration={4.5}
          title1="Best selling"
          color="#ff4d4f"
        />
      </div>
      <br />
      <h4 className="text-center"> All Categories </h4>
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Total Products</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{category._id}</td>
                <td> 25</td>
                <td>{category.name}</td>
                <td className="justify-content-around d-flex">
                  <UpdateModal category={category} />
                  <DeleteOutlined
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => deleteC(category)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <MyModal />
      </div>
    </DashboardLayout>
  );
};

export default Category;
