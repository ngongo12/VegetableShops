import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    TextInput,
    ToastAndroid,
    FlatList,
    Keyboard,
    ScrollView,
    Pressable
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socket } from '../../config/socket';
import userActions from '../../actions/userActions';
import messageActions from '../../actions/messageActions';
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { DateTimeFm, DefautText, Title } from '../../components/Text/AppTexts';
import userAPI from '../../api/userAPI';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainColor } from '../../constants/colors';
import { goBack, navigate } from '../../config/rootNavigation';
import chatAPI from '../../api/chatAPI';
import contactAPI from '../../api/contactAPI';
import ChatBox from '../../components/chat/ChatBox';
import DefaultHeader from '../../components/Header/DefaultHeader';

const ContactListScreen = (props) => {
    const {
        user: { user },
        messageReducer: { messages },
        messageAction
    } = props;
    const [contacts, setContacts] = useState();

    useEffect(() => {
        contactAPI.getListContact(user?._id)
            .then(res => setContacts(res))
            .catch(e => console.log(e));
    }, [])

    //console.log(contacts)

    return (
        <View style={styles.container}>
            <DefaultHeader title="Chat" isBack={true} />
            <ScrollView style={{ flex: 1 }}>
                {
                    contacts?.map(e => {
                        return (
                            <ContactItem item={e} myID={user._id} key={e?._id} />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}



const ContactItem = (props) => {
    const { item, myID } = props;
    const { userIDs } = item;
    const shopId = userIDs[0] === myID ? userIDs[1] : userIDs[0];
    const [shopInfo, setShopInfo] = useState();
    const [lastMessage, setLastMessage] = useState();
    useEffect(() => {
        if (shopId) {
            userAPI.getShopInfo(shopId).then(res => {
                setShopInfo(res?.shopInfo)
            });
        }
    }, [shopId])

    useEffect(() => {
        chatAPI.getLastMessage(item?._id)
            .then(res => setLastMessage(res))
            .catch(e => console.log(e))
    }, [])
    console.log(lastMessage)
    return (
        <Pressable onPress={() => navigate('ChatScreen', { userID: shopId })} style={[styles.content]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage source={{ uri: shopInfo?.avatar }} style={styles.avatar} />
                <View style={{ paddingHorizontal: 10, flex: 1 }}>
                    <Title style={styles.title}>{shopInfo?.shopName}</Title>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {lastMessage ?
                            <DefautText
                                numberOfLines={1} ellipsizeMode='tail'
                                style={{ fontSize: 13, paddingHorizontal: 5 }}>{lastMessage?.sendBy === myID ? 'Bạn: ' : ''}{lastMessage?.messageContent?.message}</DefautText>
                            :
                            <DefautText style={{ fontSize: 13, paddingHorizontal: 5 }}>Chưa có tin nhắn nào</DefautText>}
                    </View>
                    {lastMessage?.createdAt && <DateTimeFm style={{ textAlign: 'right', fontSize: 11 }}>
                        {lastMessage?.createdAt}
                    </DateTimeFm>}
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        marginHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#bbb'
        //paddingBottom: 24,
    },
    icon: {
        paddingLeft: 15
    },
    title: {
        color: '#444',
        fontSize: 15
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 0.5
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


export default connect(mapStateToProps, mapDispatchToProps)(ContactListScreen)
