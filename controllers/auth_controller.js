const UserModel = require('../models/users_model')

exports.loginAdmin = async (req, res)  => {
    let msg = "";
    if(req.method === "POST"){
        if(req.body.phone.length === 0){
            msg = "Số điện thoại không được bỏ trống"
            return     res.render('login',{msg:msg})

        }
        if(req.body.passwd.length === 0){
            msg = "Mật khẩu không được bỏ trống"
           return res.render('login',{msg:msg})

        }
        try {
            let objU = await UserModel.findOne({phone:req.body.phone})
            if(objU !== null){
                if(objU.passwd !== req.body.passwd){
                    msg="Mật khẩu không đúng"
                }
                else{
                    req.session.userLogin = objU; 
                   return res.render('home', { title: 'Express' });
                }
            }else{
                msg="Tài khoản không tồn tại"
            }
        } catch (error) {
            msg = `Lỗi: ${error}`
        }
    }
    res.render('login',{msg:msg})
}

exports.logoutAdmin = (req,res)=>{
    if (req.session != null) {
        req.session.destroy(function () {
            console.log("Đăng xuất thành công")
            res.redirect('/auth/login');
        })
    }
}