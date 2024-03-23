import express from "express";

import Student from "../model/student.js";

const studentRouter = express.Router();

studentRouter.get("/", async (req, res) => {
  try {
    const students = await Student.find({})
      .populate("mentor")
      .exec((err, result) => {
        if (!err) {
          res.json(result);
        }
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

studentRouter.post("/", async (req, res) => {
  const addStudent = new Student({
    name: req.body.name,
    batch: req.body.batch,
    mentor: req.body.mentor ? req.body.mentor : undefined,
  });
  try {
    const newStudent = await addStudent.save();
    res.send(newStudent);
  } catch (err) {
    res.status(500).send(err);
  }
});

studentRouter.get("/no-mentors", async (req, res) => {
  const students = await Student.find({ mentor: undefined });
  res.send(students);
});

studentRouter.patch("/assign-mentor/:id", async (req, res) => {
  const { id } = req.params;
  const { mentor } = req.body;
  try {
    const student = await Student.findById(id);
    student.mentor = mentor;
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

studentRouter.patch("/assign-mentor-students", async (req, res) => {
  const { mentor, stud_list } = req.body;
  try {
    stud_list.map(async (stud_id) => {
      const student = await Student.findById(stud_id);
      student.mentor = mentor;
      await student.save();
    });
    res.send("Updated Successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

studentRouter.get("/mentor-students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const students = await Student.find({ mentor: id });
    res.send(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default studentRouter;
