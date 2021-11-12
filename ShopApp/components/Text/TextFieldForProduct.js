import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';
import { DefautText } from './AppTexts';

const TextFieldForProduct = ( props ) => {
    const { name, children, style } = props;
    return (
        <View style={[styles.container, style]}>
            <DefautText style={styles.text}>{name}</DefautText>
            <DefautText style={styles.text, {color: '#333'}}>{children}</DefautText>
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

export default TextFieldForProduct