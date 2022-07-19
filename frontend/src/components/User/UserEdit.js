import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../redux/user/userActions';
import { useParams } from 'react-router-dom';

import UserUpload from './UserUpload';
import Spiner from '../Spiner';
import { USER_UPDATE_RESET } from '../../redux/user/userTypes';
import Message from '../Message';

const UserUpdate = () => {
  const params = useParams();
  const userId = params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!user || !user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhoto(user.photo);
      setRole(user.role);
    }
  }, [dispatch, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, photo, role }));
  };

  return (
    <>
      {error ? (
        <Message className='error'>{error}</Message>
      ) : (
        <>
          <div className='flex flex-dc flex-ai-c'>
            <Spiner isLoading={loadingUpdate} />
            {errorUpdate && <Message className='error'>{errorUpdate}</Message>}
            {successUpdate && (
              <Message
                className='success'
                reset={USER_UPDATE_RESET}
                linkTo='/admin/users'
                open
              >
                Success Edit User
              </Message>
            )}
          </div>
          <Spiner isLoading={loading}>
            <form className='form' onSubmit={submitHandler}>
              <div className='form__group'>
                <input
                  className='form__input'
                  id='name'
                  type='name'
                  value={name}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className='form__label-input' htmlFor='email'>
                  Email Address
                </label>
              </div>
              <div className='form__group flex flex-ai-c'>
                <UserUpload photo={photo} setPhoto={setPhoto} />
              </div>
              <div className='form__group'>
                <div className='form__radio-group'>
                  <input
                    className='form__radio-input'
                    type='radio'
                    id='user'
                    name='user'
                    value='user'
                    checked={role === 'user'}
                    onChange={() => setRole('user')}
                  />
                  <label className='form__radio-label' htmlFor='user'>
                    <span className='form__radio-button'></span>
                    user
                  </label>
                </div>
                <div className='form__radio-group'>
                  <input
                    className='form__radio-input'
                    type='radio'
                    id='admin'
                    name='admin'
                    value='admin'
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                  />
                  <label className='form__radio-label' htmlFor='admin'>
                    <span className='form__radio-button'></span>
                    admin
                  </label>
                </div>
              </div>

              <div className='form__group'>
                <button className='btn btn-form' type='submit'>
                  Edit User
                </button>
              </div>
            </form>
          </Spiner>
        </>
      )}
    </>
  );
};
export default UserUpdate;
