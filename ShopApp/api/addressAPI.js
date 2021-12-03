export const getAllProvinces = () => {
    let lastChar = '';
    return fetch('https://provinces.open-api.vn/api/p/')
    .then(res => res.json())
    .then(res => res.sort((a, b) => {
        let tempA = a.codename.replace('tinh_', '').replace('thanh_pho_', '');
        let tempB = b.codename.replace('tinh_', '').replace('thanh_pho_', '');
        if(tempA[0] > tempB[0]){
            return 1;
        }
        return -1;
    }))
    .then(res => res.map(e => {
        const shortname = e.name.replace('Tỉnh ', '').replace('Thành phố ', '');
        let first='';
        if(lastChar !== shortname[0]){
            first = shortname[0];
            lastChar = shortname[0];
        }
        return {
            ...e,
            shortname,
            first
        }
    }))
    .catch(e => {
        console.log('>>>>>> Lỗi lấy provinces ', e);
        return [];
    })
}

export const getAllDistricts = code => {
    let lastChar = '';
    return fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
    .then(res => res.json())
    .then(res => res.districts)
    .then(res => res.sort((a, b)=>{
        if(a.codename[0] > b.codename[0]){
            return 1;
        }
        return -1;
    }))
    .then(res => res.map(e => {
        let first='';
        if(lastChar !== e.name[0]){
            first = e.name[0];
            lastChar = first;
        }
        return{
            ...e,
            first
        }
    }))
    .catch(e => {
        console.log(e);
        return [];
    })
}

export const getAllWards = code => {
    let lastChar = '';
    return fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
    .then(res => res.json())
    .then(res => res.wards)
    .then(res => res.sort((a, b)=>{
        if(a.codename[0] > b.codename[0]){
            return 1;
        }
        return -1;
    }))
    .then(res => res.map(e => {
        let first='';
        if(lastChar !== e.name[0]){
            first = e.name[0];
            lastChar = first;
        }
        return{
            ...e,
            first
        }
    }))
    .catch(e => {
        console.log(e);
        return [];
    })
}

export default {
    getAllProvinces,
    getAllDistricts,
    getAllWards
}