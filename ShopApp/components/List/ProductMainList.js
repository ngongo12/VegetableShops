import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ToastAndroid,
    Pressable
} from 'react-native';
import { getAllCategories } from '../../api/categoryAPI';
import { productUrl } from '../../api/productAPI';
import { Title } from '../Text/AppTexts';
import ProductItem from './ProductItem';
import CategoryProductList from './CategoryProductList';
import SaleProductList from './SaleProductList';

const ProductMainList = (props) => {
    const { navigate, user } = props;
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(productUrl + `getWithLimit?uid=${user?._id}`)
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
                renderItem={({ item }) => <ProductItem {...{item, navigate}} />}
                numColumns={2}
                keyExtractor={(item, index) => index}
                nestedScrollEnabled={true}
                ListHeaderComponent={MainListHeader}
                showsVerticalScrollIndicator={false}
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
            <SaleProductList />
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
    },
    title: {
        margin: 11
    },
    list:{
        padding: 3
    }
})

export default ProductMainList