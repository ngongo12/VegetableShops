import React from 'react'
import {
    StyleSheet,
    Pressable,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { MainColor } from '../../constants/colors';
import { DefautText } from '../Text/AppTexts';

const ButtonSetting = ( props ) =>{
    const {iconName, name, style, onPress, children} = props;
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[buttonStyles.container, style]}
        >
            <Icon name={iconName} size={24} color={MainColor} />
            <DefautText style={buttonStyles.text}>{name}</DefautText>
            {children}
            {!children && <Icon name='right' size={20} color={MainColor} />}
            
        </TouchableOpacity>
    )
}

const buttonStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //backgroundColor: 'green',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderColor: '#dedede'
    },
    text: {
        marginLeft: 20,
        flex: 1
    }
})

export default ButtonSetting