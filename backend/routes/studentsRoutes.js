const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const studentController = require('../controllers/studentsContoller');


// 📌 Register Student
router.post(
    '/register',
    [
        body('studentName.firstName')
            .isLength({ min: 3 })
            .withMessage('First name must be at least 3 characters'),

        body('email')
            .isEmail()
            .withMessage('Enter a valid email'),

        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),

        body('rollNumber')
            .notEmpty()
            .withMessage('Roll number is required'),

        body('class')
            .notEmpty()
            .withMessage('Class is required')
    ],
    studentController.registerStudent
);


module.exports = router;