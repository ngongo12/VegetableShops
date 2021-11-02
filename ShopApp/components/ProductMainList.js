import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import ProductItem from './ProductItem';
const ProductMainList = ( props ) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://60af0c935b8c300017deb8f0.mockapi.io/products')
        .then((respone) => respone.json())
        .then((data) => setData(data))
    }, [])   

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
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