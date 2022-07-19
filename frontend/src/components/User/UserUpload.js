import axios from 'axios';
import React from 'react';

const UserUpload = ({ photo, setPhoto }) => {
  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        `/api/v1/uploads/users`,
        formData,
        config
      );
      setPhoto(data.photo);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <img src={photo} className='form__image--user' alt='myImage' />
      <input
        className='form__upload'
        type='file'
        id='photo'
        onChange={uploadFileHandler}
      />
      <label className='form__label-image' htmlFor='photo'>
        Choose file
      </label>
    </>
  );
};

export default UserUpload;
