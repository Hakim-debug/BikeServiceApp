import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LoginScreen from './LoginScreen';

// import Profil from './ProfilScreen';
// import BikeStore from './BikeStore';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import RegisterScreen from './RegisterScreen';
import Mapscreen from './MapScreen';
import ProfilScreen from './ProfileScreen';
import ChatHomeScreen from './ChatHomeScreen';
import BookServiceScreen from './BookServiceScreen';
import ChatScreen from './ChatScreen';
import AddChatScreen from './AddChatScreen';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  const navigation = useNavigation();
  const logOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: { backgroundColor: '#ffff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={logOutUser} activeOpacity={0.5}>
            {/* Register user  whit your profil picture */}
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),

      headerRight: () => (
        <View
          styles={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginLeft: 20,
            padding: 10,
          }}
        >
          {/* Camrera*/}
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={20} color="black" />
          </TouchableOpacity>

          {/* Navigates to add chat screen */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Map')}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Map"
        component={Mapscreen}
        options={{
          tabBarLabel: 'Maps',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddChat"
        component={AddChatScreen}
        options={{
          tabBarLabel: 'chats',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wechat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Book"
        component={BookServiceScreen}
        options={{
          tabBarLabel: 'Book',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({});
