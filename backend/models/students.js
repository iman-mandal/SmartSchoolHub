const mongoose = require('mongoose');

const studentsSchima = new mongoose.Schema({
    studentName: {
        firstName: {
            type: String, require: true,
            minlength: [3, 'First Name must be atleast 3 charater.'], trim: true
        },
        lastName: {
            type: String, require: true,
            minlength: [3, 'First Name must be atleast 3 charater.'], trim: true
        }
    },
    //Personal Details
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: Date, required: true },
    bloodGroup: { type: String, require: true, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
    //Contact Details
    email: {
        type: String, required: true, unique: true,
        minlenght: [5, 'Your gmail must be atlest 5 charater'], lowercase: true,
        trim: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    studentPhoneNumber: {
        type: String, required: true, unique: true,
        minlenght: [10, 'Phone number must be at least 10 digits'],
        maxlength: [10, 'Phone number must be exactly 10 digits'],
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    //Parent Details
    parentsDetails: {
        fatherDetails: {
            fatherName: {
                firstName: {
                    type: String, require: true,
                    minlength: [3, 'First Name must be atleast 3 charater.'],
                    trim: true
                },
                lastName: {
                    type: String, require: true,
                    minlength: [3, 'First Name must be atleast 3 charater.'],
                    trim: true
                }
            },
            occupation: {
                type: String, require: true,
                minlength: [3, 'First Name must be atleast 3 charater.'], trim: true
            },
            phoneNumber: {
                type: String, required: true,
                minlenght: [10, 'Phone number must be at least 10 digits'],
                maxlength: [10, 'Phone number must be exactly 10 digits'],
                match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
            },
            email: {
                type: String, required: true,
                minlenght: [5, 'Your gmail must be atlest 5 charater'],
                lowercase: true, trim: true,
                match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
            }

        },
        motherDetails: {
            motherName: {
                firstName: {
                    type: String, require: true,
                    minlength: [3, 'First Name must be atleast 3 charater.'],
                    trim: true
                },
                lastName: {
                    type: String, require: true,
                    minlength: [3, 'First Name must be atleast 3 charater.'],
                    trim: true
                }
            },
            occupation: {
                type: String, require: true,
                minlength: [3, 'First Name must be atleast 3 charater.'], trim: true
            },
            phoneNumber: {
                type: String, required: true,
                minlenght: [10, 'Phone number must be at least 10 digits'],
                maxlength: [10, 'Phone number must be exactly 10 digits'],
                match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
            },
            email: {
                type: String, required: true,
                minlenght: [5, 'Your gmail must be atlest 5 charater'],
                lowercase: true, trim: true,
                match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
            }
        },
    },
    //Address
    address: {
        street: String, city: String, state: String,
        pincode: { type: String, match: [/^\d{6}$/, 'Enter valid 6-digit pincode'] }
    },
    //  Academic Details
    rollNumber: { type: String, required: true, unique: true },
    class: { type: String, required: true },
    section: { type: String },
    admissionDate: {  type: Date, default: Date.now },
    // Optional Features
    profileImage: {  type: String, require : true  },
    attendancePercentage: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    //Settings
    Notification: {  type: Boolean, default: true },
    theme : { type : string , default : light }

}, { timestamps: true }
);

const studentModel = mongoose.model('student', studentsSchima);
module.exports = studentModel;