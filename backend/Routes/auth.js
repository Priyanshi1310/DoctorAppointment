import express from "express"
import { register, login } from "../Controllers/authController.js"

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (doctor or patient)
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', login)

export default router;