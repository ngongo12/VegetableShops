import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Pressable,
    Image,
} from 'react-native';
import { SellPrice, ProductName, OriginPrice} from './AppTexts';

const ProductItem = ( props ) => {
    const { item } = props;

    return (
        <Pressable style={styles.constainer} >
            <Image source={{uri: item.coverImage}} style={styles.image} />
            <View style={styles.content}>
                <ProductName>{item.name}</ProductName>
                {(item.sellPrice < item.originPrice) && <OriginPrice>{item.originPrice}đ</OriginPrice>}
                <SellPrice>{item.sellPrice}đ</SellPrice>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        margin: 4,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    content: {
        padding: 10
    }
})

export default ProductItem