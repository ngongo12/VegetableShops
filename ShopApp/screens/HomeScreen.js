import React, { useState, useEffect } from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native'
import { getAllCategories } from '../api/categoryAPI'
import CategoryProductList from '../components/CategoryProductList'
import HomeHeader from '../components/HomeHeader'
import ProductMainList from '../components/ProductMainList'
import { MAIN_BACKGROUND } from '../constants/colors'

const HomeScreen = (props) => {
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
            <ProductMainList />

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
