const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./db");
const userController = require("./Controller/userController");
const articleController = require("./Controller/articleController");
const authenticate = require("./Middleware/middleware");
const quizRoutes = require("./routes/quizRoutes");
const playRoutes = require("./routes/playRoutes");

// Add middleware to parse JSON bodies
app.use(bodyparser.json());

// Use cors middleware
app.use(cors());

app.get("/", function (req, res) {
    res.send("Hello Yeeshu!");
});

app.post("/signup", async (req, res) => {
    let result = await userController.signup(req);
    return res.status(200).json({ message: result });
});

app.post("/login", async (req, res) => {
    let result = await userController.login(req);
    return res.status(200).json({ token: result });
});

app.post("/article", authenticate, async (req, res) => {
    try {
        // req.body.user = req.user.username;
        let result = await articleController.createarticle(req);
        res.status(200).json({ message: result });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error creating article", error: error.message });
    }
});

app.get("/articles", async (req, res) => {
    try {
        let articles = await articleController.listArticles();
        res.status(200).json({ articles: articles });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching articles", error: error.message });
    }
});

app.put("/article/:id", authenticate, async (req, res) => {
    try {
        let result = await articleController.updateArticle(req);
        res
            .status(200)
            .json({ message: "Article updated successfully", article: result });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Article update failed", error: error.message });
    }
});

app.delete("/article/:id", authenticate, async (req, res) => {
    try {
        let result = await articleController.deleteArticle(req);
        res
            .status(200)
            .json({ message: "Article deleted successfully", article: result });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Article deletion failed", error: error.message });
    }
});

app.use(express.json());
app.use("/quiz", quizRoutes);
app.use("/api", playRoutes);

app.listen(3000);
console.log("Server is running on port 3000");
