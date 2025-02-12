const { Router } = require("express");
const Students = require("../../models/Students");
const router = Router();


router.get("/", async (req, res) => {
  
  const students = await Students.find({});

  res.render("admin/index", {
    title: "Главная страница",
    students,
    errorLink: req.flash("errorLink")
  })
})


module.exports = router
