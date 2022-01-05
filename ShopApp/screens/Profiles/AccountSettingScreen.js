import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Pressable,
    ToastAndroid,
    Switch
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/userActions';
import { Title, HeaderText, DefautText } from '../../components/Text/AppTexts';
import ButtonSetting from '../../components/Button/ButtonSetting';
import NomalButton from '../../components/Button/NomalButton';
import { RED } from '../../constants/colors';
import TextInputLayout from '../../components/Text/TextInputLayout';
import LoadingModal from '../../components/LoadingModal'
import userAPI from '../../api/userAPI';
import { storeData } from '../../api/asyncStorage';

const AccountSettingScreen = (props) => {
    const { navigation: { navigate }, actions } = props;
    const { user: { user } } = props;
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleLoading, setVisibleLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('')

    const onChangePassword = () => {
        if (oldPassword?.trim().length < 6) {
            ToastAndroid.show('Mật khẩu quá ngắn', ToastAndroid.SHORT);
            return
        }
        if (newPassword?.trim().length < 6) {
            ToastAndroid.show('Mật khẩu quá ngắn', ToastAndroid.SHORT);
            return
        }
        if (oldPassword.trim() === newPassword.trim()) {
            ToastAndroid.show('Mật khẩu mới không được trùng với mật khẩu cũ', ToastAndroid.SHORT);
            return
        }
        setVisibleLoading(true);

        userAPI.changePassword({
            _id: user?._id,
            phone: user.phone,
            password: oldPassword,
            newPassword
        })
            .then(res => {
                if(res?.message){
                    ToastAndroid.show(res?.message, ToastAndroid.SHORT);
                }
                if(res?.result){
                    setVisibleModal(false);
                    storeData('user', { phone: user.phone, password: newPassword });
                    setOldPassword('');
                    setNewPassword('');
                }
            })
            .then(() => setVisibleLoading(false))
            .catch(e => console.error(e));
    }

    const changeNotificationAllown = () => {
        actions.actionEditProfile({
            user: {
                _id: user._id,
                allowNotify: {
                    notification: !user?.allowNotify?.notification
                }
            }
        })
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Thiết lập tài khoản</Title>
            <View style={styles.groupView}>
                <ButtonSetting
                    iconName='solution1'
                    name='Thông tin tài khoản'
                    style={styles.button}
                    onPress={() => navigate('ProfileDetailScreen')}
                />
                <ButtonSetting
                    iconName='pushpino'
                    name='Địa chỉ'
                    style={styles.button}
                    onPress={() => navigate('AddressScreen')}
                />
                <ButtonSetting
                    iconName='key'
                    name='Đổi mật khẩu'
                    onPress={() => setVisibleModal(true)}
                    style={styles.button}
                />
                <ButtonSetting
                    iconName='bells'
                    name='Nhận thông báo'
                    onPress={() => changeNotificationAllown()}
                    style={styles.button}
                >
                    <Switch
                        value={user?.allowNotify?.notification}
                    />
                </ButtonSetting>
            </View>
            <View style={styles.groupView}>
                <ButtonSetting iconName='gift' name='Ví Voucher' style={styles.button} />
                <ButtonSetting iconName='filetext1' name='Quy chế - Chính sách' style={styles.button} />
                <ButtonSetting iconName='questioncircleo' name='Trung tâm hỗ trợ' style={styles.button} />
            </View>
            <Modal
                visible={visibleModal}
                dimissModal={() => setVisibleModal(false)}
                transparent={true}
                animationType='slide'
            >
                <Pressable style={{ flex: 1 }} onPress={() => setVisibleModal(false)} />
                <View style={styles.modalContent}>
                    <HeaderText>Đổi mật khẩu</HeaderText>
                    <TextInputLayout
                        placeholder='Mật khẩu hiện tại'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        name='lock'
                    />
                    <TextInputLayout
                        placeholder='Mật khẩu mới'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        value={newPassword}
                        onChangeText={setNewPassword}
                        name='lock'
                    />
                    <NomalButton onPress={onChangePassword} style={{ width: '100%' }} color={RED}>Thay đổi</NomalButton>
                </View>
            </Modal>
            <LoadingModal
                visible={visibleLoading}
                message='Đang đổi mật khẩu. Xin chờ'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    groupView: {
        marginTop: 8,
    },

    button: {
        marginTop: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    title: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff'
    },
    modalContent: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: 'silver',
        borderWidth: 1,
        borderBottomWidth: 0
    }

});

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

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingScreen);