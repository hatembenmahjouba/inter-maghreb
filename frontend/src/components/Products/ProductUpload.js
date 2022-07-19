import axios from 'axios';
import React, { useState } from 'react';
import Spiner from '../Spiner';

const ProductUpload = ({ image, setImage }) => {
  const [uploading, setUploading] = useState(false);
  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
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
      setUploading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Spiner isLoading={uploading}>
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
      </Spiner>
    </>
  );
};

export default ProductUpload;
