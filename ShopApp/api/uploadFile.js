import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFile = async (filePath, folder, fileName) => {
    const arr = filePath.split('/');
    const fileNameDetail = arr[arr.length - 1].split('.'); //tenfile.extention
    
    const storageRef = ref(storage, `${folder}/${fileName ? fileName : fileNameDetail[0]}.${fileNameDetail[1]}`);
    
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

export const uploadMultiFile = async (filePaths, folder) =>{
    console.log(filePaths)
    const arrName = filePaths.map( e => {
        let temp = e.split('/');
        return temp[temp.length - 1].split('.')[0];
    })

    const urls = filePaths.map( async (e) => {
        return await uploadFile(e, folder);
    })
    console.log(arrName);
    return urls;
}

export default {
    uploadFile,
    uploadMultiFile
}