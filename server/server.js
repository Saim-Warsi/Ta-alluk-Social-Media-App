import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

await connectDB();

// clerk middleware
app.use(clerkMiddleware())

// middleware to handle Inngest functions
app.use("/api/inngest", serve({ client: inngest, functions }));

// endpoint for user
app.use('/api/user', userRouter)

// endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});