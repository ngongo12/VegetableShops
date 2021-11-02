import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    MainColor
} from '../constants/colors';

export const ScanIcon = ( props ) => {
    const { onPress } = props;
    return (
        <TouchableOpacity style={styles.constainer} onPress={onPress}>
            <MCIcon name='qrcode-scan' size={20} color={MainColor} />
        </TouchableOpacity>
    )
}

export const CartIcon = ( props ) => {
    const { onPress, count } = props;

    return (
        <TouchableOpacity style={styles.icon} onPress={onPress}>
            <MCIcon name='shopping-outline' size={24} color={'white'} />
            {(count != 0) && <Text style={styles.badge}>{ count}</Text>}
        </TouchableOpacity>
    )
}

export const ChatBubleIcon = ( props ) => {
    const { onPress, count } = props;

    return (
        <TouchableOpacity style={[styles.icon, {marginRight: 8}]} onPress={onPress}>
            <AntDesign name='message1' size={24} color={'white'} />
            {(count != 0) && <Text style={styles.badge}>{ count}</Text>}
        </TouchableOpacity>
    )
}
export const LogoutIcon = ( props ) => {
    const { onPress, count } = props;

    return (
        <TouchableOpacity style={[styles.icon, {marginRight: 8}]} onPress={onPress}>
            <AntDesign name='logout' size={24} color={'white'} />
        </TouchableOpacity>
    )
}

export default {
    ScanIcon,
    CartIcon,
    ChatBubleIcon,
    LogoutIcon
}

const styles = StyleSheet.create({
    constainer: {
        padding: 10
    },
    icon: {
        padding: 10,
        backgroundColor: MainColor,
    },
    badge: {
        top: 5,
        right: 3,
        position: 'absolute',
        textAlign: 'center',
        textAlignVertical:'center',
        color: '#fff',
        fontSize: 10,
        width: 20,
        height: 20,
        borderWidth: 1.5,
        borderRadius: 20,
        borderColor: '#fff',
        backgroundColor: MainColor

    }
})