import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DARK_GREEN, LIGHT_GREEN } from '../../constants/colors';

const TextInputLayout = (props) => {
    const { secureTextEntry, name } = props;
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [onFocused, setOnFocused] = useState(false)
    return (
        <View style={[styles.container, onFocused && { borderWidth: 1 }]}>
            <AntDesign name={name} size={22} color={DARK_GREEN} />
            <TextInput
                onFocus={() => setOnFocused(true)}
                onBlur={() => setOnFocused(false)}
                {...props} style={styles.input}
                secureTextEntry={secureTextEntry && !isShowPassword} />

            {secureTextEntry && (
                <Pressable onPress={() => setIsShowPassword(!isShowPassword)} style={styles.pressable}>
                    <Icon {...{ name: isShowPassword ? 'ios-eye-outline' : 'ios-eye-off-outline' }} size={22} color={DARK_GREEN} />
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 22,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#EDFFEE',
        borderRadius: 30,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: DARK_GREEN,
        borderWidth: 0.5
    },
    input: {
        flex: 1,
        marginLeft: 8
    },
    pressable: {
        padding: 10
    }
})

export default TextInputLayout