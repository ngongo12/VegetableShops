import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFile = async (filePath, folder, fileName) => {
    const arr = filePath.split('.');
    const fileExtention = arr[arr.length - 1];
    const storageRef = ref(storage, `${folder}/${fileName}.${fileExtention}`);
    
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", filePath, true);
        xhr.send(null);
    });

    await uploadBytes(storageRef, blob).then((snapshot) => {
        return snapshot;
    }).catch(e => console.log(e));
    const url = await getDownloadURL(storageRef)
    .then((url) => url);
    return url;
}

export default uploadFile;