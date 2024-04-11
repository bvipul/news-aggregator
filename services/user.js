const {
  hash
} = require("../helpers/hash");

module.exports = {
  users: [{
    id: 1,
    name: "Vipul Basapati",
    email: "vipul@google.com",
    password: "$2b$10$ADCeQkscoVoTt.7masUNce.DktcTHQVQmHo9St2tdg5fx/WqwWWdS",
    newsPreferences: ["elon musk", "technology", "biology"],
  }],

  getNewId() {
    const ids = [...this.users].map(user => user.id);
    return (Math.max(ids) || 0) + 1;
  },

  async create({
    name,
    email,
    password,
    newsPreferences,
  }) {
    // check if email already exists in DB
    const existingUser = this.users.find(user => user.email === email);

    if (existingUser) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    // hash the password
    const hashedPassword = hash(password);

    const userObj = {
      id: this.getNewId(),
      name,
      email,
      password: hashedPassword,
      newsPreferences
    };

    // create a user
    this.users.push(userObj);

    return userObj;
  },

  getUserByEmail(email) {
    return this.users.find(user => user.email === email);
  },

  getUserPreferences(id) {
    return this.users.find(user => user.id === id).newsPreferences;
  },

  updateUserPreferences(id, preferences) {
    const user = this.users.find(user => user.id === id);

    user.newsPreferences = preferences;

    return user;
  }
};
