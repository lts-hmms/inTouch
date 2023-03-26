import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {

    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePicture();
                        return;
                    case 2:
                        getLocation();
                        return;
                    default:

                }
            }
        )
    }

    const pickImage = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) { 
                const imageURI = result.assets[0].uri;
                uploadAndSendImage(imageURI);   
            }
            else Alert.alert('Permission denied');
        }
    }

    const takePicture = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) {
                const imageURI = result.assets[0].uri;
                uploadAndSendImage(imageURI);   
                let MediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
                if (MediaLibraryPermission?.granted) await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
            }else Alert.alert('Permission denied');
        } 
    }

    const generateReference = (uri) => {
        const timestamp = new Date().getTime();
        const imageName = uri.split('/')[uri.split('/').length - 1];
        return `${userID}-${timestamp}-${imageName}`;
    }

    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async(snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref)
            onSend({image: imageURL});
        });
    }


    const getLocation = async () => {
        let permission = await Location.requestForegroundPermissionsAsync();
        if (permission?.granted) {
            let location = await Location.getCurrentPositionAsync();
            if (location) {
                onSend({
                    location: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }
                })
            } else Alert.alert('Error occured while getting location');
        }   else Alert.alert('Permission denied');
    }


    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;
