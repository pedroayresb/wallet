import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Expense extends Component {
  render() {
    const { value,
      id,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      dispatch } = this.props;
    return (
      <tr className="expense">
        <td>
          { description }
        </td>
        <td>
          { tag }
        </td>
        <td>
          { method }
        </td>
        <td>
          {currency}
          { ' ' }
          { parseFloat(value).toFixed(2) }
        </td>
        <td>
          { exchangeRates[currency].name }
        </td>
        <td>
          { parseFloat(exchangeRates[currency].ask).toFixed(2) }
        </td>
        <td>
          { parseFloat(value * exchangeRates[currency].ask).toFixed(2) }
        </td>
        <td>
          BRL
        </td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => { dispatch(deleteExpense(id)); } }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

Expense.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Expense);
