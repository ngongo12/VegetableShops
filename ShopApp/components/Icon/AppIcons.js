import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ChatBubleIconImport from './ChatBubleIcon';
import { goBack } from '../../config/rootNavigation';
import {
    MainColor
} from '../../constants/colors';

export const ScanIcon = ( props ) => {
    const { onPress } = props;
    return (
        <TouchableOpacity style={styles.constainer} onPress={onPress}>
            <MCIcon name='qrcode-scan' size={20} color={MainColor} />
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

export const BackIcon = () => {
    return(
        <AntDesign onPress={goBack} name='arrowleft' size={24} color={'#fff'} style={{ paddingRight: 0, paddingLeft: 16 }} />
    )
}

export const ChatBubleIcon = ChatBubleIconImport;

export default {
    ScanIcon,
    ChatBubleIcon,
    LogoutIcon
}

const styles = StyleSheet.create({
    constainer: {
        padding: 10
    },
    icon: {
        padding: 10,
        //backgroundColor: MainColor,
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