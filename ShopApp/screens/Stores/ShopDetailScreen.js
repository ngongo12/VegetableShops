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
import userActions from '../../actions/userActions';
import cartActions from '../../actions/cartActions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DefaultDate, DefautText, Title } from '../../components/Text/AppTexts';
import { productUrl } from '../../api/productAPI';
import { MainColor } from '../../constants/colors';
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
    const [sortProducts, setSortProducts] = useState();
    const [products, setProducts] = useState();
    const sortType = ['Bán chạy', 'Lượt xem', 'Mới nhất', 'Giá'];
    const [chosenType, setChosenType] = useState(sortType[0]);
    const [isIncrease, setIsIncrease] = useState(true);
    useEffect(() => {
        fetchMyProduct();
    }, [])

    useEffect(() => {
        setSortProducts(products);
        sortBySold();
    }, [products])

    const fetchMyProduct = () => {
        fetch(`${productUrl}getAllShopProducts?uid=${shopId}`)
            .then(res => res.json())
            .then(res => setProducts(res?.products))
            .catch(e => console.log(e));
    }

    const onSearch = () => {
        if (products) {
            let temp = products.filter(e => e?.name?.toLowerCase().includes(text.toLowerCase()));
            setSortProducts(temp);
        }
    }

    useEffect(() => {
        onSearch()
    }, [text])


    const onChangeSort = (type) => {
        let temp = isIncrease;
        if (chosenType === type) {
            //Nếu đang chọn thì thay đổi increase
            temp = !isIncrease;
            setIsIncrease(temp);
        }
        else {
            setChosenType(type);
        }
        //console.log(isIncrease)
        switch (type) {
            case sortType[0]: sortBySold(temp); break;
            case sortType[1]: sortBySeen(temp); break;
            case sortType[2]: sortByDate(temp); break;
            case sortType[3]: sortByPrice(temp); break;
        }
    }

    const sortByPrice = (isInc) => {
        // console.log('fnt',isIncrease)
        // console.log('fnt isInc', isInc)
        if (sortProducts?.length > 1) {
            let temp = sortProducts;
            const isc = isInc ? -1 : 1;
            temp = temp.sort((a, b) => {
                return (b.sellPrice - a.sellPrice) * isc;
            })
            setSortProducts(temp);
        }
    }

    const sortByDate = (isInc) => {
        if (sortProducts?.length > 1) {
            let temp = sortProducts;

            temp.sort((a, b) => {
                const aDate = new Date(a.createdAt);
                const bDate = new Date(b.createdAt);
                const result = bDate < aDate && isInc; //b<a là b tạo trước a => true = cũ
                return result ? 1 : -1;
            })
        }
    }

    const sortBySold = (isInc) => {
        if (sortProducts?.length > 1) {
            let temp = sortProducts;
            const isc = isInc ? -1 : 1;
            temp.sort((a, b) => {
                const aSold = a?.sold ? a?.sold : 0;
                const bSold = b?.sold ? b?.sold : 0;
                return (bSold - aSold) * isc;
            })
        }
    }

    const sortBySeen = (isInc) => {
        if (sortProducts?.length > 1) {
            let temp = sortProducts;
            const isc = isInc ? -1 : 1;
            temp.sort((a, b) => {
                const aSeen = a?.nOSeen ? a?.nOSeen : 0;
                const bSeen = b?.nOSeen ? b?.nOSeen : 0;
                //console.log(bSeen)
                return (bSeen - aSeen) * isc;
            })
        }
    }

    //console.log('>>>>>>> products', typeof(products[0]?.createdAt))

    return (
        <>
            <StatusBar translucent={false} backgroundColor={MainColor} />
            <View style={{ flexDirection: 'row', backgroundColor: MainColor, paddingRight: 8 }}>
                <SearchBarInput
                    value={text}
                    onChangeText={setText}
                    onEndEditing={onSearch}
                    onPress={onSearch}
                    notFocus={true}
                />
            </View>
            <ShopHeader shopId={shopId} />

            <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                {
                    sortType.map(e => {
                        return (
                            <Pressable onPress={() => onChangeSort(e)} style={[styles.box, { flexDirection: 'row' }]} key={e}>
                                <DefautText style={chosenType === e && styles.chosen}>{e}</DefautText>
                                {chosenType === e && <AntDesign name={isIncrease ? 'arrowup' : 'arrowdown'} color={MainColor} size={13} />}
                            </Pressable>
                        )
                    })
                }

            </View>
            {products && (
                <FlatList
                    data={sortProducts}
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
                <View style={{ paddingHorizontal: 10, flex: 1  }}>
                    <Title style={styles.white}>{shopInfo?.shopName}</Title>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <EvilIcons name='location' size={18} color={'#fff'} />
                        <DefautText style={{ fontSize: 13, paddingHorizontal: 5, color: '#fff' }}>{shopInfo?.shopAddress?.province?.name}</DefautText>
                    </View>
                </View>
                <DefautText style={styles.btn}>Chat ngay</DefautText>
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
        //paddingVertical: 5,
        fontWeight: '600',
        textAlignVertical: 'center',
        height: 36,
        color: '#fff',
        borderColor: '#fff'
    },
    chosen: {
        fontSize: 12,
        fontWeight: 'bold',
        color: MainColor
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailScreen);