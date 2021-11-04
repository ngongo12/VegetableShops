import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Dimensions,
    Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Title } from '../components/AppTexts';
import userActions from '../actions/userActions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProfileTextView from '../components/ProfileTextView';
import GradientButton from '../components/GradientButton';
import { formatVNDate } from '../config/format';

const { height } = Dimensions.get('window');

const ProfileEditScreen = (props) => {
    const { user: { user }, navigation: { navigate }, actions } = props;
    //console.log('>>>>>ProfileEditScreen ', actions);
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState();
    const [email, setEmail] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowDatePicker, setIsShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date('01/01/1990'))
    useEffect(() => {
        if (user.fullname) {
            setFullname(user.fullname);
        };
        if (user.dob) {
            const tempDate = new Date(user.dob);
            setDob(tempDate);
            setDate(tempDate);
        };
        if (user.gender) {
            setGender(user.gender);
        };
        if (user.email) {
            setEmail(user.email);
        };
    }, [user])
    
    const onChangeDate = (events , selectedDate) => {
        if(selectedDate){
            setDob(selectedDate);
        }
        setIsShowDatePicker(false)
    }

    const onEditPost = () => {
        console.log('Edit profile clicked')
        actions.actionEditProfile({
            user: {
                ...user,
                dob,
                gender,
                email
            }
        })
    }
    
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Cập nhật thông tin cá nhân</Title>

            <View style={styles.groupView}>
                <ProfileTextView
                    edit={true}
                    name='user'
                    autoCapitalize='words'
                    placeholder='Họ tên'
                    value={fullname}
                    onChangeText={setFullname}
                />
                <ProfileTextView name='transgender' onPress={() => setIsShowModal(true)}>{gender ? gender : 'Giới tính'}</ProfileTextView>
                <ProfileTextView onPress={()=>setIsShowDatePicker(true)} name='birthday-cake'>{dob ? formatVNDate(dob) : 'Ngày sinh'}</ProfileTextView>
                <ProfileTextView name='phone'>{user.phone ? user.phone : 'Chưa cập nhật'}</ProfileTextView>
                <ProfileTextView name='envelope-o'
                    edit={true}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    keyboardType='email-address'
                />
                <GradientButton onPress={onEditPost}>Cập Nhật</GradientButton>
            </View>
            <Modal
                visible={isShowModal}
                transparent={true}
                animationType='slide'
                style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}
            >
                <Pressable style={{ flex: 1 }} onPress={() => setIsShowModal(false)} />
                <View style={styles.modal}>
                    <Title style={[styles.title, { borderTopWidth: 0.5 }]}>Chọn giới tính</Title>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => [setGender('Nam'), setIsShowModal(false)]}
                    >
                        <Title style={{ flex: 1, padding: 10 }}>Nam</Title>
                        {(gender === 'Nam') && <Icon name='check' size={18} style={{ marginRight: 20 }} />}
                    </Pressable>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => [setGender('Nữ'), setIsShowModal(false)]}
                    >
                        <Title style={{ flex: 1, padding: 10 }}>Nữ</Title>
                        {(gender === 'Nữ') && <Icon name='check' size={18} style={{ marginRight: 20 }} />}
                    </Pressable>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => [setGender('Khác'), setIsShowModal(false)]}
                    >
                        <Title style={{ flex: 1, padding: 10 }}>Khác</Title>
                        {(gender === 'Khác') && <Icon name='check' size={18} style={{ marginRight: 20 }} />}
                    </Pressable>
                </View>
            </Modal>
            {isShowDatePicker && (
                <DateTimePicker
                    value={date}
                    mode='date'
                    minimumDate={new Date(1950, 0, 1)}
                    onChange={onChangeDate}
                />
            )}
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
        borderColor: 'silver'
    },
    pressable: {
        alignSelf: 'center',
        margin: 32
    },
    image: {
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
    modal: {
        flex: 1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen);