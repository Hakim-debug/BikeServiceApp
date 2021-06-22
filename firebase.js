import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA_ZN9brIlAuNRX6AP1XlLf3IF3oEngZ54',
  authDomain: 'bikeserviceapp-8094e.firebaseapp.com',
  projectId: 'bikeserviceapp-8094e',
  storageBucket: 'bikeserviceapp-8094e.appspot.com',
  messagingSenderId: '313015550008',
  appId: '1:313015550008:web:6ad549a9eed822b688a6cd',
};

let app;
//Did a funtion so You dont have to login again
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
