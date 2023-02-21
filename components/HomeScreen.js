import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

function HomeScreen (props) {
    const [name, setName] = useState('')
    
    return (
        <View style={styles.container}>
            <View>
                <Text> Welcome to inTouch</Text>
            </View>
            <View style={styles.box}>
            
            
            <TextInput
                style= {styles.input}
                onChangeText={(name) => setName(name)}
                value={name}
                placeholder={'Please enter your name'}
            />
            <Button
                title='Start Chatting'
                onPress={() => props.navigation.navigate('ChatScreen', { name: name})}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#E6DC50'
    },
    box: {
        alignItems: 'center',
        width: 300,
        height: 300,
        backgroundColor: 'lightgrey'
    },
    input: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1
    }
    })



export default HomeScreen;