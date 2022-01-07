import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Pressable,
    Text,
    TouchableOpacity
} from 'react-native';
import { DARK_GREEN } from '../../constants/colors';

const StrokeButton = (props) => {
    const { children, style } = props;
    return (
        <TouchableOpacity {...props} style={[styles.container, style]}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
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