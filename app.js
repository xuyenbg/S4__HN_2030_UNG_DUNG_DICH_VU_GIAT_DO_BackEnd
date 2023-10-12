var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
require("./configs/db_config");

// Web Server
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users_router");
var rolesRouter = require("./routes/roles_router");
var categoriesRouter = require("./routes/categories_router");
var attributeRouter = require('./routes/attribute_router');
var saleRouter = require('./routes/sale_router');
var addressRouter = require('./routes/address_router')
var storeRouter = require('./routes/stores_router')
var servicesRouter = require('./routes/services_router')
var ratesRouter = require('./routes/rates_router');
var orderRouter = require('./routes/order_router');
var itemServiceRouter = require('./routes/itemService_router');
var notificationRouter = require('./routes/notification_router');

// API
var rolesApiRouter = require('./routes/api_routers/roles_api_router')


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


// Web Server
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/categories", categoriesRouter);
app.use("/attributes",attributeRouter);
app.use("/sales",saleRouter);
app.use('/address', addressRouter)
app.use('/stores', storeRouter)
app.use('/services', servicesRouter)
app.use('/rates',ratesRouter);
app.use('/order',orderRouter);
app.use('/itemservice',itemServiceRouter);
app.use('/notification',notificationRouter);

// API
app.use("/api/roles", rolesApiRouter)

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wash Now Api Docs",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"]
}

const spacs = swaggerjsdoc(options)
app.use('/api-docs', swaggerui.serve, swaggerui.setup(spacs))

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
