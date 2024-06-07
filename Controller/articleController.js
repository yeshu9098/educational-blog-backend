const Article = require("../Model/Article");

let datetime = new Date();

function createarticle(req) {
  return new Promise((resolve, reject) => {
    const { title, body, user, category } = req.body;

    const newArticle = new Article({ title, body, user, category, date: datetime });

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
        console.log(articles);
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
    const { title, body, user, date } = req.body;

    Article.findByIdAndUpdate(id, { title, body, user, date }, { new: true })
      .then((updatedArticle) => {
        if (!updatedArticle) {
          return reject("Article not found");
        }
        resolve(updatedArticle);
      })
      .catch((error) => {
        console.error("Error updating article:", error);
        reject(error);
      });
  });
}

function deleteArticle(articleId) {
  return new Promise((resolve, reject) => {
    Article.findByIdAndDelete(articleId)
      .then((deletedArticle) => {
        if (!deletedArticle) {
          return reject(new Error("Article not found"));
        }
        resolve(deletedArticle);
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
