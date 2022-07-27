const express = require('express');
const router = express.Router();
//const sequelize = require("../utils/database");
const User = require("../models/user");
const Post = require("../models/post");





//console.log(Post)
User.hasMany(Post)


router.post("/", async(req,res) =>{
    const { name, email, role} = req.body
    try{
        const user = await User.create({name, email, role});
        return res.json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get("/", async(req,res) =>{
    try{
        const users = await User.findAll({include:'posts'});
        return res.json(users);
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
  });

  //Find user
router.get("/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const user = await User.findOne({
            where: {id},
            include:'posts'
        });
        return res.json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});


router.put("/:id", async(req,res) =>{
    const id = req.params.id;
    const { name, email, role} = req.body;
    try{
        const user = await User.findOne({
            where: {id}
        });
        user.name = name;
        user.email = email;
        user.role = role;

        await user.save();
        return res.json(user);

    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});


router.delete("/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const user = await User.findOne({
            where: {id}
        });
        await user.destroy();
        return res.json({message: "User Deleted"});
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
});


  module.exports=router