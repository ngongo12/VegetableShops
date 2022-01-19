import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    TextInput
} from 'react-native';
import { DefautText } from './AppTexts';

const TextInputForProduct = ( props ) => {
    const { name, onPress } = props;
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <DefautText style={styles.text}>{name}</DefautText>
            <TextInput {...props} style={styles.input} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input:{
        flex: 1,
        marginLeft: 8,
    },
    text:{
        minWidth: 100,
        
    }
})

export default TextInputForProduct