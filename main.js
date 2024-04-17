// main.js
// Capstone 2: Express
"use strict";

//const { application } = require("express");
const express = require("express"),
    homeController = require('./controllers/homeController'),
    errorController = require('./controllers/errorController'),
    app = express();
app.set("port", process.env.PORT || 3001);

app.get("/", (req, res) => {
    res.send("Welcome to Confetti Cuisine!");
})


// 앱 설정

/**
 * Listing 12.7 (p. 179)
 * ejs 레이아웃 렌더링
 */
const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

/**
 * Listing 12.4 (p. 177)
 * body-parser의 추가
 */
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());


/**
 * Listing 12.6 (p. 178)
 * 각 페이지 및 요청 타입을 위한 라우트 추가
 */
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.get("/contact", homeController.postedSignUpForm);


/**
 * Listing 12.12 (p. 184)
 * 에러 처리 라우트 
 */
const httpStatus = require('http-status-codes');

exports.PageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("error");
}
exports.internalServerError = (err, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.render(errorCode);
    res.send(`${errorCode} | Sorry, our application is taking a nap!`);
}

// 3000번 포트로 리스닝 설정
app.listen(app.get("port"), () => {
    console.log(`Server runngin at http://localhost:${app.get(
        "port"
    )}`
);
});
