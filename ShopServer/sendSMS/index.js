const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendSMS = async (_phone, token) => {
    let phone = _phone.slice(1);
    phone = '+84' + phone;
    console.log(_phone);
    // return await client.messages
    //     .create({
    //         body: `Mã token của bạn là ${token}`,
    //         from: '+12565791156',
    //         to: phone
    //     })
    //     .then(message => e)
    //     .catch(e => e);
    return { phone, token}
}