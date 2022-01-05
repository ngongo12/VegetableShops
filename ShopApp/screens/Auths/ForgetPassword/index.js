import React from "react";
import RequestTokenScreen from "./RequestTokenScreen";
import ChangePassword from "./ChangePassword";
import FillToken from "./FillToken";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const index = (props) => {
    return (
        <Stack.Navigator
                screenOptions={{ headerShown: false }}
                backBehavior='none'
                initialRouteName='RequestTokenScreen'
            >
            <Stack.Screen
                name="RequestTokenScreen"
                component={RequestTokenScreen}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
            />
            <Stack.Screen
                name="FillToken"
                component={FillToken}
            />
        </Stack.Navigator>
    )
}

export default index