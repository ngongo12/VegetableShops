import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';
import { MainColor } from '../../constants/colors';
import { DateTimeFm, DefautText } from '../Text/AppTexts';

const { width, height } = Dimensions.get('window');
const maxWidth = width * 2 / 3;
const ChatBox = (props) => {
    const { item, myID } = props;
    //const value = new Animated.Value(0);
    // console.log(item)
    // console.log(myID)
    // useEffect(() => {
    //     Animated.timing(value, {
    //         toValue: 1,
    //         duration: 2000,
    //         useNativeDriver: true
    //     }).start();
    // }, []);

    return (
        <Animated.View style={[styles.container]}>
            {
                (myID !== item.sendBy) ?
                    <InMessage message={item?.messageContent} />
                    :
                    <OutMessage message={item?.messageContent} />
            }
        </Animated.View>
    )
}

const InMessage = (props) => {
    const { message } = props;
    console.log('Tin nhắn vào')
    return (
        <View>
            <DateTimeFm style={styles.time}>{new Date()}</DateTimeFm>
            <DefautText style={styles.inMessageText}>{message?.message}</DefautText>
        </View>
    )
}

const OutMessage = (props) => {
    const { message } = props;
    console.log('Tin nhắn ra')
    return (
        <View style={{ alignItems: 'flex-end' }}>
            <DateTimeFm style={styles.time}>{new Date()}</DateTimeFm>
            <DefautText style={styles.outMessageText}>{message?.message}</DefautText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    time: {
        fontSize: 11,
        paddingVertical: 3
    },
    inMessageText: {
        borderRadius: 8,
        backgroundColor: '#fff',
        maxWidth: maxWidth,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        borderTopLeftRadius: 0,
        borderWidth: 0.5
    },

    outMessageText: {
        borderRadius: 8,
        backgroundColor: '#fff',
        maxWidth: maxWidth,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
        backgroundColor: MainColor,
        color: '#fff'
    }
})

export default ChatBox
