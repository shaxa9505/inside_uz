const { Router } = require("express");
const router = Router();


router.get("/", (req, res) => {
  res.render("admin/index", {title: "Главная страница"})
})


module.exports = router
