import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { MainColor } from '../../constants/colors';
import { DefautText } from '../Text/AppTexts';

const OrderStateIcon = (props) => {
    const { name, title, onPress } = props;
    return (
        <Pressable style={styles.container}>
            <Icon name={name} size={32} color={ MainColor } />
            <DefautText style={styles.text}>{title}</DefautText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        margin: 8,
        fontSize: 12
    }
})

export default OrderStateIcon;