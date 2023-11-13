const User = require('../models/userSchema')
const jwt = require('jsonwebtoken');
var {db} = require('../database/mongodb');
const {transporter} = require('../nodemailer/nodemailer')

async function RegisterUser(req, res) {
    console.log(req.body.credential)
    console.log('data')
    if(req.body.credential){
        const token = req.body.credential; // Get the JWT from your response object
        const decoded = jwt.decode(token); // Decode the token
        console.log('Decoded JWT:', decoded);
        const email = decoded.email;
        const name = decoded.name;
        console.log('User Email:', email);
        const data = {
            name: name,
            email: email,
            password: "null"
        }
        try {
            const mailoption = {
                from:'Exam Management System <css.hamad160@gmail.com>',
                to:email,
                subject:"You have been register",
                html:'Now you can excess our portal'
            }
            transporter.sendMail(mailoption,(error,info)=>{
                if (error) throw error
                else{
                    console.log("email sent");
                }
            })
            const user = await User.create(data);
            res.status(201).json(user);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    else
    {
        try 
        {
            const lname = req.body.Lastname
            const fname = req.body.Firstname
            const username = req.body.Username
            const pass = req.body.password
            const email = req.body.email
            const active = true
            const data = {
                Firstname : fname,
                Lastname : lname,
                Username : username,
                password : pass,
                email : email,
                active : active
            }
            console.log('data',data)
            const mailOptions = {
                from:'Exam Management System <css.hamad160@gmail.com>',
                to:email,
                subject:"You have been register",
                html: `Now you can excess our portal`
            }
            transporter.sendMail(mailOptions, (error, info) => 
            {
                if (error) throw error;
                else
                {
                    transporter.close();
                    db.collection('Users').insertOne(data, (err, result) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            // const data={
                            //     "email":email,
                            //     "code":code,
                            // }
                            // db.collection('tokens').insertOne(data,(err,collection)=>{
                                // if(err) throw err;
                                // else{
                                const responseData = { message: 'data added'};
                                res.status(200).json(responseData);
                            // }
                        // })
                        }
                    })    
                }
              }
            )
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
};

async function getUsers(req, res) {
    try {
        const { email, password } = req.body;
        try {
            const user = await User.find({ email: email });
            if (user && password == user[0].password) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error while finding user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = {
    RegisterUser,
    getUsers,
};