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
import LoadMore from './LoadMore';
import { MAIN_BACKGROUND } from '../../constants/colors';

const ProductMainList = (props) => {
    const { navigate, user } = props;
    const [products, setProducts] = useState([]);
    const [canFetchMore, setCanFetchMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(() => {
        fetchtData();
    }, [])

    useEffect(() => {
        
    }, [products])



    const fetchtData = () => {
        fetch(productUrl + `getWithLimit?uid=${user?._id}&startAt=0&num=4`)
            .then((respone) => respone.json())
            .then((data) => {
                if (data.products) {
                    setProducts(data.products);
                }
                else {
                    setCanFetchMore(false);
                    ToastAndroid.show('Lấy danh sách bị lỗi', ToastAndroid.SHORT);
                }
            });
        setCanFetchMore(true)
    }

    const fetchMoreData = () => {
        if(!canFetchMore) return;
        let startAt = products.length;
        if(startAt < 0) startAt = 0;
        setIsLoading(true);

        fetch(productUrl + `getWithLimit?uid=${user?._id}&startAt=${startAt}&num=4`)
            .then((respone) => respone.json())
            .then((data) => {
                if (data.products) {
                    setProducts([...products , ...data.products]);
                    if(data.products.length === 0) setCanFetchMore(false);
                    // let temp = [...products , ...data.products];
                    // console.log('>>>>>>>>>>>>>>>>>',temp)
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    ToastAndroid.show('Lấy danh sách bị lỗi', ToastAndroid.SHORT);
                }
            })
            
    }


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
                onEndReached={fetchMoreData}
                onEndThreshold={0}
                onRefresh={fetchtData}
                refreshing={refreshing}
                ListFooterComponent={()=> <LoadMore isLoading={isLoading} /> }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_BACKGROUND
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