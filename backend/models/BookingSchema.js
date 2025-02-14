import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true }, // Changed from String to Number
    // appointmentDate: {
    //   type: Date,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,  // Default should be false until payment is confirmed
    },
  },
  { timestamps: true }
);

// Auto-populate doctor (name only) and user (selected fields)
bookingSchema.pre(/^find/, function(next){
  this.populate('user').populate({
    path:'doctor',
    select:'name'
  })
  next()
})

export default mongoose.model("Booking", bookingSchema);