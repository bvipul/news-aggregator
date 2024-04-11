const express = require("express");
const news = express.Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c611a0b67abe47ea9aee0b3b14db2f75');
const UserService = require("../services/user");
const isLoggedIn = require("../middlewares/isLoggedIn");

news.get("", isLoggedIn, async (req, res) => {
  const user = UserService.getUserByEmail("vipul@google.com");
  const newsPreferences = user.newsPreferences;

  const news = await newsapi.v2.everything({
    q: newsPreferences.join(" OR "),
    language: "en",
    sortBy: "popularity",
    page: 1,
  });

  return res.status(200).json(news);
});

module.exports = news;