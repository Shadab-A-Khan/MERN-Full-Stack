
const User = require("../models/user");


module.exports.usersProfile = function(req, res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/users/sign_in');

            }
        });
    }else{
        return res.redirect('/users/sign_in');

    }
    
}

//usersProfile
// module.exports.usersProfile=function(req,res){
//     return res.render("user_profile",{
//         title:"profile"
//     });
// }


//render sign-in page
module.exports.userSignIn=function(req,res){
    return res.render('user_sign_in',{
        title:"codeial/sign in"
    });
}

//render sign-up page
module.exports.userSignUp=function(req,res){
    return res.render('user_sign_up',{
        title:"codeial/sign up"
    });
}

//get the sign-up data
module.exports.create=function(req, res){
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){ 
        if(err){console.log('error in finding user in signing up'); return}
    
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up',err); return}

                return res.redirect('/users/sign_in');
            })
        } else{
                return res.redirect('back');    
              }
    });
}

//sign in - render createSession
 module.exports.createSession=function(req,res){
    // step to authenticate
    //find the user
    User.findOne({email: req.body.email}, function(err,user){
        if(err){ console.log('error in finding the user in singinig in'); return}
    

        //handle user found
        if(user){
            console.log('callig',user);
            //handle password which does'nt match
            if (user.password !=req.body.password){
                return res.redirect('back');
            }

            //handle session creation 
            res.cookie('user_id',user._id);
           return res.redirect('/users/usersProfile');
        }else{

            //handle user not found
            return res.redirect('back');
        }
    });
 }