import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../actions/userActions';
import cartActions from '../actions/cartActions';

import { MainColor } from '../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import StoreScreen from './Stores/StoreScreen';
import ProfileScreen from './Profiles/ProfileScreen';
import { getData, clearAllData } from '../api/asyncStorage';
//import { messaging } from '../config/firebase';
const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
    const { user: { user }, cActions, cart, actions } = props;
    const [newToken, setNewToken] = useState();
    useEffect(() => {
        //clearAllData();

        getData(user._id)
            .then(res => cActions.load(res))
            .catch(e => console.log(e));

        getDeviceToken();

    }, [user])

    useEffect(() => {
        //console.log('newToken', !newToken)
        if (newToken && newToken !== user.token) {
            //console.log('update token')
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
    }catch(e){
        console.error(e);
    }
    //console.log('isDeviceRegisteredForRemoteMessages: ', messaging().isDeviceRegisteredForRemoteMessages);
    const getDeviceToken = () => {
        messaging().getToken().then(token => setNewToken(token))
            .catch(e => console.error(e))
    }
    // useEffect(() => {
    //     messaging().hasPermission().then(res => console.log('hasPermission', res))
    // }, [])

    //console.log(cart)
    return (
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
        cActions: bindActionCreators(cartActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)