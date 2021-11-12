import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../actions/userActions';
import cartActions from '../actions/cartActions';

import { getAllCategories } from '../api/categoryAPI';
import HomeHeader from '../components/Header/HomeHeader';
import ProductMainList from '../components/List/ProductMainList';
import { MAIN_BACKGROUND } from '../constants/colors';

const HomeScreen = (props) => {
    const { navigation: { navigate }, user: { user } } = props;
    const [categories, setCategories] = useState();
    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        const temp = await getAllCategories();
        setCategories(temp);
    }

    return (
        <View style={styles.container}>
            <HomeHeader />
            <ProductMainList { ...{ navigate, user }} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_BACKGROUND
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        cart: state.cartReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch),
        cActions: bindActionCreators(cartActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
