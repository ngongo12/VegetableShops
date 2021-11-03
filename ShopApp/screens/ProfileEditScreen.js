import React, { useState, useEffect } from 'react';
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

const ProfileEditScreen = (props) => {
    const {user:{ user }, navigation: {navigate}} = props;
    console.log('>>>>>ProfileEditScreen ', user);
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        if(user.fullname){
            setFullname(user.fullname);
        };
        if(user.dob){
            setDob(user.dob);
        };
        if(user.gender){
            setGender(user.gender);
        };
        if(user.email){
            setEmail(user.email);
        };
    }, [user])
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Thay đổi thông tin tài khoản</Title>
            
            <View style={styles.groupView}>
                <ProfileTextView 
                    edit={true} 
                    name='user'
                    autoCapitalize='words'
                    placeholder='Họ tên'
                    value={fullname}
                    onChangeText={setFullname}
                />
                <ProfileTextView name='transgender'>{gender ? gender : 'Giới tính'}</ProfileTextView>
                <ProfileTextView name='birthday-cake'>{dob ? dob : 'Ngày sinh'}</ProfileTextView>
                <ProfileTextView name='phone'>{user.phone ? user.phone : 'Không rõ'}</ProfileTextView>
                <ProfileTextView name='envelope-o'
                    edit={true}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    keyboardType='email-address'
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen);