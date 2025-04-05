const express = require('express');
const router = express.Router();
const Students = require("../models/Students")
const Courses = require("../models/Courses")
const Networks = require("../models/Networks")


router.get('/', async (req, res) => {

  const students = await Students.find({});
  const courses = await Courses.find({});
  const networks = await Networks.find({});
  

  res.render('index', {
    title: 'Insideuz',
    students,
    courses,
    networks,
    succesClient: req.flash("succesClient"),
  });
});

module.exports = router;