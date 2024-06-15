import Professor from "../model/professor.model.js";

// Create a new professor
const createProfessor = async (req, res) => {
  try {
    const {
      name,
      age,
      department,
      position,
      professorId,
      mobileNumber,
      emailAddress,
      residenceAddress,
    } = req.body;

    if (
      !name ||
      !age ||
      !department ||
      !position ||
      !professorId ||
      !mobileNumber ||
      !emailAddress ||
      !residenceAddress
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const professor = await Professor.findOne({ professorId });
    if (professor) {
      return res.status(400).json({ message: "Professor already exists" });
    }

    const newProfessor = new Professor({
      name,
      age,
      department,
      position,
      professorId,
      mobileNumber,
      emailAddress,
      residenceAddress,
    });

    await newProfessor.save();
    return res.status(201).json(newProfessor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating professor", error });
  }
};

// Update an existing professor using professorId
const updateProfessor = async (req, res) => {
  try {
    const professorId = req.params.professorId;
    const updatedData = req.body;
    const updatedProfessor = await Professor.findOneAndUpdate(
      { professorId },
      updatedData,
      { new: true }
    );
    if (!updatedProfessor) {
      return res.status(404).json({ message: "Professor not found" });
    }
    return res.status(200).json(updatedProfessor);
  } catch (error) {
    return res.status(500).json({ message: "Error updating professor", error });
  }
};

// Read all professors
const readProfessors = async (req, res) => {
  try {
    const professors = await Professor.find();
    return res.status(200).json(professors);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching professors", error });
  }
};

export { createProfessor, updateProfessor, readProfessors };
