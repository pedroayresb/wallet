import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalArray = [];
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        const { value, currency, exchangeRates } = expense;
        const exchangeRate = exchangeRates[currency].ask;
        const converted = value * exchangeRate;
        totalArray.push(converted);
      });
    }
    const total = totalArray.reduce((acc, curr) => acc + curr, 0);
    return (
      <header className="header-container">
        <h1>TrybeWallet</h1>
        <div>
          <span>Email:</span>
          {' '}
          {' '}
          <span data-testid="email-field">{email}</span>
        </div>
        <div>
          <span data-testid="header-currency-field">BRL</span>
          {' '}
          {' '}
          <span data-testid="total-field">{ parseFloat(total).toFixed(2) }</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      codein: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      high: PropTypes.string.isRequired,
      low: PropTypes.string.isRequired,
      varBid: PropTypes.string.isRequired,
      pctChange: PropTypes.string.isRequired,
      bid: PropTypes.string.isRequired,
      ask: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      create_date: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
