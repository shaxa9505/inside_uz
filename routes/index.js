const express = require('express');
const router = express.Router();
const Students = require("../models/Students")


router.get('/', async (req, res, next) => {

  const students = await Students.find({});

  res.render('index', { title: 'Insideuz',  students});
});

module.exports = router;