import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import userActions from '../../actions/userActions';
import orderAPI from '../../api/orderAPI';
import OrderItem from '../../components/List/OrderItem';

const NewOrderScreen = (props) => {
    const { user: { user } } = props;
    const [orders, setOrders] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) fetchOrder();

    }, [isFocused])

    const fetchOrder = () => {
        orderAPI.getMyOrderByState(user._id, 'created')
            .then(res => {
                if (res?.result) {
                    setOrders(res.result);
                }
            })
            .catch(e => console.error(e));
    }

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => (
                <OrderItem
                    item={item}
                    deliveryState='Đang chờ phê duyệt'
                />
            )}
        />
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


export default connect(mapStateToProps, mapDispatchToProps)(NewOrderScreen)