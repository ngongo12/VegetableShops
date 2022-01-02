import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import { MainColor } from '../constants/colors';
import { Title } from '../components/Text/AppTexts';

const LoadingView = ( props ) =>{
    const { message } = props;
    return(
        <View style={styles.constainer}>
            <ActivityIndicator size='large' color={ MainColor } />
            {message && <Title style={styles.text}>{message}</Title>}
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 16,
        color: MainColor
    }
})

export default LoadingView;