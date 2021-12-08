import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SectionList,
    Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import cartActions from '../actions/cartActions';
import { getCartProduct } from '../api/cartAPI';
import Icon from 'react-native-vector-icons/AntDesign';
import CartItem from '../components/List/CartItem';
import { DefautText, LargeText, SellPrice, Title } from '../components/Text/AppTexts';
import { getShopName } from '../api/userAPI';
import { DARK_GREEN, MainColor } from '../constants/colors';
import { navigate } from '../config/rootNavigation';
import onBackPress from '../config/backPressHandler';

const CartScreen = (props) => {
    const { cart, cAction, user: { user }, navigation: { goBack } } = props;
    const { address } = user;
    const [isChoose, setIsChoose] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [productList, setProductList] = useState();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCartProducts();
        //Tính tổng tiền
        if (productList) {
            onCheckOut();
        }
        
    }, [cart]);

    useEffect(() => {
        //Kiểm tra xem có sp nào được chọn ko để hiển thị nút mua
        let checked = false;
        cart.forEach(e => {
            if (e.chosen) {
                checked = true;
                return
            }
        })
        setIsChoose(checked);
    }, [productList])

    const fetchCartProducts = async () => {
        const myCartIds = cart?.map(e => e.productID);

        let temp = await getCartProduct(myCartIds);
        setProductList(temp);
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
    const onCheckOut = () => {
        let temp = 0;
        cart.forEach(e => {
            let item = productList.filter(elm => elm._id === e.productID)[0];
            if (e.chosen) {
                //Nếu có chọn trong cart tình tính tiền
                temp += e.amount * item.sellPrice;
            }
        });
        setTotalPrice(temp);
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
            {address.length === 0 && (<DefautText style={styles.text}
                onPress={() => navigate('NewAddressScreen')}
            >
                Hãy thêm địa chỉ nhận hàng.
                <DefautText style={{ color: MainColor }}> Nhấp vào đây</DefautText>
            </DefautText>)}
            {(isChoose && address.length !== 0) && (
                <View style={styles.buyView}>
                    <DefautText style={styles.totalPrice}>Thành tiền: <SellPrice>{totalPrice}</SellPrice></DefautText>
                    <DefautText
                        style={styles.buyButton}
                        onPress = {() => navigate('PaymentScreen', {...{productList, cartProducts, totalPrice}})}
                    > Mua hàng</DefautText>
                </View>
            )}
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
            <Icon
                name='isv'
                size={20}
                style={styles.icon}
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
    icon: {
        marginRight: 10
    },
    title: {
        fontSize: 13,
        flex: 1
    },
    delete: {
        color: 'red',
        paddingLeft: 10
    },
    text: {
        paddingVertical: 15,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    buyButton: {
        width: 150,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: MainColor,
        paddingVertical: 15,
        alignSelf: 'flex-end'
    },
    buyView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalPrice: {
        marginLeft: 15,
        fontWeight: 'bold',
        flex: 1,
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
        cAction: bindActionCreators(cartActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)