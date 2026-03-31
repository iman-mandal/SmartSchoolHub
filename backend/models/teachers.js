const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({

    //  Basic Info
    teacherName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters'],
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters'],
            trim: true
        }
    },

    gender: { type: String, enum: ['male', 'female', 'other'], required: true },

    dateOfBirth: { type: Date, required: true },

    //  Contact Info
    email: {
        type: String, required: true, unique: true, lowercase: true, trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    phoneNumber: {
        type: String, required: true, minlength: 10, maxlength: 10,
        match: [/^\d{10}$/, 'Enter valid 10-digit phone number']
    },

    address: {
        street: String,
        city: String,
        state: String,
        pincode: { type: String, match: [/^\d{6}$/, 'Enter valid 6-digit pincode'] }
    },

    //  Professional Details
    employeeId: { type: String, required: true, unique: true },

    department: { type: String, required: true },

    subjects: [{ type: String }],

    qualification: { type: String, required: true },

    experience: { type: Number, default: 0 },

    joiningDate: { type: Date, default: Date.now },

    salary: { type: Number, required: true },

    //  Extra (Modern Features)
    profileImage: { type: String },

    isActive: { type: Boolean, default: true },

    Notification: { type: Boolean, default: true },
    theme: { type: String, default: light }

}, { timestamps: true });

const teacherModel = mongoose.model('Teacher', teacherSchema);
module.exports = teacherModel;