import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

function ChatScreen (props) {

    useEffect(() => {
        let { name } = props.route.params;
        props.navigation.setOptions({ title: name})
    }, []);

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello ChatScreen</Text>
        </View>
    )
}

export default ChatScreen; 