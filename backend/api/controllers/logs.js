const Model = require('../models/logs')
var { db } = require('../utils/mongodb');

async function Add(req, res) {
    try {
        const level = req.body.level
        const message = req.body.message
        const where = req.body.where
        const data = {
            level: level,
            message: message,
            where: where,
        };

        // Save the log entry to the database
        db.collection('logs').insertOne(data, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err.message });
            } else {
                const responseData = { message: 'added' };
                res.status(200).json(responseData);
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}



module.exports = {
    Add
};