exports.reqLogin = (req,res,next)=>{
    if(req.session.userLogin){
        next();
    }else{
        return res.redirect('/auth/login');
    }
}

exports.noReqLogin = (req,res,next)=>{
    if(!req.session.userLogin){
        next();
    }else{
        return res.redirect('/');

    }

}