import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { updateCategory } from '../../redux/actions/categoryActions';
import { useDispatch } from 'react-redux';
import { EditFilled } from '@ant-design/icons';
import { toast } from 'react-toastify';

const UpdateModal = ({ category }) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleOk = async (e) => {
    e.preventDefault();
    dispatch(updateCategory(name, toast, category.id));
    setVisible(false);
    setName('');
  };

  useEffect(() => {
    setName(category.name);
  }, []);

  return (
    <>
      <EditFilled
        onClick={() => setVisible(true)}
        style={{ color: 'blue', cursor: 'pointer' }}
      />
      <Modal
        title="Update category"
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

export default UpdateModal;
