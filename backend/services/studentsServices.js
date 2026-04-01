const studentModel = require('../models/students');

module.exports.createStudent = async (data) => {
    return await studentModel.create(data);
};