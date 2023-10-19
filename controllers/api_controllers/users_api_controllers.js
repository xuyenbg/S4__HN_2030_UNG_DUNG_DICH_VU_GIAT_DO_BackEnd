const UserModel = require('../../models/users_model')

exports.getListUser = async (req, res) => {
    try {
        const listUser = await UserModel.find().populate('idRole').populate('favoriteStores');

        res.json(listUser);
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.login = async (req, res) => {
    var user = {
        phone: req.body.phone,
        passwd: req.body.userId
    }

    const checkExistUser = await UserModel.findOne({phone: user.phone})
    if (checkExistUser != null) {
        if (user.passwd === checkExistUser.passwd) {
            res.status(200).json({
                message: "Đăng nhập thành công",
                user: checkExistUser
            })
        } else {
            res.status(401).send("Mật khẩu không đúng")
        }
    } else {
        res.status(401).send("Tài khoản không tồn tại")
    }
}

//validate username
const isValidUsername =(username) =>{
    const usernameRegex = /^[A-Z][A-Za-z0-9]{0,17}$/;
    if (username.match(usernameRegex)) {
        return true;
    }

    return false;
}

// validate phone
const isValidPhone= (phone)=>{
    const phoneRegex = /^0[0-9]{9}$/;

    if (phone.match(phoneRegex)) {
        return true;
    }

    return false;
}

// validate pass

const isValidPassword = (password)=>{
    const passwordRegex = /^[A-Z][A-Za-z0-9]{9,}$/;

    if (password.match(passwordRegex)) {
        return true;
    }

    return false;
}

exports.register = async (req,res)=>{
    var objUser =  new UserModel()
        objUser.phone= req.body.phone;
        objUser.passwd= req.body.passwd;
        objUser.fullname = req.body.fullname;
        objUser.username=req.body.username;
        objUser.idRole=req.body.idRole;
        objUser.favouriteStores= [];
        objUser.createAt = new Date();
        objUser.updateAt=new Date();
        objUser.avatar = req.body.avatar

    const checkExistUser = await UserModel.findOne({phone: objUser.phone})

    if(objUser.username === undefined){
        res.status(500).send("Thiếu thuộc tính username");
        return;
    }
    if(objUser.phone === undefined){
        res.status(500).send("Thiếu thuộc tính phone");
        return;
    }
    if(objUser.passwd === undefined){
        res.status(500).send("Thiếu thuộc tính passwd");
        return;
    }
    if(objUser.fullname === undefined){
        res.status(500).send("Thiếu thuộc tính fullname");
        return;
    }
    if(objUser.username.length === 0 ){
        res.status(401).send("Tên tài khoản không được bỏ trống");
        return;
    }


    if(objUser.phone.length === 0 ){
        res.status(401).send('Số điện thoại không được bỏ trống')
        return;
    }



    if(objUser.passwd.length === 0){
        res.status(401).send("Mật khẩu không được bỏ trống");
        return;
    }

    if(objUser.fullname.length === 0){
        res.status(401).send("Họ và tên không được bỏ trống");
        return;
    }
    try {
        await objUser.save();
        res.status(200).send("Đăng ký thành công");
    }catch (error){
        console.log(error.message)
        res.status(500).send(error);
    }
}