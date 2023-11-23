


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
const Audit = mongoose.model("UsersAudits", auditSchema);

// Middleware to capture changes in the Users collection
const userSchema = mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
  },
  Username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
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

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
