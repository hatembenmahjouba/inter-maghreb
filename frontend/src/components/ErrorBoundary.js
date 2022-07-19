import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrored: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className='section-container'>
          <div className='error-boundary  flex flex-dc flex-ai-c'>
            <h2 className='heading-2'>Sorry this page is broken</h2>
            <div className='error-boundary__image'></div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
