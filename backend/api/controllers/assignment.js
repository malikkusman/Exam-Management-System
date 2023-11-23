const Model = require('../models/assignment')
var { db } = require('../utils/mongodb');

async function Add(req, res) {
  try {
    // Ensure req.file exists and contains the uploaded file details
    console.log(req.file)
    const file = req.file ? req.file.filename : null

    const inputs = req.body.inputs.map(input => ({
      question: input.question,
      number: input.number
    }));

    const { category, name, description, date, Marks, teacher } = req.body;
    const active = true;

    const data = {
      Category: category,
      Name: name,
      Description: description,
      Date: date,
      File: file,
      TeacherName: teacher,
      Questions: inputs,
      Marks: Marks,
      active: active
    };

    console.log('data', data);

    // Insert data into MongoDB collection
    db.collection('assignments').insertOne(data, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      } else {
        const responseData = { message: 'added' };
        res.status(200).json(responseData);
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function get(req, res) {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error while finding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getbycategory(req, res) {
  const category = req.query.Category;
  try {
    const data = await Model.find({ Category: category });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error while finding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getbyteacher(req, res) {
  const username = req.query.username;
  try {
    const data = await Model.find({ TeacherName: username });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error while finding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function update(req, res) {
  try {
    const id = req.query.id;
    const file = req.file.filename;
    const { Category, Name, Description, Date, Marks,teacher } = req.body;
    const data = {
      Category: Category,
      Name: Name,
      Description: Description,
      Date: Date,
      File: file,
      Marks: Marks,
      TeacherName: teacher,
    };
    const updated = await Model.findByIdAndUpdate(id, data, { new: true });
    console.log(updated)
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//delete the product by id
async function delte(req, res) {
  try {
    const id = req.query.id;
    console.log(id);
    const deleted = await Model.findByIdAndRemove(id);
    const responseData = { message: 'deleted' };
    res.status(204).json(responseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  Add,
  get,
  update,
  delte,
  getbycategory,
  getbyteacher
};