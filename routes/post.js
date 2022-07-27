const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
Post.User = Post.belongsTo(User);


router.post("/", async (req, res) => {
    console.log(req.body)
    if (req.body.hasOwnProperty('user')) {
        const { content, user } = req.body
        try {
            const post = await Post.create({
                content,
                user: {
                    name: user['name'],
                    email: user['email'],
                    role: user['role']
                }
            },
                {
                    include: [{ association: Post.User }]
                }
            );
            return res.json(post);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }

    }
    else {
        const { content, userId } = req.body
        try {
            const user = await User.findOne({
                where: { id: userId }
            });
            const post = await Post.create({ content, userId: user.id });
            return res.json(post);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
});


// router.post("/", async(req,res) =>{
//     console.log(req.body)
//     const { content, userId} = req.body
//     try{
//         const user = await User.findOne({
//             where: {id: userId}
//         });
//         const post = await Post.create({content, userId: user.id });
//         return res.json(post);
//     }catch(err){
//         console.log(err);
//         return res.status(500).json(err);
//     }
// });

// Get posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll();
        return res.json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//Getting all post of specific users

router.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Post.findAll({
            where: { userId: id },
        });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "An error occured" });
    }
});


//getting all posts

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Post.findOne({
            where: { id: id },
        });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "An error occured" });
    }
});



module.exports = router