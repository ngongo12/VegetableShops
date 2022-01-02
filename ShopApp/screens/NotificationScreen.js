import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    Pressable
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import userActions from '../actions/userActions';
import apiURL from '../constants/api_url';
import DefaultHeader from '../components/Header/DefaultHeader';
import FastImage from 'react-native-fast-image';
import { BodyText, DateTimeFm, DefautText } from '../components/Text/AppTexts';
import { MAIN_BACKGROUND } from '../constants/colors';
import { navigate } from '../config/rootNavigation';

const NotificationScreen = (props) => {
    const { user: { user } } = props;
    const [notifi, setNotifi] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (user?._id) {
            fetchtNotification();
        }
    }, [isFocused])

    const fetchtNotification = () => {
        fetch(`${apiURL}notification?uid=${user._id}`)
            .then(res => res.json())
            .then(res => setNotifi(res))
            .catch(e => console.error(e));
    }
    return (
        <View style={styles.container}>
            <DefaultHeader title='Thông báo' />
            {notifi && <FlatList
                data={notifi}
                onRefresh={fetchtNotification}
                refreshing={refreshing}
                renderItem={({ item, index }) => <Item item={item} index={index} />}
            />}
        </View>
    )
}

const Item = (props) => {
    const { item, index } = props;
    //console.log('>>>>>>>>item ', index)
    const onNavigate = () => {
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


export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
