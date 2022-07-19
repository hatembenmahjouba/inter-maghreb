import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAdress } from '../redux/cart/cartActions';

const Shipping = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAdress({ address, city, postalCode, country, phoneNumber })
    );
    history.push('/orderplace');
  };
  return (
    <>
      <form className='form' onSubmit={submitHandler}>
        <div className='form__group'>
          <input
            className='form__input'
            id='address'
            placeholder='Adress'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label className='form__label-input' htmlFor='address'>
            Address
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='city'
            type='text'
            placeholder='City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <label className='form__label-input' htmlFor='city'>
            City
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='postalCode'
            placeholder='Postal code'
            type='text'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <label className='form__label-input' htmlFor='postalCode'>
            Postal Code
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='country'
            placeholder='Country'
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <label className='form__label-input' htmlFor='country'>
            Country
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='phoneNumber'
            placeholder='Phone number'
            type='text'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label className='form__label-input' htmlFor='phoneNumber'>
            Phone Number
          </label>
        </div>
        <div>
          <button type='submit' className='btn'>
            Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default Shipping;
