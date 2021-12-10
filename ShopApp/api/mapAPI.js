const TOKEN = 'AAPKdfa451911d71406281a40139b0544a7auNVbljVZ2kfxZbBbIaWolIhOJP3IO2zYDnh0ULTKIZ2KDjZgxspfBYuRld7ggso2';

export const searchAddress = async (addressName) => {
    const url = `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=${addressName}&f=json&token=${TOKEN}`;
    return await fetch(url)
        .then(res => res.json())
        .then(res => res.candidates)
        .catch(e => [])
}

export const getDisctanceB2P = (p1, p2) => {
    //http://www.movable-type.co.uk/scripts/latlong.html
    //latitude
    //longitude
    const R = 6371e3; // metres
    const phi1 = p1.latitude * Math.PI/180;
    const phi2 = p2.latitude * Math.PI/180;
    const deltaPhi = (p2.latitude - p1.latitude) * Math.PI/180;
    const deltaLamda = (p2.longitude - p1.longitude) * Math.PI/180;

    const a = Math.sin(deltaPhi/2)**2 + Math.cos(phi1) * Math.cos(phi2) * (Math.sin(deltaLamda/2)**2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.round(d / 1000, 1);
}

export default {
    searchAddress,
    getDisctanceB2P
}