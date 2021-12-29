import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socket } from '../../config/socket';
import userActions from '../../actions/userActions';

import FastImage from 'react-native-fast-image';
import { DefautText, Title } from '../../components/Text/AppTexts';
import userAPI from '../../api/userAPI';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainColor } from '../../constants/colors';
import { goBack } from '../../config/rootNavigation';
import chatAPI from '../../api/chatAPI';

const ChatScreen = (props) => {

    const {
        route: {
            params: { userID }
        }
    } = props;

    useEffect(() => {
        if(socket.hasListeners('server_msg')){
            console.log('Has listener');
            return;
        }
        socket.on('server_msg', (data) => {
            console.log(data);
        })
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor={MainColor} />
            <ShopHeader shopId={userID} />
            <View style={styles.container}></View>
            <InputView />
        </View>
    )
}

const InputView = (props) => {
    const [text, setText] = useState('');
    const sendMessage = () => {
        chatAPI.sendMessage({
            msg: text,
            token: 'server_msg'
        })
        setText('');
    }
    return (
        <View style={[styles.content, { height: 60, flexDirection: 'row' }]}>
            <View style={styles.input}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder='Soạn tin...'
                    style={{ flex: 1, fontSize: 13 }}
                />
                <MaterialCommunityIcons
                    name='send' size={26}
                    style={styles.icon}
                    onPress={sendMessage}
                />
            </View>
        </View>
    )
}

const ShopHeader = (props) => {
    const { shopId } = props;
    const [shopInfo, setShopInfo] = useState();
    useEffect(() => {
        if (shopId) {
            userAPI.getShopInfo(shopId).then(res => {
                setShopInfo(res?.shopInfo)
            });
        }
    }, [shopId])
    //console.log(shopInfo)
    return (
        <View style={[styles.content, { backgroundColor: MainColor }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign onPress={goBack} name='arrowleft' size={26} color={'#fff'} style={{ paddingRight: 16, paddingLeft: 6 }} />
                <FastImage source={{ uri: shopInfo?.avatar }} style={styles.avatar} />
                <View style={{ paddingHorizontal: 10, flex: 1 }}>
                    <Title style={styles.white}>{shopInfo?.shopName}</Title>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <DefautText style={{ fontSize: 13, paddingHorizontal: 5, color: '#fff' }}>{shopInfo?.shopAddress?.province?.name}</DefautText>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        alignItems: 'center'
        //paddingBottom: 24
    },
    icon: {
        paddingLeft: 15
    },
    white: {
        color: '#eee'
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 50
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        height: '50%',
        width: 1.5,
        backgroundColor: '#fff'
    },
    btn: {
        borderRadius: 5,
        borderWidth: 0.5,
        width: 100,
        textAlign: 'center',
        //paddingVertical: 5,
        fontWeight: '600',
        textAlignVertical: 'center',
        height: 36,
        color: '#fff',
        borderColor: '#fff'
    },
    chosen: {
        fontSize: 12,
        fontWeight: 'bold',
        color: MainColor
    },
    input: {
        flex: 1,
        fontSize: 12,
        paddingHorizontal: 16,
        borderColor: 'silver',
        borderRadius: 100,
        borderWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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


export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
