import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    StatusBar,
    Image,
    View,
    Dimensions,
    Animated,
    ToastAndroid
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../../actions/userActions';
import LinearGradient from 'react-native-linear-gradient';
import { DefautText, HeaderText } from '../../../components/Text/AppTexts';
import TextInputLayout from '../../../components/Text/TextInputLayout';
import GradientButton from '../../../components/Button/GradientButton';
import StrokeButton from '../../../components/Button/StrokeButton';
import LoadingModal from '../../../components/LoadingModal';
import { goBack } from '../../../config/rootNavigation';
import { LIGHT_GREEN } from '../../../constants/colors';
import { userURL } from '../../../api/userAPI';

const { height } = Dimensions.get('window');

const RequestTokenScreen = (props) => {
    const { navigation: { navigate }, actions, user } = props;
    const [phone, setPhone] = useState('');
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false)
    const value = new Animated.Value(1);

    useEffect(() => {
        Animated.timing(value, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();

    }, [isFocused])
    const translateY = value.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0]
    })

    const sendRequest = () => {
        fetch(`${userURL}requestToken?phone=${phone}`)
            .then(res => res.json())
            .then(res => {
                if(res?.success){
                    navigate('FillToken', { phone })
                    console.log(res?.message)
                }
                else{
                    ToastAndroid.show('Yêu cầu thất bại: '+res?.message, ToastAndroid.SHORT);
                }
            })
            .catch(e => console.log(e));
    }

    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <LinearGradient
                locations={[0, 1.0]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1, y: 1.0 }}
                colors={['#7BE495', '#529D9C']}
                style={styles.container}>
                <Image source={require('../../../assets/images/background_login.png')} style={styles.image} />
                <Animated.View style={[styles.content, { transform: [{ ...{ translateY } }] }]}>
                    <HeaderText>YÊU CẦU ĐỔI MẬT KHẨU</HeaderText>
                    
                    <TextInputLayout
                        placeholder='Số điện thoại'
                        maxLength={11}
                        autoCapitalize='none'
                        value={phone}
                        onChangeText={setPhone}
                        name='mobile1'
                        keyboardType='numeric'
                    />
                    <GradientButton onPress={sendRequest} disabled={isLoading} >Gửi Token</GradientButton>
                    <StrokeButton onPress={goBack} disabled={isLoading} >Quay lại</StrokeButton>

                </Animated.View>
                {isFocused && (<LoadingModal
                    visible={isLoading}
                    style={styles.modal}
                    animationType='fade'
                    transparent={true}
                    statusBarTranslucent={true}
                    message='Đang gửi token'
                />)}
            </LinearGradient>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    content: {
        width: '100%',
        padding: 32,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    image: {
        width: 300,
        height: 250,
        resizeMode: 'cover',
        alignSelf: 'center',
        position: 'absolute',
        top: 150
    },
    text: {
        marginTop: 16,
        textAlign: 'right',
        paddingRight: 16
    },
    method: {
        width: 150,
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: LIGHT_GREEN,
        fontSize: 15,
        borderRadius: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestTokenScreen)