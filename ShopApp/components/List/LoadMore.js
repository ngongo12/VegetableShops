import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import { MainColor } from '../constants/colors';
import { DefautText } from '../../components/Text/AppTexts';

const LoadMore = (props) => {
    const { isLoading } = props;
    return (
        <>
            {isLoading && (
                <View style={styles.constainer}>
                    <ActivityIndicator size='small' color='grey' />
                    <DefautText style={styles.text}>Đang tải thêm</DefautText>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 3,
        color: 'grey'
    }
})

export default LoadMore;