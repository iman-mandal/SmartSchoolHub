const { validationResult } = require('express-validator');
const studentModel = require('../models/students');
const studentServices = require('../services/studentsServices');

// register student


module.exports.registerStudent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        // check existing user
        const userAlreadyExist = await studentModel.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const studentData = req.body;

        // create student
        const student = await studentServices.createStudent(studentData);

        // generate token
        const token = student.generateAuthToken();

        // remove password
        const studentObj = student.toObject();
        delete studentObj.password;

        // set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false
        });

        res.status(201).json({
            success: true,
            token,
            message: 'Student registered successfully',
            data: studentObj
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports.loginStudent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }
        const { rollNumber, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid Password or Email" });
        }
        const isMatch = await (user.comparePassword(password));
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password or Email" });
        }
        const token = user.genarateAuthToken();
        console.log('Login Sucessfully');
        res.cookie('token', token);
        res.status(200).json({ token: token, user: user });
    } catch {

    }
}