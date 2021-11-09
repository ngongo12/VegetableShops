import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ToastAndroid,
    Pressable
} from 'react-native';
import { getAllCategories } from '../api/categoryAPI';
import { productUrl } from '../api/productAPI';
import { Title } from './AppTexts';
import ProductItem from './ProductItem';
import CategoryProductList from './CategoryProductList';

const ProductMainList = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(productUrl + 'getWithLimit')
            .then((respone) => respone.json())
            .then((data) => {
                if (data.products) {
                    setProducts(data.products)
                }
                else {
                    ToastAndroid.show('Lấy danh sách bị lỗi', ToastAndroid.SHORT);
                }
            })
    }, [])


    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem item={item} />}
                numColumns={2}
                keyExtractor={(item, index) => index}
                nestedScrollEnabled={true}
                ListHeaderComponent={MainListHeader}
            />
        </View>
    )
}

const MainListHeader = (props) => {
    const [categories, setCategories] = useState();
    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        const temp = await getAllCategories();
        setCategories(temp);
    }

    return (
        <View>
            {
                categories && categories.map(e => {
                    return (
                        <CategoryProductList category={e} key={e._id} />
                    )
                })
            }
            <Title style={styles.title}>GỢI Ý HÔM NAY</Title>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
    },
    title: {
        margin: 10
    },
})

export default ProductMainList