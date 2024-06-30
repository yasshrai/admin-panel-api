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

    // Trim whitespace from string fields
    const trimmedData = {
      name: name?.trim(),
      branch: branch?.trim(),
      department: department?.trim(),
      rollNumber: rollNumber?.trim(),
      scholarNumber: scholarNumber?.trim(),
      enrollmentNumber: enrollmentNumber?.trim(),
      admissionYear,
      leaveUniversity,
      passOutYear,
      mobileNumber: mobileNumber?.trim(),
      emailAddress: emailAddress?.trim(),
      fatherName: fatherName?.trim(),
      motherName: motherName?.trim(),
      residenceAddress: residenceAddress?.trim(),
      parentContectNumber: parentContectNumber?.trim(),
      semester: semester?.trim(),
      section: section?.trim(),
      subjectinHighSchool: subjectinHighSchool?.trim(),
      regular,
      busFacility,
      achivements: achivements?.trim(),
    };

    // Check if all three fields are empty
    if (
      !trimmedData.scholarNumber &&
      !trimmedData.rollNumber &&
      !trimmedData.enrollmentNumber
    ) {
      // All three fields are empty, create a new student
      const newStudent = new Student(trimmedData);

      // Saving the new student to the database
      await newStudent.save();

      // Responding with the newly created student
      return res.status(201).json(newStudent);
    }

    // Build query object to find existing student
    let query = {};
    if (trimmedData.scholarNumber)
      query.scholarNumber = trimmedData.scholarNumber;
    if (trimmedData.rollNumber) query.rollNumber = trimmedData.rollNumber;
    if (trimmedData.enrollmentNumber)
      query.enrollmentNumber = trimmedData.enrollmentNumber;

    const student = await Student.findOne(query);

    if (student) {
      return res.status(400).json({ error: "Student already exists" });
    }

    // Creating a new student instance
    const newStudent = new Student(trimmedData);

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

const filterStudents = async (req, res) => {
  try {
    const filterCriteria = req.body.filters; // Assuming the filter criteria are sent in the request body under "filters"

    // Building the query object
    let query = {};

    // Loop through the filter criteria and add to the query if they are present
    for (const key in filterCriteria) {
      if (
        filterCriteria.hasOwnProperty(key) &&
        filterCriteria[key] !== undefined &&
        filterCriteria[key] !== null
      ) {
        query[key] = filterCriteria[key];
      }
    }

    // Fetching filtered students from the database
    const students = await Student.find(query);

    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching filtered students" });
  }
};

export { createStudent, updateStudent, readStudents, filterStudents };
