import React from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Image,
    Text
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Title } from '../components/AppTexts';
import userActions from '../actions/userActions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProfileTextView from '../components/ProfileTextView';
import { MainColor } from '../constants/colors';

const ProfileDetailScreen = (props) => {
    const {user:{ user }, navigation: {navigate}} = props;
    console.log('>>>>>ProfileDetailScreen ', user);
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Thiết lập tài khoản</Title>
            <Pressable style={styles.pressable}>
                <Image source={require('../assets/images/default_avatar.png')} style={styles.image} />
                <Icon name='camera' size={20} color={MainColor} style={styles.icon} />
            </Pressable>
            <View style={[styles.groupView, {flexDirection:'row', justifyContent:'center'}]}>
                <Title style={{flex: 1}}>Thông tin cá nhân</Title>
                <Pressable onPress={()=>navigate('ProfileEditScreen')}>
                <Text style={{color: MainColor}}>
                    <Icon name='edit' size={20} color={MainColor} />  Sửa
                </Text>
                </Pressable>
            </View>
            <View style={styles.groupView}>
                <ProfileTextView name='user'>{user.fullname}</ProfileTextView>
                <ProfileTextView name='transgender'>{user.gender ? user.gender : 'Không rõ'}</ProfileTextView>
                <ProfileTextView name='birthday-cake'>{user.dob ? user.dob : 'Không rõ'}</ProfileTextView>
                <ProfileTextView name='phone'>{user.phone ? user.phone : 'Không rõ'}</ProfileTextView>
                <ProfileTextView name='envelope-o'>{user.gender ? user.gender : 'Không rõ'}</ProfileTextView>
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
        flex: 1,
        backgroundColor: '#fff',
    },
    groupView: {
        margin: 20,
        marginBottom: 0,
    },

    button: {
        marginTop: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    title: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver'
    },
    pressable:{
        alignSelf: 'center',
        margin: 32
    },
    image:{
        width: 150,
        height: 150,
        resizeMode: 'cover'
    },
    icon: {
        padding: 12,
        backgroundColor: '#F1FAFF',
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 10
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailScreen);