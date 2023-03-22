import { useState, useEffect} from 'react';

import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

import { collection, onSnapshot, addDoc, query, orderBy } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({route, navigation, db, isConnected}) => {

    const [messages, setMessages] = useState([]);
    const { color, name, userID } = route.params;
    let fetchedMessages;

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cachedMessages));
    }

       useEffect(() => {
       
        if (isConnected) {

            // unregister current onSnapshot listener to avoid duplicate listeners when useEffect code is re-executed
            if (fetchedMessages) fetchedMessages();
            fetchedMessages = null;

            navigation.setOptions({ title: name});
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
        fetchedMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
                newMessages.push({id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toDate())})
            })
            setMessages(newMessages);
        });
        } else {
            loadCachedMessages();
        }
        
        // clean up code
        return () => {
            if (fetchedMessages) fetchedMessages();
        }
        }, [isConnected]);

        const cacheMessages = async (messagesToChache) => {
            try {
                await AsyncStorage.setItem('messages', JSON.stringify(messagesToChache));
            } catch (error) {
                console.log(error.messages);
            }
        }
    
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
    };


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

    const renderInputToolbar = (props) => {
        if (isConnected === true) 
            return <InputToolbar {...props} />
        else 
            return null;
    }

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <GiftedChat
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                showAvatarForEveryMessage={true}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
            />
            {/* solves issue on older androids and Iphones, which hides message field while typing */}
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
       

   