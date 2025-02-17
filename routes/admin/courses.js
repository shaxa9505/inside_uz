const { Router } = require("express");
const router = Router();



router.get("/courses", (req, res) => {

  res.render("admin/courses", {
    title: "Курсы"
  })

})


router.get("/courseAdd", (req, res) => {

  res.render("admin/courseAdd", {
    title: "Создать"
  })

})


module.exports = router