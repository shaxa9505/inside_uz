const { Schema, model } = require("mongoose");



const Networkschema = new Schema({
  network: {type: String, required: true},
  networkLink: {type: String, required: true}
})


const Networks = model("network", Networkschema);

module.exports = Networks