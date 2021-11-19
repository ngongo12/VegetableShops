import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Pressable,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/userActions';

import FastImage from 'react-native-fast-image';
import { productUrl } from '../../api/productAPI';
import { PressableText, Title } from '../Text/AppTexts';
import { navigate } from '../../config/rootNavigation';

const CategoryProductList = (props) => {
    const { category, user: {user} } = props;
    const [products, setProducts] = useState(null);
    useEffect(() => {
        if (category?._id) {
            fetchData(category._id);
        }
    }, [category]);


    const fetchData = (id) => {
        fetch(`${productUrl}getTopProductByCategory?id=${id}&uid=${user?._id}`)
            .then(res => res.json())
            .then(res => {
                if (res.products) {
                    setProducts(res.products);
                }
            })
            .catch(e => console.log(e));
    }
    //console.log('products' ,products)
    return (
        <>
            {products?.length > 0 && (
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Title style={{ flex: 1 }}>{category?.name}</Title>
                        <PressableText style={{ padding: 8 }}>Xem tất cả</PressableText>
                    </View>
                    <FlatList
                        data={products}
                        renderItem={ItemView}
                        nestedScrollEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
        </>
    )
}

const ItemView = (props) => {
    const { item } = props;
    //console.log(item)
    return (
        <Pressable onPress={() => navigate('ProductDetailScreen', { productID: item._id })}>
            <FastImage source={{ uri: item.images[0] }} style={styles.image} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
        backgroundColor: '#fff',
        marginTop: 2,
        marginBottom: 6
    },
    title: {
        margin: 5,
        marginLeft: 7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'silver',
        margin: 5
    },
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductList)