import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    StatusBar,
    Image,
    Text,
    Dimensions,
    Animated,
    ToastAndroid
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../../actions/userActions';
import LinearGradient from 'react-native-linear-gradient';
import { HeaderText } from '../../../components/Text/AppTexts';
import TextInputLayout from '../../../components/Text/TextInputLayout';
import GradientButton from '../../../components/Button/GradientButton';
import StrokeButton from '../../../components/Button/StrokeButton';
import { getData } from '../../../api/asyncStorage';
import LoadingModal from '../../../components/LoadingModal';

const { height } = Dimensions.get('window');

const RequestTokenScreen = (props) => {
    const { navigation: { navigate }, actions, user } = props;
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const isFocused = useIsFocused();
    const value = new Animated.Value(0);
    const onLogin = () => {
        //gọi action khi user click vào nút đăng nhập
        if (validate()) {
            actions.actionLogin({
                phone,
                password
            });
        }

    }
    const validate = () => {
        if (phone.trim().length < 10) {
            ToastAndroid.show('Số điện thoại không hợp lệ', ToastAndroid.SHORT);
            return false;
        }
        if (password.trim().length < 6) {
            ToastAndroid.show('Mật khẩu ít nhất 6 ký tự', ToastAndroid.SHORT);
            return false;
        }

        return true;
    }
    //console.log(user);

    useEffect(() => {
        getData('user')
            .then(res => {
                const { phone, password } = res;
                if (phone) {
                    setPhone(phone);
                }
                if (password) {
                    setPassword(password)
                }
                if (!user?.notFirst) {
                    actions.actionLogin({
                        phone,
                        password
                    });
                }
            });
    }, [isFocused])

    useEffect(() => {
        //Nếu không phải đang ở screen này thì không thực hiện task ở phía dưới
        if (!isFocused) return;
        //nếu có user thì vào thẳng main screen
        if (user.user) {
            actions.updateLoginState(true);
            //navigate('MainScreen');
        };
        if (user.message) {
            ToastAndroid.show(user.message, ToastAndroid.SHORT);
        }
    }, [user])

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
                    <HeaderText>ĐĂNG NHẬP</HeaderText>
                    <TextInputLayout
                        placeholder='Số điện thoại'
                        maxLength={11}
                        autoCapitalize='none'
                        value={phone}
                        onChangeText={setPhone}
                        name='mobile1'
                        keyboardType='phone-pad'
                    />
                    <TextInputLayout
                        placeholder='Mật khẩu'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        value={password}
                        onChangeText={setPassword}
                        name='lock'
                    />
                    <Text style={styles.text}>Quên mật khẩu?</Text>
                    <GradientButton onPress={onLogin} disabled={user.isLoading} >Đăng Nhập</GradientButton>
                    <StrokeButton onPress={() => navigate('RegisterScreen')} disabled={user.isLoading} >Đăng Ký</StrokeButton>

                </Animated.View>
                {isFocused && (<LoadingModal
                    visible={user.isLoading}
                    style={styles.modal}
                    animationType='fade'
                    transparent={true}
                    statusBarTranslucent={true}
                    message='Đăng đăng nhập. Xin chờ'
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

})

export default connect(mapStateToProps, mapDispatchToProps)(RequestTokenScreen)