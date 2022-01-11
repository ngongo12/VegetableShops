import React from 'react'
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { DefautText } from './Text/AppTexts';

const NothingFound = props => {
    const { message = 'Không có sản phẩm nào', type = 'product'} = props;
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            {type==='product' && <FastImage source={require('../assets/images/nothing_found.png')} style={{width: 100, height: 100}} />}
            {type==='cart' && <FastImage source={require('../assets/images/empty_cart.png')} style={{width: 100, height: 100}} />}
            {type==='order' && <FastImage source={require('../assets/images/empty_order.png')} style={{width: 100, height: 100}} />}
            <DefautText>{message}</DefautText>
        </View>
    )
}

export default NothingFound
