import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Pressable,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DARK_GREEN } from '../constants/colors';

const StrokeButton = (props) => {
    const { children, style } = props;
    return (
        <Pressable {...props} style={[styles.container, style]}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 20,
        borderColor: DARK_GREEN,
        borderWidth: 2
    },
    text: {
        textAlign: 'center',
        fontSize: 17,
        color: DARK_GREEN,
        padding: 14,

    }
})

export default StrokeButton