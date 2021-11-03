import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Image
} from 'react-native';

import {
    MainColor
} from '../constants/colors';
import { CartIcon, LogoutIcon } from './AppIcons';
import { Title } from './AppTexts';
import SearchBar from './SearchBar';

const ProfileHeader = ( props ) => {
    const { user } = props;
    //console.log(user)
    return (
        <View>
            <StatusBar backgroundColor={MainColor} translucent={false} />
            <View style={styles.constainer}>
                <View style={styles.content}>
                    <Image source={require('../assets/images/default_avatar.png')} style={styles.image} />
                    <Title style={styles.text}>{user.fullname ? user.fullname : user.phone}</Title>
                </View>
                <View style={styles.iconView}>
                    <CartIcon count={10} />
                    <LogoutIcon/>
                </View>
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    constainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        
        //backgroundColor: MainColor,
    },
    content: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: MainColor,
        borderBottomLeftRadius: 50
    },
    text: {
        color: '#fff',
        padding: 10
    },
    iconView:{
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        top: 0
    },
    image:{
        width: 90,
        height: 90,
        borderRadius: 100,
        backgroundColor: '#fff',
        margin: 10
    },
})

export default ProfileHeader