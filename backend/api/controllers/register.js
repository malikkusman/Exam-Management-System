const User = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

var { db } = require('../utils/mongodb');
const { transporter } = require('../utils/nodemailer')

async function RegisterUser(req, res) {
    console.log(req.body.credential)
    try {
        if (req.body.credential) {
            const token = req.body.credential;
            const decoded = jwt.decode(token);
            const email = decoded.email;
            const name = decoded.name;
            console.log(email)
            console.log(name)

            const newUser = new User({
                Firstname: name,
                Lastname: "",
                Username: name,
                password: "null",
                email: email,
                role: "student",
                active: true
            });

            await newUser.save();

            const responseData = { message: name };
            // Sending email logic...
            const mailOptions = {
                from: 'Exam Management System <css.hamad160@gmail.com>',
                to: email,
                subject: "You have been registered",
                html: `Now you can access our portal`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({ error: 'Failed to send email' });
                } else {
                    res.status(200).json(responseData);
                }
                transporter.close();
            });
        } else {
            const lname = req.body.Lastname;
            const fname = req.body.Firstname;
            const username = req.body.Username;
            const pass = crypto.createHash('sha256').update(req.body.password).digest('hex');
            const email = req.body.email;
            const active = true;
            const role = req.body.role;

            const newUser = new User({
                Firstname: fname,
                Lastname: lname,
                Username: username,
                password: pass,
                email: email,
                role: role,
                active: active
            });

            await newUser.save();

            const responseData = { message: 'data added' };
            // Sending email logic...
            const mailOptions = {
                from: 'Exam Management System <css.hamad160@gmail.com>',
                to: email,
                subject: "You have been registered",
                html: `Now you can access our portal`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({ error: 'Failed to send email' });
                } else {
                    res.status(200).json(responseData);
                }
                transporter.close();
            });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


async function getUsers(req, res) {
    try {
        const { email, password } = req.body;
        const hashpass = crypto.createHash('sha256').update(password).digest('hex')
        try {
            const user = await User.find({ email: email });
            if (user && hashpass == user[0].password) {
                const token = GenerateToken(user);
                res.status(200).json({users: user,token:token});
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

async function getallUsers(req, res) {
    const role = req.query.role
    try {
        const user = await User.find({ role: role });
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

async function getuserbyusername(req, res) {
    const username = req.query.username
    try {
        const user = await User.find({ Username: username });
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

async function updateUser(req, res) {
    try {
        const id = req.query.id;
        const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.query.id;
        console.log(id);
        const deletedCourse = await User.findByIdAndRemove(id);
        const responseData = { message: 'deleted' };
        res.status(204).json(responseData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function validateUser(req, res) {
    let token = req.query.token;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, "2334rw53texhjdhjfhjdhfjhdskfjhdkjfhdkjshfkjdshf", (err, decoded) => {

        if (err) {
            return res.status(403).json({ message: 'invalid' });
        }
        else{
            return res.status(201).json({ message: 'valid' });
        }
    });
}

function GenerateToken(user){
    const payload = {
  
      role: user.role,
  
      id: user._id,
  
    };
    const token = jwt.sign(payload, "2334rw53texhjdhjfhjdhfjhdskfjhdkjfhdkjshfkjdshf");
    return token;
  };

module.exports = {
    RegisterUser,
    getUsers,
    getallUsers,
    deleteUser,
    updateUser,
    getuserbyusername,
    validateUser
};