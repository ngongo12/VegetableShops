import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    Dimensions
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MainColor } from '../../constants/colors';
import DefaultHeader from '../../components/Header/DefaultHeader';
import AllNotification from './AllNotification';
import NewNotification from './NewNotification';

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('screen')
const NotificationScreen = (props) => {

    return (
        <>
            <DefaultHeader title='Thông báo' />
            <Tab.Navigator
                screenOptions={{
                    tabBarBounces: true,
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
                    name='NewNotification'
                    component={NewNotification}
                    options={{ title: 'Tin mới' }}
                />
                <Tab.Screen
                    name='AllNotification'
                    component={AllNotification}
                    options={{ title: 'Tất cả' }}
                />
            </Tab.Navigator>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 50,
        height: 50
    }
})



export default NotificationScreen
