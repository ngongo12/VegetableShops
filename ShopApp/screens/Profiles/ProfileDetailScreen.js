import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Image,
    Text,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Title } from '../../components/AppTexts';
import userActions from '../../actions/userActions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProfileTextView from '../../components/ProfileTextView';
import { MainColor } from '../../constants/colors';
import { formatVNDate } from '../../config/format';
import ModalChooseCamera from '../../components/ModalChooseCamera';
import { uploadFile } from '../../api/uploadFile';
import requestCameraPermission from '../../components/RequestCameraPermission';

const ProfileDetailScreen = (props) => {
    const { user: { user }, navigation: { navigate }, actions } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    //console.log('>>>>>ProfileDetailScreen ', user);
    const [selectedImage, setSelectedImage] = useState();

    const openGallery = () => {
        //console.log('openGallery');
        ImageCropPicker.openPicker({
            cropping: true,
            width: 500,
            height: 500,
        })
            .then(image => {
                setSelectedImage(image.path)
            }).catch(e => console.log(e))
    }

    const openCamera = () => {
        //console.log('openCamera');
        ImageCropPicker.openCamera({
            cropping: true,
            width: 500,
            height: 500,
        })
            .then(image => {
                setSelectedImage(image.path)
            })
            .catch(e => {
                console.log(e.toString());
                if(e.toString().includes('User did not grant camera permission')){
                    requestCameraPermission();
                }
            })
    }

    const saveToDB = async () => {
        //save to firebase
        //const storage = getStorage();
        const fileUrl = await uploadFile(selectedImage, 'avatar', user._id);
        //Lưu vào database
        actions.actionEditProfile({
            user: {
                _id: user._id,
                avatar: fileUrl
            }
        });
        setSelectedImage(null);
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Thiết lập tài khoản</Title>
            <Pressable style={styles.pressable} onPress={() => setIsVisibleModal(true)}>
                <Image
                    source={selectedImage ? { uri: selectedImage } :
                        (user.avatar ? { uri: user.avatar } : require('../../assets/images/default_avatar.png'))
                    }
                    style={styles.image} />
                <Icon name='camera' size={20} color={MainColor} style={[styles.icon]} />
                {selectedImage && <Icon onPress={saveToDB} name='save' size={20} color={MainColor} style={[styles.icon]} />}
            </Pressable>


            <View style={[styles.groupView, { flexDirection: 'row', justifyContent: 'center' }]}>
                <Title style={{ flex: 1 }}>Thông tin cá nhân</Title>
                <Pressable onPress={() => navigate('ProfileEditScreen')}>
                    <Text style={{ color: MainColor }}>
                        <Icon name='edit' size={20} color={MainColor} />  Sửa
                    </Text>
                </Pressable>
            </View>
            <View style={styles.groupView}>
                <ProfileTextView name='user'>{user.fullname}</ProfileTextView>
                <ProfileTextView name='transgender'>{user.gender ? user.gender : 'Chưa cập nhật'}</ProfileTextView>
                <ProfileTextView name='birthday-cake'>{user.dob ? formatVNDate(user.dob) : 'Chưa cập nhật'}</ProfileTextView>
                <ProfileTextView name='phone'>{user.phone ? user.phone : 'Chưa cập nhật'}</ProfileTextView>
                <ProfileTextView name='envelope-o'>{user.email ? user.email : 'Chưa cập nhật'}</ProfileTextView>
            </View>
            <ModalChooseCamera
                visible={isVisibleModal}
                dimissModal={() => setIsVisibleModal(false)}
                transparent={true}
                animationType='slide'
                onItemPress={[openGallery, openCamera]}
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
    pressable: {
        alignSelf: 'center',
        margin: 32,

    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 100,
        overflow: 'hidden'
    },
    icon: {
        padding: 12,
        backgroundColor: '#F1FAFF',
        borderRadius: 30,
        position: 'absolute',
        bottom: 0,
        right: 0
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailScreen);