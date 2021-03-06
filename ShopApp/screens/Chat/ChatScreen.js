import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    TextInput,
    ToastAndroid,
    FlatList,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socket } from '../../config/socket';
import userActions from '../../actions/userActions';
import messageActions from '../../actions/messageActions';
import { useIsFocused } from '@react-navigation/native';
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
import onBackPress from '../../config/backPressHandler';
import LoadMore from '../../components/List/LoadMore';

const ChatScreen = (props) => {
    const {
        route: {
            params: {
                contactId,
                userID,
                product
            },
            name
        },
        user: { user },
        messageReducer: { messages },
        messageAction
    } = props;
    const [contact, setContact] = useState();
    const [fetchedContact, setFetchedContact] = useState(false);
    //const [messages, setMessages] = useState([]);
    let isSendProduct = false;
    const [loadedMessage, setLoadedMessage] = useState(false);
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [canLoadMore, setCanLoadMore] = useState(true);
    const [canScroll, setCanScroll] = useState(true);

    let flatlist = useRef();
    const isFocused = useIsFocused();

    //console.log('>>>>>>>>>>>>>>> product', product)
    useEffect(() => {
        onBackPress(() => {
            if (name === 'ChatScreen' && isFocused) {
                messageAction.clear();
            }
        })
    }, [])

    useEffect(() => {
        messageAction.clear();
    }, [isFocused])

    useEffect(() => {
        //Trong tr?????ng h???p ch??? truy???n v??o userID
        if (userID) {
            contactAPI.getContactIdByUserIDs([userID, user._id])
                .then(res => {
                    setContact(res);
                    setFetchedContact(true);
                })
                .catch(e => console.log(e));
        }

        //Trong tr?????ng h???p ch??? truy???n v??o contactId
        if (contactId) {
            contactAPI.getContactByID(contactId)
                .then(res => {
                    setContact(res);
                    //setFetchedContact(true); tr?????ng h???p n??y ko l???y ???????c t???c c?? l???i x???y ra
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
        //Tr?????ng h???p ???? g???i api l???y ???????c contact
        if (fetchedContact) {
            //Contact v???n r???ng t???c l?? ch??a c?? contact
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
            chatAPI.getListMessage(contact._id)
                .then(res => {
                    messageAction.add({
                        msg: res,
                        isAddNew: true
                    })
                    setLoadedMessage(true);
                })
                .catch(e => console.log(e))
            //
            if (socket.hasListeners(contact._id)) {
                console.log('Has listener');
                socket.off(contact._id);
                //return;
            }
            socket.on(contact._id, (data) => {
                console.log('>>>>>>message', data);
                //setFlagLoad(!flagLoad);
                const { msg } = data;

                messageAction.add({
                    msg: [msg],
                    isAddNew: true
                })
            })

            
        }
    }, [contact]);

    useEffect(() => {
        //G???i s???n ph???m c???n h???i n???u c??
        if (product && !isSendProduct) {
            
            chatAPI.sendMessage({
                msg: {
                    contactId: contact?._id,
                    sendBy: user?._id,
                    messageContent: {
                        type: 'product',
                        message: `[1 S???n ph???m]`,
                        product
                    }
                },
                token: contact?._id
            })
            isSendProduct = true;
        }
    }, [loadedMessage]) //Sau khi load message v??? r???i m???i g???i

    useEffect(() => {
        if (canScroll)
            scrollFlatlistToStart();
    }, [messages])

    useEffect(() => {
        scrollFlatlistToStart();
    }, [keyboardIsShow])

    const scrollFlatlistToStart = () => {
        if (flatlist?.current && messages?.length > 3) {
            flatlist?.current?.scrollToIndex({ animated: true, index: 0 });
        }
    }

    const onLoadMore = () => {
        if (!canLoadMore) {
            return
        }
        console.log('loading more')
        if (messages.length == 0) {
            setCanLoadMore(false);
            return;
        }
        setIsLoading(true);
        const lastMessage = messages[messages.length - 1];
        chatAPI.getMoreMessage(contact._id, lastMessage._id)
            .then(res => {
                if (res) {
                    messageAction.add({
                        msg: res,
                        isAddNew: false
                    })
                }
                else {
                    setCanLoadMore(false);
                }
            })
            .catch(e => {
                console.log(e);
                setCanLoadMore(false);
            })

        setIsLoading(false);
    }

    const handleScroll = (event) => {
        let yOffset = event.nativeEvent.contentOffset.y;
        //N???u scroll h??n 30 th?? kh??ng scroll v??? top khi c?? tin nh???n m???i
        if (yOffset < 30) {
            setCanScroll(true);
        }
        else {
            setCanScroll(false)
        }
        console.log(canScroll)
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
                    ListFooterComponent={() => <LoadMore isLoading={isLoading} />}
                    onEndReached={onLoadMore}
                    onEndThreshold={0}
                    onScroll={handleScroll}
                    style={{ flexGrow: 0, width: '100%' }}
                />
            </View>
            <InputView contact={contact} user={user} sendTo={userID} />
        </View>
    )
}

const InputView = (props) => {
    const { contact, user, sendTo } = props;
    const [text, setText] = useState('');
    const sendTextMessage = () => {
        if (!contact) {
            ToastAndroid.show('L???i khi l???y contact. Vui l??ng th??? l???i sau', ToastAndroid.SHORT);
            return;
        }
        if (text?.trim().length === 0) {
            return
        }
        chatAPI.sendMessage({
            msg: {
                contactId: contact?._id,
                sendBy: user?._id,
                messageContent: {
                    type: 'text',
                    message: text.trim()
                }
            },
            token: contact?._id,
            sendTo
        })
        setText('');
    }
    return (
        <View style={[styles.content, { height: 60, flexDirection: 'row' }]}>
            <View style={styles.input}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder='So???n tin...'
                    onEndEditing={sendTextMessage}
                    style={{ flex: 1, fontSize: 13 }}
                />
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name='send' size={26}
                        style={styles.icon}
                        onPress={sendTextMessage}
                        color={text?.trim().length === 0 ? 'grey' : MainColor}

                    /></TouchableOpacity>
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
                <FastImage source={shopInfo?.avatar ? { uri: shopInfo?.avatar } : require('../../assets/images/default_avatar.png')} style={styles.avatar} />
                <View style={{ paddingHorizontal: 10, flex: 1 }}>
                    <Title style={styles.white}>{shopInfo?.shopName ? shopInfo.shopName : shopInfo?.fullname}</Title>
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
        borderRadius: 50,
        backgroundColor: '#fff'
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
