import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Title } from '../../components/Text/AppTexts';
import ButtonSetting from '../../components/Button/ButtonSetting';

const AccountSettingScreen = (props) => {
    const { navigation: { navigate } } = props;
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
                    style={styles.button}
                />
            </View>
            <View style={styles.groupView}>
                <ButtonSetting iconName='gift' name='Ví Voucher' style={styles.button} />
                <ButtonSetting iconName='filetext1' name='Quy chế - Chính sách' style={styles.button} />
                <ButtonSetting iconName='questioncircleo' name='Trung tâm hỗ trợ' style={styles.button} />
            </View>
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
    }

});

export default AccountSettingScreen;