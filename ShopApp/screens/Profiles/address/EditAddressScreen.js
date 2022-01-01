import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    FlatList,
    TextInput,
    ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../../actions/userActions';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Foundation';
import { DefautText, Title } from '../../../components/Text/AppTexts';
import { MainColor, RED } from '../../../constants/colors';
import * as addressAPI from '../../../api/addressAPI';
import NomalButton from '../../../components/Button/NomalButton';
import LoadingModal from '../../../components/LoadingModal';
import { requestLocationPermission } from '../../../components/RequestPermission';
import { searchAddress } from '../../../api/mapAPI';
import FastImage from 'react-native-fast-image';

const EditAddressScreen = props => {
    const { 
        user: { user, isLoading, success }, 
        actions, 
        navigation: { goBack },
        route: { params }
    } = props;
    const [flag, setFlag] = useState(false);
    const [count, setCount] = useState(0);
    const [index, setIndex] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [showInputText, setShowInputText] = useState(false);
    const [details, setDetails] = useState('');
    const [isShowMap, setIsShowMap] = useState(false);
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [myLocation, setMyLocation] = useState();
    const [shopLocation, setShopLocation] = useState();
    const [newLocationName, setNewLocationName] = useState('');
    const [focusedLocation, setFocusedLocation] = useState();
    const [address, setAddress] = useState([
        {
            index: 0,
            level: 'Tỉnh/ Thành phố',
            focused: true
        },
        {
            index: 1,
            level: 'Quận/ Huyện',
            focused: false
        },
        {
            index: 2,
            level: 'Xã/ Phường',
            focused: false
        },
    ]);

    useEffect(() => {
        if (flag && success) {
            ToastAndroid.show('Thêm địa chỉ thành công', ToastAndroid.SHORT);
            goBack();
        }
    }, [isLoading])

    useEffect(() => {
        fetchProvinces();
    }, [])

    const setFocused = (index) => {
        setIndex(index);
        let temp = address;
        temp = temp.map(e => e.index !== index ? { ...e, focused: false } : { ...e, focused: true })
        setAddress(temp)
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                //console.log('possition', position);
                setMyLocation(position?.coords);
                setFocusedLocation(position?.coords)
            },
            (error) => {
                console.log(error.code, error.message);

                //Nếu lỗi permission thì gọi permission
                if (error.message?.includes('permission')) {
                    requestLocationPermission()
                        .then(res => setHasLocationPermission(res))
                        .catch(e => console.log(e));
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, [hasLocationPermission])

    const fetchProvinces = () => {
        addressAPI.getAllProvinces().then(res => setProvinces(res));
    }

    const fetchDistricts = (code) => {
        addressAPI.getAllDistricts(code).then(res => setDistricts(res));
    }

    const fetchWards = (code) => {
        addressAPI.getAllWards(code).then(res => setWards(res));
    }

    const setChooseProvince = item => {
        let temp = address;
        if (item.code !== address[0].value?.code) {
            setDistricts();
            setWards();
            temp[1].value = undefined;
            setShowInputText(false);
        }
        temp[0].value = item;
        temp[1].focused = true;



        setAddress(temp);
        setIndex(1);
        setFocused(1);

        //Lấy district của tỉnh này
        fetchDistricts(item?.code);
    }

    const setChooseDistrict = item => {
        let temp = address;
        if (item.code !== address[1].value?.code) {
            setWards();
            temp[2].value = undefined;
            setShowInputText(false);
        }
        temp[1].value = item;
        temp[2].focused = true;

        setAddress(temp);
        setIndex(2);
        setFocused(2);

        //Lấy wards của huyện này
        fetchWards(item?.code);
    }

    const setChooseWard = item => {
        let temp = address;
        setShowInputText(true); //Hiện input text để nhập địa chỉ cụ thể
        if (item.code !== address[2].value?.code) {
            setDetails('');
        }
        temp[2].value = item;
        setAddress(temp);
        setCount(count + 1);
        console.log(address)
    }

    useEffect(() => {
        const { myAddress } = params;
        //console.log('>>>>>>>>>> myAddress ', myAddress);
        if(myAddress){
            setAddress([
                {
                    index: 0,
                    level: 'Tỉnh/ Thành phố',
                    focused: false,
                    value: myAddress?.province
                },
                {
                    index: 1,
                    level: 'Quận/ Huyện',
                    focused: false,
                    value: myAddress?.district
                },
                {
                    index: 2,
                    level: 'Xã/ Phường',
                    focused: false,
                    value: myAddress?.ward
                },
            ]);
            setDetails(myAddress.details);
            //setFocused(2);
            setIndex(2);
            setShowInputText(true);
            setShopLocation(myAddress.coordinate);
            setFocusedLocation(myAddress.coordinate);
            setIsShowMap(true);
            setNewLocationName('e')
        }
    }, [])
    //console.log(address)

    const onEditAdress = () => {
        if (details.length <= 6) {
            ToastAndroid.show('Địa chỉ cụ thể quá ngắn', ToastAndroid.SHORT);
            return;
        }
        setFlag(true);
        const newAddress = {
            province: {
                name: address[0].value?.name,
                code: address[0].value?.code
            },
            district: {
                name: address[1].value?.name,
                code: address[1].value?.code
            },
            ward: {
                name: address[2].value?.name,
                code: address[2].value?.code
            },
            details,
            coordinate: shopLocation
        }
        let temp = user.address;
        const { myIndex } = params;
        temp.splice(myIndex, 1, newAddress);
        //console.log(temp)
        actions.actionEditProfile({
            user: {
                _id: user._id,
                address: temp
            }
        });
    }

    const onGetShopAddress = () => {
        //Lấy tên đầy đủ của địa chỉ mới
        let newAddress = `${details}, ${address[2].value?.name}, ${address[1].value?.name}, ${address[0].value?.name}`;
        setNewLocationName(newAddress);
        searchAddress(newAddress).then(res => {
            const { x, y } = res[0]?.location;
            setShopLocation({
                longitude: x,
                latitude: y
            });
            setFocusedLocation({
                longitude: x,
                latitude: y
            })
            setIsShowMap(true);
        });
    }

    //console.log('wards: ', wards);

    return (
        <>
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
                    <DefautText style={styles.label}>Khu vực được chọn</DefautText>
                    <AddressItem
                        name={address[0].value ? address[0].value?.name : `Chọn ${address[0].level}`}
                        focused={address[0]?.focused}
                        bottom={true && address[0].value}
                        onPress={() => setFocused(0)}
                    />
                    {address[0].value && <AddressItem
                        name={address[1].value ? address[1].value?.name : `Chọn ${address[1].level}`}
                        focused={address[1]?.focused}
                        top={true}
                        bottom={true && address[1].value}
                        onPress={() => setFocused(1)}
                    />}
                    {address[1].value && <AddressItem
                        name={address[2].value ? address[2].value?.name : `Chọn ${address[2].level}`}
                        focused={address[2]?.focused}
                        top={true}
                        onPress={() => setFocused(2)}
                    />}
                    {showInputText && <TextInput
                        value={details}
                        onChangeText={setDetails}
                        placeholder='Số nhà và tên đường'
                        autoCapitalize='words'
                        onEndEditing={onGetShopAddress}
                        style={styles.input}
                    />}
                    {(newLocationName.length > 0) && <NomalButton onPress={onEditAdress} style={{ marginHorizontal: 30 }}>Thay đổi</NomalButton>}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <DefautText style={styles.label}>{`Chọn ${address[index]?.level}`}</DefautText>
                    <DefautText style={[styles.label, styles.showMap]} onPress={() => setIsShowMap(!isShowMap)}>
                        <Icon name='map' color={MainColor} size={15} />
                        <DefautText>  {isShowMap ? 'Ẩn' : 'Xem'} bản đồ</DefautText>
                    </DefautText>
                </View>
                {!isShowMap && (<View style={{ flex: 1 }}>
                    {(index == 0) && (<FlatList
                        data={provinces}
                        renderItem={({ item }) => <ItemOfList item={item} onPress={() => setChooseProvince(item)} />}
                        style={styles.flatlist}
                    />)}
                    {(index == 1) && (<FlatList
                        data={districts}
                        renderItem={({ item }) => <ItemOfList item={item} onPress={() => setChooseDistrict(item)} />}
                        style={styles.flatlist}
                    />)}
                    {(index == 2) && (<FlatList
                        data={wards}
                        renderItem={({ item }) => <ItemOfList item={item} onPress={() => setChooseWard(item)} />}
                        style={styles.flatlist}
                    />)}
                </View>)}
                {isShowMap && (<MapView
                    initialRegion={{
                        latitude: focusedLocation?.latitude,
                        longitude: focusedLocation?.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={[styles.flatlist, { flex: 1 }]}
                >
                    {myLocation && (<Marker
                        coordinate={myLocation}
                        title='Vị trí của tôi'
                        image={require('../../../assets/images/my_location.png')}
                    />)}
                    {shopLocation && (
                        <Marker draggable
                            coordinate={shopLocation}
                            onDragEnd={e => { setShopLocation(e.nativeEvent.coordinate)}}
                            title='Địa chỉ mới'
                        >
                            <FastImage source={require('../../../assets/images/location_marker.png')} style={{width: 26, height: 26}} />
                            </Marker>
                    )}
                </MapView>)}
            </View>
            <LoadingModal
                message='Đang thêm địa chỉ'
                visible={isLoading}
            />
        </>
    )
}

const ItemOfList = props => {
    const { item, onPress } = props;
    return (
        <Pressable style={styles.item} onPress={onPress}>
            <DefautText style={styles.itemLargeText}>{item?.first}</DefautText>
            <DefautText style={styles.itemText}>{item?.shortname ? item?.shortname : item?.name}</DefautText>
        </Pressable>

    )
}

const addressHeight = 46;
const dotSize = 16;

const AddressItem = (props) => {
    const { top, bottom, name, focused, onPress } = props;
    //console.log(name)
    return (
        <Pressable onPress={onPress} style={styles.addressContainer}>
            <View style={styles.radioView}>
                <View style={[styles.bar, top && { backgroundColor: 'silver' }]} />
                <View style={[styles.bar, bottom && { backgroundColor: 'silver' }]} />
                <View style={[styles.dotView, focused && { borderWidth: 1 }]}>
                    <View style={[styles.dot, focused && { backgroundColor: RED }]} />
                </View>
            </View>
            <DefautText style={styles.text, focused && { color: RED }}>{name}</DefautText>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    label: {
        marginLeft: 10,
        marginTop: 10
    },
    addressContainer: {
        flexDirection: 'row',
        borderRadius: 3,
        borderColor: 'silver',
        marginHorizontal: 10,
        height: addressHeight,
        alignItems: 'center'
    },
    text: {
        fontSize: 14
    },
    radioView: {
        flexDirection: 'column',
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: dotSize
    },
    bar: {
        width: 1.5,
        height: addressHeight / 2,
    },
    dotView: {
        width: dotSize,
        height: dotSize,
        borderRadius: 50,
        backgroundColor: '#fff',
        position: 'absolute',
        top: (addressHeight - dotSize) / 2,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: RED,
    },
    dot: {
        width: dotSize * 0.5,
        height: dotSize * 0.5,
        borderRadius: 50,
        backgroundColor: 'silver',
    },
    flatlist: {
        marginTop: 10
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        flex: 1,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderColor: 'silver',
        fontSize: 15
    },
    itemLargeText: {
        fontSize: 15,
        width: 48,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'silver'
    },
    input: {
        //margin: 10,
        paddingHorizontal: 30
    },
    showMap: {
        flex: 1,
        paddingHorizontal: 10,
        textAlign: 'right',
        color: MainColor
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


export default connect(mapStateToProps, mapDispatchToProps)(EditAddressScreen)
