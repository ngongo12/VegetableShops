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
const statusbarH = StatusBar.currentHeight;
const ProductDetailHeader = (props) => {
    const { title, visible, pressCount } = props
    return (
        <>
            <View>
                <StatusBar backgroundColor={visible ? MainColor : 'transparent'} translucent={true} />
                <View style={[styles.constainer, visible && {backgroundColor: MainColor}]}>
                    <BackIcon />
                    <Title style={[styles.text, !visible && {color: 'transparent'} ]} >{title}</Title>
                    <CartIcon pressCount={pressCount} />
                    <ChatBubleIcon count={11} />
                </View>
            </View>
        </>

    )
}
const styles = StyleSheet.create({
    constainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        zIndex: 1,
        paddingTop: statusbarH
    },
    text: {
        flex: 1,
        padding: 8,
        paddingLeft: 20,
        color: '#fff'
    }
})

export default ProductDetailHeader;