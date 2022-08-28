import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../redux/actions';

class LoginComponent extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  validation = () => {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordRegex = /^[a-z0-9]{6,}$/;
    const emailTest = emailRegex.test(email);
    const passwordTest = passwordRegex.test(password);
    if (emailTest && passwordTest) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validation());
  };

  render() {
    const { email, isDisabled } = this.state;
    const { onSubmit, dispatch } = this.props;
    return (
      <div>
        <form className="login-form">
          <input
            type="text"
            name="email"
            placeholder="Username"
            data-testid="email-input"
            onChange={ this.onInputChange }
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => {
              dispatch(userLogin(email));
              onSubmit();
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LoginComponent);
