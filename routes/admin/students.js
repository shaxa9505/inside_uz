const { Router } = require("express");
const router = Router();


router.get("/", (req, res) => {
  res.render("admin/students", {
    title: "Students"
  })
})


module.exports = router
