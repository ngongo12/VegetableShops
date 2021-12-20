import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/userActions';
import orderAPI from '../../api/orderAPI';

const DeliveryOrderScreen = (props) => {
    return (
        <View>
            <Text>DeliveryOrderScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

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


export default connect(mapStateToProps, mapDispatchToProps)(DeliveryOrderScreen)