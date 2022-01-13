import React, {useEffect, useRef} from 'react';
import {
    StyleSheet,
    Pressable,
    View,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    MainColor
} from '../../constants/colors';
import { DefautText } from '../Text/AppTexts';
import { ScanIcon } from '../Icon/AppIcons';
import { navigate } from '../../config/rootNavigation';

const SearchBar = (props) => {
    const { onPress } = props
    return (
        <Pressable style={styles.constainer} onPress={() => navigate('SearchScreen')} >
            <ScanIcon />
            <DefautText style={styles.text}>Tìm sản phẩm, danh mục</DefautText>
        </Pressable>
    )
}

export const SearchBarInput = props => {
    const { onPress, value, onChangeText, onEndEditing, notFocus } = props;
    let searchRef = useRef();
    useEffect(() => {
        searchRef.current.focus();
    }, [])
    return (
        <Pressable style={styles.constainer} onPress={() => navigate('SearchScreen')} >
            <ScanIcon />
            <TextInput style={styles.text}
                ref={searchRef}
                placeholder='Tìm sản phẩm, danh mục'
                value={value}
                onChangeText={onChangeText}
                onEndEditing={onEndEditing}
                style={{flex: 1}}
                autoFocus={!notFocus}
            />
            {value.length > 0 && (<Icon name='search1'
                size={20}
                style={{ paddingHorizontal: 16 }}
                onPress={onPress}
            />)}
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
        marginBottom: 8,
        height: 44
    },
    text: {
        padding: 8,
        borderLeftWidth: 0.5,
        borderLeftColor: 'silver'
    }
})

export default SearchBar