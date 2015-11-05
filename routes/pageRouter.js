var express = require('express');
var router = express.Router();

router.get('/equitable', function(req, res, next) {
    res.render('/views/equitable');
});

router.get('/progress_monitoring', function(req, res, next) {
    res.render('/views/progress_monitoring');
});

//router.get('/communication', function(req, res, next) {
//    res.render('communication');
//});
router.get('/enthusiasm', function(req, res, next) {
    res.render('/views/enthusiasm');
});
router.get('/teamwork', function(req, res, next) {
    res.render('/views/teamwork');
});
router.get('/problem_solving', function(req, res, next) {
    res.render('/views/problem_solving');
});
router.get('/professionalism', function(req, res, next) {
    res.render('/views/professionalism');
});
router.get('/engagement', function(req, res, next) {
    res.render('/views/engagement');
});
router.get('/supportive_learning', function(req, res, next) {
    res.render('/views/supportive_learning');
});
router.get('/responsibility', function(req, res, next) {
    res.render('/views/responsibility');
});

module.exports = router;