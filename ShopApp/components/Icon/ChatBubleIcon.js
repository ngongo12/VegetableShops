import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../../actions/userActions';
import messageActions from '../../actions/messageActions';
import { useIsFocused } from '@react-navigation/native';
import { navigate } from '../../config/rootNavigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    MainColor
} from '../../constants/colors';


const ChatBubleIcon = ( props ) => {
    const { messageReducer: { count } } = props;
    const isFocused = useIsFocused();
    // useEffect(() => {
    //     let temp = 0;
    //     if(cart){
    //         cart?.forEach(element => {
    //             temp += element?.amount;
    //         });
    //         setNumOfProducts(temp);
    //     }
    // }, [isFocused, pressCount, cart])
    return (
        <TouchableOpacity style={styles.icon} onPress={()=>navigate('ContactListScreen')}>
            <AntDesign name='message1' size={24} color={'white'} /> 
            {(count > 0) && <Text style={styles.badge}>{ count+'' }</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    constainer: {
        padding: 10
    },
    icon: {
        padding: 10,
        //backgroundColor: MainColor,
    },
    badge: {
        top: 5,
        right: 3,
        position: 'absolute',
        textAlign: 'center',
        textAlignVertical:'center',
        color: '#fff',
        fontSize: 10,
        width: 20,
        height: 20,
        borderWidth: 1.5,
        borderRadius: 20,
        borderColor: '#fff',
        backgroundColor: MainColor

    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        messageReducer: state.messageReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch),
        messageAction: bindActionCreators(messageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBubleIcon);