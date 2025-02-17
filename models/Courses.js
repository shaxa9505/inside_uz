const { Schema, model } = require("mongoose");



const CoursesSchema = new Schema({
  course: {type: String, required: true},
  time: {type: Number, required: true},
  weekdays: {type: String, required: true},
  topic: {type: String, required: true}
})


const Courses = model("course", CoursesSchema);

module.exports = Courses