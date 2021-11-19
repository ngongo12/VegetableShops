import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
    const { user: { user }, cActions, cart } = props;
    useEffect(() => {
        //clearAllData();
        getData(user._id)
        .then(res => cActions.load(res))
        .catch(e => console.log(e));
    }, [user])
    //console.log(cart)
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
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
                tabBarIcon: ({ color, size}) => {
                    const icons = {
                        HomeScreen: 'home',
                        NotificationScreen: 'bells',
                        StoreScreen: 'isv',
                        ProfileScreen: 'user'
                    };
                    return(
                        <Icon
                            name = {icons[route.name]}
                            color = {color}
                            size = {size}
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