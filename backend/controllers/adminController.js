//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const Admin = db.admins;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {

        const { username, email, password, issuperuser } = req.body;
        const data = {
            email,
            password: await bcrypt.hash(password, 10),
            username,
            issuperuser
        };

        //saving the user
        const admin = await Admin.create(data);

        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (admin) {
            let token = jwt.sign({ id: admin.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("admin", JSON.stringify(admin, null, 2));
            console.log(token);

            //send users details
            return res.status(201).send(admin);
        } else {
            return res.status(409).send("Details are not correct");
        }

    } catch (error) {
        console.log(error);
    }
};


//login authentication

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        //find a user by their email
        const admin = await Admin.findOne({
            where: {
                email: email
            }    
        });

        //if user email is found, compare password with bcrypt
        if (admin) {
            const isSame = await bcrypt.compare(password, admin.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: admin.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("admin", JSON.stringify(admin, null, 2));
                console.log(token);
                //send user data
                return res.status(201).send(admin);
            } 

            else {
                return res.status(401).send("Authentication failed");
            }

        } 
        
        else {
            return res.status(401).send("Authentication failed");
        }

    } 

    catch (error) {
        console.log(error);
    }

};

module.exports = {
 signup,
 login,
};