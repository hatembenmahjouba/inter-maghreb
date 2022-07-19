import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/user/userActions';
import { Link, useLocation } from 'react-router-dom';

import Spiner from '../Spiner';
import Message from '../Message';

const SignUp = () => {
  const location = useLocation();
  let { from: redirect } = location.state || { from: { pathname: '/' } };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, passwordConfirm));
  };

  return (
    <>
      {error && <Message className='error'>{error}</Message>}
      {userInfo && userInfo.name && (
        <Message className='success' redirect={redirect} open>
          Success Register
        </Message>
      )}
      <Spiner isLoading={loading}>
        <form className='form' onSubmit={submitHandler}>
          <div className='form__group'>
            <input
              className='form__input'
              id='name'
              type='name'
              placeholder='Name'
              value={name}
              required
              minLength='3'
              maxLength='100'
              onChange={(e) => setName(e.target.value)}
            />
            <label className='form__label-input' htmlFor='name'>
              Name
            </label>
          </div>
          <div className='form__group'>
            <input
              className='form__input'
              id='email'
              type='email'
              placeholder='Your Email'
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
              placeholder='Password (Min. 8 Characters)'
              id='password'
              type='password'
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
          <div className='form__group'>
            <input
              className='form__input'
              id='passwordConfirm'
              placeholder='Confirm Password'
              type='password'
              required
              value={passwordConfirm}
              pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <label className='form__label-input' htmlFor='passwordConfirm'>
              Confirm Password
            </label>
          </div>
          <div className='form__group'>
            <button className='btn' type='submit'>
              Register
            </button>
          </div>
        </form>
        <div>
          <p className='paragraph'>
            Have an Account ?{' '}
            <Link to='/login' className='btn-text'>
              Login
            </Link>
          </p>
        </div>
      </Spiner>
    </>
  );
};

export default SignUp;
