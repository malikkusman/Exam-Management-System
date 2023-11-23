// const mongoose = require("mongoose");

// const attendanceSchema = mongoose.Schema({
//   Firstname: {
//     type: String,
//     required: true,
//   },
//   Lastname: {
//     type: String,
//   },
//   Username: {
//     type: String,
//     required: true,
//   },
//   Status: {
//     type: String,
//     required: true,
//   },
//   Date: {
//     type: Date,
//     required: true,
//   },
//   active: {
//     type: Boolean,
//     required: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("Attendances", attendanceSchema);



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
  oldData: Object, // Store old data for updates/deletes
  newData: Object, // Store new data for updates/inserts
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Create the model for the audit trail
const Audit = mongoose.model("AttendancesAudits", auditSchema);

// Middleware to capture changes in the Attendances collection
const attendanceSchema = mongoose.Schema({
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
  Status: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

attendanceSchema.pre('save', async function (next) {
  console.log("triggered")
  try {
    const doc = this;
    let operationType = 'insert';
    let oldData = null;

    if (doc.isNew) {
      // Document is being inserted
      oldData = null;
    } else {
      // Document is being updated or deleted
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

    const savedAuditLog = await auditLog.save(); // Save the audit log

    if (!savedAuditLog) {
      console.error('Audit log not saved');
    }

    next();
  } catch (error) {
    console.error('Error saving audit log:', error);
    next(error);
  }
});

const Attendances = mongoose.model("Attendances", attendanceSchema);

module.exports = Attendances;
