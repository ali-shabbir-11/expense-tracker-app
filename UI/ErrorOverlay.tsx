import { GlobalStyles } from '@/constants/styles'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ErrorOverlay = ({ message }: { message: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>A problem occurred!</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    gap: 8,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    fontSize: 14,
    color: 'white',
  },
})