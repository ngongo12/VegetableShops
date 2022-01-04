import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { MainColor } from '../../constants/colors';
import { DateTimeFm, DefautText, SellPrice } from '../Text/AppTexts';

const { width, height } = Dimensions.get('window');
const maxWidth = width * 2 / 3;
const ChatBox = (props) => {
    const { item, myID } = props;
    //const value = new Animated.Value(0);
    // console.log(item)
    // console.log(myID)
    // useEffect(() => {
    //     Animated.timing(value, {
    //         toValue: 1,
    //         duration: 2000,
    //         useNativeDriver: true
    //     }).start();
    // }, []);
    //console.log(item)
    return (
        <Animated.View style={[styles.container]}>
            {
                (myID !== item.sendBy) ?
                    <InMessage item={item} />
                    :
                    <OutMessage item={item} />
            }
        </Animated.View>
    )
}

const InMessage = (props) => {
    const { item } = props;
    const { messageContent, createdAt } = item;

    return (
        <View style={{alignItems: 'flex-start'}}>
            <DateTimeFm style={styles.time}>{createdAt}</DateTimeFm>
            {(messageContent?.type === 'text') && <DefautText style={styles.inMessageText}>{messageContent?.message}</DefautText>}
            {(messageContent?.type === 'product') && <ProductContent isLeft={true} product={messageContent?.product} /> }
        </View>
    )
}

const OutMessage = (props) => {
    const { item } = props;
    const { messageContent, createdAt } = item;

    return (
        <View style={{ alignItems: 'flex-end' }}>
            <DateTimeFm style={styles.time}>{createdAt}</DateTimeFm>
            {(messageContent?.type === 'text') && <DefautText style={styles.outMessageText}>{messageContent?.message}</DefautText>}
            {(messageContent?.type === 'product') && <ProductContent product={messageContent?.product} /> }
        </View>
    )
}

const ProductContent = props => {
    const { product, isLeft } = props;
    //console.log(product)
    return(
        <View style={[isLeft ? styles.inMessageText : styles.outMessageText, styles.productContent]}>
            <FastImage source={{uri: product?.image}} style={styles.image} />
            <View style={{paddingLeft: 10, justifyContent: 'space-between'}}>
                <DefautText style={{fontSize: 15}} numberOfLines={2} ellipsizeMode='tail'>{product?.name}</DefautText>
                <SellPrice style={{fontWeight: 'normal', fontSize: 13}}>{product?.sellPrice}</SellPrice>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    time: {
        fontSize: 11,
        paddingVertical: 3
    },
    inMessageText: {
        borderRadius: 8,
        backgroundColor: '#fff',
        maxWidth: maxWidth,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        borderTopLeftRadius: 0,
        borderWidth: 0.5
    },

    outMessageText: {
        borderRadius: 8,
        backgroundColor: '#fff',
        maxWidth: maxWidth,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
        backgroundColor: MainColor,
        color: '#fff'
    },
    productContent: {
        maxWidth: maxWidth,
        minWidth: width /2,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    image: {
        width: 64,
        height: 64
    }
})

export default ChatBox
