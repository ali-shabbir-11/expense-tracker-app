import { useContext, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import AuthContent from '@/auth/AuthContent';
import { GlobalStyles } from '@/constants/styles';
import { AuthContext } from '@/store/Auth-Context';
import LoadingOverlay from '@/UI/LoadingOverlay';
import { createUser } from '@/utils/auth';
import { useNavigation } from '@react-navigation/native';

function SignupScreen() {
  const { authenticate } = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();

  const signupHandler = async ({ email, password }: { email: string, password: string }) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
      (navigation as any).replace('Login');
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <View style={styles.container}>
      <AuthContent isLogin={false} onAuthenticate={signupHandler} />
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
  },
});