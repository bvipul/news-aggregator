const users = require("express").Router();
const UserService = require("../services/user");
const validateRequestSchema = require("../middlewares/validateRequestSchema");
const isLoggedIn = require("../middlewares/isLoggedIn");
const {
  registerValidator,
  loginValidator,
} = require("../validators/users");
const {
  compareHash,
} = require("../helpers/hash");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecret";

/*
  User: {
    id: number,
    name: string,
    email: string,
    newsPreferences: string[],
    createdAt: dateTime,
    updatedAt: dateTime,
  }
*/

users.post("/register", registerValidator, validateRequestSchema, async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      newsPreferences = [],
    } = req.body;

    const user = await UserService.create({
      name,
      email,
      password,
      newsPreferences
    });

    return res.status(201).send({
      status: true,
      user,
    });
  } catch (e) {
    if (e.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(400).send({
        message: "User with same email already exists",
      });
    }

    res.status(500).send(e.message);
  }
});

users.post("/login", loginValidator, validateRequestSchema, async (req, res) => {
  const {
    email,
    password
  } = req.body;

  const existingUser = await UserService.getUserByEmail(email);

  if (!existingUser) {
    return res.status(404).json({
      message: "user not found"
    });
  }

  console.log({
    existingUser
  })

  if (!compareHash(existingUser.password, password)) {
    return res.status(401).json({
      message: "Either email or password is wrong. Try again"
    });
  }

  const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, { expiresIn: "2d" });

  return res.status(200).json({
    message: "login succesfull",
    token,
  });
});

users.get("/preferences", isLoggedIn, async (req, res) => {
  const userId = req.user.id;

  const preferences = UserService.getUserPreferences(userId);

  return res.status(200).json({
    preferences
  });
});

users.put("/preferences", isLoggedIn, async (req, res) => {
  const { preferences = [] } = req.body;

  UserService.updateUserPreferences(req.user.id, preferences);

  return res.status(200).send({
    message: "preferences updated"
  });
});

module.exports = users;
