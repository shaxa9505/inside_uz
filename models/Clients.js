const { Schema, model } = require("mongoose");



const ClientSchema = new Schema({
  name: {type: String, required: true},
  phone: {type: Number, required: true}
})


const Clients = model("client", ClientSchema);

module.exports = Clients