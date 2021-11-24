import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/userActions';
import cartActions from '../../actions/cartActions';
import { useIsFocused } from '@react-navigation/native';
import { navigate } from '../../config/rootNavigation';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    MainColor
} from '../../constants/colors';


const CartIcon = ( props ) => {
    const { cart, pressCount } = props;
    const isFocused = useIsFocused();
    const [numOfProducts, setNumOfProducts] = useState(0);
    useEffect(() => {
        console.log('cart icon ', cart);
        let temp = 0;
        if(cart){
            cart?.forEach(element => {
                temp += element?.amount;
            });
            setNumOfProducts(temp);
        }
    }, [isFocused, pressCount, cart])
    return (
        <TouchableOpacity style={styles.icon} onPress={()=>navigate('CartScreen')}>
            <MCIcon name='shopping-outline' size={24} color={'white'} />
            {(numOfProducts > 0) && <Text style={styles.badge}>{ numOfProducts }</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    constainer: {
        padding: 10
    },
    icon: {
        padding: 10,
        //backgroundColor: MainColor,
    },
    badge: {
        top: 5,
        right: 3,
        position: 'absolute',
        textAlign: 'center',
        textAlignVertical:'center',
        color: '#fff',
        fontSize: 10,
        width: 20,
        height: 20,
        borderWidth: 1.5,
        borderRadius: 20,
        borderColor: '#fff',
        backgroundColor: MainColor

    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);