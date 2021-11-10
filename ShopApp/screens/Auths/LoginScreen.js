import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    StatusBar,
    Image,
    Text,
    Dimensions,
    Animated,
    ActivityIndicator,
    Modal,
    View,
    ToastAndroid
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/userActions';
import LinearGradient from 'react-native-linear-gradient';
import { DefautText, HeaderText } from '../../components/AppTexts';
import TextInputLayout from '../../components/TextInputLayout';
import GradientButton from '../../components/GradientButton';
import StrokeButton from '../../components/StrokeButton';
import { getData } from '../../api/asyncStorage';

const { height } = Dimensions.get('window');

const LoginScreen = (props) => {
    const { navigation: { navigate }, actions, user } = props;
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const isFocused = useIsFocused();
    const value = new Animated.Value(0);
    const onLogin = () => {
        //gọi action khi user click vào nút đăng nhập
        actions.actionLogin({
            phone,
            password
        });
    }
    //console.log(isFocused);

    useEffect(() => {
        getData('user')
        .then(res => {
            const {phone, password} = res;
            if(phone){
                setPhone(phone);
            }
            if(password){
                setPassword(password)
            }
        });
    }, [])

    useEffect(() => {
        //Nếu không phải đang ở screen này thì không thực hiện task ở phía dưới
        if(!isFocused) return;
        //nếu có user thì vào thẳng main screen
        if (user.user) {
            actions.updateLoginState(true);
            navigate('MainScreen');
        };
        if(user.message){
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
                <Image source={require('../../assets/images/background_login.png')} style={styles.image} />
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
                <Modal
                    visible={user.isLoading}
                    style={styles.modal}
                    animationType='fade'
                    transparent={true}
                    statusBarTranslucent={true}
                >
                    <View style={styles.modalView}>
                        <ActivityIndicator size='large' color='#fff' style={styles.activity_indicator} />
                        <HeaderText style={{ color: '#fff', margin: 10 }}>Đang đăng nhập xin chờ</HeaderText>
                    </View>
                </Modal>
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
    modal: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

//export default LoginScreen

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)