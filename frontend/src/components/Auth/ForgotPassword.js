import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/user/userActions';

import Spiner from '../Spiner';
import Message from '../Message';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading, error, success } = userForgotPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <>
      {error && <Message className='error'>{error}</Message>}
      {success && (
        <Message className='success' open>
          Success Email
        </Message>
      )}
      <Spiner isLoading={loading}>
        <form className='form' onSubmit={submitHandler}>
          <div className='form__group'>
            <input
              className='form__input'
              id='email'
              type='email'
              placeholder='Email Address'
              autoComplete='email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className='form__label-input' htmlFor='email'>
              Email Address
            </label>
          </div>
          <div className='form__group'>
            <button className='btn' type='submit'>
              Send Email
            </button>
          </div>
        </form>
      </Spiner>
    </>
  );
};
export default ForgotPassword;
