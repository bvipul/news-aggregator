const express = require('express');
const app = express();
const port = 3000;
const userRouter = require("./routes/user");
const newsRouter = require("./routes/news");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/news", newsRouter);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;