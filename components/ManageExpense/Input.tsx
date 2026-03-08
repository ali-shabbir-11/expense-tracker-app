import { GlobalStyles } from '@/constants/styles'
import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

const Input = ({ label, textInputConfig, placeholder, style, error }: { label: string, textInputConfig: TextInputProps, placeholder: string, style?: any, error?: boolean }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, error && styles.errorLabel]}>{label}</Text>
      <TextInput {...textInputConfig} placeholder={placeholder} style={[styles.input, textInputConfig.multiline && styles.inputMultiline]} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  errorLabel: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    fontSize: 12,
    marginBottom: 4,
  },
})