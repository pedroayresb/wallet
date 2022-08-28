import React from 'react';
import PropTypes from 'prop-types';
import LoginComponent from '../components/LoginComponent';

class Login extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <LoginComponent onSubmit={ this.onSubmit } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
