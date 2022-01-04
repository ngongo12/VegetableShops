import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import userActions from '../actions/userActions';
import cartActions from '../actions/cartActions';
import messageActions from '../actions/messageActions';

import { MainColor } from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import StoreScreen from './Stores/StoreScreen';
import ProfileScreen from './Profiles/ProfileScreen';
import { getData, clearAllData } from '../api/asyncStorage';
import { socket } from '../config/socket';
//import { messaging } from '../config/firebase';
const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
    const { user: { user }, cActions, messageAction, actions } = props;
    const [hasNotifi, setHasNotifi] = useState(false)
    const [newToken, setNewToken] = useState();
    useEffect(() => {

        getData(user._id)
            .then(res => cActions.load(res))
            .catch(e => console.log(e));

        getDeviceToken();
        if (!user) return;
        if (socket.hasListeners(user._id)) {
            socket.off(user._id)
        }
        socket.on(user._id, (socket) => {
            //console.log(socket)
            messageAction.countNew();
        })

    }, [])

    useEffect(() => {
        
        if (newToken && newToken !== user.token) {
            
            actions.actionEditProfile({
                user: {
                    _id: user._id,
                    token: newToken
                }
            })
        }
    }, [newToken])
    try {
        if (!messaging()?.isDeviceRegisteredForRemoteMessages) {
            messaging().registerDeviceForRemoteMessages();
        }
    } catch (e) {
        console.error(e);
    }

    const getDeviceToken = () => {
        messaging().getToken().then(token => setNewToken(token))
            .catch(e => console.error(e))
    }

    useEffect(() => {
        if (!hasNotifi){
            messaging().onMessage(async remoteMessage => {
                const { notification, data, messageId } = remoteMessage;
                    displayNotification(notification, messageId);
            });
            setHasNotifi(true);
            
        }

    }, [])
    
    const displayNotification = async (notification, messageId) => {
        
        const channelId = await notifee.createChannel({
            id: messageId,
            name: messageId,
            importance: AndroidImportance.HIGH,
        });
        //console.log('channelId ', channelId);
        const { title, body, android: { imageUrl } } = notification;
        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId,
                importance: AndroidImportance.HIGH,
                //visibility: AndroidVisibility.PUBLIC,
                smallIcon: 'ic_shop',
                color: MainColor,
                largeIcon: imageUrl,
                style: {
                    type: AndroidStyle.BIGPICTURE,
                    picture: imageUrl
                }
            }
        })


    }

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: MainColor,
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5
                    },
                    tabBarActiveTintColor: '#fff',
                    tabBarInactiveTintColor: 'silver',
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => {
                        const icons = {
                            HomeScreen: 'home',
                            NotificationScreen: 'bells',
                            StoreScreen: 'isv',
                            ProfileScreen: 'user'
                        };
                        return (
                            <Icon
                                name={icons[route.name]}
                                color={color}
                                size={size}
                            />
                        )
                    }
                })}
            >
                <Tab.Screen
                    name='HomeScreen' component={HomeScreen}

                />
                <Tab.Screen
                    name='StoreScreen' component={StoreScreen}

                />
                <Tab.Screen
                    name='NotificationScreen' component={NotificationScreen}

                />

                <Tab.Screen
                    name='ProfileScreen' component={ProfileScreen}
                />
            </Tab.Navigator>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        cart: state.cartReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch),
        cActions: bindActionCreators(cartActions, dispatch),
        messageAction: bindActionCreators(messageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)