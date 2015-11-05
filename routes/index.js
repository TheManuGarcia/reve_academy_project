var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Rêve Academy Application'});
});
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


module.exports = router;
