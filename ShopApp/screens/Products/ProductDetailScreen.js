import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    StatusBar,
    Image,
    Text,
    Animated,
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
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DefaultDate, DefautText, OriginPrice, SellPrice, Title } from '../../components/Text/AppTexts';
import { productUrl } from '../../api/productAPI';
import { MainColor, RED } from '../../constants/colors';
import TextFieldForProduct from '../../components/Text/TextFieldForProduct';
import LoadingView from '../../components/LoadingView';
import ProductDetailHeader from '../../components/Header/ProductDetailHeader';
import { navigate } from '../../config/rootNavigation';
import userAPI from '../../api/userAPI';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('screen');

const ProductDetailScreen = (props) => {
    const { route: { params: { productID } } } = props;
    const { actions, cActions, user: { user }, categories } = props;
    const { favorites, seenProducts } = user;
    const [product, setProduct] = useState();
    const [rating, setRating] = useState(0);
    const [favorite, setFavorite] = useState(false);
    const [visibleHeader, setVisibleHeader] = useState(false);
    const [pressCount, setPressCount] = useState(0);
    const [enableFavorite, setEnableFavorite] = useState(true);
    const [category, setCategory] = useState();
    useEffect(() => {
        fetchData();
        updateNOSeen();
        changeSeenProducts();
    }, []);

    useEffect(() => {
        if (categories) {
            const temp = categories.filter(e => e._id == product?.categoryId);
            if (temp?.length > 0) {
                setCategory(temp[0]);
            }
        }
    }, [product])

    useEffect(() => {
        if (product?._id) {
            if (favorites?.indexOf(product._id) >= 0) {
                setFavorite(true);
            }
            else {
                setFavorite(false);
            }
            setEnableFavorite(true);
        }
    }, [user, product])

    const fetchData = () => {
        fetch(`${productUrl}getById?id=${productID}`)
            .then(res => res.json())
            .then(res => {
                if (res.product) {
                    setProduct(res.product);
                    if (favorites?.indexOf(res.product._id) >= 0) {
                        setFavorite(true);
                    }
                }
            })
            .catch(e => console.log(e))
    }

    //console.log('Product Details', actions)
    const addFavorite = () => {
        let temp = favorites;
        temp.push(product._id);
        actions.actionEditProfile({
            user: {
                _id: user._id,
                favorites: temp
            }
        })
    }

    const removeFavorite = () => {
        let temp = favorites;
        temp = temp.filter(e => e !== product._id);
        actions.actionEditProfile({
            user: {
                _id: user._id,
                favorites: temp
            }
        })
    }

    const changeFavoriteState = () => {
        setEnableFavorite(false);
        if (favorite) {
            //Đang thích
            removeFavorite();
        } else {
            addFavorite();
        }
    }

    const changeSeenProducts = () => {
        if (seenProducts.indexOf(productID) === 0) return; // Không có thay đổi dữ liệu gì nên out

        let temp = seenProducts;
        //Xóa productId trong list seen cũ nếu có
        temp = temp.filter(e => e !== productID);
        //Thêm mới productId vào đầu seen list mới
        temp = [productID, ...temp];
        //Lưu vào database
        actions.actionEditProfile({
            user: {
                _id: user._id,
                seenProducts: temp
            }
        })
    }

    const updateNOSeen = () => {
        //console.log('update numofseen')
        fetch(`${productUrl}updateNOSeen?id=${productID}`).catch(e => console.log('update nos',e));
    }

    const addToCart = () => {
        cActions.addToCart({
            productID: product?._id,
            uid: user._id
        });
        setPressCount(pressCount + 1);
    }

    const getScroll = (event) => {
        const { nativeEvent: { contentOffset: { y } } } = event;
        if (y > 50 && !visibleHeader) {
            setVisibleHeader(true);
        }
        if (y < 50 && visibleHeader) {
            setVisibleHeader(false);
        }
    }

    const onBuyNow = () => {
        addToCart();
        navigate('CartScreen');
    }

    //console.log(product)

    return (
        <>
            {product && (
                <View style={styles.container}>
                    <ProductDetailHeader title={product?.name} visible={visibleHeader} pressCount={pressCount} />
                    <ScrollView style={styles.container}
                        showsVerticalScrollIndicator={false}
                        onScroll={getScroll}
                    >
                        <StatusBar translucent={true} backgroundColor='transparent' />
                        <SliderBox
                            images={product.images}
                            sliderBoxHeight={width * 3 / 4}
                            autoplay={true}
                            circleLoop={true}
                            resizeMode='center'
                        />
                        <View style={styles.content}>
                            <Title>{product?.name}</Title>
                            <View style={styles.ratingView}>
                                <DefautText style={{ fontSize: 15, fontWeight: 'bold' }}>{rating}</DefautText>
                                <DefautText style={{ fontSize: 15 }}>/5</DefautText>
                                <Rating
                                    type='custom'
                                    imageSize={18}
                                    ratingCount={5}
                                    backgroundColor='blue'
                                    ratingBackgroundColor='silver'
                                    style={styles.rating}
                                    startingValue={rating}
                                    onFinishRating={setRating}
                                />
                                <DefautText style={{ flex: 1 }}>Đã bán {product.sold ? product.sold : 0}</DefautText>
                                <Icon
                                    name={favorite ? 'heart' : 'hearto'}
                                    color={favorite ? RED : 'silver'}
                                    size={24} style={styles.icon}
                                    disabled={!enableFavorite}
                                    onPress={changeFavoriteState} />
                                <Icon name='sharealt' color='#333' size={24} style={styles.icon} />
                            </View>
                            <SellPrice>{product?.sellPrice}</SellPrice>
                            {(product.sellPrice > product.originPrice) && (<View style={styles.discount}>
                                <OriginPrice>{product?.originPrice}</OriginPrice>
                                <DefautText style={styles.percent}>{Math.round((product.originPrice - product.sellPrice) / (product.originPrice) * 100)}</DefautText>
                            </View>)}
                        </View>
                        <ShopInfo shopId={product?.owner} uid={user?._id} />
                        <View style={[styles.content, { marginTop: 10 }]}>
                            <Title>Thông tin sản phẩm</Title>
                            <TextFieldForProduct style={styles.textfield} name='Danh mục'>{category?.name}</TextFieldForProduct>
                            <TextFieldForProduct style={styles.textfield} name='Thương hiệu'>{product.brand}</TextFieldForProduct>
                            <TextFieldForProduct style={styles.textfield} name='Đã bán'>{product?.sold ? product?.sold : 0}</TextFieldForProduct>
                            <TextFieldForProduct style={styles.textfield} name='Xuất xứ'>{product.origin}</TextFieldForProduct>
                            <TextFieldForProduct style={styles.textfield} name='Trạng thái'>{(product?.amount && product.amount > 0) ? 'Còn hàng' : 'Hết hàng'}</TextFieldForProduct>
                            <TextFieldForProduct style={styles.textfield} name='Đơn vị tính'>{product.unit}</TextFieldForProduct>
                        </View>
                        <View style={[styles.content, { marginTop: 10 }]}>
                            <Title>Mô tả sản phẩm</Title>
                            <DefautText>{product.description}</DefautText>
                        </View>
                    </ScrollView>
                    {(user._id !== product?.owner) && (
                        <View style={styles.buttonView}>
                            <Pressable style={[styles.button, styles.buttonVerticle]}>
                                <MCIcon name='chat-processing-outline' color={MainColor} size={23} />
                                <DefautText style={{ fontSize: 12 }}>Hỏi giá</DefautText>
                            </Pressable>
                            <View
                                style={{
                                    backgroundColor: MainColor,
                                    height: '100%',
                                    width: 2
                                }}
                            />
                            <Pressable onPress={addToCart} style={[styles.button, styles.buttonVerticle]}>
                                <MCIcon name='cart-arrow-down' color={MainColor} size={23} />
                                <DefautText style={{ fontSize: 12 }}>Giỏ hàng</DefautText>
                            </Pressable>
                            <Pressable onPress={onBuyNow} style={[styles.button, styles.buttonBuy]}>
                                <DefautText style={{ fontSize: 13, color: '#fff' }} >Mua ngay</DefautText>
                            </Pressable>
                        </View>)}
                </View>
            )}
            {!product && <LoadingView />}
        </>
    )
}

const ShopInfo = (props) => {
    const { shopId, uid } = props;
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
    // console.log(shopId)
    // console.log(shopInfo)
    return (
        <>
            {shopInfo && (<View style={[styles.content, { marginTop: 10 }]}>
                <View style={{ flexDirection: 'row' }}>
                    <FastImage source={{ uri: shopInfo?.avatar }} style={styles.avatar} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Title>{shopInfo?.shopName}</Title>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <EvilIcons name='location' size={18} />
                            <DefautText style={{ fontSize: 13, paddingHorizontal: 5 }}>{shopInfo?.shopAddress?.province?.name}</DefautText>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <View style={styles.box}>
                        <Title style={{ color: MainColor }}>{soldDetail?.numOfProduct}</Title>
                        <DefautText>Sản phẩm</DefautText>
                    </View>
                    <View style={styles.bar} />
                    <View style={styles.box}>
                        <Title style={{ color: MainColor }}>{soldDetail?.totalSold}</Title>
                        <DefautText>Đã bán</DefautText>
                    </View>
                    <View style={styles.bar} />
                    <View style={styles.box}>
                        <DefaultDate style={{ color: MainColor, fontWeight: 'bold' }}>{shopInfo?.createdAt}</DefaultDate>
                        <DefautText>Ngày tham gia</DefautText>
                    </View>
                </View>
                {shopId !== uid && (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
                    <DefautText onPress={()=> navigate('ChatScreen', { userID : shopInfo._id })} style={[styles.btn,]}>Chat Ngay</DefautText>
                    <DefautText onPress={() => navigate('ShopDetailScreen', { shopId })} style={[styles.btn, { marginLeft: 10, backgroundColor: MainColor, color: '#fff', borderColor: MainColor }]}>Xem Shop</DefautText>
                </View>)}
            </View>)}
        </>
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
    ratingView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    rating: {
        padding: 3,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 5
    },
    icon: {
        paddingHorizontal: 15
    },
    discount: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    percent: {
        paddingHorizontal: 12
    },
    textfield: {
        marginTop: 10
    },
    buttonView: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    buttonVerticle: {
        flex: 1,
        backgroundColor: '#D7ECFF'
    },
    buttonBuy: {
        backgroundColor: MainColor,
        flex: 2
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
        backgroundColor: '#ddd'
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);