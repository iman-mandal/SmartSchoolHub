const { validationResult } = require('express-validator');
const studentModel = require('../models/students');
const studentServices = require('../services/studentsServices');
const { validationResult } = require('express-validator');

// register student

module.exports.registerStudent = async (req, res, next) => {
    try {
        // validation check
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const studentData = req.body;

        // create student
        const student = await studentServices.createStudent(studentData);

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            data: student
        });

    } catch (error) {
        next(error);
    }
};
