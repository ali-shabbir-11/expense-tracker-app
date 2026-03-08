import axios from 'axios';

const BACKEND_URL = 'https://expense-tracker-app-7def5-default-rtdb.asia-southeast1.firebasedatabase.app/';

export const storeExpense = async (expenseData: any, token: string): Promise<string> => {
  const response = await axios.post(BACKEND_URL + 'expense.json' + `?auth=${token}`, expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async (token: string) => {
  const response = await axios.get(BACKEND_URL + 'expense.json' + `?auth=${token}`);
  const expenses = [];
  for (const key in response.data) {
    const expenseData = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseData);
  }
  return expenses;
};

export const updateExpense = async (id: string, expenseData: any, token: string) => {
  return axios.put(BACKEND_URL + `/expense/${id}.json` + `?auth=${token}`, expenseData);
};

export const deleteExpense = async (id: string, token: string) => {
  return axios.delete(BACKEND_URL + `/expense/${id}.json` + `?auth=${token}`);
};