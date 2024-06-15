import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Create a Schema corresponding to the document interface.
const professorSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    professorId: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    residenceAddress: { type: String, required: true },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Create a Model.
const Professor = model("Professor", professorSchema);

export default Professor;
