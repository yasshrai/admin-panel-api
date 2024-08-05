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

    // Validate required fields
    if (!name || !age) {
      return res.status(400).json({ error: "Name and age are required" });
    }

    // Check if professorId is empty
    if (!professorId) {
      const newProfessor = new Professor({
        name,
        age,
        department,
        professorId: "",
        position,
        mobileNumber,
        emailAddress,
        residenceAddress,
      });

      await newProfessor.save();
      return res.status(201).json(newProfessor);
    }

    // Check if professor already exists with the given professorId
    const existingProfessor = await Professor.findOne({ professorId });
    if (existingProfessor) {
      return res.status(400).json({ error: "Professor already exists" });
    }

    // Create new professor
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
    return res
      .status(500)
      .json({ error: "Error creating professor", details: error.message });
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
      return res.status(404).json({ error: "Professor not found" });
    }
    return res.status(200).json(updatedProfessor);
  } catch (error) {
    return res.status(500).json({ error: "Error updating professor", error });
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
      .json({ error: "Error fetching professors", errorDetails: error });
  }
};

const uniqueProfessorId = async (req, res) => {
  try {
    let randomnum;
    let attempts = 0;
    const maxAttempts = 1000;
    do {
      // Generate a random integer
      randomnum = Math.floor(Math.random() * 100000000);
      const professor = await Professor.findOne({ professorId: randomnum });

      attempts++;
      if (professor) {
        continue;
      } else {
        break;
      }
    } while (attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      return res
        .status(500)
        .json({ error: "Unable to generate a professorId" });
    }
    return res.status(200).json({ professorId: randomnum });
  } catch (error) {
    return res.status(500).json({ error: "Cannot create unique professorId" });
  }
};

export { createProfessor, updateProfessor, readProfessors, uniqueProfessorId };
