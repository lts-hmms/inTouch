import React, { useState, useEffect, useCallback } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import { onSnapshot, collection, query, where, addDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

import { auth, db } from './config/firebase';

const referenceChatMessages = collection(db, 'messages');


function ChatScreen (props) {
    const [messages, setMessages] = useState([]);
    const [uid, setUid] = useState("");
    
    const [loggedInText, setLoggedInText] = useState('We are starting right away!');
    let { color, name } = props.route.params;

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => 
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(referenceChatMessages, {
        _id, createdAt, text, user
        });
    }, []);

    useEffect(() => {
        props.navigation.setOptions({ title: name});

        // anonymous user authentication via firestore
        const authUnsubscribe = onAuthStateChanged(auth, async(user) => {
            if(!user){
                await signInAnonymously(auth);
                console.log(user)
            }
            // change state of user and onLoggedInText when authenticated
            setUid(user.uid);
            setLoggedInText(`${name} is logged in.`);
        });

        const q = query(referenceChatMessages, where('uid', '==', uid));

        // Reset messages state when firestone collection changes
        const onCollectionUpdate = onSnapshot(q, (querySnapshot) => {
            let data = doc.data();
            setMessages(
            // go through each document
            querySnapshot.docs.map((doc) => ({
                //get the QueryDocumentSnapshot's data
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    uid: doc.data().uid,
                    user: {
                        _id: doc.data().user._id,
                        name: doc.data().user.name,
                        avatar: doc.data().user.avatar,
                    }
                }))
            );
        });

        return () => {
            authUnsubscribe();
            onCollectionUpdate();
        }
    }, []);

        // setMessages([
        //     {
        //         _id:1,
        //         text: 'Hello Developer',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 2,
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     },
        //     {
        //         _id:2,
        //         text: `${name} entered the chat.`,
        //         createdAt: new Date(),
        //         system: true,
        //     },
        // ])
       

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
                showAvatarForEveryMessage={true}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: name,
                    avatar: "https://placeimg.com/140/140/any",
                }}
            />
            {/* solves issue on older androids, which hides message field while typing */}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        color: '#323232'
    },
    text: {
        textAlign: "center",
        marginTop: 40,
        color: "#fff",
        fontWeight: "600",
        fontSize: 20,
      },
    
})

export default ChatScreen; 