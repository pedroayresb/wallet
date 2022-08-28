import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, editExpense } from '../redux/actions/index';

class Edit extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    const url = window.location.href;
    const id = url.split('/')[4];
    this.setState({ id });
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onEdit = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    delete currencies.USDT;
    this.setState({ exchangeRates: currencies }, () => {
      const { dispatch, history, expenses } = this.props;
      const { id } = this.state;
      expenses.forEach((expense) => {
        if (Number(expense.id) === Number(id)) {
          const { value,
            description,
            currency,
            method,
            tag,
            exchangeRates } = this.state;
          expense.value = value;
          expense.description = description;
          expense.currency = currency;
          expense.method = method;
          expense.tag = tag;
          expense.id = Number(id);
          expense.exchangeRates = exchangeRates;
        }
      });
      dispatch(editExpense(expenses));
      history.push('/carteira');
    });
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
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
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.onInputChange }
        >
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
          data-testid="edit-btn"
          onClick={ () => {
            this.onEdit();
          } }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}
Edit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      USD: PropTypes.string.isRequired,
      EUR: PropTypes.string.isRequired,
      GBP: PropTypes.string.isRequired,
      ARS: PropTypes.string.isRequired,
      BTC: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Edit);
