import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    StatusBar,
    Image,
    Text,
    Animated,
    Dimensions,
    ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/userActions';
import LinearGradient from 'react-native-linear-gradient';
import { HeaderText } from '../../components/Text/AppTexts';
import TextInputLayout from '../../components/Text/TextInputLayout';
import GradientButton from '../../components/Button/GradientButton';
import { useIsFocused } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Register = (props) => {
    const { user, actions,navigation : { navigate } } = props;
    const [fullname, setFullname] = useState('');
    const [passWord, setPassWord] = useState('');
    const [phone, setPhone] = useState('');
    const isFocused = useIsFocused();
    const value = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(value, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
        
    }, [])
    const translateY = value.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0]
    })

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

    const onRegister = () => {
        if(validate()){
            actions.actionRegister({
                user: {
                    phone,
                    password: passWord,
                    fullname
                }
            })
        }
    }

    const validate = () => {
        if(phone.trim().length < 10){
            ToastAndroid.show('Số điện thoại không hợp lệ', ToastAndroid.SHORT);
            return false;
        }
        if(fullname.trim().length == 0){
            ToastAndroid.show('Tên không được rỗng', ToastAndroid.SHORT);
            return false;
        }
        if(passWord.trim().length < 6){
            ToastAndroid.show('Mật khẩu ít nhất 6 ký tự', ToastAndroid.SHORT);
            return false;
        }
        
        return true;
    }

    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <LinearGradient
                locations={[0, 1.0]}
                start={{x: 0.0, y: 0.0}}
                end={{x: 1, y: 1.0}}
                colors={['#7BE495', '#529D9C']}
                style={styles.container}>
                <Image source={require('../../assets/images/background_login.png')} style={styles.image} />
                <Animated.View style={[styles.content, {transform: [{...{translateY}}]}]}>
                    <HeaderText>TẠO TÀI KHOẢN</HeaderText>
                    <TextInputLayout
                        placeholder='Số điện thoại'
                        maxLength={11}
                        autoCapitalize='none'
                        value={ phone }
                        onChangeText = { setPhone }
                        name='mobile1'
                        keyboardType='phone-pad'
                    />
                    <TextInputLayout
                        placeholder='Họ tên'
                        autoCapitalize='words'
                        value={ fullname }
                        onChangeText = { setFullname }
                        name='user'
                    />
                    <TextInputLayout
                        placeholder='Mật khẩu'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        value={ passWord }
                        onChangeText = { setPassWord }
                        name='lock'
                    />
                    <GradientButton onPress={onRegister} >Tạo Tài Khoản</GradientButton>
                </Animated.View>
            </LinearGradient>

        </>
    )
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
        borderTopLeftRadius: 50
    },
    image:{
        width: 300,
        height: 250,
        resizeMode: 'cover',
        alignSelf: 'center',
        position: 'absolute',
        top: 150
    },
    text: {
        marginTop: 16,
        textAlign:'right',
        paddingRight: 16
    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Register)