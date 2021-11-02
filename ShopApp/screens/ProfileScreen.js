import React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../actions/userActions';
import ProfileHeader from '../components/ProfileHeader'

const ProfileScreen = (props) => {
    const {user:{ user }} = props;
    return (
        <View style={styles.container}>
            <ProfileHeader {...{user}} />
            
        </View>
    )
}

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

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
