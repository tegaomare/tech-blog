const router = require("express").Router();

app.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.findAll();
    res.render("homepage", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await BlogPost.findByPk(postId);
    const comments = await Comment.findAll({ where: { postId } });
    res.render("post_detail", { post, comments });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    const userId = req.session.userId;
    const posts = await BlogPost.findAll({ where: { userId } });
    res.render("dashboard", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
