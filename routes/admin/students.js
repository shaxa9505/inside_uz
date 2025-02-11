const { Router } = require("express");
const Skills = require("../../models/Skills");
const router = Router();


router.get("/students", async (req, res) => {
  const skills = await Skills.find({});
  res.render("admin/students", {title: "Ученики", skills})
})


router.get("/studentsAdd", (req, res) => {
  res.render("admin/studentsAdd", {
    title: "Создать ученика",
    errorStudentsAdd: req.flash("errorStudentsAdd")
  })
})

router.post("/studentsAdd", (req, res) => {
  const { graduates, currentStudents } = req.body
  // console.log(req.body);

  if(!graduates || !currentStudents) {
    req.flash("errorStudentsAdd", "Заполните всю таблицу")
    res.redirect("/admin/studentsAdd")
    return
  }

  // res.redirect("/admin/students")

})

module.exports = router