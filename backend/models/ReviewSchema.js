import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-populate user details (only necessary fields)
reviewSchema.pre(/^find/, function(next){
  this.populate({
    path: 'user',
    select:"name photo",
  })
  next()
})

// Static method to calculate average rating for a doctor
reviewSchema.statics.calcAverageRating = async function(doctorId){
  //this points the current review

  const stats = await this.aggregate([{
    $match: {doctor:doctorId}
  },
  {
    $group:{
      _id: '$doctor',
      numOfRating: {$sum:1},
      avgRating: {$avg: '$rating'}
    }
  }
])

  // Ensure stats exist before updating Doctor
await Doctor.findByIdAndUpdate(doctorId, {
  totalRating: stats[0].numOfRating,
  averageRating: stats[0].avgRating,
});
console.log(stats)
}

// Trigger rating calculation after saving a new review
reviewSchema.post("save", function(){
  this.constructor.calcAverageRating(this.doctor);
})

export default mongoose.model("Review", reviewSchema);