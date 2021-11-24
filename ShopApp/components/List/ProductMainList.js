import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ToastAndroid,
    Pressable
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import categoryActions from '../../actions/categoryActions';
import { productUrl } from '../../api/productAPI';
import ProductItem from './ProductItem';
import MainListHeader from '../Header/MainListHeader';

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
                renderItem={({ item }) => <ProductItem {...{ item, navigate }} />}
                numColumns={2}
                keyExtractor={(item, index) => index}
                nestedScrollEnabled={true}
                ListHeaderComponent={MainListHeader}
                showsVerticalScrollIndicator={false}
            />
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
    list: {
        padding: 3
    }
})

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categoryActions: bindActionCreators(categoryActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductMainList);