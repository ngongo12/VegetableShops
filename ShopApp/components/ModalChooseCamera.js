import React from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Modal,
    Text,
} from 'react-native';
import ButtonSetting from './ButtonSetting';

const ModalChooseCamera = (props) => {
    const { dimissModal, onItemPress } = props;
    return (
        <Modal
            {...props}
            style={styles.container}
            backButtonClose={true}
        >
            <Pressable onPress={dimissModal} style={styles.hidePress} />
            <View>
                <ButtonSetting onPress={ () => [onItemPress[0](), dimissModal()] } iconName='picture' name='Thư viện ảnh' style={styles.button} />
                <ButtonSetting onPress={ () => [onItemPress[1](), dimissModal()] } iconName='camerao' name='Máy ảnh' style={styles.button} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hidePress: {
        flex: 1
    },
    button: {
        borderWidth: 0.5,
        borderColor: 'silver'
    }
})

export default ModalChooseCamera;