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
// Create Post
router.get("/post/create", (req, res) => {
  res.render("create_post");
});

router.post("/post/create", async (req, res) => {
  const { title, contents } = req.body;
  const userId = req.session.userId;
  try {
    // Create a new blog post in the database
    await BlogPost.create({ title, contents, userId });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update Post
router.get("/post/edit/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await BlogPost.findByPk(postId);
    res.render("edit_post", { post });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/post/edit/:id", async (req, res) => {
  const postId = req.params.id;
  const { title, contents } = req.body;
  try {
    // Update the blog post in the database
    await BlogPost.update({ title, contents }, { where: { id: postId } });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Post
router.get("/post/delete/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    // Delete the blog post from the database
    await BlogPost.destroy({ where: { id: postId } });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
