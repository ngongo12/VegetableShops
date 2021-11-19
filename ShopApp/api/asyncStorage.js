import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    // console.log('key: ', key);
    // console.log('value: ', value);
    try {
        if (typeof (value) === 'object') {
            let temp = JSON.stringify(value);
            await AsyncStorage.setItem(key, temp);
        }
        else {
            await AsyncStorage.setItem(key, value);
        }
    }
    catch (e) {
        console.log(e);
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (e) {
        console.log(e);
    }
}

export const clearAllData = () => {
    AsyncStorage.clear();
}

export default {
    storeData,
    getData
}