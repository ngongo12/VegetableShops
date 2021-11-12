import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Pressable,
    ImageBackground
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { productUrl } from '../../api/productAPI';
import LinearGradient from 'react-native-linear-gradient';
import { Title, PressableText, DefautText, SellPrice, OriginPrice, SalePercent } from '../Text/AppTexts';

const SaleProductList = (props) => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetchData();
        //console.log(products)
    }, []);

    const fetchData = () => {
        fetch(`${productUrl}getTopProductByCategory?id=6184f4bc4afb65fb8ce84338`)
            .then(res => res.json())
            .then(res => {
                if (res.products) {
                    setProducts(res.products);
                }
            })
            .catch(e => console.log(e));
    }
    
    return (
        <LinearGradient
            locations={[0, 1.0]}
            start={{ x: 1.0, y: 1.0 }}
            end={{ x: 0, y: 1.0 }}
            colors={['#EB484A', '#FFA940']}
            style={styles.container}
        >
                <View style={styles.title}>
                    <Title style={[{ flex: 1 }, styles.colorWhite]}>Siêu Sale</Title>
                    <PressableText style={[{ padding: 8 }, styles.colorWhite]}>Xem tất cả</PressableText>
                </View>
                <FlatList
                        data={products}
                        renderItem={ItemView}
                        nestedScrollEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
        </LinearGradient>

    )
}

const ItemView = (props) => {
    const { item } = props;
    //console.log(item)
    return (
        <Pressable style={styles.itemWrapper}>
            <FastImage source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.itemContent}>
                <DefautText>{ item?.name }Tên sản phẩm</DefautText>
                <OriginPrice>50000</OriginPrice>
                <SellPrice>15000</SellPrice>
            </View>
            <ImageBackground style={styles.saleImage} source={require('../../assets/images/sale.png')}>
                <SalePercent>-{Math.round((50-15)*100/50)}%</SalePercent>
            </ImageBackground>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
        marginTop: 5,
        marginBottom: 5
    },
    title: {
        margin: 5,
        marginLeft: 7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 160,
        height: 160,
    },
    colorWhite: {
        color: '#fff'
    },
    itemWrapper:{
        flex: 1,
        borderRadius: 5,
        margin: 5,
        overflow: 'hidden',
        maxWidth: 150,
    },
    itemContent: {
        backgroundColor: '#fff',
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

export default SaleProductList;