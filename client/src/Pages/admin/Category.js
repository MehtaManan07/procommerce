import React, { useEffect } from 'react';
import DashboardLayout from '../../Components/core/DashboardLayout';
import { toast } from 'react-toastify';
import DisplayCard from '../../Components/admin/DisplayCard';
import { useDispatch, useSelector } from 'react-redux';
import { allCategories } from '../../redux/actions/categoryActions';
import { EditFilled, DeleteOutlined } from '@ant-design/icons';
import MyModal from '../../Components/admin/NewCategoryModal';

const Category = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const { categories } = category

  const deleteCategory = () => {
    const a = window.confirm(`Are you sure?`);
    if (!a) {
      return;
    }
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
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td className="justify-content-around d-flex">
                  <EditFilled style={{ color: 'red', cursor: 'pointer' }} />
                  <DeleteOutlined
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={deleteCategory}
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
