const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

//Post new entry
router.post("/", withAuth, async (req, res) => {
    try {
        const newEntry = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newEntry);
    } catch (err) {
        res.status(400).json(err);
    }
});

