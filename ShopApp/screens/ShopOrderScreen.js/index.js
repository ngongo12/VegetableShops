import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NewOrderScreen from "./NewOrderScreen";
import ConfirmedOrderScreen from "./ConfirmedOrderScreen";
import DeliveryOrderScreen from "./DeliveryOrderScreen";
import DoneOrderScreen from "./DoneOrderScreen";
import CancelOrderScreen from "./CancelOrderScreen";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MainColor } from '../../constants/colors';

const Tab = createMaterialTopTabNavigator();

const MyOrderScreen = (props) => {
    const {route: { params}, navigation: { navigate }} = props;
    //console.log(params);
    // useEffect(() => {
    //     navigate(params.screenName);
    // }, [params])
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarBounces: true,
                    tabBarScrollEnabled: true,
                    tabBarAllowFontScaling: true,
                    tabBarLabelStyle: {
                        textTransform: 'none',
                    },
                    tabBarActiveTintColor: MainColor,
                    tabBarIndicatorStyle: {
                        backgroundColor: MainColor
                    },
                }}
            >
                <Tab.Screen
                    name='SNewOrderScreen'
                    component={NewOrderScreen}
                    options={{ title: 'Chờ duyệt' }}
                />
                <Tab.Screen
                    name='SConfirmedOrderScreen'
                    component={ConfirmedOrderScreen}
                    options={{ title: 'Chờ lấy hàng' }}
                />
                <Tab.Screen
                    name='SDeliveryOrderScreen'
                    component={DeliveryOrderScreen}
                    options={{ title: 'Đang giao' }}
                />
                <Tab.Screen
                    name='SDoneOrderScreen'
                    component={DoneOrderScreen}
                    options={{ title: 'Đã giao' }}
                />
                <Tab.Screen
                    name='SCancelOrderScreen'
                    component={CancelOrderScreen}
                    options={{ title: 'Đã hủy' }}
                />
            </Tab.Navigator>
        </>
    )
}

export default MyOrderScreen;