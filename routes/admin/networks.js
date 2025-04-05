const { Router } = require("express");
const Networks = require("../../models/Networks");
const router = Router();

router.get("/admin/networks", async (req, res) => {
  
  const networks = await Networks.find({});

  res.render("admin/networks", {
    title: "Мои социальные сети",
    networks,
    succesNetwork: req.flash("succesNetwork"),
    deleteNetwork: req.flash("deleteNetwork"),
    errorNetwork: req.flash("errorNetwork"),
    editNetwork: req.flash("editNetwork")
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


router.get("/admin/deleteNetwork/:id", async (req, res) => {
  await Networks.findByIdAndDelete(req.params.id);
  req.flash("deleteNetwork", "Вы успешно удалили!");
  res.redirect("/admin/networks")
})


router.get("/admin/editNetwork/:id", async (req, res) => {
  
  const networks = await Networks.findById(req.params.id);
  res.render("admin/networkEdit", {
    title: "Изменить",
    networks,
    errorNetworks: req.flash("errorNetworks")
  })
})


router.post("/admin/editNetwork/:id", async (req, res) => {

  const {network, networkLink} = req.body;
  
  if(!network || !networkLink) {
    req.flash("errorNetworks", "Заполните всю таблицу")
    res.redirect(`/admin/editNetwork/${req.params.id}`)
    return
  }

  await Networks.findOneAndUpdate(req.params.id, req.body)
  req.flash("editNetwork", "Вы успешно изменили")
  res.redirect("/admin/networks")

})

module.exports = router