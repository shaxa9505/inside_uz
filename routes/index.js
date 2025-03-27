const express = require('express');
const router = express.Router();
const Students = require("../models/Students")
const Courses = require("../models/Courses")


router.get('/', async (req, res) => {

  const students = await Students.find({});
  const courses = await Courses.find({});

  res.render('index', { 
    title: 'Insideuz',
    students,
    courses,
    succesClient: req.flash("succesClient"),
  });
});

module.exports = router;