const { Router } = require("express");
const router = Router();
const Students = require("../../models/Students");


router.get("/", async (req, res) => {
  
  const students = await Students.find({}).lean();
  console.log(students);
  

  res.render("admin/index", {
    title: "Главная страница",
    students: students || [],
    errorLink: req.flash("errorLink")
  })
})


module.exports = router
