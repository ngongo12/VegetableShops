import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Pressable
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import cartActions from '../actions/cartActions';
import { getCartProduct } from '../api/cartAPI';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartItem from '../components/List/CartItem';
import { DefautText, LargeText, SellPrice, Title } from '../components/Text/AppTexts';
import { getShopName } from '../api/userAPI';
import { DARK_GREEN, MainColor, RED } from '../constants/colors';
import { navigate } from '../config/rootNavigation';
import onBackPress from '../config/backPressHandler';

const PaymentScreen = (props) => {
    const { cart, cAction, user: { user }, navigation: { goBack } } = props;
    const { route: { params } } = props;
    const { cartProducts, productList, totalPrice } = params;
    const { address } = user;
    const [chosenAddress, setChosenAddress] = useState();
    useEffect(() => {
        if (address.length > 0 && !chosenAddress) {
            setChosenAddress(address[0]);
        }
    }, [address])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <Pressable style={{ backgroundColor: '#fff', paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{flex: 1}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='location-outline' color={RED} size={22} style={{ paddingHorizontal: 15, paddingVertical: 5 }} />
                            <DefautText>Địa chỉ nhận hàng</DefautText>
                        </View>
                        <View style={{ paddingLeft: 52 }}>
                            <DefautText>{user?.fullname} | SĐT: {user?.phone}</DefautText>
                            <DefautText>{chosenAddress?.details}, {chosenAddress?.ward?.name}</DefautText>
                            <DefautText>{chosenAddress?.district?.name}, {chosenAddress?.province?.name}</DefautText>
                        </View>
                    </View>
                    <Icon name='right' size={25} style={{paddingHorizontal: 10}} />
                </Pressable>
            </ScrollView>
            <View style={styles.buyView}>
                <DefautText style={styles.totalPrice}>Thành tiền: <SellPrice>{totalPrice}</SellPrice></DefautText>
                <DefautText
                    style={styles.buyButton}
                    onPress={() => navigate('PaymentScreen', { ...{ productList, cartProducts } })}
                > Mua hàng</DefautText>
            </View>
        </View>
    )
}

const SectionHeader = props => {
    const { id } = props;
    const [shopName, setShopName] = useState('');
    useEffect(() => {
        getShopName(id).then(res => setShopName(res)).catch(e => console.log(e))
    }, [])

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
        actions: bindActionCreators(userActions, dispatch),
        cAction: bindActionCreators(cartActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen)