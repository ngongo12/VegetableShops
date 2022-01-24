import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ToastAndroid,
    Pressable
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Rating } from 'react-native-ratings';
import { productUrl } from '../../api/productAPI';
import LoadingView from '../LoadingView';
import { DefautText } from '../Text/AppTexts';

const ReivewList = props => {
    const { productID } = props;
    const [reviews, setReviews] = useState();
    useEffect(() => {
        fetchReview();
    }, [])
    const fetchReview = () => {
        fetch(`${productUrl}getReview?productID=${productID}`)
            .then(res => res.json())
            .then(res => setReviews(res))
            .catch(e => console.log('>>>>>>>>>> reviewlist error', e));
    }
    console.log(reviews)
    return (
        <View style={styles.container}>
            {
                !reviews ? <DefautText>Đang tải...</DefautText> :
                    reviews?.length === 0 ? <DefautText>Không có đánh giá nào</DefautText>
                        :
                        reviews?.map((e) => (
                            <ItemView item={e} key={e?._id} />
                        ))
            }
        </View>
    )
}

const ItemView = ({ item }) => {
    const { users } = item;
    const user = users[0];
    return (
        <View style={styles.itemContent}>
            <FastImage source={{ uri: user?.avatar }} style={styles.image} />
            <View style={styles.content}>
                <DefautText>{user?.fullname}</DefautText>
                <Rating
                    type='custom'
                    imageSize={15}
                    ratingCount={5}
                    ratingBackgroundColor='silver'
                    readonly={true}
                    style={styles.rating}
                    startingValue={item?.rate} />
                <DefautText>{item?.message}</DefautText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    itemContent: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'silver',
        paddingTop: 10
    },
    image: {
        width: 30,
        height: 30,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 100
    },
    content: {
        paddingLeft: 5,
        paddingBottom: 10
    },
    rating: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#fff',
        paddingVertical: 5
    },
})

export default ReivewList
