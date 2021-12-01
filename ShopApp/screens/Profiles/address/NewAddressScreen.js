import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    FlatList,
    TextInput
} from 'react-native';
import { DefautText, Title } from '../../../components/Text/AppTexts';
import { RED } from '../../../constants/colors';
import * as addressAPI from '../../../api/addressAPI';
import NomalButton from '../../../components/Button/NomalButton';

const NewAddressScreen = () => {
    const [index, setIndex] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [showInputText, setShowInputText] = useState(false);
    const [details, setDetails] = useState('');
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
        }
    ]);

    useEffect(() => {
        fetchProvinces();
    }, [])

    const setFocused = (index) => {
        setIndex(index);
        let temp = address;
        temp = temp.map(e => e.index !== index ? { ...e, focused: false } : { ...e, focused: true })
        setAddress(temp)
    }

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
            console.log('Đúng')
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
    }

    useEffect(() => {

    }, [address])

    //console.log('wards: ', wards);

    return (
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
                    style={styles.input}
                />}
                {showInputText && <NomalButton style={{marginHorizontal: 30}}>Thêm mới</NomalButton>}
            </View>
            <DefautText style={styles.label}>{`Chọn ${address[index].level}`}</DefautText>
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
        </View>
    )
}

const ItemOfList = props => {
    const { item, onPress } = props;
    return (
        <Pressable style={styles.item} onPress={onPress}>
            <DefautText style={styles.itemLargeText}>{item?.first}</DefautText>
            <DefautText style={styles.itemText}>{item?.name}</DefautText>
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
    }
})

export default NewAddressScreen
