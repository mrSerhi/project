import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

// change _id to id in returning response
taskSchema.method("transform", () => {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export default (Task = mongoose.model("Task", taskSchema));
