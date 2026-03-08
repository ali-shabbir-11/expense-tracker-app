import { GlobalStyles } from '@/constants/styles'
import { Expense } from '@/types/Expense'
import { StyleSheet, Text, View } from 'react-native'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'

export type ExpensesProps = {
  expenses: Expense[],
  expensesPeriodName: string,
  fallbackText?: string
}

export const DUMMY_EXPENSES = [
  {
    id: 'e1',
    amount: 59.99,
    date: new Date('2021-12-01'),
    description: 'A pair of shoes',
  },
  {
    id: 'e2',
    amount: 89.99,
    date: new Date('2021-12-02'),
    description: 'A pair of pants',
  },
  {
    id: 'e3',
    amount: 5.99,
    date: new Date('2021-11-03'),
    description: 'Some Bananas',
  },
  {
    id: 'e4',
    amount: 10.99,
    date: new Date('2021-01-04'),
    description: 'A Book',
  },
  {
    id: 'e5',
    amount: 15.99,
    date: new Date('2021-09-04'),
    description: 'Another Book',
  },
  {
    id: 'e6',
    amount: 15.99,
    date: new Date('2021-07-04'),
    description: 'Another Book',
  },
  {
    id: 'e7',
    amount: 15.99,
    date: new Date('2021-04-04'),
    description: 'Another Book',
  },
  {
    id: 'e8',
    amount: 15.99,
    date: new Date('2021-01-04'),
    description: 'Another Book',
  },
  {
    id: 'e9',
    amount: 15.99,
    date: new Date('2021-05-04'),
    description: 'Another Book',
  },
  {
    id: 'e10',
    amount: 15.99,
    date: new Date('2021-03-04'),
    description: 'Another Book',
  },
]

const ExpensesOutput = ({ expenses, expensesPeriodName, fallbackText }: ExpensesProps) => {
  let content: React.ReactNode = <Text style={styles.infoText}>{fallbackText || 'No expenses found.'}</Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensesPeriodName={expensesPeriodName} />
      {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 32,
  },
})