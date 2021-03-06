import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    StatusBar,
    Image,
    Text,
    Dimensions,
    Animated,
    View,
    TextInput,
    Keyboard,
    ToastAndroid
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../../actions/userActions';
import LinearGradient from 'react-native-linear-gradient';
import SmsListener from 'react-native-android-sms-listener';
import { HeaderText } from '../../../components/Text/AppTexts';
import GradientButton from '../../../components/Button/GradientButton';
import StrokeButton from '../../../components/Button/StrokeButton';
import LoadingModal from '../../../components/LoadingModal';
import { goBack } from '../../../config/rootNavigation';
import { DARK_GREEN, LIGHT_GREEN } from '../../../constants/colors';
import { userURL } from '../../../api/userAPI';
import AlerModal from '../../../components/AlertModal';
import { requestReadSMSPermission, requestReceiveSMSPermission } from '../../../components/RequestPermission';

const { height } = Dimensions.get('window');
const FillToken = (props) => {
    const { navigation: { navigate }, actions, user, route: { params: { phone } } } = props;
    const [token, setToken] = useState('');
    const [timer, setTimer] = useState('05:00');
    const [isLoading, setIsLoading] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [message, setMessage] = useState('');

    let totalTime = 300;
    const isFocused = useIsFocused();
    const value = new Animated.Value(1);
    const [otp, setOtp] = useState('');
    let subscription = null;

    // useEffect(() => {
    //     Animated.timing(value, {
    //         toValue: 1,
    //         duration: 1000,
    //         useNativeDriver: true
    //     }).start();

    // }, [isFocused])
    const translateY = value.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0]
    })

    useEffect(() => {
        if(subscription){
            subscription.remove();
        }
    }, [isFocused]);
    

    useEffect(() => {
        setInterval(() => {
            totalTime -= 1;
            if (totalTime === 0 && isFocused) {
                goBack();
            };
            let s = totalTime % 60;
            let m = Math.floor(totalTime / 60);
            setTimer(`0${m}:${s < 10 ? '0' + s : s}`)
        }, 1000);
        requestReadSMSPermission();
        requestReceiveSMSPermission();
        //Listen sms
        listenSMS();

    }, [])

    const listenSMS = async () => {
        // try {
        //     const registered = await SmsRetriever.startSmsRetriever();
        //     if (!registered) {
        //         console.log('>>>>> sms registered null')
        //         return
        //     }
        //     console.log('registered sms true')
        //     await SmsRetriever.addSmsListener(event => {
        //         console.log('>>>>>>>>>> event');
        //         console.log('>>>>>>>>>> event', event);
        //         SmsRetriever.removeSmsListener();
        //     })
        // }
        // catch (e) {
        //     console.log('>>>>>>>>> sms error: ', JSON.stringify(e));
        // }
        //Sent from your Twilio trial account - M?? token c???a b???n l?? 831942
        console.log('>>>>> sms listener')
        subscription = SmsListener.addListener(message => {
            console.info(message);
            const { body } = message;
            if(body.includes('Sent from your Twilio trial account')){
                setMessage(body);
                setVisibleModal(true);
                setOtp(body.slice(-6));
                console.log(otp)
            }
        })

        //subscription.remove();
    }

    const checkToken = () => {
        fetch(`${userURL}checkToken?phone=${phone}&token=${token}`)
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    navigate('ChangePassword', { uid: res?.uid })
                    console.log(res)
                }
                else {
                    ToastAndroid.show('Y??u c???u th???t b???i: ' + res?.message, ToastAndroid.SHORT);
                }
            })
            .catch(e => console.log(e));
    }

    const onFill = () => {
        setToken(otp);
        console.log(otp)
        setVisibleModal(false)
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
                    <HeaderText>??I???N TOKEN</HeaderText>
                    <HeaderText>{timer}</HeaderText>
                    <TokenFillView token={token} setToken={setToken} />
                    <GradientButton onPress={checkToken} disabled={isLoading || token.length < 6} >Ti???p t???c</GradientButton>
                    <StrokeButton onPress={goBack} disabled={isLoading} >Quay l???i</StrokeButton>

                </Animated.View>
                {isFocused && (<LoadingModal
                    visible={isLoading}
                    style={styles.modal}
                    animationType='fade'
                    transparent={true}
                    statusBarTranslucent={true}
                    message='??ang ki???m tra token'
                />)}
            </LinearGradient>
            <AlerModal
                title='T??? ?????ng ??i???n OTP'
                question={message}
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
                onConfirm={onFill}
                confirmText='?????ng ??'
            />
        </>
    )
}

const TokenFillView = (props) => {
    const { token, setToken } = props;
    const tokenMap = [0, 1, 2, 3, 4, 5];
    const inputRef = useRef();
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            inputRef.current.focus();
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            inputRef.current.blur();
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [])
    const onPressTokenView = (index) => {
        setToken(token.slice(0, index))
        inputRef.current.focus();
    }
    return (
        <View style={{ margrinVertical: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 50, paddingTop: 60 }}>
                {
                    tokenMap.map(item => (
                        <Text
                            style={styles.tokenItem}
                            onPress={() => onPressTokenView(item)}
                            key={item}
                        >{token.length === item ? '_' : token.toString().charAt(item)}</Text>
                    ))
                }
            </View>
            <TextInput
                value={token}
                ref={inputRef}
                onChangeText={setToken}
                autoCapitalize='none'
                keyboardType='phone-pad'
                style={{
                    height: 0,
                }}
            />
        </View>
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
    tokenItem: {
        backgroundColor: DARK_GREEN,
        width: '15%',
        height: 50,
        borderRadius: 8,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff',
        marginLeft: 5
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(FillToken)