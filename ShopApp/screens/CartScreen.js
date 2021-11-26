import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    ToastAndroid,
    SectionList
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import { getCartProduct } from '../api/cartAPI';
import CartItem from '../components/List/CartItem';
import CheckBox from '@react-native-community/checkbox';
import { DefautText, LargeText, Title } from '../components/Text/AppTexts';
import { getShopName } from '../api/userAPI';

const CartScreen = (props) => {
    const { cart, user: { user } } = props;
    const [cartProducts, setCartProducts] = useState([]);
    useEffect(() => {
        fetchCartProducts();
    }, [cart]);

    const fetchCartProducts = async () => {
        const myCartIds = cart?.map(e => e.productID);

        let temp = await getCartProduct(myCartIds);
        //console.log('temp',temp)
        let cartMap = new Map();
        temp.forEach(element => {
            let value = cartMap.get(element.owner);
            if (!value) {
                value = [element];
            }
            else {
                value.push(element);
            }
            cartMap.set(element.owner, value);
        });
        let products = Array.from(cartMap, ([key, data]) => ({ key, data }));
        //console.log('cart',products);
        setCartProducts(products);
    }
    return (
        <>
            <SectionList
                sections={cartProducts}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <CartItem item={item} />}
                renderSectionHeader={({ section: { key } }) => (
                    <SectionHeader id={key} />
                )}
            />
        </>
    )
}

const SectionHeader = props => {
    const { id } = props;
    const [shopName, setShopName] = useState('');
    useEffect(() => {
        getShopName(id).then(res => setShopName(res)).catch(e => console.log(e))
    }, [])
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    return (
        <View style={styles.headerContent}>
            <CheckBox
                value={toggleCheckBox}
                onValueChange={(newValue) => { setToggleCheckBox(newValue) }}
                style={styles.chkBox}
            />
            <Title style={styles.title}>{shopName}</Title>
            <DefautText style={styles.delete}>Xóa</DefautText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 15
    },
    chkBox: {
        marginRight: 10
    },
    title: {
        fontSize: 13,
        flex: 1
    },
    delete: {
        color: 'red',
        paddingLeft: 10
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
        actions: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)