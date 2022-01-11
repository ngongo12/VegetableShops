import React, { useState, useEffect } from 'react'
import {
    View,
    FlatList,
    StyleSheet,
    Pressable
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import userActions from '../../actions/userActions';
import { MainColor } from '../../constants/colors';
import { productUrl } from '../../api/productAPI';
import ProductItem from '../../components/List/MyProductItem';
import NothingFound from '../../components/NothingFound';

const ShopProductScreen = (props) => {
    const {
        navigation: { navigate },
        user: { user }
    } = props;
    const isFocused = useIsFocused();
    const [products, setProducts] = useState();
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (isFocused)
            fetchMyProduct();
    }, [isFocused])

    const fetchMyProduct = () => {
        setRefreshing(true)
        fetch(`${productUrl}getMyProductsWithLimit?uid=${user._id}`)
            .then(res => res.json())
            .then(res => setProducts(res?.products))
            .then(() => setRefreshing(false))
            .catch(e => console.log(e));
        //setRefreshing(false);
    }
    //console.log(products);
    return (
        <View style={styles.container}>
            {products?.length === 0 ?
                <NothingFound message='Bạn chưa đăng sản phẩm nào' />
            : (
                <FlatList
                    data={products}
                    renderItem={({ item }) => <ProductItem {...{ item, navigate }} />}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    onRefresh={fetchMyProduct}
                    refreshing={refreshing}
                />
            )}
            <Pressable style={styles.btnAdd} onPress={() => navigate('ShopAddProductScreen')}>
                <Icon name='add-business' size={32} color='#fff' />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnAdd: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MainColor,
        borderRadius: 100,
        position: 'absolute',
        bottom: 16,
        right: 16
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopProductScreen)
