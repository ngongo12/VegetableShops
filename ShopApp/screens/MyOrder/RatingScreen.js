import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, ScrollView, ToastAndroid, Pressable, TextInput, FlatList } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/userActions';
import FastImage from 'react-native-fast-image';
import { Rating } from 'react-native-ratings';
import orderAPI from '../../api/orderAPI';
import { navigate } from '../../config/rootNavigation';
import userAPI, { getShopName } from '../../api/userAPI';
import { DARK_GREEN, MainColor, MAIN_BACKGROUND, RED } from '../../constants/colors';
import { DefautText, Title, SellPrice, DateTimeFm, HeaderText } from '../../components/Text/AppTexts';
import NomalButton from '../../components/Button/NomalButton';
import LoadingView from '../../components/LoadingView';
import { productUrl } from '../../api/productAPI';

const RatingScreen = (props) => {
    const { user: { user }, route: { params } } = props;
    const { orderID, products } = params;
    const [rates, setRates] = useState([]);
    useEffect(() => {
        if (orderID) {
            fetchRate();
        }
    }, [orderID])
    //console.log(rates)
    const fetchRate = () => {
        fetch(`${productUrl}getRateByOrderID?orderID=${orderID}`)
            .then(res => res.json())
            .then(res => setRates(res?.rates))
            .catch(e => console.log(e));
    }
    return (
        <ScrollView>
            {
                products?.map((e, index) => (
                    <ItemRatating item={e} orderID={orderID} uid={user?._id} key={index} rates={rates} />
                ))
            }
        </ScrollView>
    )
}

const ItemRatating = (props) => {
    const { item, orderID, uid, rates } = props;
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [rate, setRate] = useState();
    //console.log('rate', rate)
    useEffect(() => {
        if (rates?.length > 0) {
            //console.log('foreach')
            rates?.forEach(e => {
                if (e.productID == item._id) {
                    setRate(e);
                }
            });
        }
    }, [rates])

    useEffect(() => {
        if (rate) {
            setRating(rate.rate);
            setMessage(rate.message);
        }
    }, [rate])
    const onSubmit = () => {
        if (rate) {
            //update
            console.log('save update')
            fetch(`${productUrl}updateRate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: rate?._id,
                    rate: rating,
                    message
                })
            })
                .then(res => res.json())
                .then(res => {
                    ToastAndroid.show('Thay đổi đánh giá thành công', ToastAndroid.SHORT)
                })
                .catch(e => console.log(e));
        }
        else {
            //save new
            console.log('save new')
            fetch(`${productUrl}saveRate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productID: item._id,
                    userID: uid,
                    orderID,
                    rate: rating,
                    message
                })
            })
                .then(res => res.json())
                .then(res => {
                    setRate(res?.rate);
                    ToastAndroid.show('Gửi đánh giá thành công', ToastAndroid.SHORT)
                })
                .catch(e => console.log(e));
        }
    }
    const addMessage = (item) => {
        if (message.trim().length == '') {
            setMessage(item)
        }
        else
            setMessage(`${message}, ${item}`)
    }
    const dataMessage = [
        'Sản phẩm rất tốt',
        'Giao hàng nhanh',
        'Đóng gói chất lượng',
        'Giá cả hợp lý',
        'Shop phục vụ rất tốt'
    ]
    return (
        <>
            <View style={styles.container}>
                <View style={[styles.row, styles.border]}>
                    <FastImage source={{ uri: item?.images[0] }} style={styles.image} />
                    <View style={styles.row}>
                        <DefautText style={styles.title}>{item?.name}</DefautText>
                        <DefautText onPress={onSubmit} style={styles.submit}>Submit</DefautText>
                    </View>
                </View>
                <View style={styles.rating}>
                    <Rating
                        type='custom'
                        imageSize={30}
                        ratingCount={5}
                        ratingBackgroundColor='#fff'
                        starContainerStyle={styles.star}
                        isDisabled={true}
                        style={styles.rating}
                        startingValue={rating}
                        onFinishRating={setRating}
                    />
                </View>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    placeholder='Hãy ghi lại đánh giá của bạn'
                    numberOfLines={5}
                    style={styles.input}
                />
                <FlatList
                    data={dataMessage}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <DefautText
                            onPress={() => addMessage(item)}
                            style={styles.data}
                        >
                            {item}
                        </DefautText>
                    )}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    border: {
        borderBottomWidth: 0.5,
        borderColor: 'silver'
    },
    image: {
        width: 30,
        height: 30,
        margin: 10,
        marginRight: 0
    },
    title: {
        paddingHorizontal: 10,
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1
    },
    submit: {
        color: RED,
        paddingHorizontal: 15
    },
    rating: {
        margin: 10,
    },
    star: {
        backgroundColor: 'blue'
    },
    input: {
        backgroundColor: '#F5F5F5',
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 13,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#D4D4D4'
    },
    data: {
        paddingHorizontal: 15,
        paddingVertical: 3,
        backgroundColor: 'silver',
        marginHorizontal: 3,
        marginBottom: 10,
        borderRadius: 50
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RatingScreen)