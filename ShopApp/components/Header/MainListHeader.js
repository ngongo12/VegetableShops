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
import { SliderBox } from "react-native-image-slider-box";
import { Title } from '../Text/AppTexts';
import CategoryProductList from '../List/CategoryProductList';
import SaleProductList from '../List/SaleProductList';
import categoryAPI from '../../api/categoryAPI';

const MainListHeader = (props) => {
    const { categories, categoryActions } = props;
    //console.log('categories', categories);
    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        const temp = await categoryAPI.getAllCategories();
        if(temp){
            categoryActions.saveCategory(temp);
        }
    }

    return (
        <View>
            <SliderBox
                images={[
                    require('../../assets/images/bn1.png'),
                    require('../../assets/images/bn2.png'),
                    require('../../assets/images/bn3.png'),
                    require('../../assets/images/bn4.png')
                ]}
                sliderBoxHeight={150}
                autoplay={true}
                circleLoop={true}
                resizeMode = 'cover'
                
            />
            <SaleProductList />
            {
                categories && categories.map(e => {
                    return (
                        <CategoryProductList category={e} key={e._id} />
                    )
                })
            }
            <Title style={styles.title}>GỢI Ý HÔM NAY</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        backgroundColor: '#fff',
        padding: 11,
        marginTop: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(MainListHeader)