import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Pressable,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/userActions';
import { DefautText, HeaderText, Title } from '../../components/AppTexts';
import ProfileHeader from '../../components/ProfileHeader';
import ButtonSetting from '../../components/ButtonSetting';
import OrderStateIcon from '../../components/OrderStateIcon';
import NomalButton from '../../components/NomalButton';
import { RED } from '../../constants/colors';

const ProfileScreen = (props) => {
    const { user: { user }, navigation: { navigate }, actions } = props;
    const [visibleModal, setVisibleModal] = useState(false);
    console.log(user)
    const onPressLogout = () => {
        setVisibleModal(true);
    }
    const onLogout = () => {
        actions.actionLogOut();
        navigate('LoginScreen');
    }
    return (
        <View style={styles.container}>
            <ProfileHeader {...{ user, onPressLogout }} />
            <View style={styles.orderStatusContainer}>
                <Title style={styles.title}>Tra cứu đơn hàng</Title>
                <View style={styles.orderStatusGroupView}>
                    <OrderStateIcon name='customerservice' title='Chờ duyệt' />
                    <OrderStateIcon name='dropbox' title='Chờ lấy hàng' />
                    <OrderStateIcon name='dingding-o' title='Đang giao' />
                    <OrderStateIcon name='star' title='Đánh giá' />
                </View>
            </View>
            <View style={{ alignContent: 'flex-end' }}>
                <ButtonSetting iconName='setting' name='Thiết lập tài khoản' onPress={() => navigate('AccountSettingScreen')} />
                <ButtonSetting iconName='gift' name='Ví Voucher' />
                <ButtonSetting iconName='filetext1' name='Quy chế - Chính sách' />
                <ButtonSetting iconName='questioncircleo' name='Trung tâm hỗ trợ' />
            </View>
            <Modal
                visible={visibleModal}
                dimissModal={() => setVisibleModal(false)}
                transparent={true}
                animationType='slide'
            >
                <Pressable style={{flex: 1}} onPress={()=> setVisibleModal(false)} />
                <View style={styles.modalContent}>
                    <HeaderText>Đăng xuất</HeaderText>
                    <DefautText style={{margin: 10}}>Bạn có chắc chắn muốn thoát?</DefautText>
                    <NomalButton onPress={onLogout} style={{width: '100%'}} color= {RED}>Đăng xuất</NomalButton>
                </View>
                
            </Modal>
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
    modalContent: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
