export const formatVNDate = ( date ) => {
    let result = '';
    let tempDate = date;
    if(typeof(date)==='string'){
        date = new Date(date);
    }
    const temp = date.toLocaleDateString().split('/');
    result = `${temp[1]}/${temp[0]}/${date.getFullYear()}`;
    return result;
}

export default {
    formatVNDate
}