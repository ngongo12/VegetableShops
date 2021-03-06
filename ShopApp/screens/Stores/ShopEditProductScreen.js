import React, { useState, useEffect } from 'react'
import {
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    Image,
    Pressable,
    FlatList,
    TextInput,
    ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { deleteFile, deleteMultiFile, uploadMultiFile } from '../../api/uploadFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import userActions from '../../actions/userActions';
import DefaultHeader from '../../components/Header/DefaultHeader';
import ModalChooseCamera from '../../components/ModalChooseCamera';
import { MainColor } from '../../constants/colors';
import { Title, DefautText } from '../../components/Text/AppTexts';
import TextInputForProduct from '../../components/Text/TextInputForProduct';
import NomalButton from '../../components/Button/NomalButton';
import CategoryPicker from '../../components/CategoryPicker';
import { productUrl, updateProduct } from '../../api/productAPI';
import LoadingModal from '../../components/LoadingModal';

const { width, height } = Dimensions.get('window');
const ShopEditProductScreen = (props) => {
    const {
        user: { user },
        navigation: { goBack }
    } = props;
    const { route: { params: { productID } } } = props;
    //console.log('add product user ', goBack);
    const [date, setDate] = useState(new Date());
    const [isShowDatePicker, setIsShowDatePicker] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]); // Hình ảnh chọn từ thiết bị
    const [allImages, setAllImages] = useState([]); //Tất cả hình ảnh show lên
    const [dataImages, setDataImages] = useState([]); //Ảnh trong database phân biệt với ảnh trên thiết bị
    const [deletedDataImages, setDeletedDataImages] = useState([]); //Ảnh trên data mà yêu cầu bị xóa;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [choosenImage, setChoosenImage] = useState();
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [pName, setPName] = useState('');
    const [pBrand, setPBrand] = useState('');
    const [pOrigin, setPOrigin] = useState('');
    const [category, setCategory] = useState('');
    const [pAmount, setPAmount] = useState('');
    const [pUnit, setPUnit] = useState('');
    const [originPrice, setOriginPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [description, setDescription] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [product, setProduct] = useState();
    const [expiredSt, setExpiredSt] = useState('')

    useEffect(() => {
        fetchProduct();
    }, [])

    useEffect(() => {
        setAllImages(dataImages.concat(selectedImages));
    }, [dataImages, selectedImages])

    useEffect(() => {
        if (product) {
            const { name, images, amount, brand, categoryId, origin, originPrice, owner, sellPrice, unit, description, expiredAt } = product;
            setPName(name);
            //setAllImages(images);
            setDataImages(images);
            setPAmount(amount?.toString());
            setPBrand(brand);
            setCategory(categoryId);
            setPOrigin(origin);
            setOriginPrice(originPrice?.toString());
            setIsOwner(user._id === owner);
            setSellPrice(sellPrice?.toString());
            setPUnit(unit);
            setDescription(description);
            setChoosenImage(images[0]);
            setDate(new Date(expiredAt));
            formatDate(new Date(expiredAt));
        }
    }, [product])

    useEffect(() => {
        formatDate(date)
    }, [date])

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
                    setAllImages(dataImages.concat(selectedImages));
                }
                else {
                    setSelectedImages([image.path]);
                    setChoosenImage(image.path);
                    setAllImages(dataImages.concat(selectedImages));
                }
            }).catch(e => console.log(e))
    };

    const fetchProduct = () => {
        fetch(`${productUrl}getById?id=${productID}`)
            .then(res => res.json())
            .then(res => {
                if (res.product) {
                    setProduct(res.product);
                }
            })
            .catch(e => console.log(e))
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
                    setAllImages(dataImages.concat(selectedImages));
                }
                else {
                    setSelectedImages([image.path]);
                    setChoosenImage(image.path);
                    setAllImages(dataImages.concat(selectedImages));
                }
            })
            .catch(e => {
                console.log(e.toString());
            })
    };

    const formatDate = (date) => {
        let d = date.getDate();
        d = (d < 10 ? '0' : '') + d;
        let m = date.getMonth() + 1;
        m = (m < 10 ? '0' : '') + m;
        let y = date.getFullYear();
        const s = `${d}-${m}-${y}`;
        setExpiredSt(s);
    }

    const onDeleteItem = (item) => {
        if (selectedImages.indexOf(item) >= 0) {
            //Trường hợp hình được xóa nằm trong selected Image;
            let temp = selectedImages;
            temp = temp.filter(e => e !== item);
            setSelectedImages(temp);
        }
        if (dataImages.indexOf(item) >= 0) {
            let temp = dataImages;
            temp = temp.filter(e => e !== item);
            setDataImages(temp);
            //Thêm vào list ảnh cần xóa để xóa sau khi update sản phẩm
            let delListTemp = deletedDataImages;
            delListTemp.push(item);

            console.log('Ảnh sẽ bị xóa ', delListTemp);
        }
    }

    const onSubmit = async () => {
        if (validated()) {
            setLoading(true);
            setMessage('Đang chuẩn bị hình ảnh');
            //upload tất cả hình ảnh đã thêm lên firebase
            const addImages = await uploadMultiFile(selectedImages, `products/${productID}`);
            //console.log('images ',images);
            //Những file chưa thể xóa được
            const deletedFails = await deleteMultiFile(deletedDataImages);
            console.log('deletedFails', deletedFails);
            let images = dataImages.concat(addImages).concat(deletedFails);
            const product = {
                _id: productID,
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

        if (!allImages || allImages.length < 1) {
            ToastAndroid.show('Hãy thêm ít nhất một ảnh cho sản phẩm', ToastAndroid.SHORT);
            return false;
        }


        return true;
    }

    const onChangeDate = (events , selectedDate) => {
        setIsShowDatePicker(false);
        if(selectedDate){
            setDate(selectedDate);
        }
        
    }

    return (
        <ScrollView style={styles.container}
            nestedScrollEnabled={true}
        >
            <DefaultHeader title='Thay đổi thông tin sản phẩm' />
            <Pressable>
                <FastImage source={choosenImage ? { uri: choosenImage } : require('../../assets/images/item_not_found.png')} style={styles.cover} />
            </Pressable>
            <FlatList
                data={allImages}
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
                {isOwner && <NomalButton onPress={onSubmit}>Hoàn Thành</NomalButton>}
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
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopEditProductScreen)
