var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
require("./configs/db_config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users_router");
var rolesRouter = require("./routes/roles_router");
var categoriesRouter = require("./routes/categories_router");
var attributeRouter = require('./routes/attribute_router');
var saleRouter = require('./routes/sale_router');
var addressRouter = require('./routes/address_router')
var storeRouter = require('./routes/stores_router')

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/categories", categoriesRouter);
app.use("/attribute",attributeRouter);
app.use("/sale",saleRouter);
app.use('/address', addressRouter)
app.use('/stores', storeRouter)

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
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
