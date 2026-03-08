import { Expense } from "@/types/Expense";
import { createContext, useState } from "react";

export const ExpensesContext = createContext<{
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Expense) => void;
  setsExpenses: (expenses: Expense[]) => void;
}>({
  expenses: [],
  addExpense: (expense: Expense) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, expense: Expense) => {},
  setsExpenses: (expenses: Expense[]) => {},
})

const ExpensesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [{ ...expense, id: Math.random().toString() }, ...prevExpenses]);
  }

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  }

  const updateExpense = (id: string, expense: Expense) => {
    setExpenses((prevExpenses) => prevExpenses.map((e) => e.id === id ? { ...e, ...expense } : e));
  }

  const setsExpenses = (expenses: Expense[]) => {
    const inverted = expenses.reverse();
    setExpenses(inverted);
  }

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    setsExpenses,
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;