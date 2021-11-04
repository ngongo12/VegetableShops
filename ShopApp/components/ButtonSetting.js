import React from 'react'
import {
    StyleSheet,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { MainColor } from '../constants/colors';
import { DefautText } from './AppTexts';

const ButtonSetting = ( props ) =>{
    const {iconName, name, style, onPress} = props;
    return (
        <Pressable 
            onPress={onPress}
            style={[buttonStyles.container, style]}
        >
            <Icon name={iconName} size={24} color={MainColor} />
            <DefautText style={buttonStyles.text}>{name}</DefautText>
            <Icon name='right' size={20} color={MainColor} />
        </Pressable>
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
        paddingBottom: 15
    },
    text: {
        marginLeft: 20,
        flex: 1
    }
})

export default ButtonSetting