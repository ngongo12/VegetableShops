import React from "react";
import { 
    Text,
    StyleSheet
} from "react-native";
import { DARK_GREEN, MainColor, RED } from "../../constants/colors";

const fmNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
export const DefautText = ( props ) => {
    const { children, style, onPress } = props;
    return (
        <Text style={[styles.font, styles.defaultText, style]} onPress={onPress}>
            { children }
        </Text>
    )
}

export const LargeText = ( props ) => {
    const { children, style } = props
    return (
        <Text style={[styles.font, { fontSize: 17 }, style]}>
            { children }
        </Text>
    )
}

export const Title = ( props ) => {
    const { children, style, onPress } = props;
    return (
        <Text style={[styles.font, styles.title, style]} onPress={onPress} >
            { children }
        </Text>
    )
}

export const HeaderText = ( props ) => {
    const { children, style } = props;
    return (
        <Text style={[styles.font, styles.header, style]}>
            { children }
        </Text>
    )
}

export const ProductName = ( props ) => {
    const { children, style } = props;
    return (
        <Text style={[styles.font, styles.productName, style]}>
            { children }
        </Text>
    )
}

export const SellPrice = ( props ) => {
    const { children, style } = props;
    return (
        <Text style={[styles.font, styles.price, style]}>
            {!children }
            { children ? fmNumber(children) : 0 } đ
        </Text>
    )
}

export const OriginPrice = ( props ) => {
    const { children, style } = props;
    return (
        <Text style={[styles.font, styles.originPrice, style]}>
            { fmNumber(children) } đ
        </Text>
    )
}

export const DateFm = ( props ) => {
    const { children, style, onPress } = props;
    let date = new Date();
    date.setDate(date.getDate()+children);
    
    let sDate = `${date.getDate()}th${date.getMonth()+1}`;
    return (
        <Text onPress={onPress} style={[styles.font, style]}>
            {sDate}
        </Text>
    )
}

export const DateTimeFm = ( props ) => {
    const { children, style, onPress } = props;
    let date = new Date(children);

    let sDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return (
        <Text onPress={onPress} style={[styles.font, style]}>
            {sDate}
        </Text>
    )
}

export const PressableText = ( props ) => {
    const { children, style, onPress } = props;
    return (
        <Text onPress={onPress} style={[styles.font, styles.pressableText, style]}>
            { children }
        </Text>
    )
}

export const SalePercent = ( props ) => {
    const { children, style, onPress } = props;
    return (
        <Text onPress={onPress} style={[styles.font, styles.salePercent, style]}>
            { children }
        </Text>
    )
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'calibri',
    },
    defaultText: {
        
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111'
    },

    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: RED
    },

    productName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    originPrice:{
        fontSize: 13,
        fontWeight: '500',
        color: 'grey',
        textDecorationLine: 'line-through'
    },
    header:{
        fontSize: 22,
        textAlign: 'center',
        color: DARK_GREEN
    },
    pressableText: {
        color: MainColor,
        fontSize: 15
    },
    salePercent: {
        color: RED,
        fontWeight: 'bold',
        fontSize: 11
    }
})