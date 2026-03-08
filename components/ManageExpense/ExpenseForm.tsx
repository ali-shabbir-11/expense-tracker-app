import { Expense } from '@/types/Expense'
import Button from '@/UI/Button'
import { getFormattedDate } from '@/utils/date'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from './Input'

type Inputs = {
  amount: string
  date: string
  description: string
}

const ExpenseForm = ({ isEditing, onCancel, onSubmit, selectedExpense }: { isEditing: boolean, onCancel: () => void, onSubmit: (expenseData: any) => void, selectedExpense?: Expense }) => {
  const [inputs, setInputs] = useState<Inputs>({
    amount: selectedExpense?.amount.toString() ?? '',
    date: getFormattedDate(selectedExpense?.date) ?? '',
    description: selectedExpense?.description ?? '',
  })
  const [focus, setFocus] = useState<string[]>([]);

  const inputChangeHandler = (inputIdentifier: string, enteredValue: string) => {
    setInputs((curInputs) => {
      return { ...curInputs, [inputIdentifier]: enteredValue }
    })
    
    // Clear error when user starts fixing the input
    if (focus.includes(inputIdentifier)) {
      setFocus(focus.filter(field => field !== inputIdentifier))
    }
  }

  const submitHandler = () => {
    const errors: string[] = [];
    
    const amountIsValid = inputs.amount.trim().length > 0 && !isNaN(Number(inputs.amount)) && Number(inputs.amount) > 0;
    if (!amountIsValid) {
      errors.push('amount');
    }
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dateIsValid = inputs.date && dateRegex.test(inputs.date.toString()) && !isNaN(new Date(inputs.date).getTime());
    if (!dateIsValid) {
      errors.push('date');
    }
    
    const descriptionIsValid = inputs.description.trim().length > 0;
    if (!descriptionIsValid) {
      errors.push('description');
    }
    
    if (errors.length > 0) {
      setFocus(errors);
      return;
    }

    const expenseData = {
      ...inputs,
      amount: +inputs.amount,
      date: new Date(inputs.date),
    }

    onSubmit(expenseData)
    setFocus([]);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsContainer}>
        <Input label='Amount' placeholder='Amount' style={styles.input} error={focus.includes('amount')} textInputConfig={{ 
          keyboardType: 'decimal-pad', value: inputs.amount, onChangeText: (enteredValue: string) => inputChangeHandler('amount', enteredValue) 
        }} 
        />
        <Input label='Date' placeholder='YYYY-MM-DD' style={styles.input} error={focus.includes('date')} textInputConfig={{
            keyboardType: 'decimal-pad', maxLength: 10, value: inputs.date, onChangeText: (enteredValue: string) => inputChangeHandler('date', enteredValue) 
        }} />
      </View>
      <Input label='Description' placeholder='Description' error={focus.includes('description')} textInputConfig={{ 
        keyboardType: 'decimal-pad', multiline: true, value: inputs.description, onChangeText: (enteredValue: string) => inputChangeHandler('description', enteredValue) 
      }} />
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  input: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    minWidth: 120,
  }
})