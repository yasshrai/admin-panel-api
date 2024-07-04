import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Create a Schema corresponding to the document interface.
const professorSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    department: { type: String },
    position: { type: String },
    professorId: { type: String, unique: true },
    mobileNumber: { type: String },
    emailAddress: { type: String },
    residenceAddress: { type: String },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Create a Model.
const Professor = model("Professor", professorSchema);

export default Professor;
