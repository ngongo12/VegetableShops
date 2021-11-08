import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Text
} from 'react-native';
import { MainColor } from '../constants/colors';

const NomalButton = ( props ) => {
    const  { children, style } = props;
    return (
        <Pressable {...props} style={style}>
            <View
                style={styles.container}
            >
                <Text style={styles.text}>{children}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
        backgroundColor: MainColor
    },
    text: {
        textAlign: 'center',
        fontSize: 17,
        color: '#fff',
        padding: 14,
        
    }
})

export default NomalButton