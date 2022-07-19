import React from 'react';

import SignIn from '../../components/Auth/SignIn';

const LoginPage = () => (
  <section className='form-container'>
    <div className='u-margin-bottom-big flex flex-ai-c flex-dc'>
      <h2 className='heading-2'>Sign In</h2>
    </div>
    <SignIn />
  </section>
);
export default LoginPage;
