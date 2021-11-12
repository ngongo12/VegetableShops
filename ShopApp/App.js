import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import redux from './config/redux';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/Auths/LoginScreen';
import RegisterScreen from './screens/Auths/RegisterScreen';
import AccountSettingScreen from './screens/AccountSettingScreen';
import ProfileDetailScreen from './screens/Profiles/ProfileDetailScreen';
import ProfileEditScreen from './screens/Profiles/ProfileEditScreen';
import ShopAddProductScreen from './screens/Stores/ShopAddProductScreen';
import ProductDetailScreen from './screens/Products/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={ redux.store }>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          backBehavior='none'
          initialRouteName='LoginScreen'
        >
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
          />
          <Stack.Screen
            name="AccountSettingScreen"
            component={AccountSettingScreen}
          />
          <Stack.Screen
            name="ProfileDetailScreen"
            component={ProfileDetailScreen}
          />
          <Stack.Screen
            name="ProfileEditScreen"
            component={ProfileEditScreen}
          />
          <Stack.Screen
            name="ShopAddProductScreen"
            component={ShopAddProductScreen}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
