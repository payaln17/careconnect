import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    hospital: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    about: {
      type: String,
      default: "",
      trim: true,
    },

    availableDays: {
      type: [String],
      default: [],
    },

    availableTime: {
      type: String,
      default: "",
      trim: true,
    },
    

    profileImage: {
      type: String,
      default: "",
    },

    rating: {
  type: Number,
  default: 4.8,
  min: 0,
  max: 5,
},

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor =
  mongoose.models.Doctor ||
  mongoose.model("Doctor", doctorSchema);

export default Doctor;