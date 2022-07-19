import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/user/userActions';

import Spiner from '../Spiner';
import Message from '../Message';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const params = useParams();
  const token = params.token;

  const dispatch = useDispatch();

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, userInfo } = userResetPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, password, passwordConfirm));
  };

  return (
    <>
      {error && <Message className='error'>{error}</Message>}
      {userInfo && userInfo.name && (
        <Message className='success' linkTo='/' open>
          Success Reset Password
        </Message>
      )}
      <Spiner isLoading={loading}>
        <form className='form' onSubmit={submitHandler}>
          <div className='from__group'>
            <input
              className='form__input'
              id='password'
              type='password'
              placeholder='Password (Min. 8 Characters)'
              value={password}
              required
              title='Please include at least 1 uppercase character, 1 lowercase character, and 1 number'
              pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className='form__label-input' htmlFor='password'>
              Password
            </label>
          </div>
          <div className='from__group'>
            <input
              className='form__input'
              id='passwordConfirm'
              placeholder='Confirm Password'
              type='password'
              value={passwordConfirm}
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
              title='Please include at least 1 uppercase character, 1 lowercase character, and 1 number'
              pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
            />
            <label className='form__label-input' htmlFor='passwordConfirm'>
              Confirm Password
            </label>
          </div>
          <div className='from__group'>
            <button className='btn' type='submit'>
              Reset Password
            </button>
          </div>
        </form>
      </Spiner>
    </>
  );
};
export default ResetPassword;
