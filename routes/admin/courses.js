const { Router } = require("express");
const Courses = require("../../models/Courses");
const router = Router();



router.get("/courses", async (req, res) => {

  const courses = await Courses.find({});

  res.render("admin/courses", {
    title: "Курсы",
    courses
  })

})


router.get("/courseAdd", (req, res) => {

  res.render("admin/courseAdd", {
    title: "Создать"
  })

})


router.post("/courseAdd", async (req, res) => {

  const course = await Courses.create(req.body)
  console.log(course);
  res.redirect("/admin")

})





module.exports = router