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
    Keyboard
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../../actions/userActions';
import LinearGradient from 'react-native-linear-gradient';
import { HeaderText } from '../../../components/Text/AppTexts';
import GradientButton from '../../../components/Button/GradientButton';
import StrokeButton from '../../../components/Button/StrokeButton';
import LoadingModal from '../../../components/LoadingModal';
import { goBack } from '../../../config/rootNavigation';
import { DARK_GREEN, LIGHT_GREEN } from '../../../constants/colors';

const { height } = Dimensions.get('window');

const FillToken = (props) => {
    const { navigation: { navigate }, actions, user } = props;
    const [token, setToken] = useState('')
    const isFocused = useIsFocused();
    const value = new Animated.Value(1);

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
                <Animated.View style={[styles.content, { transform: [{ ...{ translateY } }]}]}>
                    <HeaderText>ĐIỀN TOKEN</HeaderText>
                    <TokenFillView token={token} setToken={setToken} />
                    <GradientButton disabled={user.isLoading} >Gửi Token</GradientButton>
                    <StrokeButton onPress={goBack} disabled={user.isLoading} >Quay lại</StrokeButton>

                </Animated.View>
                {isFocused && (<LoadingModal
                    visible={user.isLoading}
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 50 }}>
                {
                    tokenMap.map(item => (
                        <Text
                            style={styles.tokenItem}
                            onPress={()=>onPressTokenView(item)}
                            key={item}
                        >{token.length === item ? '_' : token.toString().charAt(item)}</Text>
                    ))
                }
            </View>
            <TextInput
                value={token}
                ref={inputRef}
                onChangeText={setToken}
                style={{
                    // height: 0,
                    // width: 0,
                    // padding: 0
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