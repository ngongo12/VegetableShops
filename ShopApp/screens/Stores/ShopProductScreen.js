import React from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    Pressable
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import userActions from '../../actions/userActions';
import { MainColor } from '../../constants/colors';

const ShopProductScreen = (props) => {
    const { navigation: { navigate } } = props;
    //console.log(navigate)
    return (
        <View style={styles.container}>
            <Pressable style={styles.btnAdd} onPress={()=>navigate('ShopAddProductScreen')}>
                <Icon name='add-business' size={32} color='#fff' />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnAdd: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MainColor,
        borderRadius: 100,
        position: 'absolute',
        bottom: 16,
        right: 16
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopProductScreen)
