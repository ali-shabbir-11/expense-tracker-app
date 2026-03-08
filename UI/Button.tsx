import { GlobalStyles } from '@/constants/styles'
import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

const Button = ({ children, onPress, mode, style }: { children: React.ReactNode, onPress: () => void, mode?: 'flat', style?: StyleProp<ViewStyle> }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.button, 
      mode === 'flat' && styles.flat, 
      style,
      pressed && styles.pressed
    ]}>
      <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
})