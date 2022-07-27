const express = require("express");
const sequelize = require("./utils/database");
const user=require('./routes/user')
const post=require('./routes/post')


const User = require("./models/user");
const Post = require("./models/post");
//User.hasMany(Post)

Post.User=Post.belongsTo(User);
console.log(Post.User)


const app = express(); // create a new express app
app.use(express.json());
app.use('/api/users',user )
app.use('/api/posts',post )


// return Post.create({
//   content :'jdad',
//   user: {
//     name: 'Mick',
//     email: 'Broadstone',
//     role: "abc"
//   }
// }, {
//   include: [{
//     association: Post.User,
   
//   }]
// });


sequelize
  .sync()
//.sync({force: true})
  .catch((err) => {
    console.log(err);
  });

  
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


