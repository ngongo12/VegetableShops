import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import categoryActions from '../actions/categoryActions';
import {Picker} from '@react-native-picker/picker';
import { DefautText } from './Text/AppTexts';

const CategoryPicker = (props) => {
    const { category, setCategory, categories } = props;
    // useEffect(() => {
    //     async function fetchAPI(){
    //         const temp = await getAllCategories();
    //         setCategories(temp);
    //     }
    //     fetchAPI();
    // }, [])
    //console.log('categories ', categories);
    return (
        <View style={styles.container}>
            <DefautText style={styles.text}>Danh mục</DefautText>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) =>
                    setCategory(itemValue)
                }
                style={[{flex: 1}, (category==='') && styles.noneSelect]}
            >
                <Picker.Item label="Hãy chọn danh mục" value="" style={[styles.font, styles.noneSelect]} />
                {categories &&  categories.map(e => { return(
                    <Picker.Item label={e.name} key={e._id} value={e._id} style={[styles.font]} />
                )})}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        marginLeft: 8
    },
    text: {
        minWidth: 100
    },
    noneSelect: {
        color: 'silver',
        fontSize: 14
    },
    font: {
        fontSize: 14
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPicker);