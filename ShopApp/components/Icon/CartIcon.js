import React, {useEffect} from 'react';
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
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    MainColor
} from '../../constants/colors';

const CartIcon = ( props ) => {
    const { onPress, cart, pressCount } = props;
    const isFocused = useIsFocused();
    useEffect(() => {

    }, [isFocused, pressCount, cart])
    return (
        <TouchableOpacity style={styles.icon} onPress={onPress}>
            <MCIcon name='shopping-outline' size={24} color={'white'} />
            {(cart && cart?.length > 0) && <Text style={styles.badge}>{ cart?.length }</Text>}
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