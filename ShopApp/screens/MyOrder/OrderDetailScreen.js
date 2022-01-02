import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, ScrollView, ToastAndroid, Pressable, TextInput } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import userActions from '../../actions/userActions';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import orderAPI from '../../api/orderAPI';
import { navigate } from '../../config/rootNavigation';
import userAPI, { getShopName } from '../../api/userAPI';
import { DARK_GREEN, MainColor, MAIN_BACKGROUND, RED } from '../../constants/colors';
import { DefautText, Title, SellPrice, DateTimeFm, HeaderText } from '../../components/Text/AppTexts';
import NomalButton from '../../components/Button/NomalButton';
import LoadingView from '../../components/LoadingView'

const OrderDetailsScreen = (props) => {
    const { user: { user }, route: { params } } = props;
    const { orderID } = params;
    const [order, setOrder] = useState();
    const isFocused = useIsFocused();
    const [deliveryAddress, setDeliveryAddress] = useState();
    const [customer, setCustomer] = useState();
    const [product, setProduct] = useState();
    const [orderState, setOrderState] = useState('');
    const [canCancel, setCanCancel] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    const [reason, setReason] = useState('');

    useEffect(() => {
        fetchOrder();
    }, [])

    useEffect(() => {
        if (order) {
            const { address, products } = order;
            setDeliveryAddress(address);
            fetchCustomer(order?.owner);
            setProduct(products);

            switch (order?.state) {
                case 'created': setOrderState('Đang chờ xác nhận'); return;
                case 'confirm': setOrderState('Đang chờ lấy hàng'); return;
                case 'delivery': setOrderState('Đang giao'); return;
                case 'done': setOrderState('Đã hoàn thành'); setCanCancel(false); return;
                case 'cancel': setOrderState('Đã hủy'); setCanCancel(false); return;
            }
        }
    }, [order])

    const fetchOrder = () => {
        console.log('start fetch order');
        orderAPI.getOrderByID(orderID).then(res => setOrder(res?.result))
            .catch(e => console.error(e));
    }

    const fetchCustomer = (id) => {
        userAPI.getUserByID(id).then(res => setCustomer(res))
            .catch(e => console.error(e));
    }

    const confirmOrder = () => {
        orderAPI.setOrder('confirm', user._id, order?._id)
            .then(res => {
                const { result } = res;
                if (!result) {
                    ToastAndroid.show('Lỗi hệ thống', ToastAndroid.SHORT);
                    return;
                }
                if (result?.success) {
                    ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                    fetchOrder();
                }
                else {
                    if (result?.message) {
                        ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                    }
                    else {
                        ToastAndroid.show('Lỗi hệ thống', ToastAndroid.SHORT);
                    }
                }
            })
            .catch(e => console.error(e))
    }

    const deliveryOrder = () => {
        orderAPI.setOrder('delivery', user._id, order?._id)
            .then(res => {
                const { result } = res;
                if (!result) {
                    ToastAndroid.show('Lỗi hệ thống', ToastAndroid.SHORT);
                    return;
                }
                if (result?.success) {
                    ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                    fetchOrder();
                }
                else {
                    if (result?.message) {
                        ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                    }
                    else {
                        ToastAndroid.show('Lỗi hệ thống', ToastAndroid.SHORT);
                    }
                }
            })
            .catch(e => console.error(e))
    }

    const doneOrder = () => {
        orderAPI.setOrder('done', user._id, order?._id)
            .then(res => {
                const { result } = res;
                if (!result) {
                    ToastAndroid.show('Lỗi hệ thống', ToastAndroid.SHORT);
                    return;
                }
                if (result?.success) {
                    ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                    fetchOrder();
                }
                else {
                    if (result?.message) {
                        ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                    }
                    else {
                        ToastAndroid.show('Lỗi hệ thống', ToastAndroid.SHORT);
                    }
                }
            })
            .catch(e => console.error(e))
    }

    const onCancelOrder = () => {
        if (reason.length < 6) {
            ToastAndroid.show('Lý do quá ngắn hãy điền cụ thể ', ToastAndroid.SHORT);
            return;
        }

        orderAPI.cancelOrder(user._id, order?._id, reason)
            .then(res => {
                const { result } = res;
                if (!result) {
                    ToastAndroid.show('Lỗi hệ thống', ToastAndroid.SHORT);
                    return;
                }
                if (result?.success) {
                    ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                    setVisibleModal(false);
                    fetchOrder();
                }
                else {
                    if (result?.message) {
                        ToastAndroid.show(result?.message, ToastAndroid.SHORT);
                    }
                    else {
                        ToastAndroid.show('Lỗi hệ thống', ToastAndroid.SHORT);
                    }
                }
            })
            .catch(e => console.error(e))
    }

    //console.log('order ', order?.totalPrice)

    return (
        <>
            {order ? ( <ScrollView>
                <View style={[styles.container, { backgroundColor: '#fff', paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }]}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='location-outline' color={RED} size={22} style={{ paddingHorizontal: 15, paddingVertical: 5 }} />
                            <DefautText>Địa chỉ nhận hàng</DefautText>
                        </View>
                        <View style={{ paddingLeft: 52 }}>
                            <DefautText style={{ fontWeight: 'bold' }}>{customer?.fullname} | SĐT: {customer?.phone}</DefautText>
                            <DefautText>{deliveryAddress?.details}, {deliveryAddress?.ward?.name}</DefautText>
                            <DefautText>{deliveryAddress?.district?.name}, {deliveryAddress?.province?.name}</DefautText>
                            <DefautText>Khoảng cách: {order?.distance}km </DefautText>
                            {order?.deliveryMethod && <DefautText>Phương thức vận chuyển: {order?.deliveryMethod?.name}</DefautText>}
                            <DefautText>Phí ship: <SellPrice style={{ fontSize: 12 }}>{order?.deliveryFee}</SellPrice></DefautText>
                        </View>
                    </View>
                    <Icon name='right' size={25} style={{ paddingHorizontal: 10 }} />
                </View>
                <View style={styles.container}>
                    <ItemHeader shopID={order?.shopID} />
                    {
                        product?.map(e => {
                            return (
                                <Pressable
                                    onPress={() => navigate('ProductDetailScreen', { productID: e?._id })}
                                    style={[styles.itemContain, styles.bottomBorder]} key={e._id}>
                                    <FastImage source={{ uri: e?.images[0] }} style={styles.image} />
                                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                                        <DefautText>{e?.name}</DefautText>
                                        <View style={styles.row}>
                                            <SellPrice style={styles.sellPrice}>{e?.sellPrice}</SellPrice>
                                            <DefautText>x{e?.amount}</DefautText>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                    <View style={[styles.row, styles.bottomBorder, { padding: 10, alignItems: 'center', justifyContent: 'center' }]}>
                        <DefautText style={{ fontSize: 13, flex: 1 }}>{product?.length} sản phẩm</DefautText>
                        <DefautText>Thành tiền: </DefautText>
                        {order?.totalPrice && <SellPrice style={{ fontSize: 13 }}>{order?.totalPrice}</SellPrice>}
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={[styles.headerContent, styles.bottomBorder]}>
                        <Icon
                            name='creditcard'
                            size={20}
                            style={styles.icon}
                        />
                        <Title style={styles.title}>Phương thức thanh toán</Title>
                        <DefautText style={{ color: MainColor }}>{order?.payMethod}</DefautText>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={[styles.headerContent, styles.bottomBorder]}>
                        <Feather
                            name='truck'
                            size={20}
                            style={styles.icon}
                        />
                        <Title style={styles.title}>Trạng thái đơn hàng</Title>
                        <DefautText style={[
                            { color: DARK_GREEN },
                            order?.state === 'done' && { color: MainColor },
                            order?.state === 'cancel' && { color: RED },
                        ]}>
                            {orderState}
                        </DefautText>
                    </View>
                </View>
                <View style={[styles.container, styles.bottomBorder, { paddingBottom: 10 }]}>
                    <View style={[styles.headerContent]}>
                        <Title style={styles.title}>Mã đơn hàng</Title>
                        <DefautText style={{ color: MainColor }}>{order?._id}</DefautText>
                    </View>
                    <View style={[styles.row, { paddingHorizontal: 10 }]}>
                        <DefautText style={styles.title}>Thời gian đặt hàng</DefautText>
                        {order?.createdAt && <DateTimeFm>{order?.createdAt}</DateTimeFm>}
                    </View>
                    <View style={[styles.row, { paddingHorizontal: 10 }]}>
                        <DefautText style={styles.title}>Thời gian xác nhận</DefautText>
                        {order?.confirmAt && <DateTimeFm>{order?.confirmAt}</DateTimeFm>}
                        {!order?.confirmAt && <DefautText>Chưa xác nhận</DefautText>}
                    </View>
                    <View style={[styles.row, { paddingHorizontal: 10 }]}>
                        <DefautText style={styles.title}>Thời gian giao hàng</DefautText>
                        {order?.deliveryAt && <DateTimeFm>{order?.deliveryAt}</DateTimeFm>}
                        {!order?.deliveryAt && <DefautText>Chưa giao hàng</DefautText>}
                    </View>
                    <View style={[styles.row, { paddingHorizontal: 10 }]}>
                        <DefautText style={styles.title}>Thời gian hoàn thành</DefautText>
                        {order?.doneAt && <DateTimeFm>{order?.doneAt}</DateTimeFm>}
                        {!order?.doneAt && <DefautText>Chưa hoàn thành</DefautText>}
                    </View>
                    {order?.cancelAt && (
                        <>
                            <View style={[styles.row, { paddingHorizontal: 10 }]}>
                                <DefautText style={styles.title}>Đơn hàng đã bị hủy</DefautText>
                                {order?.cancelAt && <DateTimeFm>{order?.cancelAt}</DateTimeFm>}
                            </View>
                            <View style={[styles.row, { paddingHorizontal: 10 }]}>
                                <DefautText style={styles.title}>Người hủy</DefautText>
                                <DefautText>{order?.cancelBy === user._id ? 'Bạn' : 'Người bán' }</DefautText>
                            </View>
                            <View style={[styles.row, { paddingHorizontal: 10 }]}>
                                <DefautText style={styles.title}>Lý do</DefautText>
                                <DefautText>{order?.cancelReason }</DefautText>
                            </View>
                        </>
                    )}
                </View>
                {(user._id === order?.shopID && order?.state === 'created') && <NomalButton onPress={confirmOrder} style={styles.button}>Xác nhận đơn hàng</NomalButton>}
                {(user._id === order?.shopID && order?.state === 'confirm') && <NomalButton onPress={deliveryOrder} style={styles.button}>Xác nhận chuyển hàng</NomalButton>}
                {(order?.state === 'delivery') && <NomalButton onPress={doneOrder} style={styles.button}>Xác nhận hoàn thành</NomalButton>}
                {canCancel && <NomalButton onPress={() => setVisibleModal(true)} style={[styles.button]} color={RED}>Hủy đơn hàng</NomalButton>}
            </ScrollView>): <LoadingView message='Đang tải...' /> }
            <Modal
                visible={visibleModal}
                dimissModal={() => setVisibleModal(false)}
                transparent={true}
                animationType='slide'
            >
                <Pressable style={{ flex: 1 }} onPress={() => setVisibleModal(false)} />
                <View style={styles.modalContent}>
                    <HeaderText>Hủy đơn hàng</HeaderText>
                    <DefautText style={{ margin: 10 }}>Bạn muốn hủy đơn hàng này?</DefautText>
                    <TextInput
                        placeholder='Hãy điền lý do hủy đơn hàng *'
                        value={reason}
                        onChangeText={setReason}
                        style={styles.inputText}
                    />
                    <NomalButton onPress={onCancelOrder} style={{ width: '100%' }} color={RED}>Hủy</NomalButton>
                </View>
            </Modal>
        </>
    )
}

const ItemHeader = props => {
    const { shopID } = props;
    const [shopName, setShopName] = useState('');

    useEffect(() => {
        if (shopID?.length > 0) {
            getShopName(shopID).then(res => setShopName(res))
                .catch(e => console.error(e));
        }
    }, [shopID])
    return (
        <View style={[styles.headerContent, styles.bottomBorder]}>
            <Icon
                name='isv'
                size={20}
                style={styles.icon}
            />
            <Title style={styles.title}>{shopName}</Title>
            <DefautText style={{ color: MainColor }}>Xem shop</DefautText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    row: {
        flexDirection: 'row',
    },
    border: {
        borderTopWidth: 1,
        borderTopColor: MAIN_BACKGROUND
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 10
    },
    title: {
        flex: 1,
        fontSize: 13
    },
    isDone: {
        color: RED,
        paddingHorizontal: 5
    },
    itemContain: {
        flexDirection: 'row',
        padding: 10
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderWidth: 0.5,
        borderColor: 'silver'
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
    },
    sellPrice: {
        fontSize: 13,
        flex: 1
    },
    seeMore: {
        textAlign: 'center',
        lineHeight: 40,
        borderBottomWidth: 0.5,
        borderColor: 'silver'
    },
    bottomBorder: {
        borderBottomWidth: 0.5,
        borderColor: 'silver'
    },
    button: {
        marginTop: 0,
        paddingHorizontal: 10,
    },
    modalContent: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: 'silver',
        borderWidth: 1,
        borderBottomWidth: 0
    },
    inputText: {
        borderWidth: 0.5,
        borderColor: 'silver',
        width: '100%',
        paddingHorizontal: 10,
        fontSize: 13
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen)