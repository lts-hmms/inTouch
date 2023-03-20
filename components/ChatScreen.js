import { useState, useEffect} from 'react';

import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import { collection, onSnapshot, addDoc, query, orderBy } from 'firebase/firestore';

const ChatScreen = ({route, navigation, db}) => {

    const [messages, setMessages] = useState([]);
    const { color, name, userID } = route.params;

       useEffect(() => {
        navigation.setOptions({ title: name});
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
        const fetchedMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
                newMessages.push({id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toDate())})
            })
            setMessages(newMessages);
        })
        // clean up code
        return () => {
            if (fetchedMessages) fetchedMessages();
        }
        }, []);
    
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

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <GiftedChat
                renderBubble={renderBubble}
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
       

   