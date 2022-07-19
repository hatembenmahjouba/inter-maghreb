import React from 'react';

import ForgotPassword from '../../components/Auth/ForgotPassword';

const ForgotPasswordPage = () => (
  <section className='form-container'>
    <div className='u-margin-bottom-big flex flex-ai-c flex-dc'>
      <h2 className='heading-2'>Forgot Password</h2>
    </div>
    <ForgotPassword />
  </section>
);
export default ForgotPasswordPage;
