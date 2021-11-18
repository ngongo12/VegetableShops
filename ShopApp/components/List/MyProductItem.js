import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Pressable,
    ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SellPrice, ProductName, OriginPrice, SalePercent } from '../Text/AppTexts';

const { width, height } = Dimensions.get('window');
const ProductItem = (props) => {
    const { item, navigate } = props;

    return (
        <Pressable style={styles.constainer} onPress={() => navigate('ShopEditProductScreen', { productID: item._id })} >
            <FastImage source={{ uri: item.images[0] }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
            <View style={styles.content}>
                <ProductName>{item.name}</ProductName>
                {(item.sellPrice < item.originPrice) && <OriginPrice>{item.originPrice}</OriginPrice>}
                <SellPrice>{item.sellPrice}</SellPrice>
            </View>
            {(item.sellPrice < item.originPrice) && (
                <ImageBackground style={styles.saleImage} source={require('../../assets/images/sale.png')}>
                    <SalePercent>-{Math.round((item.originPrice - item.sellPrice) * 100 / item.originPrice)}%</SalePercent>
                </ImageBackground>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        margin: 4,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        maxWidth: width / 2 - 7
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    content: {
        padding: 10
    },
    saleImage: {
        width: 55,
        height: 23,
        position: 'absolute',
        top: 10,
        left: -9,
        resizeMode: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductItem