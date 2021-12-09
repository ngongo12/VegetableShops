const TOKEN = 'AAPKdfa451911d71406281a40139b0544a7auNVbljVZ2kfxZbBbIaWolIhOJP3IO2zYDnh0ULTKIZ2KDjZgxspfBYuRld7ggso2';

export const searchAddress = async (addressName) => {
    const url = `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=${addressName}&f=json&token=${TOKEN}`;
    return await fetch(url)
        .then(res => res.json())
        .then(res => res.candidates)
        .catch(e => [])
}

export default {
    searchAddress
}