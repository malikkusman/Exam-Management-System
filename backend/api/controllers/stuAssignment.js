const Model = require('../models/stuAssignment')
var { db } = require('../utils/mongodb');

async function Add(req, res) {
  try {
    // Ensure req.file exists and contains the uploaded file details
    const file = req.file ? req.file.filename : null;
    const username = req.body.username

    const inputs = req.body.inputs.map(input => ({
      question: input.question,
      totalnumber: input.totalnumber,
      obtainnumber: input.obtainnumber,
      answer: input.answer,
    }));

    const { category, name, description, date, Marks, teacher } = req.body;
    const active = true;

    const data = {
      TeacherName: teacher,
      StudentName: username,
      Category: category,
      Name: name,
      Description: description,
      Date: date,
      File: file,
      Questions: inputs,
      Marks: Marks,
      ObtainMarks: 9999,
      active: active
    };

    console.log('data', data);

    // Insert data into MongoDB collection
    db.collection('stuassignments').insertOne(data, (err, result) => {
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

async function getbyusername(req, res) {
  const username = req.query.username;
  console.log(username)
  try {
    const data = await Model.find({StudentName:username});
    res.status(200).json(data);
  } catch (error) {
    console.error('Error while finding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function getbyteacher(req, res) {
  const username = req.query.username;
  console.log(username)
  try {
    const data = await Model.find({TeacherName:username});
    res.status(200).json(data);
  } catch (error) {
    console.error('Error while finding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function update(req, res) {
  try {
    const id = req.query.id;
      const updated = await Model.findByIdAndUpdate(id, req.body, { new: true });
      console.log(updated)
      res.status(200).json(updated);
    }catch (err) {
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
  getbyusername,
  getbyteacher
};