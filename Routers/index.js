import express from "express";
import Mentor from "../model/mentor.js";
import Student from "../model/student.js";

const router = express.Router();

router.post("/mentor", async (req, res) => {
  try {
    const { name, role, gender } = req.body;
    const newMentor = new Mentor({
      name: name,
      role: role,
      gender: gender,
    });

    await newMentor.save();
    res
      .status(200)
      .json({ message: "Mentor created successfully", data: newMentor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/student", async (req, res) => {
  try {
    const { name, address, age, role } = req.body;
    const newStudent = new Student({
      name: name,
      address: address,
      age: age,
      role: role,
    });

    await newStudent.save();
    res
      .status(200)
      .json({ message: "Student created successfully", data: newStudent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/assign", async (req, res) => {
  try {
    const { mentorId, studentId } = req.body;
    const mentor = await Mentor.findById(mentorId);
    const student = await Student.findById(studentId);

    if (!mentor || !student) {
      return res.status(404).json({ error: "Mentor or Student not found" });
    }
    mentor.students.push(student._id);
    student.mentor = mentor._id;

    await mentor.save();
    await student.save();

    res.status(200).json({ message: "Assignment successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/assign-mentor", async (req, res) => {
  try {
    const { mentorId, studentId } = req.body;
    const mentor = await Mentor.findById(mentorId);
    const student = await Student.findById(studentId);

    if (!mentor || !student) {
      return res.status(404).json({ error: "Mentor or Student not found" });
    }
    student.mentor = mentor._id;

    await student.save();

    res.status(200).json({ message: "Mentor assigned successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/mentor/:mentorId/students", async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await Mentor.findById(mentorId).populate("students");

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    const students = mentor.students;

    res.status(200).json({ students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/student/:studentId/previous-mentor", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("mentor");

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const previousMentor = student.mentor;

    res.status(200).json({ previousMentor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




export default router;
