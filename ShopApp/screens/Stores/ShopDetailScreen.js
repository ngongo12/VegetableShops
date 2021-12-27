import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    StatusBar,
    FlatList,
    Dimensions,
    ToastAndroid,
    View,
    ScrollView,
    Pressable
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SliderBox } from "react-native-image-slider-box";
import userActions from '../../actions/userActions';
import cartActions from '../../actions/cartActions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { DefaultDate, DefautText, OriginPrice, SellPrice, Title } from '../../components/Text/AppTexts';
import { productUrl } from '../../api/productAPI';
import { MainColor, RED } from '../../constants/colors';
import { navigate } from '../../config/rootNavigation';
import userAPI from '../../api/userAPI';
import FastImage from 'react-native-fast-image';
import { SearchBarInput } from '../../components/Header/SearchBar';
import ProductItem from '../../components/List/ProductItem';

const { width, height } = Dimensions.get('screen');

const ShopDetailScreen = (props) => {
    const { route: { params: { shopId } } } = props;
    const { actions, cActions, user: { user }, categories } = props;
    const [text, setText] = useState('');
    const [products, setProducts] = useState();
    useEffect(() => {
        fetchMyProduct();
    }, [])

    const fetchMyProduct = () => {
        fetch(`${productUrl}getMyProductsWithLimit?uid=${user._id}`)
            .then(res => res.json())
            .then(res => setProducts(res?.products))
            .catch(e => console.log(e));
    }

    const onSearch = () => {

    }
    //console.log(product)

    return (
        <>
            <StatusBar translucent={false} backgroundColor={MainColor} />
            <View style={{ flexDirection: 'row', backgroundColor: MainColor, paddingRight: 8 }}>
                <SearchBarInput
                    value={text}
                    onChangeText={setText}
                    onEndEditing={onSearch}
                    onPress={onSearch}
                    notFocus = {true}
                />
            </View>
            <ShopHeader shopId={shopId} />
            {products && (
                <FlatList
                    data={products}
                    renderItem={({ item }) => <ProductItem {...{ item, navigate }} />}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </>
    )
}

const ShopHeader = (props) => {
    const { shopId } = props;
    const [shopInfo, setShopInfo] = useState();
    const [soldDetail, setSoldDetail] = useState()
    useEffect(() => {
        if (shopId) {
            userAPI.getShopInfo(shopId).then(res => {
                setShopInfo(res?.shopInfo),
                    setSoldDetail(res?.soldDetail[0]);
            });
        }
    }, [shopId])
    //console.log(shopInfo)
    return (
        <View style={[styles.content, { backgroundColor: MainColor }]}>
            <View style={{ flexDirection: 'row' }}>
                <FastImage source={{ uri: shopInfo?.avatar }} style={styles.avatar} />
                <View style={{ paddingHorizontal: 10 }}>
                    <Title style={styles.white}>{shopInfo?.shopName}</Title>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <EvilIcons name='location' size={18} color={'#fff'} />
                        <DefautText style={{ fontSize: 13, paddingHorizontal: 5, color: '#fff' }}>{shopInfo?.shopAddress?.province?.name}</DefautText>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <View style={styles.box}>
                    <Title style={styles.white}>{soldDetail?.numOfProduct}</Title>
                    <DefautText style={styles.white}>Sản phẩm</DefautText>
                </View>
                <View style={styles.bar} />
                <View style={styles.box}>
                    <Title style={styles.white}>{soldDetail?.totalSold}</Title>
                    <DefautText style={styles.white}>Đã bán</DefautText>
                </View>
                <View style={styles.bar} />
                <View style={styles.box}>
                    <DefaultDate style={{ color: '#fff', fontWeight: 'bold' }}>{shopInfo?.createdAt}</DefaultDate>
                    <DefautText style={styles.white}>Ngày tham gia</DefautText>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        cart: state.cartReducer,
        categories: state.categoryReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch),
        cActions: bindActionCreators(cartActions, dispatch)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        backgroundColor: '#fff',
        paddingBottom: 24
    },
    icon: {
        paddingHorizontal: 15
    },
    white: {
        color: '#eee'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        height: '50%',
        width: 1.5,
        backgroundColor: '#fff'
    },
    btn: {
        borderRadius: 5,
        borderWidth: 0.5,
        width: 100,
        textAlign: 'center',
        paddingVertical: 5,
        fontWeight: '600'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailScreen);