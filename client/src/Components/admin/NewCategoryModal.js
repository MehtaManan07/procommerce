import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {
  newCategory,
  newSubCategory,
} from '../../redux/actions/categoryActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SelectField from './Select';

const MyModal = ({ sub = false }) => {
  const [visible, setVisible] = useState(false); // for new category
  const [name, setName] = useState('');
  const [category, setCategory] = useState(''); // parent for subcategory
  const dispatch = useDispatch();

  console.log(category)

  const handleOk = async (e) => {
    if(category === 'none'){
      toast.error('Please select a parent category')
      return;
    }
    e.preventDefault();
    !sub
      ? dispatch(newCategory(name, toast))
      : dispatch(newSubCategory(name, category, toast));
    setVisible(false);
    setName('');
  };

  return (
    <>
      <Button
        className="w-50 mx-auto"
        type="primary"
        onClick={() => setVisible(true)}
      >
        {sub ? 'Add new sub Category' : 'Add new Category'}
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
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Category Name"
          />
          {sub && <SelectField sub setCategory={setCategory} />}
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
