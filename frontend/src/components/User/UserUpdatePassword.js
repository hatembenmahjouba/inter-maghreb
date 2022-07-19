import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../../redux/user/userActions';

import Message from '../Message';
import Spiner from '../Spiner';
import { USER_UPDATE_PASSWORD_RESET } from '../../redux/user/userTypes';

const UserUpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordCurrent, setPasswordCurrent] = useState('');

  const dispatch = useDispatch();

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { success, error, loading } = userUpdatePassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserPassword({ passwordCurrent, password, passwordConfirm })
    );
  };

  return (
    <>
      {error && <Message className='error'>{error}</Message>}
      <div className='flex flex-dc flex-ai-c'>
        {success && (
          <Message className='success' reset={USER_UPDATE_PASSWORD_RESET} open>
            Password Updated
          </Message>
        )}
        <Spiner isLoading={loading} />
      </div>
      <form className='form' onSubmit={submitHandler}>
        <div className='form__group'>
          <input
            className='form__input'
            id='passwordCurrent'
            type='password'
            placeholder='Current Password'
            value={passwordCurrent}
            required
            title='Please include at least 1 uppercase character, 1 lowercase character, and 1 number'
            pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
            onChange={(e) => setPasswordCurrent(e.target.value)}
          />
          <label className='form__label-input' htmlFor='passwordCurrent'>
            Current Password
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='password'
            type='password'
            placeholder='Password (Min. 8 Characters)'
            title='Please include at least 1 uppercase character, 1 lowercase character, and 1 number'
            pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className='form__label-input' htmlFor='password'>
            Password
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='passwordConfirm'
            placeholder='Confirm Password'
            type='password'
            value={passwordConfirm}
            required
            title='Please include at least 1 uppercase character, 1 lowercase character, and 1 number'
            pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <label className='form__label-input' htmlFor='passwordConfirm'>
            Confirm Password
          </label>
        </div>
        <div className='form__group'>
          <button className='btn btn-form' type='submit'>
            Update Password
          </button>
        </div>
      </form>
    </>
  );
};
export default UserUpdatePassword;
