import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, saveExpense } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      isDisabled: true,
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validation());
  };

  validation = () => {
    const { value } = this.state;
    const valueRegex = /^\$?\d+(,\d{3})*(\.\d*)?$/;
    const valueTest = valueRegex.test(value);
    const isDisabled = !(valueTest);
    this.setState({ isDisabled });
  };

  onSubmit = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    delete currencies.USDT;
    this.setState({ exchangeRates: currencies }, () => {
      const { dispatch } = this.props;
      dispatch(saveExpense(this.state));
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        isDisabled: true,
        exchangeRates: [],
      });
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, isDisabled } = this.state;
    return (
      <form className="add-expense-form">
        <input
          type="text"
          placeholder="Valor"
          name="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.onInputChange }
        />
        <input
          type="text"
          placeholder="Descrição"
          name="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.onInputChange }
        />
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.onInputChange }
        >
          {currencies.map((currency) => (
            <option key={ currency } value={ currency }>
              { currency }
            </option>
          ))}
        </select>
        <select data-testid="method-input" name="method" onChange={ this.onInputChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select data-testid="tag-input" name="tag" onChange={ this.onInputChange }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="reset"
          disabled={ isDisabled }
          onClick={ this.onSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
