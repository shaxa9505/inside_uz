const { Schema, default: mongoose } = require("mongoose");


const studentSchema = Schema({
  graduates: { type: Number, required: true },
  currentStudents: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now }
})

const Student = mongoose.model("student", studentSchema)

module.exports = Student