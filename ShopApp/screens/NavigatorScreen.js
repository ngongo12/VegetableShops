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
import ShopDetailScreen from '../screens/Stores/ShopDetailScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ContactListScreen from './Chat/ContactListScreen';
import EditAddressScreen from './Profiles/address/EditAddressScreen';
import ProductsOfCategoryScreen from './Products/ProductsOfCategoryScreen';
import FavoriteProductScreen from './Products/FavoriteProductScreen';
import EditStore from './Stores/EditStore';
import ForgetPassword from './Auths/ForgetPassword';
import RatingScreen from './MyOrder/RatingScreen';
import SplashScreen from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();

const NavigatorScreen = props => {
    const { user: { user } } = props;
    return (
        <NavigationContainer ref={navigationRef} 
            onReady={()=> SplashScreen.hide({fade: true})} 
        >
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
                        <Stack.Screen
                            name="ForgetPassword"
                            component={ForgetPassword}
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
                                    title: 'Gi??? h??ng'
                                }
                            }
                        />
                        <Stack.Screen
                            name="NewAddressScreen"
                            component={NewAddressScreen}
                            options={
                                {
                                    ...options,
                                    title: '?????a ch??? m???i'
                                }
                            }
                        />
                        <Stack.Screen
                            name="AddressScreen"
                            component={AddressScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Danh s??ch ?????a ch???'
                                }
                            }
                        />
                        <Stack.Screen
                            name="PaymentScreen"
                            component={PaymentScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Thanh to??n'
                                }
                            }
                        />
                        <Stack.Screen
                            name="CreateStore"
                            component={CreateStore}
                            options={
                                {
                                    ...options,
                                    title: 'Kh???i t???o c???a h??ng'
                                }
                            }
                        />
                        <Stack.Screen
                            name="EditStore"
                            component={EditStore}
                            options={
                                {
                                    ...options,
                                    title: 'Thay ?????i th??ng tin c???a h??ng'
                                }
                            }
                        />
                        <Stack.Screen
                            name="MyOrderScreen"
                            component={MyOrderScreen}
                            options={
                                {
                                    ...options,
                                    title: '????n mua'
                                }
                            }
                        />
                        <Stack.Screen
                            name="OrderDetailScreen"
                            component={OrderDetailScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Chi ti???t ????n h??ng'
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
                        <Stack.Screen
                            name="ChatScreen"
                            component={ChatScreen}
                        />
                        <Stack.Screen
                            name="ContactListScreen"
                            component={ContactListScreen}
                        />
                        <Stack.Screen
                            name="EditAddressScreen"
                            component={EditAddressScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Thay ?????i ?????a ch???'
                                }
                            }
                        />
                        <Stack.Screen
                            name="ProductsOfCategoryScreen"
                            component={ProductsOfCategoryScreen}
                            options={
                                {
                                    ...options,
                                    title: 'Danh m???c s???n ph???m'
                                }
                            }
                        />
                        <Stack.Screen
                            name="FavoriteProductScreen"
                            component={FavoriteProductScreen}
                            options={
                                {
                                    ...options,
                                    title: 'S???n ph???m y??u th??ch'
                                }
                            }
                        />
                        <Stack.Screen
                            name="RatingScreen"
                            component={RatingScreen}
                            options={
                                {
                                    ...options,
                                    title: 'RatingScreen'
                                }
                            }
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
    title: 'Gi??? h??ng',
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