import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Create a Schema corresponding to the document interface.
const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    followUp: { type: String, required: false },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Create a Model.
const Admin = model("Admin", adminSchema);

export default Admin;
