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
                initialRouteName={params.screenName}
            >
                <Tab.Screen
                    name='NewOrderScreen'
                    component={NewOrderScreen}
                    options={{ title: 'Chờ duyệt' }}
                />
                <Tab.Screen
                    name='ConfirmedOrderScreen'
                    component={ConfirmedOrderScreen}
                    options={{ title: 'Chờ lấy hàng' }}
                />
                <Tab.Screen
                    name='DeliveryOrderScreen'
                    component={DeliveryOrderScreen}
                    options={{ title: 'Đang giao' }}
                />
                <Tab.Screen
                    name='DoneOrderScreen'
                    component={DoneOrderScreen}
                    options={{ title: 'Đã giao' }}
                />
                <Tab.Screen
                    name='CancelOrderScreen'
                    component={CancelOrderScreen}
                    options={{ title: 'Đã hủy' }}
                />
            </Tab.Navigator>
        </>
    )
}

export default MyOrderScreen;