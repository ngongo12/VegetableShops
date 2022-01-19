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
            setMessage('Đang khởi tạo sản phẩm');
            if (!pId) {
                //Chưa có pId tạo mới một product rỗng
                pId = await getNew();
            }
            //upload tất cả hình ảnh lên firebase
            setMessage('Đang tải ảnh lên');
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
            setMessage('Đang lưu sản phẩm vào cơ sở dữ liệu');
            const result = await updateProduct(product);
            if (result.result) {
                ToastAndroid.show('Thêm sản phẩm thành công', ToastAndroid.SHORT);
                goBack();
            }
            else {
                ToastAndroid.show('Thêm sản phẩm thất bại', ToastAndroid.SHORT);
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
            ToastAndroid.show('Tên sản phẩm không được để trống', ToastAndroid.SHORT);
            return false;
        }

        if (!originPrice) {
            ToastAndroid.show('Giá gốc không được để trống', ToastAndroid.SHORT);
            return false;
        }

        if (!sellPrice) {
            ToastAndroid.show('Giá bán không được để trống', ToastAndroid.SHORT);
            return false;
        }

        if (!pAmount) {
            ToastAndroid.show('Số lượng không được để trống', ToastAndroid.SHORT);
            return false;
        }

        if (pAmount < 0) {
            ToastAndroid.show('Số lượng phải lớn hơn 0', ToastAndroid.SHORT);
            return false;
        }

        if (!selectedImages || selectedImages.length < 1) {
            ToastAndroid.show('Hãy thêm ít nhất một ảnh cho sản phẩm', ToastAndroid.SHORT);
            return false;
        }


        return true;
    }

    return (
        <>
            <DefaultHeader isBack={true} title='Thêm sản phẩm' />
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
                    <Title>Thông tin sản phẩm</Title>
                    <DefautText style={{ color: 'red', fontStyle: 'italic' }}>(* là thành phần quan trọng bắt buộc phải điền)</DefautText>
                    <TextInputForProduct
                        name='Tên sản phẩm'
                        placeholder='Hãy điền tên sản phẩm*'
                        value={pName}
                        onChangeText={setPName}
                    />
                    <TextInputForProduct
                        name='Giá gốc'
                        keyboardType='number-pad'
                        placeholder='Hãy điền giá gốc*'
                        value={originPrice}
                        onChangeText={setOriginPrice}
                    />
                    <TextInputForProduct
                        name='Giá bán'
                        keyboardType='number-pad'
                        placeholder='Hãy điền giá bán*'
                        value={sellPrice}
                        onChangeText={setSellPrice}
                    />
                    <TextInputForProduct
                        name='Số lượng'
                        keyboardType='number-pad'
                        placeholder='Hãy điền số lượng sản phẩm*'
                        value={pAmount}
                        onChangeText={setPAmount}
                    />
                    <TextInputForProduct
                        name='Đơn vị tính'
                        placeholder='Hãy điền đơn vị tính'
                        value={pUnit}
                        onChangeText={setPUnit}
                    />
                    <CategoryPicker {...{ category, setCategory }} />
                    <TextInputForProduct
                        name='Xuất xứ'
                        placeholder='Hãy điền xuất xứ'
                        value={pOrigin}
                        onChangeText={setPOrigin}
                    />
                    <TextInputForProduct
                    name='Ngày hết hạn'
                    placeholder='dd-mm-yyyy'
                    value={expiredSt}
                    editable={false}
                    onPress={()=> setIsShowDatePicker(true)}
                />
                    <TextInputForProduct
                        name='Thương hiệu'
                        placeholder='Hãy điền tên thương hiệu'
                        value={pBrand}
                        onChangeText={setPBrand}
                    />
                    <Title>Mô tả sản phẩm</Title>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder='Đâu là điểm nổi bật của sản phẩm này?'
                        multiline={true}
                        style={styles.input}
                    />
                    <NomalButton onPress={onSubmit}>Hoàn Thành</NomalButton>
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
            <DefautText style={{ color: MainColor, padding: 4 }}>Thêm ảnh</DefautText>
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
