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
    res.render('communication', {title: 'Communication', user: req.user});
});
router.get('/equitable', function (req, res, next) {
    res.render('equitable', {title: 'Equitable'});
});
router.get('/progress_monitoring', function (req, res, next) {
    res.render('progress_monitoring', {title: 'Progress Monitoring', user: req.user});
});
router.get('/enthusiasm', function (req, res, next) {
    res.render('enthusiasm', {title: 'Enthusiasm', user: req.user});
});
router.get('/teamwork', function (req, res, next) {
    res.render('teamwork', {title: 'Teamwork', user: req.user});
});
router.get('/problem_solving', function (req, res, next) {
    res.render('problem_solving', {title: 'Problem Solving', user: req.user});
});
router.get('/professionalism', function (req, res, next) {
    res.render('professionalism', {title: 'Professionalism', user: req.user});
});
router.get('/engagement', function (req, res, next) {
    res.render('engagement', {title: 'Engagement', user: req.user});
});
router.get('/supportive_learning', function (req, res, next) {
    res.render('supportive_learning', {title: 'Supportive Learning', user: req.user});
});
router.get('/responsibility', function (req, res, next) {
    res.render('responsibility', {title: 'Responsibility', user: req.user});
});
router.get('/observation', function (req, res, next) {
    res.render('observation', {title: 'Observation', user: req.user});
});


//ADMIN ROUTES

router.get('/add_intern', function (req, res, next) {
    res.render('admin/add_intern', {title: 'Add Intern', user: req.user});
});

router.get('/add_teacher', function (req, res, next) {
    res.render('admin/add_teacher', {title: 'Add Teacher', user: req.user});
});

router.get('/admin_view_data', function (req, res, next) {
    res.render('admin/admin_view_data', {title: 'Admin View Data', user: req.user});
});

//TEACHER'S ROUTES

//get classes route
router.get('/getClasses', function(req, res) {
    console.log(req.user);
    if (req.user.UserType == 0 || req.user.UserType == 1) {

        connection.query('USE ' + dbconfig.database, function(error, results, fields) {

            if (error) {
                console.log("ERROR = ", error);
                return;
            }
            console.log("[" + new Date() + '] Connected to MySQL as ' + connection.threadId);
        });

        var selectQuery = "SELECT ClassID, ClassName, DateStart FROM Classes WHERE UserID = " + req.user.UserID;

        connection.query(selectQuery, function(err, results) {
            if (err) console.log("SELECT ERROR = ", err);
            res.json(results);
        });

    }

});


//get students route

router.get('/getStudents/:ClassID', function(req, res) {
    console.log(req.user);
    if (req.user.UserType == 0 || req.user.UserType == 1) {

        connection.query('USE ' + dbconfig.database, function(error, results, fields) {

            if (error) {
                console.log("ERROR = ", error);
                return;
            }
            console.log("[" + new Date() + '] Connected to MySQL as ' + connection.threadId);
        });

        var selectQuery = "SELECT FirstName, LastName FROM Students WHERE ClassID = " + req.params.ClassID;

        connection.query(selectQuery, function(err, results) {
            if (err) console.log("SELECT ERROR = ", err);
            res.json(results);
        });

    }

});

//POST students to database

router.post('/addStudent', function (req, res) {
    connection.query('USE ' + dbconfig.database, function(error, results, fields) {

        if (error) {
            console.log("ERROR = ", error);
            return;
        }
        console.log("[" + new Date() + '] Connected to MySQL as ' + connection.threadId);
    });
    //console.log(req.user);

    var newStudentMysql = {
        ClassID : req.body.ClassID,
        FirstName : req.body.FirstName,
        LastName  : req.body.LastName,
        DateCreated : getUnixTime()
    };

    console.log(newStudentMysql);

    var insertQuery = "INSERT INTO Students ( ClassID, FirstName, LastName, DateCreated ) values (?,?,?,?)";

    connection.query(insertQuery, [newStudentMysql.ClassID, newStudentMysql.FirstName, newStudentMysql.LastName, newStudentMysql.DateCreated], function(err, rows) {

        if (err) {
            console.log("INSERT ERROR = ", err);
            return;
        }
        console.log("INSERTED NEW Student = ", rows);

        //newStudentMysql.UserID = rows.insertId;
    });


    res.sendStatus(200);

});

router.get('/add_student', function (req, res, next) {

        res.render('teacher/add_student', {title: 'Add Student', user: req.user});
});

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

        //newClassMysql.UserID = rows.insertId;
    });


    res.sendStatus(200);


});

router.get('/teacher_view_data', function (req, res, next) {
    res.render('teacher/teacher_view_data', {title: 'Teacher View Data', user: req.user});
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