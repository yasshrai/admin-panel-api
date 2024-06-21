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
      enrollmentNumber,
      admissionYear,
      leaveUniversity,
      passOutYear,
      mobileNumber,
      emailAddress,
      fatherName,
      motherName,
      residenceAddress,
      parentContectNumber,
      semester,
      section,
      subjectinHighSchool,
      regular,
      busFacility,
      achivements,
    } = req.body;

    // Check if all three fields are empty
    if (!scholarNumber && !rollNumber && !enrollmentNumber) {
      // All three fields are empty, create a new student
      const newStudent = new Student({
        name,
        branch,
        department,
        rollNumber,
        scholarNumber,
        enrollmentNumber,
        admissionYear,
        leaveUniversity,
        passOutYear,
        mobileNumber,
        emailAddress,
        fatherName,
        motherName,
        residenceAddress,
        parentContectNumber,
        semester,
        section,
        subjectinHighSchool,
        regular,
        busFacility,
        achivements,
      });

      // Saving the new student to the database
      await newStudent.save();

      // Responding with the newly created student
      return res.status(201).json(newStudent);
    }

    // Build query object to find existing student
    let query = {};
    if (scholarNumber) query.scholarNumber = scholarNumber;
    if (rollNumber) query.rollNumber = rollNumber;
    if (enrollmentNumber) query.enrollmentNumber = enrollmentNumber;

    const student = await Student.findOne(query);

    if (student) {
      return res.status(400).json({ error: "Student already exists" });
    }

    // Creating a new student instance
    const newStudent = new Student({
      name,
      branch,
      department,
      rollNumber,
      scholarNumber,
      enrollmentNumber,
      admissionYear,
      leaveUniversity,
      passOutYear,
      mobileNumber,
      emailAddress,
      fatherName,
      motherName,
      residenceAddress,
      parentContectNumber,
      semester,
      section,
      subjectinHighSchool,
      regular,
      busFacility,
      achivements,
    });

    // Saving the new student to the database
    await newStudent.save();

    // Responding with the newly created student
    return res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating student" });
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
      return res.status(404).json({ error: "Student not found" });
    }

    // Responding with the updated student
    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating student" });
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
    return res.status(500).json({ error: "Error fetching students" });
  }
};

export { createStudent, updateStudent, readStudents };
