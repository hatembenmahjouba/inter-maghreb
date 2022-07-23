import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserProfile,
  updateUserProfile,
} from '../../redux/user/userActions';

import UserUpload from './UserUpload';
import Spiner from '../Spiner';
import Message from '../Message';
import { USER_UPDATE_PROFILE_RESET } from '../../redux/user/userTypes';

const UserProfileUpdate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUser, error: errorUpdate } = userUpdateProfile;

  useEffect(() => {
    if (!user || !user.name || !user.photo || successUser) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserProfile());
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhoto(user.photo);
    }
  }, [dispatch, user, successUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, email, photo }));
  };

  return (
    <>
      {error ? (
        <Message className='error'>{error}</Message>
      ) : (
        <>
          <div className='flex flex-dc flex-ai-c'>
            {successUser && (
              <Message
                className='success'
                reset={USER_UPDATE_PROFILE_RESET}
                open
              >
                Profile Updated
              </Message>
            )}
          </div>
          <Spiner isLoading={loading}>
            {errorUpdate ? (
              <Message className='error'>{errorUpdate}</Message>
            ) : (
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
                  <button className='btn btn-form' type='submit'>
                    Update Profile
                  </button>
                </div>
              </form>
            )}
          </Spiner>
        </>
      )}
    </>
  );
};
export default UserProfileUpdate;
