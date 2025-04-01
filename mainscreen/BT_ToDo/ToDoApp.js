import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import CreateNewItemScreen from './screens/CreateNewItemScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Initialize default users in AsyncStorage if they don't exist
    const initializeUsers = async () => {
      try {
        const usersData = await AsyncStorage.getItem('users');
        if (!usersData) {
          const defaultUsers = [
            { username: 'user1', password: 'pass1' },
            { username: 'user2', password: 'pass2' },
            { username: 'admin', password: 'admin123' }
          ];
          await AsyncStorage.setItem('users', JSON.stringify(defaultUsers));
          console.log('Default users initialized');
        }
      } catch (error) {
        console.error('Error initializing users:', error);
      }
    };

    initializeUsers();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="CreateNewItem" component={CreateNewItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;