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
import { useIsFocused } from '@react-navigation/native';
import userActions from '../../actions/userActions';
import productAPI, { productUrl } from '../../api/productAPI';
import { PressableText, Title } from '../Text/AppTexts';
import ProductItem from './ProductItem';

const SeenProductList = (props) => {
    const { user: { user } } = props;
    const [products, setProducts] = useState(null);
    const isFocused = useIsFocused();
    //dconsole.log(user.seenProducts)
    useEffect(() => {
        if (isFocused)
            fetchData();
    }, [isFocused]);


    const fetchData = () => {
        fetch(`${productUrl}getProductsInArray`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ arr: user.seenProducts })
        })
            .then(res => res.json())
            .then(res => {
                if (res.products) {
                    let temp = [];
                    user.seenProducts.forEach(e => {
                        const product = res.products.filter(elm => elm._id === e);
                        temp.push(product[0])
                    })

                    setProducts(temp);
                }
            })
            .catch(e => console.log(e));
    }
    //console.log('products', products)
    return (
        <>
            {products?.length > 0 && (
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Title style={{ flex: 1, paddingVertical: 8 }}>Sản phẩm đã xem</Title>
                    </View>
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductItem item={item} hasBorder={true} />}
                        nestedScrollEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flex: 1 }}
                    />
                </View>
            )}
        </>
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
        margin: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(SeenProductList)