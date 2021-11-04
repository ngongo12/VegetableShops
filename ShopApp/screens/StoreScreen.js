import React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../actions/userActions';
import { Title } from '../components/AppTexts';
import DefaultHeader from '../components/DefaultHeader';

const StoreScreen = (props) => {
    
    return (
        <View style={styles.container}>
            <DefaultHeader title='Cửa hàng của tôi' />
            
        </View>
    )
}

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

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen)
