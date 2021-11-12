import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native'
import { getAllCategories } from '../api/categoryAPI';
import HomeHeader from '../components/Header/HomeHeader';
import ProductMainList from '../components/List/ProductMainList';
import { MAIN_BACKGROUND } from '../constants/colors';

const HomeScreen = (props) => {
    const { navigation: { navigate } } = props;
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
            <ProductMainList { ...{ navigate }} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_BACKGROUND
    }
})

export default HomeScreen
