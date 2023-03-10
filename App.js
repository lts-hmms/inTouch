import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

// import the screens we want to navigate
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';

import { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
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
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
