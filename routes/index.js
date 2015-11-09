var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
function getUnixTime() { return Math.floor(Date.now() / 1000); }
var mysql = require('mysql');

var dbconfig = require('../server/database');
var connection = mysql.createConnection(dbconfig.connection);

var username = 'Lauren';
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.user) {
        res.redirect('/home');
    } else {
        res.render('index', { title: 'Rêve Academy Application' });
    }
});

router.get('/home', function (req, res, next) {
    res.render('home', {title: 'Home', user: req.user});
});

router.get('/getUser', function(req, res) {
    res.json({user: req.user});
});

//SKILLS ROUTES
router.get('/communication', function (req, res, next) {
    res.render('communication', {title: 'Communication'});
});
router.get('/equitable', function (req, res, next) {
    res.render('equitable', {title: 'Equitable'});
});
router.get('/progress_monitoring', function (req, res, next) {
    res.render('progress_monitoring', {title: 'Progress Monitoring'});
});
router.get('/enthusiasm', function (req, res, next) {
    res.render('enthusiasm', {title: 'Enthusiasm'});
});
router.get('/teamwork', function (req, res, next) {
    res.render('teamwork', {title: 'Teamwork'});
});
router.get('/problem_solving', function (req, res, next) {
    res.render('problem_solving', {title: 'Problem Solving'});
});
router.get('/professionalism', function (req, res, next) {
    res.render('professionalism', {title: 'Professionalism'});
});
router.get('/engagement', function (req, res, next) {
    res.render('engagement', {title: 'Engagement'});
});
router.get('/supportive_learning', function (req, res, next) {
    res.render('supportive_learning', {title: 'Supportive Learning'});
});
router.get('/responsibility', function (req, res, next) {
    res.render('responsibility', {title: 'Responsibility'});
});
router.get('/observation', function (req, res, next) {
    res.render('observation', {title: 'Observation'});
});


//ADMIN ROUTES

router.get('/add_intern', function (req, res, next) {
    res.render('admin/add_intern', {title: 'Add Intern'});
});

router.get('/add_teacher', function (req, res, next) {
    res.render('admin/add_teacher', {title: 'Add Teacher'});
});

router.get('/admin_view_data', function (req, res, next) {
    res.render('admin/admin_view_data', {title: 'Admin View Data'});
});

//TEACHER'S ROUTES

router.get('/add_class', function (req, res, next) {
    res.render('teacher/add_class', {title: 'Add Class', user: req.user});
});

router.post('/add_class', function (req, res) {
    connection.query('USE ' + dbconfig.database, function(error, results, fields) {

        if (error) {
            console.log("ERROR = ", error);
            return;
        }
        console.log("[" + new Date() + '] Connected to MySQL as ' + connection.threadId);
    });
    //console.log(req.user);

    var newClassMysql = {
        UserID : req.user.UserID,
        ClassName : req.body.ClassName,
        DateStart  : req.body.DateStart,
        DateCreated : getUnixTime()
    };

    console.log(newClassMysql);

    var insertQuery = "INSERT INTO Classes ( UserID, ClassName, DateStart, DateCreated ) values (?,?,?,?)";

    connection.query(insertQuery, [newClassMysql.UserID, newClassMysql.ClassName, newClassMysql.DateStart, newClassMysql.DateCreated], function(err, rows) {

        if (err) {
            console.log("INSERT ERROR = ", err);
            return;
        }
        console.log("INSERTED NEW CLASS = ", rows);

        newClassMysql.UserID = rows.insertId;
        //return done(null, newClassMysql);
    });


    //

    res.sendStatus(200);

    //res.redirect('teacher/add_class', {title: 'Add Class'});
});

router.get('/teacher_view_data', function (req, res, next) {
    res.render('teacher/teacher_view_data', {title: 'Teacher View Data'});
});

// AUTH ROUTES
router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login Page', message: req.flash('loginMessage') });
});

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Register', message: req.flash('registerMessage') });
});

router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }), function(req, res) {
        console.log("logged in!");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;