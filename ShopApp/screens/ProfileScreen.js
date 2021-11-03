import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Pressable
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../actions/userActions';
import { DefautText, Title } from '../components/AppTexts';
import ProfileHeader from '../components/ProfileHeader';
import ButtonSetting from '../components/ButtonSetting';
import OrderStateIcon from '../components/OrderStateIcon';

const ProfileScreen = (props) => {
    const {user:{ user }, navigation: {navigate}} = props;
    return (
        <View style={styles.container}>
            <ProfileHeader {...{user}} />
            <View style={styles.orderStatusContainer}>
                <Title style={styles.title}>Tra cứu đơn hàng</Title>
                <View style={styles.orderStatusGroupView}>
                    <OrderStateIcon name='customerservice' title='Chờ duyệt' />
                    <OrderStateIcon name='dropbox' title='Chờ lấy hàng' />
                    <OrderStateIcon name='dingding-o' title='Đang giao' />
                    <OrderStateIcon name='star' title='Đánh giá' />
                </View>
            </View>
            <View style={{alignContent: 'flex-end'}}>
                <ButtonSetting iconName='setting' name='Thiết lập tài khoản' onPress={()=>navigate('AccountSettingScreen')} />
                <ButtonSetting iconName='gift' name='Ví Voucher' />
                <ButtonSetting iconName='filetext1' name='Quy chế - Chính sách' />
                <ButtonSetting iconName='questioncircleo' name='Trung tâm hỗ trợ' />
            </View>
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

    orderStatusGroupView:{
        flexDirection: 'row',
        padding: 15
    },
    title: {
        textAlign: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver'
    }
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
