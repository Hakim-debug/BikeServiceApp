import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useEffect } from 'react';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';

import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // console.log(authUser);
      if (authUser) {
        //if you logout this will replace the homescreen
        navigation.replace('Home');
      }
    });

    //clen up fution from Fb
    return () => unsubscribe;
  }, [navigation]);
  //This method sings you in with auth Firesbase
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  // const { login, googleLogin, fbLogin } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: 'https://previews.123rf.com/images/kostymo/kostymo1707/kostymo170700115/82270238-logo-bike-service-a-bicycle-sprocket-and-hand-holding-a-wrench-on-the-sides-repair-tune-mountain-bik.jpg',
        }}
        style={styles.logo}
      />
      <Text style={styles.text}>BikeSimplify</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={() => signIn(email, password)}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      {/*
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null} */}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
