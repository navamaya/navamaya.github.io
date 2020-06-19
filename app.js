// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt ornare massa eget egestas purus viverra. Pharetra vel turpis nunc eget lorem dolor. In eu mi bibendum neque egestas. Accumsan tortor posuere ac ut consequat semper. Convallis tellus id interdum velit. Metus vulputate eu scelerisque felis imperdiet proin fermentum. ";
const contactStartingContent = "Sit amet nisl purus in mollis. Eget magna fermentum iaculis eu non diam. In hac habitasse platea dictumst quisque sagittis purus sit amet. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Pellentesque elit eget gravida cum sociis natoque penatibus et. Ac feugiat sed lectus vestibulum mattis ullamcorper. Nibh sit amet commodo nulla.";
const aboutStartingContent = "My Name is Margarita Navarro, I am 24 years old and I am a self taught software developer. Or at least that is what I aim to be! I have learn HTML, CSS, Javascript, Node.js, mongodb, Bootstrap and other topics I'm currently in the process of learning. This is an example of projects I have worked on as well as others, this blog is made to document my journey into the technology career I am attempting to obtain. Thank you so much for your time in reading/ reviewing any part of my little project!";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const postsSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postsSchema);

// let posts = [];

app.get("/", function(req, res) {

  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      newEntry: posts,
    });
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.titleContent,
    content: req.body.contentTxt
  });

  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

// const newEntry = {
//   title: req.body.titleContent,
//   content: req.body.contentTxt
app.get("/posts/:postId", function(req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({
    _id: requestedPostId}, function(err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutStartingContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactStartingContent
  });
});


// })
// posts.push(newEntry);
// post.save()



//
// posts.forEach(function(post){
//   const storedTitle = _.lowerCase(post.title);
//
//   if(storedTitle === requestedTitle){
//   };
// })


app.listen(3000, function(req, res) {
  console.log("Server is running");
})
