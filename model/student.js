import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  address: String,
  role:String,
  age:String,
});


const student =mongoose.model("student",studentSchema);

export default student;