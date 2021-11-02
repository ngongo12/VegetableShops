import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Pressable,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DARK_GREEN } from '../constants/colors';

const TextInputLayout = ( props ) => {
    const {secureTextEntry, name} = props;
    const [isShowPassword, setIsShowPassword] = useState(false)
    return (
        <View style={styles.container}>
            <AntDesign name={ name } size={22} color={DARK_GREEN} />
            <TextInput {...props} style={styles.input} secureTextEntry={secureTextEntry && !isShowPassword} />
            
            {secureTextEntry && (
                <Pressable onPress={()=> setIsShowPassword(!isShowPassword)} style={styles.pressable}>
                    <Icon {...{name: isShowPassword ? 'ios-eye-outline' : 'ios-eye-off-outline'}} size={22} color={DARK_GREEN}/>
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
        alignItems: 'center'
    },
    input:{
        flex: 1,
        marginLeft: 8
    },
    pressable:{
        padding: 10
    }
})

export default TextInputLayout