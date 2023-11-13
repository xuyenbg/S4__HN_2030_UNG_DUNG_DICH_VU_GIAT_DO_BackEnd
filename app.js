var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const session = require('express-session');
require("./configs/db_config");

// Web Server
var indexRouter = require("./routes/index");
var authRouter = require('./routes/auth_router')
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
var itemServiceRouter = require('./routes/item_service_router');
var notificationRouter = require('./routes/notification_router');

// API
var rolesApiRouter = require('./routes/api_routers/roles_api_router')
var loginApiRouter = require('./routes/api_routers/login_api_router')
var userApiRouter = require('./routes/api_routers/users_api_router')
var categoriesApiRouter = require('./routes/api_routers/categories_api_router')
var addressApiRouter = require('./routes/api_routers/address_api_router')
var servicesApiRouter = require('./routes/api_routers/services_api_router')
var storeApiRouter = require('./routes/api_routers/stores_api_router')
var attributeApiRouter = require('./routes/api_routers/attribute_api_router');
var saleApiRouter = require('./routes/api_routers/sale_router');
var itemServiceApiRouter = require('./routes/api_routers/item_service_api_router');
var notificationApiRouter = require('./routes/api_routers/notification_api_router');
var orderApiRouter = require('./routes/api_routers/order_api_router');
var ratesApiRouter = require('./routes/api_routers/rates_api_router');
var postsApiRouter = require('./routes/api_routers/post_api_router')
var registerApiRouter = require('./routes/api_routers/register_api_router');
var imageApiRouter = require('./routes/api_routers/image_api_router')

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({
    secret:'nhom4444i3432j492j35nfdshfúydfy2h3nksjdfh9',
    resave:true,
    saveUninitialized:true
   }));



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// Web Server
app.use("/", indexRouter);
app.use('/auth', authRouter)
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/categories", categoriesRouter);
app.use("/attributes", attributeRouter);
app.use("/sales", saleRouter);
app.use('/address', addressRouter)
app.use('/stores', storeRouter)
app.use('/services', servicesRouter)
app.use('/rates', ratesRouter);
app.use('/order', orderRouter);
app.use('/itemservice', itemServiceRouter);
app.use('/notification', notificationRouter);

// API
app.use("/api/roles", rolesApiRouter)
app.use('/api/login', loginApiRouter)
app.use('/api/users', userApiRouter)
app.use('/api/categories', categoriesApiRouter)
app.use('/api/address', addressApiRouter)
app.use('/api/services', servicesApiRouter)
app.use('/api/stores', storeApiRouter)
app.use('/api/attributes', attributeApiRouter);
app.use('/api/sales', saleApiRouter);
app.use('/api/itemservice', itemServiceApiRouter);
app.use('/api/notification', notificationApiRouter);
app.use('/api/order', orderApiRouter);
app.use('/api/rates', ratesApiRouter);
app.use('/api/posts', postsApiRouter)
app.use('/api/register', registerApiRouter);
app.use('/api/image', imageApiRouter)


   

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
