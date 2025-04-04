const { Router } = require("express");
const Skills = require("../../models/Skills");
const router = Router();
const Students = require("../../models/Students")
const Courses = require("../../models/Courses")
const Clients = require("../../models/Clients")
const Networks = require("../../models/Networks")


router.get("/admin", async (req, res) => {
  
  const students = await Students.find({});
  const courses = await Courses.find({});
  const clients = await Clients.find({});
  const networks = await Networks.find({});
  // console.log(students);

  res.render("admin/index", {
    title: "Главная страница",
    students,
    courses,
    clients,
    networks,
    errorLink: req.flash("errorLink")
  })

})

router.get("/admin/students", async (req, res) => {
  const skills = await Skills.find({});
  const students = await Students.find({});
  res.render("admin/students", {
    title: "Ученики", 
    skills,
    students,
    successStudent: req.flash("successStudent"),
    deleteSuccess: req.flash("deleteSuccess"),
    editSuccess: req.flash("editSuccess"),
  })
})


router.get("/admin/studentsAdd", async (req, res) => {

  const students = await Students.find().countDocuments()
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  // const url = req.originalUrl bu faqat yozilgan urlni beradi masalan /admin faqat adminni charadi

  if(students) {
    req.flash("errorLink", `К сожалению, такой страницы не найдено ${fullUrl}`)
    res.redirect("/admin")
    return
  }

  res.render("admin/studentsAdd", {
    title: "Создать",
    errorStudentsAdd: req.flash("errorStudentsAdd"),
  })
})

router.post("/admin/studentsAdd", async (req, res) => {
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

router.get("/admin/delete/:id", async (req, res) => {
  await Students.findByIdAndDelete(req.params.id);
  req.flash("deleteSuccess", "Вы успешно удалили!");
  res.redirect("/admin/students")  
})

router.get("/admin/edit/:id", async (req, res) => {
  const students = await Students.findById(req.params.id);
  // console.log(students)
  res.render("admin/studentEdit", {
    title: "Изменить",
    students,
    errorStudentsAdd: req.flash("errorStudentsAdd")
  })
})

router.post("/admin/edit/:id", async (req, res) => {
  const { graduates, currentStudents } = req.body;
  const students = await Students.find({});

  
  if(!students) {
    req.flash("errorLink", `К сожалению, такой страницы не найдено ${fullUrl}`)
    res.redirect("/admin")
    return
  }

  if(!graduates || !currentStudents) {
    req.flash("errorStudentsAdd", "Заполните всю таблицу")
    res.redirect(`/admin/edit/${req.params.id}`)
    return
  }

  await Students.findByIdAndUpdate(req.params.id, { graduates, currentStudents })
  req.flash("editSuccess", "Вы успешно изменили")
  res.redirect("/admin/students")

})

module.exports = router
