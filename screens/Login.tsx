import { useContext, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import AuthContent from '@/auth/AuthContent';
import { GlobalStyles } from '@/constants/styles';
import { AuthContext } from '@/store/Auth-Context';
import LoadingOverlay from '@/UI/LoadingOverlay';
import { login } from '@/utils/auth';

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useContext(AuthContext);

  const loginHandler = async ({ email, password }: { email: string, password: string }) => {
    setIsAuthenticating(true);  
    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View style={styles.container}>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
  },
});