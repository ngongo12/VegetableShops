import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    FlatList,
    TextInput
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../../actions/userActions';

import { navigate } from '../../../config/rootNavigation';
import { DefautText, Title } from '../../../components/Text/AppTexts';
import { RED } from '../../../constants/colors';

const AddressScreen = props => {
    const { user: { user } } = props;
    const { address } = user;
    return (
        <FlatList
            data={address}
            renderItem={({ item }) => <ItemOfList item={item} />}
            ListFooterComponent={() => {
                return (
                    <Pressable style={styles.listFooter} onPress={() => navigate('NewAddressScreen')}>
                        <DefautText style={styles.listFooterText}>Thêm địa chỉ mới</DefautText>
                        <DefautText style={styles.addIcon}>+</DefautText>
                    </Pressable>
                )
            }}
            style={styles.list}
        />
    )
}

const ItemOfList = props => {
    const { item, onPress } = props;
    return (
        <Pressable style={styles.item} onPress={onPress}>
            <View style={styles.itemContent}>
                <DefautText style={styles.itemText}>{`${item?.details}, ${item?.ward?.name}`}</DefautText>
                <DefautText style={styles.itemText}>{item?.district?.name}</DefautText>
                <DefautText style={styles.itemLargeText}>{item?.province?.name}</DefautText>
            </View>
            <DefautText style={styles.delete}>Xóa</DefautText>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        marginTop: 10,
    },
    listFooter: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 10
    },
    listFooterText: {
        borderRadius: 3,
        borderColor: 'silver',
        marginHorizontal: 15,
        alignItems: 'center',
        paddingVertical: 15,
        flex: 1
    },
    addIcon: {
        width: 50,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25
    },
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 1,
    },
    delete: {
        color: RED,
        paddingTop: 10,
        paddingHorizontal: 15
    },
    itemContent:{
        flex: 1
    },
    itemText: {
        paddingHorizontal: 15,
        marginTop: 10
    },
    itemLargeText: {
        paddingHorizontal: 15,
        marginVertical: 10,
        fontWeight: 'bold'
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


export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen)
