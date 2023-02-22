import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

function HomeScreen (props) {
    const [name, setName] = useState('');
    const [color, setColor] =useState('');
    
    const backgroundColors = {
        black: '#090C08',
        pink: '#CD45E6',
        aurora: '#E6DC50',
        heraBlue: '#796fe8'
    }
    
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/BackgroundImage.png')} 
                resizeMode='cover' 
                style={styles.bgImage} 
            >
                <View style={styles.welcomeView}>
                    <Text style={styles.title}>Welcome to inTouch</Text>
                </View>
                <View style={[styles.inputContainer, styles.shadowProp]}>
                    <TextInput
                        style={styles.input}
                        /* set name to state */
                        onChangeText={(name) => setName(name)}
                        value={name}
                        placeholder={'Please enter your name'}
                    />
                    <View style={styles.colorContainer}>
                            <Text style={styles.text}>Choose your background color:</Text>
                            <View style={styles.colors}>
                                <TouchableOpacity 
                                    style={[styles.circle, {backgroundColor: backgroundColors.black}]}
                                    onPress={() => setColor(backgroundColors.black)}
                                />
                                <TouchableOpacity 
                                    style={[styles.circle, {backgroundColor: backgroundColors.pink}]}
                                    onPress={() => setColor(backgroundColors.purple)}
                                />
                                <TouchableOpacity 
                                    style={[styles.circle, {backgroundColor: backgroundColors.aurora}]}
                                    onPress={() => setColor(backgroundColors.blue)}
                                />
                                <TouchableOpacity 
                                    style={[styles.circle, {backgroundColor: backgroundColors.heraBlue}]}
                                    onPress={() => setColor(backgroundColors.green)}
                                />
                            </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        /* button navigates to chatScreen */
                        onPress={() => props.navigation.navigate('ChatScreen', { name: name, color: color})}
                        >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    welcomeView: {
        marginBottom: 110
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#fff',
        marginTop: 70,
        textAlign: 'center'
    },
    inputContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '85%'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.6,
        shadowRadius: 3,
      },
    input: {
        height: 60,
        borderColor: 'lightgrey',
        borderWidth: 1,
        fontSize: 25,
        fontWeight: '300',
        color: '#757083',
        opacity: '50%',
        textAlign: 'center',

    },
    colorContainer: {
        margin: 10,
    },
    text: {
        textAlign: 'center'
    },
    colors: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
    },
    button: {
        backgroundColor: 'lightgrey',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 25,
        color: '#71797E'
    }
    })



export default HomeScreen;