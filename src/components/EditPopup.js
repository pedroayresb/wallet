import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { fetchCurrencies, editExpense } from '../redux/actions/index';

class EditPopup extends Component {
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
    const { id, expenses } = this.props;
    const expense = expenses.find((item) => item.id === id);
    const { value, description, currency, method, tag } = expense;
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
      id,
    });
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
      const { dispatch } = this.props;
      dispatch(editExpense(this.state));
    });
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <Popup
        trigger={
          <button
            type="button"
            data-testid="edit-btn"
          >
            Editar
          </button>
        }
        modal
      >
        {(close) => (
          <div className="modal">
            <button
              type="button"
              className="close"
              data-testid="close-btn"
              onClick={ close }
            >
              &times;
            </button>
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
                  close();
                } }
              >
                Editar despesa
              </button>
            </form>
          </div>
        )}
      </Popup>
    );
  }
}

EditPopup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.number),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(EditPopup);
