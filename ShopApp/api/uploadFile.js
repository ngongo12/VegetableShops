import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

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
    //console.log(filePaths)
    const arrName = filePaths.map( e => {
        let temp = e.split('/');
        return temp[temp.length - 1].split('.')[0];
    })

    // const urls = filePaths.map( async (e) => {
    //     return await uploadFile(e, folder);
    // })
    let urls = [];
    for(const filePath of filePaths){
        const url = await uploadFile(filePath, folder);
        urls.push(url);
    }

    return urls;
}

export const deleteMultiFile = async (urls) => {
    let deleteFails = [];
    for(const url of urls){
        const result = await deleteFile(url);
        //Xóa thành công thì result = false thất bại trả về url
        if(result){
            deleteFails.push(result);
        }
    }

    return deleteFails;
}

export const deleteFile = async ( url ) => {
    const fileRef = ref(storage, url);
    let success = true;
    deleteObject(fileRef)
        .then(res => res)
        .catch(e => {
            success = false;
        })
    return success ? false : url; //không thành công trả lại url
}

export default {
    uploadFile,
    uploadMultiFile,
    deleteFile
}