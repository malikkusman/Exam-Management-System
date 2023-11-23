// const mongoose = require("mongoose");

// const courseSchema = mongoose.Schema({
//   Course: {
//     type: String,
//     required: true,
//   },
//   INSTname: {
//     type: String,
//     required: true,
//   },
//   Description: {
//     type: String,
//   },
//   active: {
//     type: Boolean,
//     required: true,
//   },
// },{timestamps:true});

// module.exports =  mongoose.model("Courses", courseSchema);
  

const mongoose = require("mongoose");

// Define the schema for the audit trail
const auditSchema = mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  operationType: {
    type: String,
    enum: ['insert', 'update', 'delete'],
    required: true,
  },
  oldData: Object,
  newData: Object,
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Create the model for the audit trail
const Audit = mongoose.model("CoursesAudits", auditSchema);

// Middleware to capture changes in the Courses collection
const courseSchema = mongoose.Schema({
  Course: {
    type: String,
    required: true,
  },
  INSTname: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
  },
  active: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

courseSchema.pre('save', async function (next) {
  try {
    const doc = this;
    let operationType = 'insert';
    let oldData = null;

    if (!doc.isNew) {
      operationType = doc.isModified() ? 'update' : 'delete';
      if (operationType !== 'insert') {
        oldData = doc.toObject();
      }
    }

    const auditLog = new Audit({
      documentId: doc._id,
      operationType,
      oldData,
      newData: doc.toObject(),
    });

    await auditLog.save(); // Save the audit log

    next();
  } catch (error) {
    next(error);
  }
});

const Courses = mongoose.model("Courses", courseSchema);

module.exports = Courses;
