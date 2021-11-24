import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Pressable,
    FlatList,
    TextInput,
    ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import { getCartProduct } from '../api/cartAPI';

const CartScreen = (props) => {
    const {cart, user: {user}} = props;
    useEffect(() => {
        fetchCartProducts();
    }, [cart]);

    const fetchCartProducts = async () => {
        const myCartIds = cart?.map(e => e.productID);
        
        let temp = await getCartProduct(myCartIds);
        let cartMap = new Map();
        temp.forEach(element => {
            cartMap.set(element.owner, element)
        });

        console.log(Object.fromEntries(cartMap));
    }
    return(
        <View></View>
    )
}

const CartItem = (props) => {
    return(
        <View></View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        cart: state.cartReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)