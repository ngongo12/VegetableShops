import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,

} from 'react-native';
import FastImage from 'react-native-fast-image';
import CheckBox from '@react-native-community/checkbox';
import { DefautText, OriginPrice, SellPrice, Title } from '../Text/AppTexts';


const CartItem = (props) => {
    const { item } = props;
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    //console.log(item)
    return (
        <View style={styles.container}>
            <CheckBox
                value={toggleCheckBox}
                onValueChange={(newValue) => { setToggleCheckBox(newValue) }}
                style={styles.chkBox}
            />
            <FastImage
                source={{ uri: item?.images[0] }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.content}>
                <DefautText style={styles.text}>{item?.name}</DefautText>
                {(item?.sellPrice < item?.originPrice) && <OriginPrice>{item?.originPrice}</OriginPrice>}
                <SellPrice>{item?.sellPrice}</SellPrice>
                <View style={styles.amountView}>
                    <Title style={styles.btn}>-</Title>
                    <TextInput
                        value='1'
                        style={styles.textInput}
                    />
                    <Title style={styles.btn}>+</Title>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 1,
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 80,
        resizeMode: 'cover',
    },
    content: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        flex: 1,
        paddingBottom: 10
    },
    text: {
        color: '#000'
    },
    amountView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        maxWidth: 100,
        borderColor: 'silver',
        borderRadius: 4,
        marginTop: 10,
    },
    btn: {
        width: 30,
        height: 30,
        textAlign: 'center',
        color: 'grey',
        textAlignVertical: 'center'
    },
    textInput: {
        height: 30,
        textAlign: 'center',
        flex: 1,
        fontSize: 12,
        padding: 0,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderColor: 'silver'
    },
    chkBox: {
        marginRight: 10
    }
})

export default CartItem
