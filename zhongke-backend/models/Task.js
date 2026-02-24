const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    priority: String,
    dueDate: String,
    assignedUser: String,
    team: String,
    status: {
      type: String,
      default: "Pending",
    },
    note: String,
    fileName: String,
    fileData: String,
  },
  { timestamps: true },
);
taskSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});
module.exports = mongoose.model("Task", taskSchema);
