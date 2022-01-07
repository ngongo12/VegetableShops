import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { MainColor } from '../../constants/colors';

const NomalButton = ( props ) => {
    const  { children, style, color } = props;
    return (
        <TouchableOpacity {...props} style={style}>
            <View
                style={[styles.container, color && { backgroundColor: color}]}
            >
                <Text style={styles.text}>{children}</Text>
            </View>
        </TouchableOpacity>
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