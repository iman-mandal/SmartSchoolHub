const mongoose = require('mongoose');

const managementSchema = new mongoose.Schema({

    //  Basic Info
    name: {
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

    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },

    //  Role 
    role: {
        type: String,
        required: true,
        enum: ['libarian', 'principal', 'vice-principal', 'coordinator', 'accountend']
    },

    //  Contact Info
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        match: [/^\d{10}$/, 'Enter valid 10-digit phone number']
    },

    //  Authentication 
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
    },

    //  Address
    address: {
        street: String,
        city: String,
        state: String,
        pincode: {
            type: String,
            match: [/^\d{6}$/, 'Enter valid pincode']
        }
    },

    //  Work Info
    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    joiningDate: {
        type: Date,
        default: Date.now
    },

    //  Permissions 
    permissions: {
        canManageStudents: { type: Boolean, default: false },
        canManageTeachers: { type: Boolean, default: false },
        canManageFees: { type: Boolean, default: false },
        canManageExams: { type: Boolean, default: false }
    },

    //  Status
    isActive: {
        type: Boolean,
        default: true
    },

    Notification: {
        type: Boolean,
        default: true
    },

    profileImage: {
        type: String
    }

}, { timestamps: true });

const managementModel = mongoose.model('Management', managementSchema);
module.exports = managementModel;