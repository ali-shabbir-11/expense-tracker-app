import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { View } from 'react-native';
import { GlobalStyles } from './constants/styles';
import AllExpenses from './screens/AllExpenses';
import Login from './screens/Login';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import Signup from './screens/Signup';
import AuthContextProvider, { AuthContext } from './store/Auth-Context';
import ExpensesContextProvider from './store/Expenses-Context';
import IconButton from './UI/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <BottomTabs.Navigator screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => {
        return (
          <View style={{ flexDirection: 'row' }}>  
            <IconButton icon='add' size={24} color={tintColor || 'white'} onPress={() => { navigation.navigate('ManageExpense') }} style={{ marginHorizontal: 0 }} />
            <IconButton icon='exit' size={24} color={tintColor || 'white'} onPress={() => { logout() }} style={{ marginHorizontal: 0 }} />
          </View>
        )
      }
    })}>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hourglass" color={color} size={size} />
        ),
      }} />
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" color={color} size={size} />
        ),
      }} />
    </BottomTabs.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: 'white',
    }}>
      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Signup" component={Signup} options={{
        headerShown: false,
      }} />
    </Stack.Navigator>
  )
}

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: 'white',
    }}>
      <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{
        headerShown: false,
      }} />
      <Stack.Screen name='ManageExpense' component={ManageExpense} options={{
        presentation: 'modal',
      }} />
    </Stack.Navigator>
  )
}

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);
  
  
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <AuthContextProvider>
        <ExpensesContextProvider>
          <Navigation />
        </ExpensesContextProvider>
      </AuthContextProvider>
    </>
  );
}
