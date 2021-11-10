import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Pressable,
    Image,
} from 'react-native';
import { SellPrice, ProductName, OriginPrice} from './AppTexts';

const { width, height } = Dimensions.get('window');
const ProductItem = ( props ) => {
    const { item } = props;

    return (
        <Pressable style={styles.constainer} >
            <Image source={{uri: item.images[0]}} style={styles.image} />
            <View style={styles.content}>
                <ProductName>{item.name}</ProductName>
                {(item.sellPrice < item.originPrice) && <OriginPrice>{item.originPrice}</OriginPrice>}
                <SellPrice>{item.sellPrice}</SellPrice>
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
        overflow: 'hidden',
        maxWidth: width/2-7
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