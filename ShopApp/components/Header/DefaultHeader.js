import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';

import {
    MainColor
} from '../../constants/colors';
import { BackIcon, ChatBubleIcon } from '../Icon/AppIcons';
import CartIcon from '../Icon/CartIcon';
import { Title } from '../Text/AppTexts';

const DefaultHeader = ( props ) => {
    const { title, isBack } = props
    return (
        <View>
            <StatusBar backgroundColor={MainColor} translucent={false} />
            <View style={styles.constainer}>
                {isBack && <BackIcon />}
                <Title style={styles.text} >{title}</Title>
                <CartIcon />
                <ChatBubleIcon count={11} />
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    constainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: MainColor,
    },
    text: {
        flex: 1,
        padding: 8,
        paddingLeft: 20,
        color: '#fff'
    }
})

export default DefaultHeader;