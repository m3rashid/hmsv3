import React from 'react';

const Catch = (component) => {
  return class extends React.Component {
    state = {
      error: undefined,
    };

    static getDerivedStateFromError(error) {
      return { error };
    }

    removeError() {
      this.setState({ error: undefined });
    }

    componentDidCatch(error, info) {
      console.log(error, info);
    }

    render() {
      return component(this.props, this.state.error, this.removeError.bind(this));
    }
  };
};

export default Catch;
