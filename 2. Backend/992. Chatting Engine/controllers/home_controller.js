// const Post = require('../models/post');
// const User = require('../models/user');
// module.exports.home = function (req, res) {
//     //console.log( "user", req.user);
//     // res.cookie('user_id', 25);

//     // Post.find({}, function (err, posts) {

//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         posts: posts
//     //     });
//     // });

//      // populate the user of each post
//      Post.find({})
//      .populate('user')
//      .populate({
//          path: 'comments',
//          populate: {
//              path: 'user'
//          }
//      })
//      .exec(function(err, posts){

//         User.find({}, function(err, users){
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users:users
//             });
//         })

//      })

//  }


// |
// |
// using async await
// |
// V
// V


const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function (req, res) {

    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'  //this is for the comment
                }
            }).populate('likes');

        let users = await User.find({});
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log('Error', err);
        return
    }


}
