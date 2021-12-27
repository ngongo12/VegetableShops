import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import redux from '../config/redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { navigationRef } from '../config/rootNavigation';
import { MainColor } from '../constants/colors';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/Auths/LoginScreen';
import RegisterScreen from '../screens/Auths/RegisterScreen';
import AccountSettingScreen from '../screens/Profiles/AccountSettingScreen';
import ProfileDetailScreen from '../screens/Profiles/ProfileDetailScreen';
import ProfileEditScreen from '../screens/Profiles/ProfileEditScreen';
import ShopAddProductScreen from '../screens/Stores/ShopAddProductScreen';
import ProductDetailScreen from '../screens/Products/ProductDetailScreen';
import ShopEditProductScreen from '../screens/Stores/ShopEditProductScreen';
import CartScreen from '../screens/CartScreen';
import NewAddressScreen from '../screens/Profiles/address/NewAddressScreen';
import AddressScreen from '../screens/Profiles/address/AddressScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CreateStore from '../screens/Stores/CreateStore';
import MyOrderScreen from '../screens/MyOrder';
import OrderDetailScreen from '../screens/MyOrder/OrderDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import ShopDetailScreen from '../screens/Stores/ShopDetailScreen'

const Stack = createNativeStackNavigator();

const NavigatorScreen = props => {
    const { user: { user } } = props;
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                backBehavior='none'
                initialRouteName='LoginScreen'
            >
                {!user?._id ? (
                    <>
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                        />
                        <Stack.Screen
                            name="RegisterScreen"
                            component={RegisterScreen}
                        />
                    </>
                ) : (
                    <>
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
                        <Stack.Screen
                            name="ShopEditProductScreen"
                            component={ShopEditProductScreen}
                        />
                        <Stack.Screen
                            name="CartScreen"
                            component={CartScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Giỏ hàng'
                                }
                            }
                        />
                        <Stack.Screen
                            name="NewAddressScreen"
                            component={NewAddressScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Địa chỉ mới'
                                }
                            }
                        />
                        <Stack.Screen
                            name="AddressScreen"
                            component={AddressScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Danh sách địa chỉ'
                                }
                            }
                        />
                        <Stack.Screen
                            name="PaymentScreen"
                            component={PaymentScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Thanh toán'
                                }
                            }
                        />
                        <Stack.Screen
                            name="CreateStore"
                            component={CreateStore}
                            options={
                                {
                                    ...options,
                                    title: 'Khởi tạo cửa hàng'
                                }
                            }
                        />
                        <Stack.Screen
                            name="MyOrderScreen"
                            component={MyOrderScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Đơn mua'
                                }
                            }
                        />
                        <Stack.Screen
                            name="OrderDetailScreen"
                            component={OrderDetailScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Chi tiết đơn hàng'
                                }
                            }
                        />
                        <Stack.Screen
                            name="SearchScreen"
                            component={SearchScreen}
                        />
                        <Stack.Screen
                            name="ShopDetailScreen"
                            component={ShopDetailScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const options = {
    headerShown: true,
    headerStyle: {
        backgroundColor: MainColor,
    },
    headerTitleStyle: {
        color: '#fff'
    },
    title: 'Giỏ hàng',
    headerTintColor: '#fff'
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        cart: state.cartReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorScreen)