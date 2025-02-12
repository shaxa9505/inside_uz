const { Router } = require("express");
const Skills = require("../../models/Skills");
const router = Router();
const Students = require("../../models/Students")


router.get("/students", async (req, res) => {
  const skills = await Skills.find({});
  const students = await Students.find({});
  res.render("admin/students", {
    title: "Ученики", 
    skills,
    students,
    successStudent: req.flash("successStudent"),
  })
})


router.get("/studentsAdd", async (req, res) => {

  const students = await Students.find().countDocuments()
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  // const url = req.originalUrl bu faqat yozilgan urlni beradi masalan /admin faqat adminni charadi

  if(students) {
    req.flash("errorLink", `К сожалению, такой страницы не найдено ${fullUrl}`)
    res.redirect("/admin")
    return
  }

  res.render("admin/studentsAdd", {
    title: "Создать ученика",
    errorStudentsAdd: req.flash("errorStudentsAdd"),
  })
})

router.post("/studentsAdd", async (req, res) => {
  const { graduates, currentStudents } = req.body

  if(!graduates || !currentStudents) {
    req.flash("errorStudentsAdd", "Заполните всю таблицу")
    res.redirect("/admin/studentsAdd")
    return
  }

  await Students.create({graduates, currentStudents});
  req.flash("successStudent", "Вы успешно добавили!");
  res.redirect("/admin/students")

})

module.exports = router