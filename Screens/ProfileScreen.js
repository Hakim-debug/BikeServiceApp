import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';

import firestore from '../firebase';
import BottomNav from '../Navigation/BottomNav';

import ListItems from '../Components/ListItems';
import { auth, db } from '../firebase';

const ProfilScreen = ({ navigation, route }) => {
  // const { user, logout } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // const fetchPosts = async () => {
  //   try {
  //     const list = [];

  //     await firestore()
  //       .collection('posts')
  //       .where('userId', '==', route.params ? route.params.userId : user.uid)
  //       .orderBy('postTime', 'desc')
  //       .get()
  //       .then((querySnapshot) => {
  //         // console.log('Total Posts: ', querySnapshot.size);

  //         querySnapshot.forEach((doc) => {
  //           const { userId, post, postImg, postTime, likes, comments } =
  //             doc.data();
  //           list.push({
  //             id: doc.id,
  //             userId,
  //             userName: 'Test Name',
  //             userImg:
  //               'https://freepngimg.com/thumb/mario/20698-7-mario-transparent-background.png',
  //             postTime: postTime,
  //             post,
  //             postImg,
  //             liked: false,
  //             likes,
  //             comments,
  //           });
  //         });
  //       });

  //     setPosts(list);

  //     if (loading) {
  //       setLoading(false);
  //     }

  //     console.log('Posts: ', posts);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const getUser = async () => {
  //   await firestore()
  //     .collection('users')
  //     .doc(route.params ? route.params.userId : user.uid)
  //     .get()
  //     .then((documentSnapshot) => {
  //       if (documentSnapshot.exists) {
  //         console.log('User Data', documentSnapshot.data());
  //         setUserData(documentSnapshot.data());
  //       }
  //     });
  // };

  // useEffect(() => {
  //   getUser();
  //   fetchPosts();
  //   navigation.addListener('focus', () => setLoading(!loading));
  // }, [navigation, loading]);

  const handleDelete = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <ListItems
          style={styles.userImg}
          source={{ uri: auth?.currentUser?.photoURL.name }}
          // source={{
          //   uri: userData
          //     ? userData.userImg ||
          //       'https://assets.webiconspng.com/uploads/2017/09/Simpsons-PNG-Image-55525-300x300.png'
          //     : 'https://assets.webiconspng.com/uploads/2017/09/Simpsons-PNG-Image-55525-300x300.png',
          // }}
        />

        <Text style={styles.userName}>
          {userData ? userData.name || 'Test' : 'Test'}{' '}
          {userData ? userData.name || 'User' : 'User'}
        </Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>
          {userData ? userData.about || 'No details added.' : ''}
        </Text>
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}
              >
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>

        {posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
