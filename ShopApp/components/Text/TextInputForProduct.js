import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';
import { DefautText } from './AppTexts';

const TextInputForProduct = ( props ) => {
    const { name } = props;
    return (
        <View style={styles.container}>
            <DefautText style={styles.text}>{name}</DefautText>
            <TextInput {...props} style={styles.input} />
        </View>
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
        minWidth: 100
    }
})

export default TextInputForProduct