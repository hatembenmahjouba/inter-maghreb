import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/user/userActions';
import { Link, useLocation } from 'react-router-dom';

import Spiner from '../Spiner';
import Message from '../Message';

const SignIn = () => {
  const location = useLocation();
  let { from: redirect } = location.state || { from: { pathname: '/' } };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {error && <Message className='error'>{error}</Message>}
      {userInfo && userInfo.name && (
        <Message className='success' redirect={redirect} open>
          Success Login
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
            <input
              className='form__input'
              id='password'
              type='password'
              placeholder='Password (Min. 8 Characters)'
              autoComplete='current-password'
              value={password}
              minLength={8}
              required
              title='Please include at least 1 uppercase character, 1 lowercase character, and 1 number'
              pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className='form__label-input' htmlFor='password'>
              Password
            </label>
          </div>
          <div className='form__group'>
            <button className='btn' type='submit'>
              Sign In
            </button>
          </div>
        </form>
        <p className='paragraph'>
          New customer?{' '}
          <Link
            to={{
              pathname: '/register',
              state: { from: redirect },
            }}
            className='btn-text'
          >
            Register
          </Link>
        </p>
        <p className='paragraph'>
          Forgot password?{' '}
          <Link to='/forgotpassword' className='btn-text'>
            Forgot Password
          </Link>
        </p>
      </Spiner>
    </>
  );
};
export default SignIn;
