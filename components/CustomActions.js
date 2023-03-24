import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend}) => {

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
