import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { newCategory } from '../../redux/actions/categoryActions';
import { useDispatch } from 'react-redux';
import {EditFilled} from '@ant-design/icons'
import { toast } from 'react-toastify';

const MyModal = ({ update }) => {
  const [visible, setVisible] = useState(false); // for new category 
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleOk = async (e) => {
    e.preventDefault();
    dispatch(newCategory(name, toast));
    setVisible(false);
    setName('');
  };

  return (
    <>
      {!update ? (
        <Button
          className="w-50 mx-auto"
          type="primary"
          onClick={() => setVisible(true)}
        >
          Add new Category
        </Button>
      ) : (
        <EditFilled style={{ color: 'red', cursor: 'pointer' }} />
      )}
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
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
