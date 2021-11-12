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
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DefautText, OriginPrice, SellPrice, Title } from '../../components/Text/AppTexts';
import { useIsFocused } from '@react-navigation/native';
import { productUrl } from '../../api/productAPI';
import { MainColor, RED } from '../../constants/colors';
import TextFieldForProduct from '../../components/Text/TextFieldForProduct';

const { width, height } = Dimensions.get('screen');

const ProductDetailScreen = (props) => {
    const { route: { params: { productID } } } = props;
    const { cActions, cart } = props;
    const [product, setProduct] = useState();
    const [rating, setRating] = useState(0);
    const [favorite, setFavorite] = useState(false)
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetch(`${productUrl}getById?id=${productID}`)
            .then(res => res.json())
            .then(res => {
                if (res.product) {
                    setProduct(res.product);
                }
            })
            .catch(e => console.log(e))
    }
    console.log(cart)
    const addToCart = () => {
        cActions.addToCart(product?._id);
    }

    return (
        <>
            {product && (
                <View style={styles.container}>
                    <ScrollView style={styles.container}
                        showsVerticalScrollIndicator={false}
                    >
                        <StatusBar translucent={true} backgroundColor='transparent' />
                        <SliderBox
                            images={product.images}
                            sliderBoxHeight={width * 3 / 4}
                            autoplay={true}
                            circleLoop={true}
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
                                    onPress={() => setFavorite(!favorite)} />
                                <Icon name='sharealt' color='#333' size={24} style={styles.icon} />
                            </View>
                            <SellPrice>{product?.sellPrice}</SellPrice>
                            {(product.sellPrice > product.originPrice) && (<View style={styles.discount}>
                                <OriginPrice>{product?.originPrice}</OriginPrice>
                                <DefautText style={styles.percent}>{Math.round((product.originPrice - product.sellPrice) / (product.originPrice) * 100)}</DefautText>
                            </View>)}
                        </View>
                        <View style={[styles.content, { marginTop: 10 }]}>
                            <Title>Thông tin sản phẩm</Title>
                            <TextFieldForProduct style={styles.textfield} name='Danh mục'>{product.categoryId}</TextFieldForProduct>
                            <TextFieldForProduct style={styles.textfield} name='Thương hiệu'>{product.brand}</TextFieldForProduct>
                            <TextFieldForProduct style={styles.textfield} name='Xuất xứ'>{product.origin}</TextFieldForProduct>
                            <TextFieldForProduct style={styles.textfield} name='Trạng thái'>{product.amount}</TextFieldForProduct>
                            <TextFieldForProduct style={styles.textfield} name='Đơn vị tính'>{product.unit}</TextFieldForProduct>
                        </View>
                        <View style={[styles.content, { marginTop: 10 }]}>
                            <Title>Mô tả sản phẩm</Title>
                            <DefautText>{product.description}</DefautText>
                        </View>
                    </ScrollView>
                    <View style={styles.buttonView}>
                        <Pressable style={[styles.button, styles.buttonVerticle]}>
                            <MCIcon name='chat-processing-outline' color={MainColor} size={26} />
                            <DefautText style={{fontSize: 12}}>Hỏi giá</DefautText>
                        </Pressable>
                        <View 
                            style={{
                                backgroundColor: MainColor,
                                height: '100%',
                                width: 2
                            }}
                        />
                        <Pressable onPress={addToCart} style={[styles.button, styles.buttonVerticle]}>
                            <MCIcon name='cart-arrow-down' color={MainColor} size={26} />
                            <DefautText style={{fontSize: 12}}>Giỏ hàng</DefautText>
                        </Pressable>
                        <Pressable style={[styles.button, styles.buttonBuy]}>
                            <DefautText style={{fontSize: 13, color: '#fff'}} >Mua ngay</DefautText>
                        </Pressable>
                    </View>
                </View>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        cart: state.cartReducer
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
    buttonView:{
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
        backgroundColor: '#fff'
    },
    buttonBuy: {
        backgroundColor: MainColor,
        flex: 2
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);