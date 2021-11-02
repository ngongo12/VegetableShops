import React from 'react';
import {
    StyleSheet,
    Pressable,
    View
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    MainColor
} from '../constants/colors';
import { DefautText } from './AppTexts';
import { ScanIcon } from '../components/AppIcons';

const SearchBar = (props) => {
    const { onPress } = props
    return (
        <Pressable style={styles.constainer} onPress={onPress} >
            <ScanIcon />
            <DefautText style={styles.text}>Tìm sản phẩm, danh mục</DefautText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: MainColor,
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 8,
        marginTop: 8,
        marginBottom: 8
    },
    text: {
        padding: 8,
        borderLeftWidth: 0.5,
        borderLeftColor: 'silver'
    }
})

export default SearchBar