import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    TextInput,
    ToastAndroid,
    FlatList,
    Keyboard
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socket } from '../../config/socket';
import userActions from '../../actions/userActions';
import messageActions from '../../actions/messageActions';

import FastImage from 'react-native-fast-image';
import { DefautText, Title } from '../../components/Text/AppTexts';
import userAPI from '../../api/userAPI';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainColor } from '../../constants/colors';
import { goBack } from '../../config/rootNavigation';
import chatAPI from '../../api/chatAPI';
import contactAPI from '../../api/contactAPI';
import ChatBox from '../../components/chat/ChatBox';

const ChatScreen = (props) => {
    const {
        route: {
            params: {
                contactId,
                userID
            }
        },
        user: { user },
        messageReducer: { messages },
        messageAction
    } = props;
    const [contact, setContact] = useState();
    const [fetchedContact, setFetchedContact] = useState(false);
    //const [messages, setMessages] = useState([]);
    const [flagLoad, setFlagLoad] = useState(false);
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    let flatlist = useRef();

    console.log('>>>>>>>>>>>>>>> message Reducer', messages)
    useEffect(() => {
        //Trong trường hợp chỉ truyền vào userID
        if (userID) {
            contactAPI.getContactIdByUserIDs([userID, user._id])
                .then(res => {
                    setContact(res);
                    setFetchedContact(true);
                })
                .catch(e => console.log(e));
        }

        //Trong trường hợp chỉ truyền vào contactId
        if (contactId) {
            contactAPI.getContactByID(contactId)
                .then(res => {
                    setContact(res);
                    //setFetchedContact(true); trường hợp này ko lấy được tức có lỗi xảy ra
                })
                .catch(e => console.log(e));
        }
        flatlist.current.scrollToEnd({ animating: true });
    }, [])

    useEffect(() => {
        const onShowKeyboard = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        const onHideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
        return () => {
            onShowKeyboard.remove();
            onHideKeyboard.remove();
        }
    }, [])

    useEffect(() => {
        //Trường hợp đã gọi api lấy được contact
        if (fetchedContact) {
            //Contact vẫn rỗng tức là chưa có contact
            if (!contact) {
                contactAPI.create({
                    userIDs: [userID, user._id]
                }).then(res => setContact(res))
                    .catch(e => console.log('create contact ', e));
            }
        }
    }, [fetchedContact])
    useEffect(() => {
        if (contact) {
            if (socket.hasListeners(contact._id)) {
                console.log('Has listener');
                socket.off(contact._id);
                //return;
            }
            socket.on(contact._id, (data) => {
                console.log('>>>>>>message', data);
                setFlagLoad(!flagLoad);
                const { msg } = data;

                messageAction.add({
                    msg: [msg]
                })
            })
        }
    }, [contact, flagLoad]);

    useEffect(() => {
        scrollFlatlistToEnd();
    }, [messages, keyboardIsShow])

    const scrollFlatlistToEnd = () => {
        if (flatlist?.current && messages?.length > 3) {
            flatlist?.current?.scrollToIndex({ animated: true, index: 0 });
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor={MainColor} />
            <ShopHeader shopId={userID} />
            <View style={[styles.container, { paddingBottom: 5, backgroundColor: 'pink', alignItems: 'flex-end' }]}>
                <View style={{ flex: 1 }} />
                <FlatList
                    ref={flatlist}
                    data={messages}
                    renderItem={({ item }) => <ChatBox {...{ item, myID: user._id }} />}
                    inverted={true}
                    style={{ flexGrow: 0, width: '100%' }}
                />
            </View>
            <InputView contact={contact} user={user} />
        </View>
    )
}

const InputView = (props) => {
    const { contact, user } = props;
    const [text, setText] = useState('');
    const sendTextMessage = () => {
        if (!contact) {
            ToastAndroid.show('Lỗi khi lấy contact. Vui lòng thử lại sau', ToastAndroid.SHORT);
            return;
        }
        chatAPI.sendMessage({
            msg: {
                contactId: contact?._id,
                sendBy: user?._id,
                messageContent: {
                    type: 'text',
                    message: text
                }
            },
            token: contact?._id
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
                    onPress={sendTextMessage}
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
        user: state.userReducer,
        messageReducer: state.messageReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch),
        messageAction: bindActionCreators(messageActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
