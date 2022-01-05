import React, { useState, useEffect } from 'react';
import {
    Pressable,
    StyleSheet,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getShopName } from '../../api/userAPI';
import { DefautText, SellPrice, Title } from '../Text/AppTexts';
import { MainColor, MAIN_BACKGROUND, DARK_GREEN, RED } from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import { navigate } from '../../config/rootNavigation';

const OrderItem = props => {
    const { item, isDone, deliveryState, isShop } = props;
    const { products } = item;
    const firstProduct = products[0];
    return (
        <Pressable style={styles.container} onPress={()=>navigate('OrderDetailScreen', { orderID : item._id })}>
            <ItemHeader shopID={item?.shopID} isDone={isDone} isShop={isShop} orderID={item._id} />
            <View style={[styles.itemContain, styles.bottomBorder]}>
                <FastImage source={{ uri: firstProduct?.images[0] }} style={styles.image} />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <DefautText>{firstProduct?.name}</DefautText>
                    <View style={styles.row}>
                        <SellPrice style={styles.sellPrice}>{firstProduct?.sellPrice}</SellPrice>
                        <DefautText>x{firstProduct?.amount}</DefautText>
                    </View>
                </View>
            </View>
            {products?.length > 1 && <DefautText style={styles.seeMore}>Xem thêm sản phẩm</DefautText>}
            <View style={[styles.row, styles.bottomBorder,{ padding: 10, alignItems: 'center', justifyContent: 'center'}]}>
                <DefautText style={{ fontSize: 13, flex: 1 }}>{products?.length} sản phẩm</DefautText>
                <DefautText>Thành tiền: </DefautText>
                <SellPrice style={{ fontSize: 13 }}>{item?.totalPrice}</SellPrice>
            </View>
            <View style={[styles.row, { padding: 10, alignItems: 'center', justifyContent: 'center' }]}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name='truck-fast-outline' color={DARK_GREEN} size={20} />
                    <DefautText style={{ color: DARK_GREEN, paddingHorizontal: 10 }}>{deliveryState ? deliveryState : 'Chưa rõ'}</DefautText>
                </View>
                <Icon name='right' color={DARK_GREEN} size={20} />
            </View>
        </Pressable>
    )
}

const ItemHeader = props => {
    const { shopID, isDone, isShop, orderID } = props;
    const [shopName, setShopName] = useState('');
    useEffect(() => {
        getShopName(shopID).then(res => setShopName(res))
            .catch(e => console.error(e));
    }, [shopID])
    return (
        <View style={[styles.headerContent, styles.bottomBorder]}>
            <Icon
                name={isShop ? 'tago' : 'isv'}
                size={20}
                style={styles.icon}
            />
            <Title style={styles.title}>{isShop? orderID :shopName}</Title>
            <DefautText style={styles.isDone}>{isDone ? 'Hoàn thành' : 'Chưa hoàn thành'}</DefautText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10
    },
    row: {
        flexDirection: 'row',
        flex: 1
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
    }
});

export default OrderItem;
