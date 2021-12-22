import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Dimensions,
    Modal,
    ToastAndroid
} from 'react-native';
import { HeaderText, DefautText } from './Text/AppTexts';
import { RED } from '../constants/colors';
import NomalButton from './Button/NomalButton';

const AlerModal = props => {
    const {
        title,
        question,
        visibleModal,
        setVisibleModal,
        onConfirm,
        confirmText
    } = props;
    return (
        <Modal
            visible={visibleModal}
            dimissModal={() => setVisibleModal(false)}
            transparent={true}
            animationType='slide'
        >
            <Pressable style={{ flex: 1 }} onPress={() => setVisibleModal(false)} />
            <View style={styles.modalContent}>
                <HeaderText>{title}</HeaderText>
                <DefautText style={{ margin: 10 }}>{question}</DefautText>
                <NomalButton onPress={onConfirm} style={{ width: '100%' }} color={RED}>{confirmText}</NomalButton>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        textAlign: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver'
    },
    modalContent: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: 'silver',
        borderWidth: 1,
        borderBottomWidth: 0
    }
})

export default AlerModal;