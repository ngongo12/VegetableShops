import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Pressable,
    ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { navigate } from '../../config/rootNavigation'
import { SellPrice, ProductName, OriginPrice, SalePercent } from '../Text/AppTexts';

const { width, height } = Dimensions.get('window');
const ProductItem = (props) => {
    const { item, hasBorder } = props;
    return (
        <Pressable style={[styles.constainer, hasBorder && styles.border]} onPress={() => navigate('ProductDetailScreen', { productID: item._id })} >
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
        borderRadius: 8,
        overflow: 'hidden',
        maxWidth: width / 2 - 7,
        minWidth: width / 2.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    border: {
        borderWidth: 0.5,
        borderColor: '#aaa'
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