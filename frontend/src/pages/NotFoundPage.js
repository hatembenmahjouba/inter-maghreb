import React from 'react';

import { useHistory } from 'react-router-dom';

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <>
      <section className='form-container flex flex-dc flex-ai-c'>
        <h2 className='u-margin-bottom-big heading-2'>Page Not Found</h2>
        <p className='paragraph'>
          Sorry, the page you were looking for cannot be found.{' '}
          <button className='btn-text' onClick={() => history.goBack()}>
            Go Back
          </button>
        </p>
      </section>
    </>
  );
};
export default NotFoundPage;
