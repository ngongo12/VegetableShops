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
import userActions from '../actions/userActions';
import { MainColor } from '../constants/colors';
import { productUrl } from '../api/productAPI';
import ProductItem from '../components/List/ProductItem';
import { SearchBarInput } from '../components/Header/SearchBar';
import { DefautText } from '../components/Text/AppTexts';
import { BackIcon } from '../components/Icon/AppIcons';

const SearchScreen = (props) => {
    const {
        navigation: { navigate },
        user: { user }
    } = props;
    const [text, setText] = useState('');
    const isFocused = useIsFocused();
    const [products, setProducts] = useState();

    const onSearch = () => {
        //console.log('>>>>>>>>>>> search text', text);
        if (text.length > 0) {
            fetch(`${productUrl}search?value=${text}`)
                .then(res => res.json())
                .then(res => setProducts(res?.products))
                .catch(e => console.error(e));
        } else {

        }
    }

    //console.log(products);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', backgroundColor: MainColor, paddingRight: 10, alignItems: 'center' }}>
                {/* <BackIcon /> */}
                <SearchBarInput
                    value={text}
                    onChangeText={setText}
                    onEndEditing={onSearch}
                    onPress={onSearch}
                    notFocus={false}
                />
            </View>

            {products && (
                <>
                    <DefautText style={styles.text}>{products?.length > 0 ? `Tìm được ${products?.length} sản phẩm` : 'Không tìm thấy sản phẩm phù hợp'}</DefautText>
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductItem {...{ item, navigate }} />}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    />
                </>

            )}
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
    },
    text: {
        textAlign: 'center',
        paddingVertical: 5,
        fontStyle: 'italic',
        color: '#333'
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


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
