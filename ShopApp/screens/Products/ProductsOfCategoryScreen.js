import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ToastAndroid,
    Pressable,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import categoryActions from '../../actions/categoryActions';
import { productUrl } from '../../api/productAPI';
import ProductItem from '../../components/List/ProductItem';
import NothingFound from '../../components/NothingFound';
import LoadMore from '../../components/List/LoadMore';
import { DefautText } from '../../components/Text/AppTexts';
import { MainColor } from '../../constants/colors';
import LoadingView from '../../components/LoadingView';

const ProductOfCategoryScreen = (props) => {
    const { navigate, user: { user }, route: { params }, categories } = props;
    const [products, setProducts] = useState();
    const [canFetchMore, setCanFetchMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [chosenCategoy, setChosenCategoy] = useState(params?.category);
    useEffect(() => {
        fetchtData();
    }, [chosenCategoy])

    

    useEffect(() => {

    }, [products])



    const fetchtData = () => {
        fetch(productUrl + `getTopProductByCategory?uid=${user?._id}&id=${chosenCategoy?._id}`)
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

    const fetchMoreData = () => {
        if (!canFetchMore) return;
        let startAt = products.length;
        if (startAt < 0) startAt = 0;
        setIsLoading(true);

        fetch(productUrl + `getMoreProductByCategory?uid=${user?._id}&startAt=${startAt}`)
            .then((respone) => respone.json())
            .then((data) => {
                if (data.products) {
                    setProducts([...products, ...data.products]);
                    if (data.products.length === 0) setCanFetchMore(false);
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

    const onChangeCategory = (item) => {
        setChosenCategoy(item);      
        setProducts(null);
    }
    //console.log(products);


    return (
        <View style={styles.container}>
            <View style={{marginVertical: 5}}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        categories?.map(e => {
                            return (
                                <DefautText
                                    key={e?._id}
                                    onPress = {() => onChangeCategory(e)}
                                    style={[styles.box, (chosenCategoy?._id == e?._id) && styles.chosen]}
                                >
                                    {e?.name}
                                </DefautText>
                            )
                        })
                    }
                </ScrollView>
            </View>
            {products ? ( products?.length === 0 ? 
            <NothingFound type='product' />
            : <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem {...{ item, navigate }} />}
                numColumns={2}
                keyExtractor={(item, index) => index}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                onEndReached={fetchMoreData}
                onEndThreshold={0}
                onRefresh={fetchtData}
                refreshing={refreshing}
                ListFooterComponent={() => <LoadMore isLoading={isLoading} />}
            />) :
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