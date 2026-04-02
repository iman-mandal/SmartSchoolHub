const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const studentsSchema = new mongoose.Schema({
    studentName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First Name must be at least 3 characters'],
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, 'Last Name must be at least 3 characters'],
            trim: true
        }
    },

    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: Date, required: true },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Enter valid email']
    },

    studentPhoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        match: [/^\d{10}$/, 'Enter valid phone number']
    },

    parentsDetails: {
        fatherDetails: {
            fatherName: {
                firstName: { type: String, required: true, trim: true },
                lastName: { type: String, required: true, trim: true }
            },
            occupation: { type: String, required: true },
            phoneNumber: {
                type: String,
                required: true,
                match: [/^\d{10}$/, 'Enter valid phone number']
            },
            email: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
                match: [/^\S+@\S+\.\S+$/, 'Enter valid email']
            }
        },

        motherDetails: {
            motherName: {
                firstName: { type: String, required: true, trim: true },
                lastName: { type: String, required: true, trim: true }
            },
            occupation: { type: String, required: true },
            phoneNumber: {
                type: String,
                required: true,
                match: [/^\d{10}$/, 'Enter valid phone number']
            },
            email: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
                match: [/^\S+@\S+\.\S+$/, 'Enter valid email']
            }
        }
    },

    address: {
        street: String,
        city: String,
        state: String,
        pincode: {
            type: String,
            match: [/^\d{6}$/, 'Enter valid pincode']
        }
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
    },

    rollNumber: { type: String, required: true, unique: true },
    class: { type: String, required: true },
    section: { type: String },
    admissionDate: { type: Date, default: Date.now },
    profileImage: { type: String },
    attendancePercentage: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },

    notification: { type: Boolean, default: true },
    theme: { type: String, default: 'light' }

}, { timestamps: true });


// Hash password before save
studentsSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate token
studentsSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '265d' }
    );
};

// Compare password
studentsSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('Student', studentsSchema);