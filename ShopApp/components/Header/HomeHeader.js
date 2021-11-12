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
import SearchBar from './SearchBar';

const HomeHeader = ( props ) => {
    return (
        <View>
            <StatusBar backgroundColor={MainColor} translucent={false} />
            <View style={styles.constainer}>
                <SearchBar />
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
        padding: 8,
        borderLeftWidth: 0.5,
        borderLeftColor: 'silver'
    }
})

export default HomeHeader