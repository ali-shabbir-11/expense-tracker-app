import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Input from '@/components/ManageExpense/Input';
import Button from '../UI/Button';

type AuthFormProps = {
  isLogin: boolean;
  onSubmit: (credentials: { email: string, confirmEmail: string, password: string, confirmPassword: string }) => void;
  credentialsInvalid: { email: boolean, confirmEmail: boolean, password: boolean, confirmPassword: boolean };
};

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }: AuthFormProps) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  const submitHandler = () => {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <Input
        label="Email Address"
        textInputConfig={{
          onChangeText: (text) => setEnteredEmail(text),
          value: enteredEmail,
          keyboardType: 'email-address',
        }}
        placeholder="Email Address"
        error={emailIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Email Address"
          textInputConfig={{
            onChangeText: (text) => setEnteredConfirmEmail(text),
            value: enteredConfirmEmail,
            keyboardType: 'email-address',
          }}
          placeholder="Confirm Email Address"
          error={emailsDontMatch}
        />
      )}
      <Input
        label="Password"
        textInputConfig={{
          onChangeText: (text) => setEnteredPassword(text),
          value: enteredPassword,
          secureTextEntry: true,
        }}
        placeholder="Password"
        error={passwordIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          textInputConfig={{
            onChangeText: (text) => setEnteredConfirmPassword(text),
            value: enteredConfirmPassword,
            secureTextEntry: true,
          }}
          placeholder="Confirm Password"
          error={passwordsDontMatch}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={submitHandler}>
          {isLogin ? 'Login' : 'Signup'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 12,
  },
  buttonContainer: {
    marginTop: 12,
  },
});

export default AuthForm;