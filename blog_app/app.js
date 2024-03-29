//Packages instantiation

var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	expressSanitizer = require("express-sanitizer"),
	methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/blog_app", {useUnifiedTopology: true,useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSanitizer());

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(methodOverride("_method"));

//Mongoose model config

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created:{type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

//Routes
app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs: blogs});
		}
	});
});

app.get("/blogs/new", function(req, res){
	res.render("new");
});

app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show", {blog:foundBlog});
		}
	});
});



app.post("/blogs", function(req, res){
	
	req.body.blog.body = req.sanitize(req.body.blog.body)
	
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		}
		else{
			res.redirect("/blogs");
		}
	});
});


app.get("/blogs/:id/edit", function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body)

	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("edit",{blog: foundBlog});
		}
	});
})


app.put("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog , function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs")
		}
	});
});
	







//Running the Server through port and IP

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("The Blog Server is running");
});