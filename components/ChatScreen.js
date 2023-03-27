import { useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, onSnapshot, addDoc, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const ChatScreen = ({route, navigation, db, isConnected, storage}) => {

    const [messages, setMessages] = useState([]);
    const { color, name, userID } = route.params;
    let fetchedMessages;

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cachedMessages));
    }

    useEffect(() => {
        // if no internet connection, load cached messages
        if (isConnected === true) {

            // unregister current onSnapshot listener to avoid duplicate listeners when useEffect code is re-executed
            if (fetchedMessages) fetchedMessages();
            fetchedMessages = null;

            navigation.setOptions({ title: name});
            // An initial call using callback creates a document snapshot immediately with the current contents of the collection. Each time the contents change, another call updates the collection snapshot.
            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
            fetchedMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
                newMessages.push({id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toDate())})
            })
            cacheMessages(newMessages);
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
    // add messages to firebase
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
    // hide input toolbar if no internet connection
    const renderInputToolbar = (props) => {
        if (isConnected === true) 
            return <InputToolbar {...props} />
        else 
            return null;
    }

    renderCustomActions = (props) => {
        return <CustomActions onSend={onSend} storage={storage} userID={userID}{...props} /> 
    }

    renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{width: 150, height: 100, borderRadius: 13, margin: 3}}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421, 
                    }}
                />
            )
        }
      return null;
    }

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderCustomActions}
                showAvatarForEveryMessage={true}
                renderCustomView={renderCustomView}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
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
       

   