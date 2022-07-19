import axios from 'axios';
import React from 'react';

const ProductUpload = ({ image, setImage }) => {
  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        `/api/v1/uploads/products`,
        formData,
        config
      );
      setImage(data.image);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <img src={image} className='form__image--product' alt='myImage' />
      <input
        className='form__upload'
        type='file'
        id='image'
        onChange={uploadFileHandler}
      />
      <label className='form__label-image' htmlFor='image'>
        Choose file
      </label>
    </>
  );
};

export default ProductUpload;
