import React from "react";
import { 
    Text,
    StyleSheet
} from "react-native";

export const DefautText = ( props ) => {
    const { children, style } = props
    return (
        <Text style={[styles.font, styles.defaultText, style]}>
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
    const { children, style } = props
    return (
        <Text style={[styles.font, styles.title, style]}>
            { children }
        </Text>
    )
}

export const HeaderText = ( props ) => {
    const { children, style } = props
    return (
        <Text style={[styles.font, styles.header, style]}>
            { children }
        </Text>
    )
}

export const ProductName = ( props ) => {
    const { children, style } = props
    return (
        <Text style={[styles.font, styles.productName, style]}>
            { children }
        </Text>
    )
}

export const SellPrice = ( props ) => {
    const { children, style } = props
    return (
        <Text style={[styles.font, styles.price, style]}>
            { children }
        </Text>
    )
}

export const OriginPrice = ( props ) => {
    const { children, style } = props
    return (
        <Text style={[styles.font, styles.originPrice, style]}>
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
        fontWeight: 'bold'
    },

    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E25845'
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
        color: '#529D9C'
    }
})