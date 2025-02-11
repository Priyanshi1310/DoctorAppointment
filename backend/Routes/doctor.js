import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctors, getSingleDoctor, getDoctorProfile} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from './review.js'

const router = express.Router();

// @desc    Nested route for doctor reviews
// @route   /api/doctors/:doctorId/reviews
router.use('/:doctorId/reviews', reviewRouter);

// @route   GET /api/doctors
// @desc    Get all approved doctors (with optional search functionality)
// @access  Public
router.get('/', getAllDoctors)

// @route   GET /api/doctors/:id
// @desc    Get a single doctor by ID
// @access  Public
router.get('/:id', getSingleDoctor)

// @route   PUT /api/doctors/:id
// @desc    Update doctor profile
// @access  Private (Doctor Only)
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor)

// @route   DELETE /api/doctors/:id
// @desc    Delete doctor account
// @access  Private (Doctor Only)
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor)

// @route   GET /api/doctors/profile/me
// @desc    Get logged-in doctor's profile and appointments
// @access  Private (Doctor Only)
router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile)

export default router;