import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { allCategories, newCategory } from '../../redux/actions/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MyModal = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const category = useSelector(state => state.category)

  const handleOk = async (e) => {
    e.preventDefault()
    dispatch(newCategory(name,toast));
    setVisible(false)
  };

  return (
    <>
      <Button className='w-50 mx-auto' type="primary" onClick={() => setVisible(true)}>
        Add new Category
      </Button>
      <Modal
        title="New category"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Category Name"
          />
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
