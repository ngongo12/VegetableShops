const userService = require('../services/users');
const bcrypt = require('bcrypt');

exports.register = async (user) => {
    if (await userService.checkPhoneExist(user.phone) == 0) {
        //Tiến hành đăng ký tài khoản
        //salt = Math.random().toString(36).substring(2,12);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        const newUser = await userService.register({ ...user, password: hash, salt });
        if (newUser) {
            return {
                result: true,
                user: newUser
            }
        }
        else {
            return {
                result: false,
                message: 'Đăng ký thất bại'
            }
        }
    }
    else {
        return {
            result: false,
            message: 'Số điện thoại này đã được đăng ký rồi'
        }
    }
}

exports.login = async (user) => {
    const userRep = await userService.getUserByPhone(user.phone);
    if(!userRep){
        return {
            result: false,
            message: 'Tài khoản chưa được đăng ký'
        }
    }else{
        //Kiểm tra mật khẩu nhập vào với mk đã hash
        const checkPassword = await bcrypt.compareSync(user.password ,userRep.password);
        if(checkPassword){
            //Đúng
            return {
                result: true,
                user: {...userRep._doc, password: null, salt: null}
            }
        }
        else{
            return {
                result: false,
                message: 'Sai mật khẩu'
            }
        }
    }
}