import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '@/constants/styles';
import { AuthContext } from '@/store/Auth-Context';
import { ExpensesContext } from '@/store/Expenses-Context';
import ErrorOverlay from '@/UI/ErrorOverlay';
import LoadingOverlay from '@/UI/LoadingOverlay';
import { deleteExpense, storeExpense, updateExpense } from '@/utils/http';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../UI/IconButton';

const ManageExpense = ({ route, navigation }: { route: any, navigation: any }) => {
  const { expenses, addExpense, deleteExpense: deleteExpenseContext, updateExpense: updateExpenseContext } = useContext(ExpensesContext);
  const { token } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  const selectedExpense = expenses.find((expense: any) => expense.id === editedExpenseId);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId, token as string);
      deleteExpenseContext(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setError('Could not delete expense - please try again later!');
    } finally {
      setIsSubmitting(false);
    }
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = async (expenseData: any) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateExpense(editedExpenseId, expenseData, token as string);
        updateExpenseContext(editedExpenseId, {
          id: editedExpenseId,
          ...expenseData,
        });
      } else {
        const id = await storeExpense(expenseData, token as string);
        addExpense({
          id: id,
          ...expenseData,
        });
      }
      navigation.goBack();
    } catch (error: any) {
      setError('Could not save expense - please try again later!');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorOverlay message={error} />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm isEditing={isEditing} onCancel={cancelHandler} onSubmit={confirmHandler} selectedExpense={selectedExpense} />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon='trash' size={36} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
})