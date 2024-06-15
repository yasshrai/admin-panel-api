import Student from "../model/student.model.js";

// Create a new student
const createStudent = async (req, res) => {
  try {
    const {
      name,
      branch,
      department,
      rollNumber,
      scholarNumber,
      admissionYear,
      passOutYear,
      mobileNumber,
      emailAddress,
      fatherName,
      motherName,
      residenceAddress,
    } = req.body;

    const student = await Student.findOne({ scholarNumber });
    if (student) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Creating a new student instance
    const newStudent = new Student({
      name,
      branch,
      department,
      rollNumber,
      scholarNumber,
      admissionYear,
      passOutYear,
      mobileNumber,
      emailAddress,
      fatherName,
      motherName,
      residenceAddress,
    });

    // Saving the new student to the database
    await newStudent.save();

    // Responding with the newly created student
    return res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating student", error });
  }
};

// Update an existing student using scholarNumber
const updateStudent = async (req, res) => {
  try {
    const { scholarNumber } = req.params;
    const updatedData = req.body;

    // Finding and updating the student by scholarNumber
    const updatedStudent = await Student.findOneAndUpdate(
      { scholarNumber },
      updatedData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Responding with the updated student
    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating student", error });
  }
};

// Read all students
const readStudents = async (req, res) => {
  try {
    // Fetching all students from the database
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching students", error });
  }
};

export { createStudent, updateStudent, readStudents };
