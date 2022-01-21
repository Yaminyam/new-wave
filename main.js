var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var gpsRouter = require("./routes/gps");
var chatRouter = require("./routes/chat");

const sequelize = require("./database");
const session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var app = express();

sequelize.sync({}).then(() => console.log("db is ready"));

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", indexRouter);
app.use("/gps", gpsRouter);
app.use("/chat", chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500)
});

module.exports = app;
