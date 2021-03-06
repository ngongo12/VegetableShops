import React, { useState, useEffect } from 'react'
import {
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    Pressable,
    FlatList,
    TextInput,
    ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { uploadMultiFile } from '../../api/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import userActions from '../../actions/userActions';
import DefaultHeader from '../../components/Header/DefaultHeader';
import ModalChooseCamera from '../../components/ModalChooseCamera';
import { MainColor } from '../../constants/colors';
import { Title, DefautText } from '../../components/Text/AppTexts';
import TextInputForProduct from '../../components/Text/TextInputForProduct';
import NomalButton from '../../components/Button/NomalButton';
import CategoryPicker from '../../components/CategoryPicker';
import { getNew, updateProduct } from '../../api/productAPI';
import LoadingModal from '../../components/LoadingModal';

const { width, height } = Dimensions.get('window');
const ShopAddProductScreen = (props) => {
    const {
        user: { user },
        navigation: { goBack }
    } = props;
    //console.log('add product user ', goBack);
    const [date, setDate] = useState(new Date());
    const [isShowDatePicker, setIsShowDatePicker] = useState(false);
    const [expiredSt, setExpiredSt] = useState('')
    const [selectedImages, setSelectedImages] = useState();
    const [choosenImage, setChoosenImage] = useState();
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [pName, setPName] = useState('');
    const [pBrand, setPBrand] = useState('');
    const [pOrigin, setPOrigin] = useState('');
    const [category, setCategory] = useState('');
    const [pAmount, setPAmount] = useState('');
    const [pUnit, setPUnit] = useState('');
    const [originPrice, setOriginPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [description, setDescription] = useState('');
    let pId;
    const openGallery = () => {
        //console.log('openGallery');
        ImageCropPicker.openPicker({
            cropping: true,
            width: width * 2,
            height: width * 3 / 2,
        })
            .then(image => {
                if (selectedImages) {
                    let temp = selectedImages;
                    temp.push(image.path);
                    setSelectedImages(temp);
                }
                else {
                    setSelectedImages([image.path]);
                    setChoosenImage(image.path);
                }
            }).catch(e => console.log(e))
    };

    useEffect(() => {
        formatDate(date)
    }, [date]);

    const formatDate = (date) => {
        let d = date.getDate();
        d = (d < 10 ? '0' : '') + d;
        let m = date.getMonth() + 1;
        m = (m < 10 ? '0' : '') + m;
        let y = date.getFullYear();
        const s = `${d}-${m}-${y}`;
        setExpiredSt(s);
    }

    const openCamera = () => {
        //console.log('openCamera');
        ImageCropPicker.openCamera({
            width: width * 2,
            height: width * 3 / 2,
        })
            .then(image => {
                if (selectedImages) {
                    let temp = selectedImages;
                    temp.push(image.path);
                    setSelectedImages(temp);
                }
                else {
                    setSelectedImages([image.path]);
                    setChoosenImage(image.path);
                }
            })
            .catch(e => {
                console.log(e.toString());
            })
    };

    const onDeleteItem = (item) => {
        let temp = selectedImages;
        temp = temp.filter(e => e != item);
        setSelectedImages(temp);
        console.log('deleted');
    }

    const onSubmit = async () => {
        if (validated()) {
            setLoading(true);
            setMessage('??ang kh???i t???o s???n ph???m');
            if (!pId) {
                //Ch??a c?? pId t???o m???i m???t product r???ng
                pId = await getNew();
            }
            //upload t???t c??? h??nh ???nh l??n firebase
            setMessage('??ang t???i ???nh l??n');
            const images = await uploadMultiFile(selectedImages, `products/${pId}`);
            //console.log('images ',images);
            const product = {
                _id: pId,
                name: pName,
                categoryId: category,
                brand: pBrand,
                images,
                origin: pOrigin,
                unit: pUnit,
                description,
                amount: pAmount,
                sellPrice,
                originPrice,
                owner: user._id,
                expiredAt: date
            }
            setMessage('??ang l??u s???n ph???m v??o c?? s??? d??? li???u');
            const result = await updateProduct(product);
            if (result.result) {
                ToastAndroid.show('Th??m s???n ph???m th??nh c??ng', ToastAndroid.SHORT);
                goBack();
            }
            else {
                ToastAndroid.show('Th??m s???n ph???m th???t b???i', ToastAndroid.SHORT);
                setLoading(false);
            }
        }
    }

    const onChangeDate = (events, selectedDate) => {
        setIsShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }

    }

    const validated = () => {
        if (!pName) {
            ToastAndroid.show('T??n s???n ph???m kh??ng ???????c ????? tr???ng', ToastAndroid.SHORT);
            return false;
        }

        if (!originPrice) {
            ToastAndroid.show('Gi?? g???c kh??ng ???????c ????? tr???ng', ToastAndroid.SHORT);
            return false;
        }

        if (!sellPrice) {
            ToastAndroid.show('Gi?? b??n kh??ng ???????c ????? tr???ng', ToastAndroid.SHORT);
            return false;
        }

        if (!pAmount) {
            ToastAndroid.show('S??? l?????ng kh??ng ???????c ????? tr???ng', ToastAndroid.SHORT);
            return false;
        }

        if (pAmount < 0) {
            ToastAndroid.show('S??? l?????ng ph???i l???n h??n 0', ToastAndroid.SHORT);
            return false;
        }

        if (!selectedImages || selectedImages.length < 1) {
            ToastAndroid.show('H??y th??m ??t nh???t m???t ???nh cho s???n ph???m', ToastAndroid.SHORT);
            return false;
        }


        return true;
    }

    return (
        <>
            <DefaultHeader isBack={true} title='Th??m s???n ph???m' />
            <ScrollView style={styles.container}
                nestedScrollEnabled={true}
            >

                <Pressable>
                    <FastImage source={choosenImage ? { uri: choosenImage } : require('../../assets/images/item_not_found.png')} style={styles.cover} />
                </Pressable>
                <FlatList
                    data={selectedImages}
                    renderItem={({ item, index }) => (<SmallImage
                        item={item}
                        onPress={() => setChoosenImage(item)}
                        deleteItem={() => onDeleteItem(item)}
                        key={index}
                    />)}
                    nestedScrollEnabled={true}
                    ListHeaderComponent={() => <ListHeader onPress={() => setIsVisibleModal(true)} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.editView}>
                    <Title>Th??ng tin s???n ph???m</Title>
                    <DefautText style={{ color: 'red', fontStyle: 'italic' }}>(* l?? th??nh ph???n quan tr???ng b???t bu???c ph???i ??i???n)</DefautText>
                    <TextInputForProduct
                        name='T??n s???n ph???m'
                        placeholder='H??y ??i???n t??n s???n ph???m*'
                        value={pName}
                        onChangeText={setPName}
                    />
                    <TextInputForProduct
                        name='Gi?? g???c'
                        keyboardType='number-pad'
                        placeholder='H??y ??i???n gi?? g???c*'
                        value={originPrice}
                        onChangeText={setOriginPrice}
                    />
                    <TextInputForProduct
                        name='Gi?? b??n'
                        keyboardType='number-pad'
                        placeholder='H??y ??i???n gi?? b??n*'
                        value={sellPrice}
                        onChangeText={setSellPrice}
                    />
                    <TextInputForProduct
                        name='S??? l?????ng'
                        keyboardType='number-pad'
                        placeholder='H??y ??i???n s??? l?????ng s???n ph???m*'
                        value={pAmount}
                        onChangeText={setPAmount}
                    />
                    <TextInputForProduct
                        name='????n v??? t??nh'
                        placeholder='H??y ??i???n ????n v??? t??nh'
                        value={pUnit}
                        onChangeText={setPUnit}
                    />
                    <CategoryPicker {...{ category, setCategory }} />
                    <TextInputForProduct
                        name='Xu???t x???'
                        placeholder='H??y ??i???n xu???t x???'
                        value={pOrigin}
                        onChangeText={setPOrigin}
                    />
                    <TextInputForProduct
                    name='Ng??y h???t h???n'
                    placeholder='dd-mm-yyyy'
                    value={expiredSt}
                    editable={false}
                    onPress={()=> setIsShowDatePicker(true)}
                />
                    <TextInputForProduct
                        name='Th????ng hi???u'
                        placeholder='H??y ??i???n t??n th????ng hi???u'
                        value={pBrand}
                        onChangeText={setPBrand}
                    />
                    <Title>M?? t??? s???n ph???m</Title>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder='????u l?? ??i???m n???i b???t c???a s???n ph???m n??y?'
                        multiline={true}
                        style={styles.input}
                    />
                    <NomalButton onPress={onSubmit}>Ho??n Th??nh</NomalButton>
                </View>
                <ModalChooseCamera
                    visible={isVisibleModal}
                    dimissModal={() => setIsVisibleModal(false)}
                    transparent={true}
                    animationType='slide'
                    onItemPress={[openGallery, openCamera]}
                />
                <LoadingModal
                    visible={loading}
                    style={styles.modal}
                    animationType='fade'
                    transparent={true}
                    statusBarTranslucent={true}
                    message={message}
                />
                {isShowDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode='date'
                        minimumDate={new Date()}
                        onChange={onChangeDate}
                    />
                )}
            </ScrollView>
        </>
    )
}

const SmallImage = (props) => {
    const { item, onPress, deleteItem } = props;
    return (
        <Pressable onPress={onPress}>
            <FastImage source={{ uri: item }} style={styles.smallImage} />
            <Icon name='delete-outline' size={22} color={MainColor} style={styles.icon} onPress={deleteItem} />
        </Pressable>
    )
}
const ListHeader = (props) => {
    const { onPress } = props;
    return (
        <Pressable style={styles.btnAdd} onPress={onPress}>
            <Icon name='add-photo-alternate' size={40} color={MainColor} />
            <DefautText style={{ color: MainColor, padding: 4 }}>Th??m ???nh</DefautText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cover: {
        width: '100%',
        height: width * 3 / 4,
        resizeMode: 'cover'
    },
    smallImage: {
        width: width / 3,
        height: width / 4,
        margin: 2,
        borderColor: MainColor,
        borderRadius: 5,
        borderWidth: 1,
    },
    btnAdd: {
        width: width / 3,
        height: width / 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1FAFF',
        margin: 2,
        borderColor: MainColor,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'dashed'
    },
    icon: {
        position: 'absolute',
        backgroundColor: '#F1FAFF',
        padding: 6,
        right: 5,
        top: 5,
        borderRadius: 20

    },
    editView: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    input: {
        borderColor: MainColor,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'dashed',
        minHeight: 50,
        padding: 10,
        marginTop: 10
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopAddProductScreen)
