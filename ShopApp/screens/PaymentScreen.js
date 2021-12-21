import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Pressable,
    FlatList,
    Modal,
    ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import cartActions from '../actions/cartActions';
import { getCartProduct } from '../api/cartAPI';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DefautText, LargeText, SellPrice, Title } from '../components/Text/AppTexts';
import { getShopName } from '../api/userAPI';
import { DARK_GREEN, MainColor, RED } from '../constants/colors';
import { navigate } from '../config/rootNavigation';
import PaymentItem from '../components/List/PaymentItem';
import orderAPI from '../api/orderAPI';
import LoadingModal from '../components/LoadingModal';

const PaymentScreen = (props) => {
    const { cart, cAction, user: { user }, navigation: { goBack } } = props;
    const { route: { params } } = props;
    const { cartProducts, productList } = params;
    const { address } = user;
    const [visibleModal, setVisibleModal] = useState(false);
    const [chosenAddress, setChosenAddress] = useState();
    const [orders, setOrders] = useState(new Map());
    const [isOrdering, setIsOrdering] = useState(false);
    const [mesage, setMesage] = useState('Đang tạo đơn hàng')
    useEffect(() => {
        if (address.length > 0 && !chosenAddress) {
            setChosenAddress(address[0]);
        }
    }, [address])

    const onChooseAddress = (item) => {
        setChosenAddress(item);
        setVisibleModal(false);
    }
    
    const onOrder = () => {
        //Hiển thị modal
        setIsOrdering(true);
        let count = 0;
        orders.forEach((e ,key) => {
            e.products = e?.products.map(elm => {
                return {
                    _id: elm._id,
                    amount: elm.amount,
                    images: [elm.images[0]],
                    name: elm.name,
                    sellPrice: elm.sellPrice,
                }
            });
            if(e.products.length > 0){
                const order = {
                    ...e,
                    shopID: key,
                    owner: user._id,
                    address: chosenAddress
                }
                orderAPI.createNewOrder({ order })
                    .then(res => {
                        setMesage(`Đã tạo xong ${count}. Hãy chờ`);
                    })
                    .catch(e => console.error(e))
            }
            //xóa product đã chọn
            cAction.deleteChosenProduct({uid: user._id});
            ToastAndroid.show('Đã tạo xong tất cả đơn hàng', ToastAndroid.SHORT);
            setIsOrdering(false);
            goBack();
        })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cartProducts}
                renderItem={({ item }) => <PaymentItem  {...{ item, productList, chosenAddress, orders, setOrders }} />}
                ListHeaderComponent={() => (
                    <Pressable onPress={() => setVisibleModal(true)} style={{ backgroundColor: '#fff', paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
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
                        <Icon name='right' size={25} style={{ paddingHorizontal: 10 }} />
                    </Pressable>
                )}
            />
            <View style={styles.buyView}>
                <DefautText style={styles.totalPrice}></DefautText>
                <DefautText
                    style={styles.buyButton}
                    onPress={onOrder}
                > Mua hàng</DefautText>
            </View>
            <Modal
                visible={visibleModal}
            >
                <Title style={[styles.headerContent, {backgroundColor: MainColor, marginTop: 0, color: '#fff'}]}><Icon name='left' size={15}/>{`       `}Hãy chọn địa chỉ giao hàng</Title>
                <FlatList
                    data={address}
                    renderItem={({ item, index }) => <ItemAddress
                        item={item}
                        key={index}
                        chosenAddress={chosenAddress}
                        onPress={()=> onChooseAddress(item)}
                    />}
                />
            </Modal>
            <LoadingModal
                message={mesage}
                visible={isOrdering}
            />
        </View>
    )
}

const ItemAddress = props => {
    const { item, chosenAddress, onPress } = props;
    return (
        <>
            <Pressable style={styles.item} onPress={onPress}>
                <View style={styles.itemContent}>
                    <DefautText style={styles.itemText}>{`${item?.details}, ${item?.ward?.name}`}</DefautText>
                    <DefautText style={styles.itemText}>{item?.district?.name}</DefautText>
                    <DefautText style={styles.itemLargeText}>{item?.province?.name}</DefautText>
                </View>
                {(chosenAddress === item) && (<DefautText style={styles.delete} onPress={() => setVisibleModal(true)}>Đã chọn</DefautText>)}
            </Pressable>
        </>

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
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver'
    },
    delete: {
        color: RED,
        paddingTop: 10,
        paddingHorizontal: 15
    },
    itemContent: {
        flex: 1
    },
    itemText: {
        paddingHorizontal: 15,
        marginTop: 10
    },
    itemLargeText: {
        paddingHorizontal: 15,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    defautValue: {
        marginHorizontal: 15,
        fontSize: 12,
        color: RED,
        width: 100,
        textAlign: 'center',
        paddingVertical: 3,
        borderWidth: 0.5,
        borderRadius: 3,
        borderColor: RED,
        marginBottom: 10
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


export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen)