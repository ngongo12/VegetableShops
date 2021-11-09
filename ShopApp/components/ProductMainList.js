import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ToastAndroid
} from 'react-native';
import { productUrl } from '../api/productAPI';
import ProductItem from './ProductItem';
const ProductMainList = ( props ) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(productUrl+'getWithLimit')
        .then((respone) => respone.json())
        .then((data) => {
            if(data.products){
                setProducts(data.products)
            }
            else{
                ToastAndroid.show('Lấy danh sách bị lỗi', ToastAndroid.SHORT);
            }
        })
    }, []) 
    console.log(products) 

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({item}) => <ProductItem item={item} />}
                numColumns={2}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3
    }
})

export default ProductMainList