const router = require("express").Router();
const { BlogPost, User } = require("../models");
const withAuth = require("../utils/auth");

//Get all posts
router.get("/", async (req, res) => {
    try {
        //Get all posts and join with user data
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });

        //Serialize data for templates
        const blogPosts = blogPostData.map((blogPost) = blogPost.get({ plain: true }));

        //Pass serialized data
        res.render("homepage", {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//withAuth middleware to prevent access to dashboard if user is not logged in
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ model: BlogPost }],
        });

        const user = userData.get({ plain: true });

        res.render("dashboard", {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//If user is logged in redirect to dashboard
router.get("/login", (req, res) => {
    if (req.session.logged_in){
        res.redirect("/dashboard");
        return;
    }

    res.render("login");
});

  
