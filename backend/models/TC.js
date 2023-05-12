const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TCSchema = new Schema(
  {
    donorName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    followUpDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TC", TCSchema);
