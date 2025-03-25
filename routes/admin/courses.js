const { Router } = require("express");
const Courses = require("../../models/Courses");
const router = Router();



router.get("/courses", async (req, res) => {

  const courses = await Courses.find({});
  console.log(courses);

  res.render("admin/courses", {
    title: "Курсы",
    courses,
    editSuccess: req.flash("editSuccess"),
    deleteSuccess: req.flash("deleteSuccess"),
    successCourse: req.flash("successCourse"),
    
  })

})


router.get("/courseAdd", (req, res) => {

  res.render("admin/courseAdd", {
    title: "Создать"
  })

})


router.post("/courseAdd", async (req, res) => {

  const course = await Courses.create(req.body)
  // console.log(course);
  req.flash("successCourse", "")
  res.redirect("/admin")
})

router.get("/courseEdit/:id", async (req, res) => {
  const courses = await Courses.findById(req.params.id);
  console.log(courses)
  res.render("admin/courseEdit", {
    title: "Изменить",
    courses,
    errorCourses: req.flash("errorCourses")
  })
})


router.post("/courseEdit/:id", async (req, res) => {
  
  const { course, time, weekdays, topic } = req.body;
  const courses = await Courses.find({});

  // if(!courses) {
  //   req.flash("errorLink", `К сожалению, такой страницы не найдено ${fullUrl}`)
  //   res.redirect("/admin")
  //   return
  // }

  if(!course || !time || !weekdays || !topic) {
    req.flash("errorCourses", "Заполните всю таблицу")
    res.redirect(`/admin/courseEdit/${req.params.id}`)
    return
  }

  await Courses.findByIdAndUpdate(req.params.id, {course, time, weekdays, topic});
  req.flash("editSuccess", "Вы успешно изменили")
  res.redirect("/admin/courses")

})

router.get("/courseDelete/:id", async (req, res) => {
  await Courses.findByIdAndDelete(req.params.id);
  req.flash("deleteSuccess", "Вы успешно удалили!");
  res.redirect("/admin/courses")  
})



module.exports = router