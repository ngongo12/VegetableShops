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
import HomeHeader from '../components/HomeHeader';

const NotificationScreen = (props) => {
    
    return (
        <View style={styles.container}>
            <HomeHeader />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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


export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
