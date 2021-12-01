import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Modal,
    Pressable
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userActions from '../../actions/userActions';
import cartActions from '../../actions/cartActions';

import FastImage from 'react-native-fast-image';
import CheckBox from '@react-native-community/checkbox';
import { DefautText, OriginPrice, SellPrice, Title, HeaderText } from '../Text/AppTexts';
import NomalButton from '../Button/NomalButton';
import { RED } from '../../constants/colors';


const CartItem = (props) => {
    const { item, cart, cActions, user: { user } } = props;
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [product, setProduct] = useState();

    useEffect(() => {
        let temp = cart?.filter(e => e.productID === item._id)[0];
        setProduct(temp)
    }, [cart])

    const increaseAmount = () => {
        cActions.addToCart({
            productID: product?.productID,
            uid: user._id
        })
        //console.log('press + ')
    }

    const descreaseAmount = () => {
        if(product?.amount > 1){
            cActions.descreaseAmount({
                productID: product?.productID,
                uid: user._id
            })
        }
        else{
            setVisibleModal(true)
        }
    }

    const onDelete = () => {
        cActions.removeFromCart({
            productID: product?.productID,
            uid: user._id
        })
        setVisibleModal(false);
    }
    const changeChosen = () => {
        cActions.changeChosen({
            productID: product?.productID,
            uid: user._id
        })
    }
    //console.log('temp ',product?.amount)
    return (
        <>
        <View style={styles.container}>
            <CheckBox
                value={product?.chosen}
                onValueChange={changeChosen}
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
                    <Title style={styles.btn} onPress={descreaseAmount}>-</Title>
                    <TextInput
                        value={`${product?.amount}`}
                        style={styles.textInput}
                    />
                    <Title style={styles.btn} onPress={increaseAmount} >+</Title>
                </View>
            </View>
        </View>
        <Modal
                visible={visibleModal}
                dimissModal={() => setVisibleModal(false)}
                transparent={true}
                animationType='slide'
            >
                <Pressable style={{flex: 1}} onPress={()=> setVisibleModal(false)} />
                <View style={styles.modalContent}>
                    <HeaderText>Xóa sản phẩm khỏi giỏ hàng</HeaderText>
                    <DefautText style={{margin: 10}}>Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?</DefautText>
                    <NomalButton onPress={onDelete} style={{width: '100%'}} color= {RED}>Xóa</NomalButton>
                </View>
                
            </Modal>
        </>
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
    },
    modalContent: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        cart: state.cartReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch),
        cActions : bindActionCreators(cartActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
