import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ExpenseItem from './ExpenseItem'
import { ExpensesProps } from './ExpensesOutput'

const ExpensesList = ({ expenses }: Partial<ExpensesProps>) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseItem description={item.description} amount={item.amount} date={item.date} id={item.id} />}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
  )
}

export default ExpensesList

const styles = StyleSheet.create({
  list: {
    flex: 1,
  }
})