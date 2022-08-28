export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_ERROR = 'GET_CURRENCIES_ERROR';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  email,
});

const getCurrenciesSuccess = (currencies) => ({
  type: GET_CURRENCIES_SUCCESS,
  currencies,
});

const getCurrenciesError = (error) => ({
  type: GET_CURRENCIES_ERROR,
  error,
});

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  expense,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    delete currencies.USDT;
    dispatch(getCurrenciesSuccess(Object.keys(currencies)));
  } catch (error) {
    dispatch(getCurrenciesError(error));
  }
};
