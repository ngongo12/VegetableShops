import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/userActions';
import cartActions from '../../actions/cartActions';

import { getCartProduct } from '../api/cartAPI';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DefautText, LargeText, SellPrice, Title } from '../../components/Text/AppTexts';
import { getShopName } from '../../api/userAPI';
import { DARK_GREEN, MainColor, MAIN_BACKGROUND, RED } from '../../constants/colors';
import { navigate } from '../../config/rootNavigation';
import FastImage from 'react-native-fast-image';

const PaymentItem = props => {
    const { item, productList, cart } = props;
    const { data } = item;
    const [buyList, setBuyList] = useState([]);
    let totalAmount = 0;
    let totalPrice = 0;
    const [message, setMessage] = useState('');
    const [chosenMethodIndex, setChosenMethodIndex] = useState(0);
    const [distance, setDistance] = useState(10);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const deliveryMethod = [
        {
            name: 'Nhanh',
            time: [2, 3],
            originPrice: 12000,
            pricePerKm: 1000
        },
        {
            name: 'Chậm',
            time: [4, 6],
            originPrice: 10000,
            pricePerKm: 500
        },
        {
            name: 'Siêu tốc',
            time: [0, 1],
            originPrice: 20000,
            pricePerKm: 1500
        },
    ]

    useEffect(() => {
        setDeliveryFee(deliveryMethod[chosenMethodIndex].originPrice + deliveryMethod[chosenMethodIndex].pricePerKm * distance);
    }, [setChosenMethodIndex])

    useEffect(() => {
        let temp = data.map(e => {
            let item = cart.filter(elm => elm.productID === e._id)[0];
            return {
                ...item,
                ...e,
                amount: item.amount
            };
        })
        temp = temp.filter(e => e.chosen === true)
        setBuyList(temp);
    }, []);

    buyList.forEach(e => {
        totalAmount += e.amount;
        totalPrice += e.amount * e.sellPrice;
    })

    return (
        <>
            {(buyList?.length > 0) && (
                <View style={[styles.container, {marginTop: 10}]}>
                    <ItemHeader id={item?.key} />
                    {buyList.map((e, index) => {
                        return (
                            <Item item={e} key={index} />
                        )
                    })}
                    <DeliveryMethod method={deliveryMethod[chosenMethodIndex]} deliveryFee={deliveryFee} />
                    <View style={[styles.row, {paddingHorizontal: 10}]}>
                        <DefautText>Tin nhắn:</DefautText>
                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            placeholder='Lưu ý cho Người bán...'
                            style={styles.input}
                        />
                    </View>
                    <View style={[styles.row, styles.border, {paddingHorizontal: 10, paddingVertical: 10}]}>
                        <DefautText>Tổng số tiền ({totalAmount} sản phẩm): </DefautText>
                        <SellPrice style={{flex: 1, textAlign: 'right'}}>{totalPrice + deliveryFee}</SellPrice>
                    </View>
                </View>
            )}
        </>
    )
}

const Item = props => {
    const { item } = props;
    return (
        <View style={[styles.itemContain, styles.border]}>
            <FastImage source={{uri: item?.images[0]}} style={styles.image} />
            <View style={{marginLeft: 10, flex: 1, alignItems: 'stretch'}}>
                <DefautText style={{flex: 1}}>{item?.name}</DefautText>
                <View style={[styles.row]}>
                    <SellPrice style={{fontSize: 13, flex: 1}}>{item?.sellPrice}</SellPrice>
                    <DefautText>x{item?.amount}</DefautText>
                </View>
            </View>
        </View>
    )
}

const DeliveryMethod = props => {
    const { method, deliveryFee } = props;
    return (
        <View style={styles.deliveryContain}>
            <DefautText style={styles.deliveryHeader}>Phương thức vận chuyển (Nhấn để chọn)</DefautText>
            <View style={[styles.row, styles.border, {paddingTop: 10}]}>
                <DefautText style={{ color: '#000', fontWeight: '100' }}>{method?.name}</DefautText>
                <SellPrice style={{fontSize: 13, flex: 1, textAlign: 'right', color: '#000', fontWeight: '100'}}>{deliveryFee}</SellPrice>
            </View>
            <DefautText style={{paddingBottom: 10}}>Nhận hàng vào</DefautText>
        </View>
    )
}

const ItemHeader = props => {
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    border:{
        borderTopWidth: 1,
        borderTopColor: MAIN_BACKGROUND
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
    itemContain: {
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        padding: 10
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover'
    },
    input: {
        fontSize: 12,
        flex: 1,
        marginLeft: 20,
        textAlign: 'right'
    },
    deliveryContain: {
        paddingHorizontal: 10,
        backgroundColor: '#F6FFFE',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#87CDC6'
    },
    deliveryHeader: {
        color: DARK_GREEN,
        paddingVertical: 10
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


export default connect(mapStateToProps, mapDispatchToProps)(PaymentItem)
