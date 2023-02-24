import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

function ChatScreen (props) {
    const [messages, setMessages] = useState([]);
    let { color } = props.route.params

    useEffect(() => {
        let { name } = props.route.params;
        props.navigation.setOptions({ title: name});
        setMessages([
            {
                _id:1,
                text: 'Hello Developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id:2,
                text: `${name} entered the chat.`,
                createdAt: new Date(),
                system: true,
            },
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    const renderBubble = (props) => {
        return (
            <Bubble {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#fff'
                        
                        
                    },
                    right: {
                        backgroundColor:'#000',
                        
                    }
                }}
            />
        )
    }

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <GiftedChat
                renderBubble={renderBubble}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        color: '#323232'
    },
    
})

export default ChatScreen; 