import { GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
  SAVE_EXPENSE,
  DELETE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  error: '',
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case GET_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case SAVE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: action.expense.value,
        description: action.expense.description,
        currency: action.expense.currency,
        method: action.expense.method,
        tag: action.expense.tag,
        exchangeRates: action.expense.exchangeRates }] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expense) };
  default:
    return state;
  }
};

export default wallet;
