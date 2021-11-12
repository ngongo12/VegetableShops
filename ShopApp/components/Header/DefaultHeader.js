import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';

import {
    MainColor
} from '../../constants/colors';
import { CartIcon, ChatBubleIcon } from '../Icon/AppIcons';
import { Title } from '../Text/AppTexts';

const DefaultHeader = ( props ) => {
    const { title } = props
    return (
        <View>
            <StatusBar backgroundColor={MainColor} translucent={false} />
            <View style={styles.constainer}>
                <Title style={styles.text} >{title}</Title>
                <CartIcon count={10} />
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

export default DefaultHeader