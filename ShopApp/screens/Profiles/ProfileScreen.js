import React, { useState } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/userActions';
import cartActions from '../../actions/cartActions';
import { Title } from '../../components/Text/AppTexts';
import ProfileHeader from '../../components/Header/ProfileHeader';
import ButtonSetting from '../../components/Button/ButtonSetting';
import OrderStateIcon from '../../components/Icon/OrderStateIcon';
import AlerModal from '../../components/AlertModal';

const ProfileScreen = (props) => {
    const { user: { user }, navigation: { navigate }, actions, cActions } = props;
    const [visibleModal, setVisibleModal] = useState(false);
    //console.log(user)
    const onPressLogout = () => {
        setVisibleModal(true);
    }
    const onLogout = () => {
        actions.actionLogOut();
        cActions.resetCart();
        navigate('LoginScreen');
    }
    return (
        <View style={styles.container}>
            <ProfileHeader {...{ user, onPressLogout }} />
            <View style={styles.orderStatusContainer}>
                <Title style={styles.title}>Tra cứu đơn hàng</Title>
                <View style={styles.orderStatusGroupView}>
                    <OrderStateIcon name='customerservice' title='Chờ duyệt' onPress={()=> navigate('MyOrderScreen', {screenName: 'NewOrderScreen'})} />
                    <OrderStateIcon name='dropbox' title='Chờ lấy hàng' onPress={()=> navigate('MyOrderScreen', {screenName: 'ConfirmedOrderScreen'})} />
                    <OrderStateIcon name='dingding-o' title='Đang giao' onPress={()=> navigate('MyOrderScreen', {screenName: 'DeliveryOrderScreen'})} />
                    <OrderStateIcon name='star' title='Đánh giá' onPress={()=> navigate('MyOrderScreen', {screenName: 'DoneOrderScreen'})} />
                </View>
            </View>
            <View style={{ alignContent: 'flex-end' }}>
                <ButtonSetting iconName='setting' name='Thiết lập tài khoản' onPress={() => navigate('AccountSettingScreen')} />
                <ButtonSetting iconName='gift' name='Ví Voucher' />
                <ButtonSetting iconName='filetext1' name='Quy chế - Chính sách' />
                <ButtonSetting iconName='questioncircleo' name='Trung tâm hỗ trợ' />
            </View>
            <AlerModal 
                title = 'Đăng xuất'
                question = 'Bạn muốn đăng xuất khỏi ứng dụng?'
                confirmText = 'Đăng xuất'
                onConfirm={onLogout}
                setVisibleModal = {setVisibleModal}
                visibleModal = {visibleModal} 
            />
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
        actions: bindActionCreators(userActions, dispatch),
        cActions: bindActionCreators(cartActions, dispatch)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    orderStatusContainer: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 8,

    },

    orderStatusGroupView: {
        flexDirection: 'row',
        padding: 15
    },
    title: {
        textAlign: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
