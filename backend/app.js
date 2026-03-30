const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require("cookie-parser");

//  CORS MUST come before routes
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const connectToDB = require('./db');
connectToDB();

// routes
const studentsRoutes = require('./routes/studentsRoutes');
const teachersRoutes = require('./routes/teachersRoutes');
const managementsRoutes = require('./routes/managementRoutes');

app.use('/students', studentsRoutes)
app.use('/teachers', teachersRoutes);
app.use('/managments', managementsRoutes);

module.exports = app;
