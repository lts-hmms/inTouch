<h1 align="center">Welcome to inTouch</h1>

> inTouch is a chat app for mobile devices using React Native. The app provides users with a chat interface and options to share images and their location.

## Description

- A start page where users can enter their name and choose a background color for the chat screen before joining the chat
- After starting the chat, a page displays the conversation as well as an input field and submit button
- Additional communication features like sending images and location data
- Asks for permission using the camera, access to the media library and to get the current location
- Messages get stored in a Google Firestore Database
- Chat conversations are stored locally as well
- Images get stored in Firebase Cloud Storage

_It's planned to integrate the ability to record and send voice messages._

## Built with

- [React Native](https://reactnative.dev/)
- [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)
- [Expo](https://expo.dev/)
- [Firebase including Firestore](https://firebase.google.com/)

## Setting up development environment

- Install Expo CLI: `npm install expo-cli -g`
  and login with your Expo account using `expo login`
- Install necessary procet dependencies: `npm i`
- Install the Expo Go App from [Apple Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&gl=DE) to test the project on your mobile device
- Install [Android Studio](https://developer.android.com/studio) for Android Emulator or [Xcode](https://apps.apple.com/de/app/xcode/id497799835?mt=12) for ios Simulator to test the app

## Setting up your database

- Sign in at Google Firebase
- Create a new project in test mode
- In there create a Firestore Database
- At 'Settings' -> 'General' -> 'Your apps' -> 'Firestore for Web' generate your configuration object.
- In the `App.js` file replace the `firebaseConfig` variable with the configuration info from your own Firestore database:

```
firebase.initializeApp({
  apiKey: 'your-api-key',
  authDomain: 'your-authdomain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
});
```

## Run the project

- Start the app by running npx expo start or expo start
- Using the Expo Go app start inTouch by scanning the QR code in your terminal
- Using the Emulator/Simulator press `a` for Android or `i` for ios

## Author

- [Website](https://judith.sueggeler.com)
- [LinkedIn](https://linkedin.com/in/judith-sueggeler/)
