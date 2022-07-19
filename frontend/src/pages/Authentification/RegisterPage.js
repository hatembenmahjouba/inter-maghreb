import React from 'react';

import SignUp from '../../components/Auth/SignUp';

const RegisterPage = () => (
  <section className='form-container'>
    <div className='u-margin-bottom-big flex flex-ai-c flex-dc'>
      <h2 className='heading-2'>Sign Up</h2>
    </div>
    <SignUp />
  </section>
);
export default RegisterPage;
