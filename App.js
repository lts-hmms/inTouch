import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// import the screens we want to navigate
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
const firebaseConfig = {
  apiKey: "AIzaSyBYva35xeORJXCMpG2Dr9H2GPnKCaRcQ64",
  authDomain: "intouch-chatapp.firebaseapp.com",
  projectId: "intouch-chatapp",
  storageBucket: "intouch-chatapp.appspot.com",
  messagingSenderId: "577035920234",
  appId: "1:577035920234:web:1cc55f3f07098b4f26fb13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get reference to service
const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeScreen'
      >
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
        />
        <Stack.Screen
          name='ChatScreen'
        >
          {props => <ChatScreen db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
