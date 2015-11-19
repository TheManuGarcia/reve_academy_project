var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
function getUnixTime() { return Math.floor(Date.now() / 1000); }

connection.query('USE ' + dbconfig.database, function (error, results, fields) {
    if (error) {
        console.log("ERROR = ", error);
        return;
    }
    console.log("[" + new Date() + '] Connected to MySQL as ' + connection.threadId);
});

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        //console.log("user = ", user);
        done(null, user.UserID);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM Users WHERE UserID = ? ", [id], function (err, rows) {
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField: 'Username',
                passwordField: 'Password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, Username, Password, done) {
                //console.log("req.body = ", req.body);

                // first check that username does not already exist
                connection.query("SELECT * FROM Users WHERE Username = ?", [Username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('registerMessage', 'ERROR: that username is taken'));
                    } else {

                        // check user input PIN against auth codes in database
                        var results = [];
                        connection.query("SELECT InternCode, TeacherCode, AdminCode FROM Settings", function (err, results) {
                            if (err) console.log("SELECT ERROR = ", err);

                            if (parseInt(req.body.PIN) != results[0].InternCode && parseInt(req.body.PIN) != results[0].TeacherCode && parseInt(req.body.PIN) != results[0].AdminCode) {
                                return done(null, false, req.flash('registerMessage', 'ERROR: invalid authorization'));
                            }

                            var InternCode = results[0].InternCode;
                            var TeacherCode = results[0].TeacherCode;
                            var AdminCode = results[0].AdminCode;

                            var UserType;
                            if (parseInt(req.body.PIN) == InternCode) UserType = 2; // intern
                            if (parseInt(req.body.PIN) == TeacherCode) UserType = 1; // teacher
                            if (parseInt(req.body.PIN) == AdminCode) UserType = 0; // admin

                            var newUserMysql = {
                                UserType: UserType,
                                Username: Username,
                                Password: bcrypt.hashSync(Password, null, null),
                                FirstName: req.body.FirstName,
                                LastName: req.body.LastName,
                                Email: req.body.Email,
                                DateCreated: getUnixTime()
                            };

                            //console.log("new user = ", newUserMysql);
                            var insertQuery = "INSERT INTO Users ( UserType, Username, Password, FirstName, LastName, Email, DateCreated ) values (?,?,?,?,?,?,?)";

                            connection.query(insertQuery, [newUserMysql.UserType, newUserMysql.Username, newUserMysql.Password, newUserMysql.FirstName, newUserMysql.LastName, newUserMysql.Email, newUserMysql.DateCreated], function (err, rows) {

                                if (err) {
                                    console.log("INSERT ERROR = ", err);
                                    return;
                                }
                                //console.log("INSERTED NEW USER = ", rows);

                                newUserMysql.UserID = rows.insertId;
                                return done(null, newUserMysql);
                            });
                        });
                    }
                });
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses Username and Password, we will override with email
                usernameField: 'Username',
                passwordField: 'Password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, Username, Password, done) { // callback with email and Password from our form
                connection.query("SELECT * FROM Users WHERE Username = ?", [Username], function (err, rows) {
                    //console.log('got here');
                    if (err) {
                        console.log("ERROR = ", err);
                        return done(err);
                    }
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'INVALID LOGIN')); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the Password is wrong
                    if (!bcrypt.compareSync(Password, rows[0].Password))
                        return done(null, false, req.flash('loginMessage', 'INVALID LOGIN')); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, rows[0]);
                });
            })
    );
};
