import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Mapscreen from './Screens/MapScreen';
import ProfilScreen from './Screens/ProfileScreen';
import { BottomNavigation } from 'react-native-paper';
import AddChatScreen from './Screens/AddChatScreen';
import ChatScreen from './Screens/ChatScreen';
import ChatHomeScreen from './Screens/ChatHomeScreen';
import BottomNav from './Navigation/BottomNav';
import BookServiceScreen from './Screens/BookServiceScreen';

//Header color of all Screens
const globalScreenOptions = {
  headerStyle: { backgroundColor: 'orange' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        {/* Navigates the screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={Mapscreen} />
        <Stack.Screen name="Profile" component={ProfilScreen} />
        <Stack.Screen name="Nav" component={BottomNav} />
        <Stack.Screen name="ChatHome" component={ChatHomeScreen} />
        <Stack.Screen name="Book" component={BookServiceScreen} />

        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
