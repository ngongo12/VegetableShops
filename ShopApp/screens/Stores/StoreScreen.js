import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/userActions';
import DefaultHeader from '../../components/Header/DefaultHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShopOrderScreen from './ShopOrderScreen';
import ShopProductScreen from './ShopProductScreen';
import { MainColor } from '../../constants/colors';

const Tab = createMaterialTopTabNavigator();
const StoreScreen = (props) => {
    
    return (
        <View style={styles.container}>
            <DefaultHeader title='Cửa hàng của tôi' />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: MainColor,
                }}
            >
                <Tab.Screen
                    name='ShopProductScreen'
                    component={ShopProductScreen}
                    options={{title: 'Sản phẩm'}}
                />
                <Tab.Screen
                    name='ShopOrderScreen'
                    component={ShopOrderScreen}
                    options={{title: 'Đơn hàng'}}
                />
            </Tab.Navigator>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen)
