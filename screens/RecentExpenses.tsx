import { AuthContext } from '@/store/Auth-Context';
import { ExpensesContext } from '@/store/Expenses-Context';
import ErrorOverlay from '@/UI/ErrorOverlay';
import LoadingOverlay from '@/UI/LoadingOverlay';
import { getDateMinusDays } from '@/utils/date';
import { fetchExpenses } from '@/utils/http';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const RecentExpenses = () => {
  const { setsExpenses, expenses } = useContext(ExpensesContext);
  const { token } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpensesHandler = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses(token || '');
        setsExpenses(expenses);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch expenses');
      } finally {
        setIsFetching(false);
      }
    };
    fetchExpensesHandler();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (isFetching) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorOverlay message={error} />
  }

  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={recentExpenses} expensesPeriodName='Last 7 Days' fallbackText='No expenses registered for the last 7 days.' />
    </View>
  )
}

export default RecentExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})