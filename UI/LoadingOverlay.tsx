import { GlobalStyles } from '@/constants/styles'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const LoadingOverlay = ({ message }: { message?: string }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color='white' />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  message: {
    color: 'white',
    fontSize: 16,
    marginTop: 12,
  },
})