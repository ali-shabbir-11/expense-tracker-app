import { ExpensesContext } from '@/store/Expenses-Context'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={expenses} expensesPeriodName='Total' fallbackText='No expenses found.' />
    </View>
  )
}

export default AllExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})