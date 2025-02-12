import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  getMyAppointments
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private (Admin)
router.get("/", authenticate, restrict(['admin']), getAllUsers);

// @route   GET /api/users/:id
// @desc    Get a single user by ID
// @access  Private (Patient only)
router.get("/:id", authenticate, restrict(['admin','patient']), getSingleUser);

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private (Patient only)
router.put("/:id", authenticate, restrict(['patient']), updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user account
// @access  Private (Patient only)
router.delete("/:id", authenticate, restrict(['patient']), deleteUser);

// @route   GET /api/users/profile/me
// @desc    Get logged-in user's profile
// @access  Private (Patient only)
router.get("/profile/me", authenticate, restrict(['patient']), getUserProfile);

// @route   GET /api/users/appointments/my-appointments
// @desc    Get logged-in user's appointments
// @access  Private (Patient only)
router.get("/appointments/my-appointments", authenticate, restrict(['patient']), getMyAppointments);

export default router;
