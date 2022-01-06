const userService = require('../services/users');
const productController = require('../controllers/products');
const sendSMS = require('../sendSMS/index');
//import fetch from "../node_modules/node-fetch"
const bcrypt = require('bcrypt');

exports.editProfile = async (user) => {
    //console.log(user);
    const result = await userService.editProfile(user);
    if (result.matchedCount > 0) {
        return {
            result: true,
            user: await userService.getProfile(user._id),
            message: 'Cập nhật thành công'
        }
    }
    else {
        return {
            result: false,
            message: 'Cập nhật thất bại'
        }
    }
}

exports.register = async (user) => {
    if (await userService.checkPhoneExist(user.phone) == 0) {
        //Tiến hành đăng ký tài khoản
        //salt = Math.random().toString(36).substring(2,12);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        const newUser = await userService.register({ ...user, password: hash, salt, createdAt: new Date(), allowNotify: { notification: true } });

        if (newUser) {
            const { phone, fullname, _id } = newUser;
            return {
                result: true,
                user: {
                    phone, fullname, _id
                }
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
    if (!userRep) {
        return {
            result: false,
            message: 'Tài khoản chưa được đăng ký'
        }
    } else {
        //Kiểm tra mật khẩu nhập vào với mk đã hash
        const checkPassword = await bcrypt.compareSync(user.password, userRep.password);
        if (checkPassword) {
            //Đúng
            return {
                result: true,
                user: await userService.getProfile(userRep._id),
                message: 'Đăng nhập thành công'
            }
        }
        else {
            return {
                result: false,
                message: 'Sai mật khẩu'
            }
        }
    }
}

exports.changePassword = async (user) => {
    const userRep = await userService.getUserByPhone(user.phone);
    if (!userRep) {
        return {
            result: false,
            message: 'Không lấy được user'
        }
    } else {
        //Kiểm tra mật khẩu nhập vào với mk đã hash
        const checkPassword = await bcrypt.compareSync(user.password, userRep.password);
        if (checkPassword) {
            //Đúng
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.newPassword, salt);
            const newUser = {
                _id: userRep._id,
                password: hash,
                salt,
                lastUpdate: new Date()
            }
            return await this.editProfile(newUser);
        }
        else {
            return {
                result: false,
                message: 'Sai mật khẩu'
            }
        }
    }
}

exports.getShopName = async (id) => {
    return await userService.getShopName(id);
}

exports.getShopByID = async (id) => {
    return await userService.getShopByID(id);
}

exports.getUserByID = async (id) => {
    return await userService.getUserByID(id);
}

exports.getShopInfo = async (id) => {
    const shopInfo = await userService.getShopInfo(id);
    //const count = await productController.countProductsOfShop(id);
    const soldDetail = await productController.sumSold(id);
    return {
        shopInfo,
        soldDetail
    }
}

exports.requestToken = async (phone) => {
    if (phone) {
        const user = await userService.getUserByPhone(phone);
        if (user !== null) {
            let token = Math.random().toString().slice(2, 8);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(token, salt);

            await userService.saveToken(user._id, hash);

            return await sendSMS.sendSMS(phone, token);
        }
        else {
            return {
                success: false,
                message: 'Số điện thoại này chưa được đăng ký'
            }
        }
    }
    return {
        success: false,
        message: 'Số điện thoại bị sai'
    }
}