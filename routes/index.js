const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {

    getHomepage: (req, res) => {
        if(req.session.loggedin){
            res.render('home.ejs', {
                title: 'Hello ' +req.session.username,
                username: req.session.username
            });
        }else{
            res.render('login.ejs', {
                title: 'Login please!!',
                message: '~ Login please !!! ~'
            });
        }
    },

    getLoginpage: (req, res) => {
        res.render('login.ejs', {
            title: 'Login',
            message: ''
        });
    },

    IsLogined: (req, res) => {
        let username = req.body.username;
        let password = req.body.username;


        if(username != "" && password != ""){
            
            let query = "SELECT * FROM users WHERE username = ?";

            db.query(query, [username], (err, result) => {
                
                if(result.length > 0){

                    bcrypt.compare(password, result[0].password, (err, resultBcrypy) => {
                        if(resultBcrypy == true){
                            req.session.loggedin = true;
                            req.session.username = username;
                            res.redirect('/');
                        }
                        else{
                            return res.render('login.ejs', {
                                title: 'Login',
                                message: 'password incorrect'
                            });
                        }
                    });
                }
                else {
                    return res.render('login.ejs', {
                        title: 'Login',
                        message: 'incorrect username or password'
                    });

                }
                
            });
        }
    },

    Signup: (req, res) =>  {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let cf_password = req.body.cfpassword;

        

        let query = "SELECT email FROM users WHERE email = ?"
        
        db.query(query, [email], (err, result) => {
            
            if(result.length > 0){
                console.log("email is already in use");
                return res.render('signup.ejs', {
                    title: 'Sign up',
                    message: '~ sign up again that email is already in use ~'
                });
            }
            else {

                if(username != "" && password != "" && email != "" && cf_password != ""){
                    if(password === cf_password){
    
                        bcrypt.hash(password, saltRounds, (err, hash) => {
                            if(err){
                                return res.send(err);
                            }
                            else{
                                let query = "INSERT INTO users (username,password,email) VALUES ?";
                                let values = [ [username,hash,email] ];
                                db.query(query, [values], (err, result) => {
                                    if(err) {
                                        console.log(err);
                                        return res.sendStatus(err);
                                    }
                                    return res.render('login', {
                                        title: 'go to login !!',
                                        message: 'go to login....'
                                    });
                                });
                            }
                        })
        
                    }
                    else{
                        return res.render('signup.ejs', {
                            title: 'Sign up',
                            message: 'password not matching'
                        });
                    }
                }
            }

        });
    },

    getSignUppage: (req,res) => {
        res.render('signup.ejs', {
            title: 'Signup',
            message: ''
        });
    },

    Logout: (req, res) => {
        req.session.destroy( (err) => {
            if(err){
                return res.send("logout is error!");
            }
            res.redirect('/');
        } );
    }


}