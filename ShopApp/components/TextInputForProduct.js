import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DARK_GREEN } from '../constants/colors';
import { DefautText } from '../components/AppTexts';

const TextInputForProduct = ( props ) => {
    const {secureTextEntry, name} = props;
    const [isShowPassword, setIsShowPassword] = useState(false)
    return (
        <View style={styles.container}>
            <DefautText style={styles.text}>{name}</DefautText>
            <TextInput {...props} style={styles.input} secureTextEntry={secureTextEntry && !isShowPassword} />
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