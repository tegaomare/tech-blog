const router = require("express").Router();
const { User } = require("../../models");

// Sign Up
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Create a new user in the database
    await User.create({ username, password });
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Sign In
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
      req.session.userId = user.id;
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Log Out
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
module.exports = router;
