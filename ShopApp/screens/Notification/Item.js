import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Pressable
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';


import FastImage from 'react-native-fast-image';
import { BodyText, DateTimeFm, DefautText } from '../../components/Text/AppTexts';
import { MAIN_BACKGROUND } from '../../constants/colors';
import { navigate } from '../../config/rootNavigation';
import apiURL from '../../constants/api_url';

const Item = (props) => {
    const { item, index } = props;

    const setSeenNotification = () => {
        if (item.state !== 'seen')
            fetch(`${apiURL}notification/seenNotification?notifyID=${item._id}`)
                .then(res => res)
                .catch(e => console.error(e));
    }

    const onNavigate = () => {
        setSeenNotification(); //Chuyển trạng thái đã đọc trước khi chuyển trang
        switch (item?.type) {
            case 'order': navigate('OrderDetailScreen', { orderID: item.linkID }); return;
            case 'product': navigate('ProductDetailScreen', { productID: item.linkID }); return;
        }
    }
    return (
        <Pressable onPress={onNavigate} style={[{ flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', backgroundColor: '#fff' }, (index % 2 == 0) && { backgroundColor: '#F6FFFE' }]}>
            <FastImage source={{ uri: item?.image }} style={styles.image} />
            <View style={{ paddingLeft: 10, flex: 1 }}>
                <DefautText style={{ color: 'black', marginBottom: 5 }}>{item?.title}</DefautText>
                <BodyText>{item?.body}</BodyText>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                    <EvilIcon name='clock' size={16} />
                    <DateTimeFm style={{ fontSize: 12, paddingLeft: 5 }}>{item?.createdAt}</DateTimeFm>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 50,
        height: 50
    }
})

export default Item