var express = require('express');
var router = express.Router();
var username = 'Lauren';
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Rêve Academy Application', username:username});
});

//SKILLS ROUTES
router.get('/communication', function (req, res, next) {
    res.render('communication', {title: 'Communication page'});

});
router.get('/equitable', function (req, res, next) {
    res.render('equitable', {title: 'equitable page'});
});
router.get('/progress_monitoring', function (req, res, next) {
    res.render('progress_monitoring', {title: 'progress monitoring'});
});
router.get('/enthusiasm', function (req, res, next) {
    res.render('enthusiasm', {title: 'enthusiasm'});
});
router.get('/teamwork', function (req, res, next) {
    res.render('teamwork', {title: 'teamwork page'});
});
router.get('/problem_solving', function (req, res, next) {
    res.render('problem_solving', {title: 'problem solving'});
});
router.get('/professionalism', function (req, res, next) {
    res.render('professionalism', {title: 'professionalism'});
});
router.get('/engagement', function (req, res, next) {
    res.render('engagement', {title: 'engagement'});
});
router.get('/supportive_learning', function (req, res, next) {
    res.render('supportive_learning', {title: 'supportive learning'});
});
router.get('/responsibility', function (req, res, next) {
    res.render('responsibility', {title: 'responsibility'});
});

router.get('/observation', function (req, res, next) {
    res.render('observation', {title: 'Observation'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login Page'});
});

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Register'});
});


//ADMIN ROUTES

router.get('/add_intern', function (req, res, next) {
    res.render('admin/add_intern', {title: 'Add Intern'});
});

router.get('/add_teacher', function (req, res, next) {
    res.render('admin/add_teacher', {title: 'Add Teacher'});
});

router.get('/admin_home', function (req, res, next) {
    res.render('admin/admin_home', {title: 'Admin Home'});
});

router.get('/admin_view_data', function (req, res, next) {
    res.render('admin/admin_view_data', {title: 'Admin View Data'});
});

//TEACHER'S ROUTES

router.get('/add_class', function (req, res, next) {
    res.render('teacher/add_class', {title: 'Add Class'});
});

router.get('/teacher_view_data', function (req, res, next) {
    res.render('teacher/teacher_view_data', {title: 'Teacher View Data'});
});

module.exports = router;
