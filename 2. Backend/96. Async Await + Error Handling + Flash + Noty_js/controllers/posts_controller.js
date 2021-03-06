const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'post published');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    let post = await Post.findById(req.params.id);
    try {
        if (post.user == req.user.id) {
            post.remove();
            //if post is deleted then the comment realted to that post also need to be deleted 
            // so require the comments Schema as well
            await Comment.deleteMany({ post: req.params.id }, function (err) {
                req.flash('success', 'post Destroyed');
                return res.redirect('back');
            });
        } else {
            req.flash('error', 'You are not allowed to delete this post');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }

}