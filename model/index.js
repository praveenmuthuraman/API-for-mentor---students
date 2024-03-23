import mongoose from "mongoose";
const mentorSchema = new mongoose.Schema({
  name: String,
  role: String,
  gender: String,
});


const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;