const { Schema, model } = require("mongoose");


const StudentSchema = new Schema({
  graduates: { type: Number, required: true },
  currentStudents: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now }
})

const Student = model("student", StudentSchema)

module.exports = Student