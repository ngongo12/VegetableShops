import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ToastAndroid,
    Pressable
} from 'react-native';
import { productUrl } from '../api/productAPI';
import { Title } from './AppTexts';
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
    

    return (
        <View style={styles.container}>
            <Title style={styles.title}>GỢI Ý HÔM NAY</Title>
            <FlatList
                data={products}
                renderItem={({item}) => <ProductItem item={item} />}
                numColumns={2}
                keyExtractor={(item, index) => index}
                nestedScrollEnabled={true}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3
    },
    title:{
        margin: 8
    },
    
})

export default ProductMainList