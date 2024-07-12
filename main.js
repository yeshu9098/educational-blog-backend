const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const userController = require("./Controller/userController");
const articleController = require("./Controller/articleController");
const authenticate = require("./Middleware/middleware");
const quizRoutes = require("./routes/quizRoutes");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/quiz", quizRoutes);

// Signup
app.post('/signup', async (req, res) => {
  try {
    const result = await userController.signup(req);
    if (result === 'User already exists!!!') {
      return res.status(400).json({ message: result });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error during signup', error: error.message });
  }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const result = await userController.login(req);
        if (result === 'User does not exist!' || result === 'Incorrect password!') {
            return res.status(401).json({ message: result });
        }
        res.status(200).json({ token: result });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
});

// Articles
app.post("/article", authenticate, async (req, res) => {
  try {
    const result = await articleController.createarticle(req);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const articles = await articleController.listArticles();
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

app.put("/article/:id", authenticate, async (req, res) => {
  try {
    const result = await articleController.updateArticle(req);
    res.status(200).json({ message: 'Article updated successfully', article: result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error: error.message });
  }
});

app.delete("/article/:id", authenticate, async (req, res) => {
  try {
    const result = await articleController.deleteArticle(req);
    res.status(200).json({ message: 'Article deleted successfully', article: result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
});

// Fetch articles by category
app.get('/category/:category', async (req, res) => {
  try {
    const articles = await articleController.getArticlesByCategory(req);
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles by category', error: error.message });
  }
});

// Admin route
app.get('/admin', authenticate, userController.getAdminDetails);

// Logout route
app.post('/logout', authenticate, (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  // Add the token to the blacklist (optional)
  tokenBlacklist.push(token);
  res.json({ message: 'Logout successful' });
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
