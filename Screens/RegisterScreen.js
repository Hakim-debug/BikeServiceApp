import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Button, Input, Image, Text } from 'react-native-elements';
import { useState, useEffect, useLayoutEffect } from 'react';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  //Maping pice of states to placeholder
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  //Back to Login
  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        //if you logout this will replace the Mapscreen
        navigation.navigate('Profile');
      }
    });

    //clen up fution from Fb
    return () => unsubscribe;
  }, [navigation]);
  //Funtion register user to  firebase
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            'https://assets.webiconspng.com/uploads/2017/09/Simpsons-PNG-Image-55525-300x300.png',
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 200 }}>
        Register at BikeSimplify App
      </Text>
      {/* Putting all textvalue in an inputContainer */}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profil Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button onPress={register} title="Registera" />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  button: { width: 200, marginTop: 10 },
  inputContainer: {
    width: 300,
  },
});
