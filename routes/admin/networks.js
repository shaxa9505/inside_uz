const { Router } = require("express");
const Networks = require("../../models/Networks");
const router = Router();

router.get("/admin/networks", async (req, res) => {
  
  const networks = await Networks.find({});

  res.render("admin/networks", {
    title: "Мои социальные сети",
    networks,
    succesNetwork: req.flash("succesNetwork"),
  })
})


router.get("/admin/networkAdd", async (req, res) => {
  
  const networks = await Networks.find({});

  res.render("admin/networkAdd", {
    title: "Создать",
    networks
  })
})


router.post("/admin/networkAdd", async (req, res) => {
  const { network, networkLink } = req.body;

  console.log(network, networkLink)
  const netWork = await Networks.create(req.body);
  console.log(netWork)

  req.flash("succesNetwork", "Вы успешно добавили")
  res.redirect("/admin/networks")
})

module.exports = router