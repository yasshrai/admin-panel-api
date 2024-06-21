import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Create a Schema corresponding to the document interface.
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    branch: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: false,
    },
    rollNumber: {
      type: String,
      required: false,
      unique: true,
    },
    scholarNumber: {
      type: String,
      required: false,
      unique: true,
    },
    enrollmentNumber: {
      type: String,
      required: false,
      unique: true,
    },
    admissionYear: {
      type: Number,
      required: false,
    },
    leaveUniversity: {
      type: Boolean,
      required: false,
      default: false,
    },
    passOutYear: {
      type: Number,
      required: false,
    },
    mobileNumber: {
      type: String,
      required: false,
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    emailAddress: {
      type: String,
      required: false,
      match: [/\S+@\S+\.\S+/, "Email address is invalid"],
    },
    fatherName: {
      type: String,
      required: false,
    },
    motherName: {
      type: String,
      required: false,
    },
    residenceAddress: {
      type: String,
      required: false,
    },
    parentContectNumber: {
      type: String,
      required: false,
    },
    semester: {
      type: String,
      required: false,
    },
    section: {
      type: String,
      required: false,
    },
    subjectinHighSchool: {
      type: String,
      required: false,
    },
    regular: {
      type: Boolean,
      required: false,
    },
    busFacility: {
      type: Boolean,
      required: false,
    },
    achivements: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Create a Model.
const Student = model("Student", studentSchema);

export default Student;
