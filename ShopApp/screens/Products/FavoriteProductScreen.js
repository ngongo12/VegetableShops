import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import categoryActions from '../../actions/categoryActions';
import { productUrl } from '../../api/productAPI';
import ProductItem from '../../components/List/ProductItem';
import { MainColor } from '../../constants/colors';
import LoadingView from '../../components/LoadingView';

const ProductOfCategoryScreen = (props) => {
    const { navigate, user: { user } } = props;
    const [products, setProducts] = useState();
    useEffect(() => {
        fetchtData();
    }, [])

    const fetchtData = () => {
        fetch(productUrl + `getProductsInArray`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ arr: user?.favorites })
        })
            .then((respone) => respone.json())
            .then((data) => {
                if (data.products) {
                    setProducts(data.products);
                }
                else {
                    setCanFetchMore(false);
                    ToastAndroid.show('Lấy danh sách bị lỗi', ToastAndroid.SHORT);
                }
            })
    }

    return (
        <View style={styles.container}>
            {products ? <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem {...{ item, navigate }} />}
                numColumns={2}
                keyExtractor={(item, index) => index}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                onRefresh={fetchtData}
                refreshing={false}
            /> :
                <LoadingView message="Tải danh sách ..." />
            }
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
    },
    box: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        backgroundColor: 'white',
        marginHorizontal: 10,
        fontSize: 14,
        borderRadius: 50,
        borderWidth: 1,
        color: '#111'
    },
    chosen: {
        backgroundColor: MainColor,
        color: '#fff',
        borderColor: MainColor
    }
})

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer,
        user: state.userReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categoryActions: bindActionCreators(categoryActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOfCategoryScreen);