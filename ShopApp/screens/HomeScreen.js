import React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native'
import HomeHeader from '../components/HomeHeader'
import ProductMainList from '../components/ProductMainList'

const HomeScreen = (props) => {
    
    return (
        <View style={styles.container}>
            <HomeHeader />
            <ProductMainList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default HomeScreen
