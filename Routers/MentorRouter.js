import express from "express";
import Mentor from "../model/index.js"; // Assuming Mentor model is exported as default from 'index.js'

const mentorRouter = express.Router();

mentorRouter.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.send(mentors);
  } catch (err) {
    res.status(400).send(err);
  }
});

mentorRouter.post("/", async (req, res) => {
  const { name, email, course } = req.body;
  const addMentor = new Mentor({
    name: name,
    email: email,
    course: course,
  });
  try {
    const newMentor = await addMentor.save();
    res.send(newMentor);
  } catch (err) {
    res.status(500).send(err);
  }
});

mentorRouter.get("/get-mentor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mentor = await Mentor.findById(id);
    if (!mentor) {
      return res.status(404).send("Mentor not found");
    }
    res.status(200).send(mentor);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default mentorRouter;
