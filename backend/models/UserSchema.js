import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
 // appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],

});

export default mongoose.model("User", UserSchema);