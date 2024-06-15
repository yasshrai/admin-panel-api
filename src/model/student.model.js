import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Create a Schema corresponding to the document interface.
const studentSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    branch: { type: String, required: [true, "Branch is required"] },
    department: { type: String, required: [true, "Department is required"] },
    rollNumber: {
      type: String,
      unique: true,
      required: [true, "Roll number is required"],
    },
    scholarNumber: {
      type: String,
      unique: true,
      required: [true, "Scholar number is required"],
    },
    enrollmentNumber: {
      type: String,
      unique: true,
      required: false,
    },
    admissionYear: {
      type: Number,
      required: [true, "Admission year is required"],
    },
    leaveUniversity: {
      type: Boolean,
      required: false,
      default: false,
    },
    passOutYear: {
      type: Number,
      required: [true, "Pass out year is required"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    emailAddress: {
      type: String,
      required: [true, "Email address is required"],
      match: [/\S+@\S+\.\S+/, "Email address is invalid"],
    },
    fatherName: { type: String, required: [true, "Father's name is required"] },
    motherName: { type: String, required: [true, "Mother's name is required"] },
    residenceAddress: {
      type: String,
      required: [true, "Residence address is required"],
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Create a Model.
const Student = model("Student", studentSchema);

export default Student;
