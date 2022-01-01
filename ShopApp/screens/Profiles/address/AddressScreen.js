import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    FlatList,
    ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../../actions/userActions';

import { navigate } from '../../../config/rootNavigation';
import { DefautText, Title } from '../../../components/Text/AppTexts';
import { RED } from '../../../constants/colors';
import AlerModal from '../../../components/AlertModal';
import LoadingModal from '../../../components/LoadingModal';

const AddressScreen = props => {
    const { user: { user, isLoading, succes }, actions } = props;
    const { address } = user;

    const [message, setMessage] = useState('');
    useEffect(() => {
        if(message === '' && succes){
            ToastAndroid.show('Xóa địa chỉ thành công', ToastAndroid.SHORT);
        }
    }, [isLoading])

    const onDelete = item => {
        let temp = address;
        setMessage('Đang xóa địa chỉ');
        temp = temp.filter((e) => e !== item);
        actions.actionEditProfile({
            user: {
                _id: user._id,
                address: temp
            }
        });
    }

    const onChangeDefaultAddress = item => {
        let temp = user.address;
        temp = temp.filter(e => e !== item);
        temp = [item, ...temp];
        actions.actionEditProfile({
            user: {
                _id: user._id,
                address: temp
            }
        });
    }

    return (
        <>
        <FlatList
            data={address}
            renderItem={({ item, index }) => <ItemOfList {... {item, index, onDelete, onChangeDefaultAddress}} />}
            ListFooterComponent={() => {
                return (
                    <Pressable style={[styles.listFooter, address.length === 0 && {marginTop: 0}]} onPress={() => navigate('NewAddressScreen')}>
                        <DefautText style={styles.listFooterText}>Thêm địa chỉ mới</DefautText>
                        <DefautText style={styles.addIcon}>+</DefautText>
                    </Pressable>
                )
            }}
            style={styles.list}
        />
        <LoadingModal 
            message={message}
            visible={isLoading}
        />
        </>
    )
}

const ItemOfList = props => {
    const { item, index, onDelete, onChangeDefaultAddress } = props;
    const [visibleModal, setVisibleModal] = useState(false);
    return (
        <>
        <Pressable style={styles.item} onPress={() => navigate('EditAddressScreen', { myAddress: item, myIndex: index})}>
            <View style={styles.itemContent}>
                <DefautText style={styles.itemText}>{`${item?.details}, ${item?.ward?.name}`}</DefautText>
                <DefautText style={styles.itemText}>{item?.district?.name}</DefautText>
                <DefautText style={styles.itemLargeText}>{item?.province?.name}</DefautText>
                {index===0 ? <DefautText style={[styles.defautValue]}>Mặc định</DefautText>
                : <DefautText style={[styles.defautValue]} onPress={() => onChangeDefaultAddress(item)}>Đặt làm mặc định</DefautText>
                }
            </View>
            <DefautText style={styles.delete} onPress={() => setVisibleModal(true)}>Xóa</DefautText>
        </Pressable>
        <AlerModal
                title = 'Xóa địa chỉ'
                question = 'Bạn muốn xóa địa chỉ này?'
                confirmText = 'Xác nhận'
                onConfirm={()=>onDelete(item)}
                setVisibleModal = {setVisibleModal}
                visibleModal = {visibleModal} 
            />
        </>

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
    },
    defautValue: {
        marginHorizontal: 15,
        fontSize: 12,
        color: RED,
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
        paddingVertical: 3,
        borderWidth: 0.5,
        borderRadius: 3,
        borderColor: RED,
        marginBottom: 10
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
