import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

function HomeScreen (props) {
    const [name, setName] = useState('');
    const [color, setColor] =useState('#fff');
    
    const backgroundColors = {
        gray: '#d3d3d3',
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
                            <Text style={styles.text}>Choose background color:</Text>
                            <View style={styles.colors}>
                                <TouchableOpacity 
                                    style={[styles.circle, {backgroundColor: backgroundColors.pink},
                                        color === backgroundColors.pink ? styles.colorSelected : {} 
                                    ]}
                                    onPress={() => setColor(backgroundColors.pink)}
                                
                                />
                                <TouchableOpacity 
                                    style={[styles.circle, {backgroundColor: backgroundColors.aurora},
                                        color === backgroundColors.aurora ? styles.colorSelected : {} 
                                    ]}
                                    onPress={() => setColor(backgroundColors.aurora)}
                                />
                                <TouchableOpacity 
                                    style={[styles.circle, {backgroundColor: backgroundColors.heraBlue},
                                        color === backgroundColors.heraBlue ? styles.colorSelected : {} 
                                    ]}
                                    onPress={() => setColor(backgroundColors.heraBlue)}
                                />
                                <TouchableOpacity 
                                    style={[styles.circle, {backgroundColor: backgroundColors.gray},
                                        color === backgroundColors.gray ? styles.colorSelected : {} 
                                    ]}
                                    onPress={() => setColor(backgroundColors.gray)}
                                />
                            </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        /* button navigates to chatScreen */
                        onPress={() => props.navigation.navigate('ChatScreen', { name: name, color: color})}
                        >
                        <Text style={styles.buttonText}>Start Chat</Text>
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
        fontSize: 28,
        fontWeight: '300',
        color: '#323232',
        // opacity: '50%',
        textAlign: 'center',
        marginBottom: 10

    },
    colorContainer: {
        margin: 10,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#999999'
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
    colorSelected: {
        borderWidth: 2,
        borderColor: '#999999'
    
    },
    button: {
        marginTop:10,
        backgroundColor: '#323232',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 35,
        color: '#fff'
    }
    })



export default HomeScreen;