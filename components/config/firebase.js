import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';


const config = {
    apiKey: "AIzaSyBYva35xeORJXCMpG2Dr9H2GPnKCaRcQ64",
    authDomain: "intouch-chatapp.firebaseapp.com",
    projectId: "intouch-chatapp",
    storageBucket: "intouch-chatapp.appspot.com",
    messagingSenderId: "577035920234",
    appId: "1:577035920234:web:1cc55f3f07098b4f26fb13"
}

// init firebase
const app = initializeApp(config);

// init Cloud Firestore and get reference to service
export const db = getFirestore(app); 

// init Firebase Auth and get reference to service
export const auth = initializeAuth(app, {
    persistance: getReactNativePersistence(AsyncStorage)
});