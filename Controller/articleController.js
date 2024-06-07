const Article = require("../Model/Article");

let datetime = new Date();

function createarticle(req) {
  return new Promise((resolve, reject) => {
    const { title, body, category } = req.body;
    
    const username = req.user.username;

    const newArticle = new Article({ title, body, user: username, category, date: datetime });

    newArticle
      .save()
      .then(() => {
        resolve(newArticle);
      })
      .catch((error) => {
        console.error("Error saving article:", error);
        reject(error);
      });
  });
}

function listArticles() {
  return new Promise((resolve, reject) => {
    Article.find({})
      .then((articles) => {
        // console.log(articles);
        resolve(articles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        reject(error);
      });
  });
}

function updateArticle(req) {
  return new Promise((resolve, reject) => {
    const { id } = req.params;
    const { title, body, category } = req.body;
    const username = req.user.username; // Use authenticated user's username

    Article.findById(id)
      .then((article) => {
        if (!article) {
          return reject("Article not found");
        }

        // Check if the logged-in user is the creator of the article
        if (article.user !== username) {
          return reject("You do not have permission to update this article");
        }

        // Proceed to update the article
        article.title = title || article.title;
        article.body = body || article.body;
        article.category = category || article.category;
        article.date = new Date();

        return article.save();
      })
      .then((updatedArticle) => {
        resolve(updatedArticle);
      })
      .catch((error) => {
        console.error("Error updating article:", error);
        reject(error);
      });
  });
}

function deleteArticle(req) {
  return new Promise((resolve, reject) => {
    const { id } = req.params;

    if (!id) {
      return reject(new Error("Article ID is required."));
    }

    Article.findByIdAndDelete(id)
      .then((deletedArticle) => {
        if (!deletedArticle) {
          return reject(new Error("Article not found."));
        }
        resolve("Article successfully deleted.");
      })
      .catch((error) => {
        console.error("Error deleting article:", error);
        reject(error);
      });
  });
}

module.exports = {
  createarticle,
  listArticles,
  updateArticle,
  deleteArticle,
};
