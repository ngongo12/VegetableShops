import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import userActions from '../../actions/userActions';
import apiURL from '../../constants/api_url';
import Item from './Item';
import NothingFound from '../../components/NothingFound';
import { DefautText, PressableText } from '../../components/Text/AppTexts';

const NotificationScreen = (props) => {
    const { user: { user } } = props;
    const [notifi, setNotifi] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (user?._id && isFocused) {
            fetchtNotification();
        }
    }, [isFocused])

    const fetchtNotification = () => {
        fetch(`${apiURL}notification/notSeenNotify?uid=${user._id}`)
            .then(res => res.json())
            .then(res => setNotifi(res))
            .catch(e => console.error(e));
    }
    const seenAll = () => {
        fetch(`${apiURL}notification/seenAll?uid=${user._id}`)
            .then(res => setNotifi([]))
            .catch(e => console.error(e));
    }
    return (
        <View style={styles.container}>
            {notifi?.length > 0 ? (
                <>
                    <FlatList
                        data={notifi}
                        onRefresh={fetchtNotification}
                        refreshing={refreshing}
                        renderItem={({ item, index }) => <Item item={item} index={index} />}
                        ListHeaderComponent={()=> <PressableText onPress={seenAll} style={styles.text}>Đánh dấu đã đọc</PressableText>}
                    />
                </>
            ) : <NothingFound message='Không có thông báo mới nào' />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 50,
        height: 50
    },
    text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff'
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
