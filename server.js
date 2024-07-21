import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import hydrationRoutes from './routes/hydrationRoutes.js';
import mealReminderRoutes from './routes/mealReminderRoutes.js';
import dietaryPreferenceRoutes from './routes/dietaryPreferenceRoutes.js';
import healthTestRoutes from './routes/healthTestRoutes.js';
import emergencyContactRoutes from './routes/emergencyContactRoutes.js';
import fraudEducationRoutes from './routes/fraudEducationRoutes.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/users', userRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/hydration', hydrationRoutes);
app.use('/api/meals', mealReminderRoutes);
app.use('/api/dietary', dietaryPreferenceRoutes);
app.use('/api/tests', healthTestRoutes);
app.use('/api/emergency', emergencyContactRoutes);
app.use('/api/education', fraudEducationRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));