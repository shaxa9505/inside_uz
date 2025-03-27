const { Router } = require("express");
const Clients = require("../../models/Clients");
const router = Router();


router.get("/admin/clients", async (req, res) => {

  const clients = await Clients.find({});

  res.render("admin/clients", {
    title: "Новые ученики",
    clients,
    deleteSuccess: req.flash("deleteSuccess"),
  });

})

router.post("/admin/client", async (req, res) => {
  const { name, phone } = req.body;

  console.log(name, phone)
  const client = await Clients.create(req.body);
  console.log(client)
  req.flash("succesClient", "Sizning ma'lumotlaringiz muvaffaqiyatli jo'natildi operatorimiz siz bilan albatta bog'lanadi!")
  res.redirect("/")
})


router.get("/admin/clientDelete/:id", async (req, res) => {
  await Clients.findByIdAndDelete(req.params.id);
  req.flash("deleteSuccess", "Вы успешно удалили!");
  res.redirect("/admin/clients")
})

module.exports = router