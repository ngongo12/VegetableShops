import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MainColor } from '../constants/colors';
import { LargeText } from './AppTexts';

const ProfileTextView = (props) => {
    const { name, children, edit, value, onChangeText, placeholder, autoCapitalize, keyboardType } = props;
    return (
        <Pressable style={styles.container}>
            <Icon name={name} size={20} color={MainColor} style={styles.icon} />
            {!edit ? (<LargeText style={styles.text}>{children}</LargeText>)
                : (<TextInput {...{value, placeholder, onChangeText, autoCapitalize, keyboardType}} style={styles.text} />)
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8
    },

    icon: {
        padding: 10,
        backgroundColor: '#F1FAFF',
        borderRadius: 30
    },
    title: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver'
    },
    text: {
        flex: 1,
        marginLeft: 16
    }

});

export default ProfileTextView;